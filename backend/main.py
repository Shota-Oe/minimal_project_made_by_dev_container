import os

import psycopg
from fastapi import FastAPI

DATABASE_URL = os.environ.get(
    "DATABASE_URL", "postgresql://postgres:postgres@db:5432/app"
)

app = FastAPI()


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/db")
def db_version() -> dict[str, str]:
    with psycopg.connect(DATABASE_URL) as conn:
        row = conn.execute("SELECT version()").fetchone()
    return {"version": row[0] if row else ""}
