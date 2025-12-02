from fastapi import FastAPI

app = FastAPI(title="Capstone - Backend")


@app.get("/")
async def root():
    return {"status": "ok", "service": "backend"}


@app.get("/health")
async def health():
    return {"status": "healthy"}
