# app/ml_utils.py
import joblib
import os
import json
from tensorflow.keras.models import load_model

MODEL_DIR = os.path.join(os.path.dirname(__file__), 'models')

# Yüklenecek nesneleri saklamak için global değişkenler
iso_forest = None
autoencoder = None
scaler = None
threshold = None
model_columns = None # YENİ

def load_models():
    """Modelleri, scaler'ı, eşiği ve sütun listesini başlangıçta bir kez yükler."""
    global iso_forest, autoencoder, scaler, threshold, model_columns
    
    try:
        print("Modeller ve diğer nesneler yükleniyor...")
        
        # Sütun listesini yükle (bu en başta olmalı)
        with open(os.path.join(MODEL_DIR, 'model_columns.json'), 'r') as f:
            model_columns = json.load(f)
        print("   - Model sütunları yüklendi.")

        # Modelleri ve diğer nesneleri yükle
        iso_forest = joblib.load(os.path.join(MODEL_DIR, 'isolation_forest.joblib'))
        print("   - Isolation Forest modeli yüklendi.")
        
        autoencoder = load_model(os.path.join(MODEL_DIR, 'lstm_autoencoder.keras'))
        print("   - LSTM Autoencoder modeli yüklendi.")
        
        scaler = joblib.load(os.path.join(MODEL_DIR, 'scaler.joblib'))
        print("   - StandardScaler yüklendi.")
        
        with open(os.path.join(MODEL_DIR, 'lstm_threshold.txt'), 'r') as f:
            threshold = float(f.read())
        print("   - LSTM anomali eşiği yüklendi.")
            
        print("Tüm nesneler başarıyla yüklendi.")

    except FileNotFoundError as e:
        print(f"HATA: Gerekli bir model dosyası bulunamadı. Lütfen 3-Model_Training notebook'unu çalıştırdığınızdan emin olun. Eksik dosya: {e.filename}")
    except Exception as e:
        print(f"Modeller yüklenirken beklenmedik bir hata oluştu: {e}")