import assert from "node:assert/strict";
import { createServer } from "node:http";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import sharp from "sharp";
import { fetchProjectPreview } from "./fetch-project-previews.mjs";

test("refreshes OG previews and preserves saved images when fetching fails", async (t) => {
  const directory = await mkdtemp(join(tmpdir(), "project-previews-"));
  const output = join(directory, "preview.png");
  let color = "red";
  const server = createServer(async (request, response) => {
    if (request.url === "/redirect") {
      response.writeHead(302, { Location: "/product/" }).end();
    } else if (request.url === "/product/") {
      response.end('<meta content="og.webp?v=1&amp;size=1200" property="og:image">');
    } else if (request.url === "/product/og.webp?v=1&size=1200") {
      response.end(await sharp({ create: { width: 1200, height: 630, channels: 3, background: color } }).webp().toBuffer());
    } else if (request.url === "/missing") {
      response.end("<html><head></head></html>");
    } else if (request.url === "/invalid") {
      response.end('<meta property="og:image" content="/not-an-image">');
    } else if (request.url === "/not-an-image") {
      response.end("This is not an image");
    } else if (request.url === "/broken-image") {
      response.end('<meta property="og:image" content="/unavailable">');
    } else if (request.url === "/slow") {
      // Leave the request open to exercise the fetch timeout.
    } else {
      response.writeHead(503).end();
    }
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  t.after(async () => {
    server.closeAllConnections();
    await new Promise((resolve) => server.close(resolve));
    await rm(directory, { recursive: true, force: true });
  });
  const url = `http://127.0.0.1:${server.address().port}`;

  await t.test("follows redirects, resolves relative URLs, decodes entities, and converts WebP to PNG", async () => {
    const imageUrl = await fetchProjectPreview(`${url}/redirect`, output);
    assert.equal(imageUrl, `${url}/product/og.webp?v=1&size=1200`);
    const metadata = await sharp(output).metadata();
    assert.equal(metadata.format, "png");
    assert.equal(metadata.width, 1200);
    assert.equal(metadata.height, 630);
  });

  await t.test("a later refresh replaces the previous preview", async () => {
    const before = await readFile(output);
    color = "blue";
    await fetchProjectPreview(`${url}/product/`, output);
    assert.notDeepEqual(await readFile(output), before);
  });

  for (const [path, error] of [
    ["/missing", /no og:image/],
    ["/unavailable", /Product page returned HTTP 503/],
    ["/broken-image", /OG image returned HTTP 503/],
    ["/invalid", /unsupported image format/],
    ["/slow", /timeout/i],
  ]) {
    await t.test(`${path} leaves the saved preview intact`, async () => {
      await writeFile(output, "saved preview");
      await assert.rejects(fetchProjectPreview(`${url}${path}`, output, 500), error);
      assert.equal(await readFile(output, "utf8"), "saved preview");
    });
  }
});
