import { createServer, type Server } from "node:http";
import type { AddressInfo } from "node:net";
import { afterEach, describe, expect, it } from "vitest";
import { createApp } from "./app.js";

const servers: Server[] = [];

function listen(server: Server): Promise<string> {
  servers.push(server);
  return new Promise((resolve) => {
    server.listen(0, () => {
      const { port } = server.address() as AddressInfo;
      resolve(`http://localhost:${port}`);
    });
  });
}

afterEach(async () => {
  await Promise.all(
    servers.splice(0).map((s) => new Promise((r) => s.close(r))),
  );
});

describe("createApp", () => {
  it("returns the API response", async () => {
    const stubApi = createServer((_req, res) => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ version: "PostgreSQL 17" }));
    });
    const apiUrl = await listen(stubApi);
    const appUrl = await listen(createApp(apiUrl));

    const res = await fetch(appUrl);

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      from: "node",
      api: { version: "PostgreSQL 17" },
    });
  });

  it("returns 502 when the API is unreachable", async () => {
    const appUrl = await listen(createApp("http://localhost:1"));

    const res = await fetch(appUrl);

    expect(res.status).toBe(502);
  });
});
