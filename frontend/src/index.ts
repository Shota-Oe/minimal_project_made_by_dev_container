import { createApp } from "./app.js";

const PORT = Number(process.env.PORT ?? 3000);
const API_URL = process.env.API_URL ?? "http://localhost:8000";

createApp(API_URL).listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`);
});
