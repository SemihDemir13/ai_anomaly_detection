// frontend/src/app/page.tsx
"use client"; // Bu bileşenin interaktif bir istemci bileşeni olduğunu belirtir.

import { useState, FormEvent } from 'react';
import axios from 'axios'; // Axios'u import et

// API'den dönecek olan sonuç nesnesinin tipini tanımlıyoruz.
type PredictionResult = {
  prediction_iso_forest: string;
  prediction_lstm: string;
  is_anomaly_iso_forest: boolean;
  is_anomaly_lstm: boolean;
};

export default function Home() {
  // Form verilerini ve durumları tutmak için state'ler oluşturuyoruz.
  // TypeScript ile state'lerin tiplerini belirtmek iyi bir pratiktir.
  const [destinationPort, setDestinationPort] = useState<number>(80);
  const [flowDuration, setFlowDuration] = useState<number>(1000);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Form gönderildiğinde çalışacak fonksiyon.
  // event parametresinin tipini FormEvent olarak belirtiyoruz.
 const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  setIsLoading(true);
  setResult(null);
  setError(null);

  // API'ye gönderilecek olan veri gövdesini (request body) oluştur.
  // Bu yapı, app/schemas.py dosyasındaki TrafficData modeliyle eşleşmeli.
  // Şimdilik diğer 76 özelliği varsayılan olarak 0 gönderiyoruz.
  // Bu, API'nin hata vermesini engeller.
  const requestData = {
    Destination_Port: destinationPort,
    Flow_Duration: flowDuration,
    Total_Fwd_Packets: 0,
    Total_Backward_Packets: 0,
    Total_Length_of_Fwd_Packets: 0,
    Total_Length_of_Bwd_Packets: 0,
    Fwd_Packet_Length_Max: 0,
    Fwd_Packet_Length_Min: 0,
    Fwd_Packet_Length_Mean: 0,
    Fwd_Packet_Length_Std: 0,
    Bwd_Packet_Length_Max: 0,
    Bwd_Packet_Length_Min: 0,
    Bwd_Packet_Length_Mean: 0,
    Bwd_Packet_Length_Std: 0,
    Flow_Bytes_s: 0,
    Flow_Packets_s: 0,
    Flow_IAT_Mean: 0,
    Flow_IAT_Std: 0,
    Flow_IAT_Max: 0,
    Flow_IAT_Min: 0,
    Fwd_IAT_Total: 0,
    Fwd_IAT_Mean: 0,
    Fwd_IAT_Std: 0,
    Fwd_IAT_Max: 0,
    Fwd_IAT_Min: 0,
    Bwd_IAT_Total: 0,
    Bwd_IAT_Mean: 0,
    Bwd_IAT_Std: 0,
    Bwd_IAT_Max: 0,
    Bwd_IAT_Min: 0,
    Fwd_PSH_Flags: 0,
    Bwd_PSH_Flags: 0,
    Fwd_URG_Flags: 0,
    Bwd_URG_Flags: 0,
    Fwd_Header_Length: 0,
    Bwd_Header_Length: 0,
    Fwd_Packets_s: 0,
    Bwd_Packets_s: 0,
    Min_Packet_Length: 0,
    Max_Packet_Length: 0,
    Packet_Length_Mean: 0,
    Packet_Length_Std: 0,
    Packet_Length_Variance: 0,
    FIN_Flag_Count: 0,
    SYN_Flag_Count: 0,
    RST_Flag_Count: 0,
    PSH_Flag_Count: 0,
    ACK_Flag_Count: 0,
    URG_Flag_Count: 0,
    CWE_Flag_Count: 0,
    ECE_Flag_Count: 0,
    Down_Up_Ratio: 0,
    Average_Packet_Size: 0,
    Avg_Fwd_Segment_Size: 0,
    Avg_Bwd_Segment_Size: 0,
    Fwd_Header_Length_1: 0,
    Fwd_Avg_Bytes_Bulk: 0,
    Fwd_Avg_Packets_Bulk: 0,
    Fwd_Avg_Bulk_Rate: 0,
    Bwd_Avg_Bytes_Bulk: 0,
    Bwd_Avg_Packets_Bulk: 0,
    Bwd_Avg_Bulk_Rate: 0,
    Subflow_Fwd_Packets: 0,
    Subflow_Fwd_Bytes: 0,
    Subflow_Bwd_Packets: 0,
    Subflow_Bwd_Bytes: 0,
    Init_Win_bytes_forward: 0,
    Init_Win_bytes_backward: 0,
    act_data_pkt_fwd: 0,
    min_seg_size_forward: 0,
    Active_Mean: 0,
    Active_Std: 0,
    Active_Max: 0,
    Active_Min: 0,
    Idle_Mean: 0,
    Idle_Std: 0,
    Idle_Max: 0,
    Idle_Min: 0,
  };

  try {
    // Axios ile FastAPI sunucumuza POST isteği gönderiyoruz.
    // Varsayılan olarak API'mız 8000 portunda çalışıyor.
    const response = await axios.post<PredictionResult>(
      'http://127.0.0.1:8000/predict', 
      requestData
    );

    // API'den gelen veriyi result state'ine kaydediyoruz.
    setResult(response.data);

  } catch (err: any) {
    // Bir hata oluşursa, hata mesajını error state'ine kaydediyoruz.
    setError(err.response?.data?.detail || err.message || "Bilinmeyen bir hata oluştu.");
  } finally {
    // İstek başarılı da olsa, başarısız da olsa, yüklenme durumunu bitir.
    setIsLoading(false);
  }
};

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900 text-white">
      <div className="w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-center mb-8">Ağ Trafiği Anomali Tespiti</h1>
        
        <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl mb-6">Tahmin İçin Veri Girin</h2>
          
          {/* Şimdilik sadece 2 alan ekliyoruz */}
          <div className="mb-4">
            <label htmlFor="destination_port" className="block mb-2">Hedef Port (Destination Port)</label>
            <input
              type="number"
              id="destination_port"
              value={destinationPort}
              onChange={(e) => setDestinationPort(Number(e.target.value))}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="flow_duration" className="block mb-2">Akış Süresi (Flow Duration)</label>
            <input
              type="number"
              id="flow_duration"
              value={flowDuration}
              onChange={(e) => setFlowDuration(Number(e.target.value))}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-cyan-500"
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded disabled:bg-gray-500"
          >
            {isLoading ? "Tahmin Ediliyor..." : "Anomali Tespiti Yap"}
          </button>
        </form>

        {/* Sonuçların gösterileceği alan */}
        {result && (
          <div className="mt-8 bg-gray-800 p-6 rounded-lg">
            <h3 className="text-2xl mb-4">Tahmin Sonuçları</h3>
            <div>
              <p><strong>Isolation Forest Tahmini:</strong> 
                <span className={result.is_anomaly_iso_forest ? 'text-red-500' : 'text-green-500'}>
                  {` ${result.prediction_iso_forest}`}
                </span>
              </p>
              <p><strong>LSTM Autoencoder Tahmini:</strong> 
                <span className={result.is_anomaly_lstm ? 'text-red-500' : 'text-green-500'}>
                  {` ${result.prediction_lstm}`}
                </span>
              </p>
            </div>
          </div>
        )}

        {/* Hata mesajı alanı */}
        {error && (
          <div className="mt-8 bg-red-900 border border-red-700 text-red-200 p-4 rounded-lg">
            <p><strong>Bir hata oluştu:</strong> {error}</p>
          </div>
        )}
      </div>
    </main>
  );
}