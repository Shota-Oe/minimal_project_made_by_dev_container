import { createServer, type Server } from "node:http";

export function createApp(apiUrl: string): Server {
  return createServer(async (_req, res) => {
    try {
      const apiRes = await fetch(`${apiUrl}/db`);
      const data: unknown = await apiRes.json();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ from: "node", api: data }));
    } catch (err) {
      res.writeHead(502, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: String(err) }));
    }
  });
}
