# Yapay Zeka Destekli Ağ Anomali Tespit Sistemi

Bu proje, ağ trafiği verilerini analiz ederek siber saldırıları (özellikle DDoS) tespit eden ve sonuçları interaktif bir web panelinde sunan uçtan uca bir makine öğrenmesi sistemidir. Proje, bir lisans bitirme tezi kapsamında geliştirilmiştir.


## 🚀 Projenin Amacı ve İşlevi

Sistemin temel amacı, geleneksel imza tabanlı güvenlik sistemlerinin yetersiz kaldığı anormal ağ aktivitelerini, makine öğrenmesi modelleriyle tespit etmektir. Sistem, iki farklı yapay zeka modelinin tahminlerini karşılaştırmalı olarak sunarak bir güvenlik analistine karar destek mekanizması sağlar.

- **Backend:** Python/FastAPI ile geliştirilen API, eğitilmiş modelleri barındırır ve anlık tahminler yapar.
- **Frontend:** Next.js/TypeScript ile geliştirilen web arayüzü, API ile etkileşime geçerek test verileri oluşturulmasını ve tahmin sonuçlarının görselleştirilmesini sağlar.

## 🛠️ Kullanılan Teknolojiler

- **Arka Uç (Backend):**
  - Python 3.9+
  - FastAPI
  - Uvicorn
  - Scikit-learn
  - TensorFlow / Keras
  - Pandas
  - NumPy

- **Ön Uç (Frontend):**
  - Next.js 14 (App Router)
  - React
  - TypeScript
  - TailwindCSS
  - Axios

- **Veri Seti:**
  - CIC-IDS-2017 (Sadece DDoS ve BENIGN etiketli alt kümesi)

## ⚙️ Kurulum ve Çalıştırma

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin. Sistemin çalışması için iki ayrı terminale ihtiyacınız olacaktır.

### Ön Gereksinimler

- [Python 3.9+](https://www.python.org/)
- [Node.js ve npm](https://nodejs.org/)
- [Git](https://git-scm.com/)

### Adım 1: Projeyi Klonlama

Projeyi bilgisayarınıza klonlayın:

```bash
git clone https://github.com/SemihDemir13//ai_anomaly_detection.git
cd AI_Anomaly
```

### Adım 2: (API) Kurma ve Çalıştırma

Bu adımlar **birinci terminalde** yapılacaktır.

1.  **Sanal Ortam Oluşturma ve Aktive Etme:**
    ```bash
    # Sanal ortamı oluştur
    python -m venv venv

    # Sanal ortamı aktive et (Windows)
    venv\Scripts\activate
    
    # Sanal ortamı aktive et (macOS/Linux)
    # source venv/bin/activate
    ```

2.  **Gerekli Python Kütüphanelerini Yükleme:**
    ```bash
    pip install -r requirements.txt
    ```

3.  **API Sunucusunu Başlatma:**
    ```bash
    uvicorn app.main:app --reload
    ```
    *API sunucusu artık `http://127.0.0.1:8000` adresinde çalışıyor. Bu terminali açık bırakın.*

### Adım 3: Arayüz Kurma ve Çalıştırma

Bu adımlar **ikinci, yeni bir terminalde** yapılacaktır.

1.  **Frontend Klasörüne Girme:**
    ```bash
    cd frontend
    ```

2.  **Gerekli JavaScript Paketlerini Yükleme:**
    ```bash
    npm install
    ```

3.  **Arayüz Sunucusunu Başlatma:**
    ```bash
    npm run dev
    ```
    *Arayüz sunucusu artık `http://localhost:3000` adresinde çalışıyor. Bu terminali de açık bırakın.*

### Adım 4: Sistemi Kullanma

- Web tarayıcınızı açın ve **`http://localhost:3000`** adresine gidin.
- "Rastgele BENIGN/DDoS Örneği Getir" butonlarını kullanarak formu otomatik doldurun.
- "Anomali Tespiti Yap" butonuna tıklayarak modellerin tahmin sonuçlarını görün.

## 📚 Jupyter Notebook'lar

Projenin veri analizi, model eğitimi ve dosya oluşturma süreçleri `notebooks/` klasörü altında bulunmaktadır.

- `1-EDA.ipynb`: Keşifsel Veri Analizi
- `2-Data_Preprocessing.ipynb`: Veri Ön İşleme (Bu dosyanın mantığı `3-Model_Training` içine entegre edilmiştir.)
- `3-Model_Training.ipynb`: Modellerin (Isolation Forest ve LSTM Autoencoder) eğitildiği, değerlendirildiği ve API için gerekli tüm dosyaların (`.joblib`, `.keras`, `.json`, `.csv`) oluşturulduğu ana notebook.
