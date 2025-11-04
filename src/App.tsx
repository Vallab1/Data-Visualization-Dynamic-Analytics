import React from "react";
import HeatmapChart from "./components/HeatmapChart";
import SectorRiskChart from "./components/SectorRiskChart";

const metricsData = {
  metrics: [
    { fund: "Atlas Portföy Yönetimi Fonu", values: [6.1, 6.3, 6.5, 6.7, 6.9] },
    { fund: "Deniz Portföy Yönetimi Fonu", values: [5.8, 6.0, 6.4, 6.8, 7.0] },
    { fund: "QNB Portföy Yönetimi Fonu", values: [6.2, 6.4, 6.6, 6.7, 6.8] },
    { fund: "Atlas Portföy Yönetimi Fonu", values: [6.65, 6.42, 6.31, 5.98, 5.88] },
    { fund: "Deniz Portföy Yönetimi Fonu", values: [6.22, 6.18, 5.97, 5.61, 5.43] },
    { fund: "Yapı Kredi Portföy Yönetimi Fonu", values: [6.55, 6.3, 6.15, 5.82, 5.74] },
    { fund: "Akbank Portföy Yönetimi Fonu", values: [6.33, 6.41, 6.52, 6.73, 6.81] },
    { fund: "Garanti Portföy Yönetimi Fonu", values: [6.12, 6.26, 6.35, 6.57, 6.78] },
    { fund: "TEB Portföy Yönetimi Fonu", values: [5.95, 6.15, 6.44, 6.66, 6.84] },
    { fund: "İş Portföy Yönetimi Fonu", values: [6.25, 6.33, 6.45, 6.62, 6.75] },
    { fund: "Halk Portföy Yönetimi Fonu", values: [6.05, 6.22, 6.40, 6.65, 6.77] },
    { fund: "Vakıf Portföy Yönetimi Fonu", values: [6.10, 6.30, 6.47, 6.70, 6.80] },
    { fund: "Ata Portföy Yönetimi Fonu", values: [5.88, 6.04, 6.26, 6.51, 6.66] },
    { fund: "Oyak Portföy Yönetimi Fonu", values: [6.14, 6.29, 6.48, 6.63, 6.76] },
    { fund: "Ziraat Portföy Yönetimi Fonu", values: [6.00, 6.20, 6.40, 6.60, 6.80] },
    { fund: "HSBC Portföy Yönetimi Fonu", values: [6.19, 6.36, 6.55, 6.72, 6.89] },
    { fund: "Yatırım Finansman Fonu", values: [6.08, 6.25, 6.45, 6.68, 6.79] },
    { fund: "Şeker Portföy Yönetimi Fonu", values: [6.15, 6.32, 6.48, 6.65, 6.81] },
    { fund: "QInvest Portföy Yönetimi Fonu", values: [6.28, 6.42, 6.53, 6.71, 6.87] },
    { fund: "Fibabanka Portföy Yönetimi Fonu", values: [6.02, 6.19, 6.36, 6.59, 6.75] },
  ], scale: [0, 10] as [number, number],
};

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0F172A] p-6">
      <HeatmapChart metrics={metricsData.metrics} scale={metricsData.scale} />
      <SectorRiskChart />
    </div>
  );
};

export default App;
