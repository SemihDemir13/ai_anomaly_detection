# app/schemas.py
from pydantic import BaseModel, create_model
import json
import os

# Kaydettiğimiz sütun listesini içeren JSON dosyasının yolu
COLUMN_FILE_PATH = os.path.join(os.path.dirname(__file__), 'models', 'model_columns.json')

def get_model_columns():
    """model_columns.json dosyasından sütun listesini okur."""
    try:
        with open(COLUMN_FILE_PATH, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        # Eğer dosya bulunamazsa, API'nin çökmesini önlemek için boş liste döndür.
        # Bu durum, sunucu başlarken ml_utils'de kontrol edilecek.
        return []

# Sütun listesini oku
model_columns = get_model_columns()

# Dinamik olarak Pydantic modeli için alanları oluştur
# Tüm alanların tipini float olarak belirliyoruz, FastAPI gelen veriyi dönüştürmeye çalışacaktır.
fields = {col: (float, ...) for col in model_columns}

# create_model fonksiyonu ile Pydantic modelini dinamik olarak yarat
if fields:
    TrafficData = create_model('TrafficData', **fields)
else:
    # Eğer sütunlar yüklenemezse, boş bir model oluştur
    class TrafficData(BaseModel):
        pass

# Tahmin sonucunu döndürecek şema (bu statik kalabilir)
class PredictionResponse(BaseModel):
    prediction_iso_forest: str
    prediction_lstm: str
    is_anomaly_iso_forest: bool
    is_anomaly_lstm: bool