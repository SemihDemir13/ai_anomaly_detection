# app/main.py
from fastapi import FastAPI
from . import ml_utils
from .schemas import TrafficData, PredictionResponse
import pandas as pd
import numpy as np

app = FastAPI(title="Anomaly Detection API")

@app.on_event("startup")
def startup_event():
    ml_utils.load_models()

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Anomaly Detection API is running!"}

@app.post("/predict", response_model=PredictionResponse)
def predict(data: TrafficData):
    input_data = data.model_dump()
    
    # Doğru sütun sırasını ml_utils'den al
    expected_columns = ml_utils.model_columns
    
    input_df = pd.DataFrame([input_data], columns=expected_columns)
    
    input_scaled = ml_utils.scaler.transform(input_df)
    input_scaled_df = pd.DataFrame(input_scaled, columns=expected_columns)

    # Model 1: Isolation Forest Tahmini
    iso_pred = ml_utils.iso_forest.predict(input_scaled_df)
    iso_label = "DDoS" if iso_pred[0] == -1 else "BENIGN"
    iso_is_anomaly = (iso_label == "DDoS")
    
    # Model 2: LSTM Autoencoder Tahmini
    input_3d = input_scaled_df.values.reshape(1, 1, len(expected_columns))
    reconstruction = ml_utils.autoencoder.predict(input_3d, verbose=0)
    reconstruction_error = np.mean(np.abs(reconstruction - input_3d))
    
    lstm_is_anomaly = bool(reconstruction_error > ml_utils.threshold)
    lstm_label = "DDoS" if lstm_is_anomaly else "BENIGN"

    return {
        "prediction_iso_forest": iso_label,
        "is_anomaly_iso_forest": iso_is_anomaly,
        "prediction_lstm": lstm_label,
        "is_anomaly_lstm": lstm_is_anomaly
    }