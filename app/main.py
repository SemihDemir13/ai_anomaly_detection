from fastapi import FastAPI

app=FastAPI(title="Anomali dedektifi")

@app.get("/")
def read_root():
    """
    API'nin ana endpoint'i. Sistemin ayakta olup olmadığını kontrol eder.
    """
    return {"status": "ok", "message": "Anomaly Detection API is running!"}
