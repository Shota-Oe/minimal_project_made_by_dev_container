# node(TS) + FastAPI + PostgreSQL devcontainer

## 構成

| ディレクトリ | 内容 | ポート |
| --- | --- | --- |
| `frontend/` | Node.js 24 + TypeScript（FastAPI を呼び出す最小サーバー） | 3000 |
| `backend/` | Python 3.13 + FastAPI | 8000 |
| `db` サービス | PostgreSQL 17 | 5432 |

## 使い方

1. VS Code で本フォルダを開き、「Dev Containers: Reopen in Container」を実行
   （初回作成時に pip / npm の依存が自動でインストールされます）
2. バックエンドを起動

   ```sh
   cd backend
   fastapi dev main.py --host 0.0.0.0
   ```

   - `curl localhost:8000/health` → `{"status":"ok"}`
   - `curl localhost:8000/db` → PostgreSQL のバージョン

3. 別ターミナルで Node サーバーを起動

   ```sh
   cd frontend
   npm run dev
   ```

   - `curl localhost:3000` → Node → FastAPI → PostgreSQL の結果が返ります

## DB 接続情報（開発用）

`postgresql://postgres:postgres@db:5432/app`（コンテナ内では環境変数 `DATABASE_URL` に設定済み）

## テスト

```sh
# frontend (Vitest)
cd frontend && npm test

# backend (pytest) ※ /db のテストは db サービスに接続するため devcontainer 内で実行
cd backend && pytest
```

## Claude Code

コンテナには Claude Code（CLI と VS Code 拡張）が入っており、Anthropic API Key で認証します。

1. `.devcontainer/.env.example` を `.devcontainer/.env` にコピーし、`ANTHROPIC_API_KEY` に自分のキーを記入
   （`.env` は git 管理外）
2. 「Dev Containers: Rebuild Container」を実行
3. コンテナ内のターミナルで `claude` を起動（初回のみ API Key の使用を確認されるので Yes）

Claude Code の設定は名前付きボリューム `claude-config` に保存されるため、Rebuild しても保持されます。
