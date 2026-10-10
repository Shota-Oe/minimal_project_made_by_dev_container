from fastapi.testclient import TestClient

from main import app

client = TestClient(app)


def test_health() -> None:
    res = client.get("/health")
    assert res.status_code == 200
    assert res.json() == {"status": "ok"}


def test_db_version() -> None:
    res = client.get("/db")
    assert res.status_code == 200
    assert "PostgreSQL" in res.json()["version"]
