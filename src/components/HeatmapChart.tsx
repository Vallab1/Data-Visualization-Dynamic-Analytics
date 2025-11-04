import React, { useState } from "react";

interface MetricData {
  fund: string;
  values: number[];
}

interface HeatmapProps {
  metrics: MetricData[];
  scale: [number, number];
}

const HeatmapChart: React.FC<HeatmapProps> = ({ metrics, scale }) => {
  const [hovered, setHovered] = useState<{
    fund: string;
    value: number;
    x: number;
    y: number;
  } | null>(null);

  const numCols = metrics[0]?.values?.length || 0;
  const labels = Array.from({ length: numCols }, (_, i) => `M${i + 1}`);

  const getColor = (value: number) => {
    const [min, max] = scale;
    const ratio = (value - min) / (max - min);
    const lightness = 25 + ratio * 55;
    return `hsl(220, 100%, ${lightness}%)`;
  };

  const columnAverages = Array.from({ length: numCols }, (_, colIndex) => {
    const values = metrics.map((m) => m.values[colIndex]);
    return values.reduce((a, b) => a + b, 0) / values.length;
  });

  return (
    <div className="relative border border-white/10 p-6 rounded-2xl text-white mt-10 shadow-lg">
      <div className="mb-6">
        <h1 className="text-xl font-semibold mb-2 text-center sm:text-left">
          Yatırım Fonu Karşılaştırmalı Risk Analizi
        </h1>

        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
          <button className="bg-gradient-to-r from-[#1E3A8A] via-[#2563EB] to-[#60A5FA] text-white px-3 py-1.5 rounded-md text-sm">
            Risk Metrikleri
          </button>
          <button className="bg-[#1E293B] border border-white/10 text-gray-300 px-3 py-1.5 rounded-md text-sm">
            Korelasyon Analizi
          </button>
          <button className="bg-[#1E293B] border border-white/10 text-gray-300 px-3 py-1.5 rounded-md text-sm">
            Performans Attribution
          </button>
        </div>
      </div>

      <div className="bg-[#1E293B] p-5 rounded-xl relative">
        <h2 className="text-base text-gray-300 mb-3 text-center sm:text-left">
          Risk Metrikleri Karşılaştırması
        </h2>

        {/* Table + Scale */}
        <div className="flex flex-col sm:flex-row w-full items-stretch">
          {/* Table */}
          <div className="w-full overflow-x-auto relative">
            <table className="w-full border-collapse text-sm text-gray-200 rounded-lg overflow-hidden">
              <thead>
                <tr>
                  <th className="text-left text-gray-400 text-xs py-2 px-3 bg-[#1E293B] font-medium">
                    Fon
                  </th>
                  {labels.map((label, colIndex) => (
                    <th
                      key={label}
                      className="text-gray-100 text-xs py-1 px-3 font-medium"
                      style={{
                        backgroundColor: getColor(columnAverages[colIndex]),
                        filter:
                          colIndex % 2 === 0
                            ? "brightness(95%)"
                            : "brightness(105%)",
                      }}
                    >
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {metrics.map((fund, rowIndex) => (
                  <tr key={rowIndex}>
                    <td className="text-xs text-gray-200 py-2 px-3 bg-[#1E293B] whitespace-nowrap">
                      {fund.fund}
                    </td>
                    {fund.values.map((value, colIndex) => (
                      <td
                        key={colIndex}
                        className="py-2 px-3 text-center relative cursor-pointer"
                        style={{
                          backgroundColor: getColor(columnAverages[colIndex]),
                          filter:
                            colIndex % 2 === 0
                              ? "brightness(90%)"
                              : "brightness(100%)",
                        }}
                        onMouseEnter={(e) =>
                          setHovered({
                            fund: fund.fund,
                            value,
                            x: e.clientX,
                            y: e.clientY,
                          })
                        }
                        onMouseLeave={() => setHovered(null)}
                      >
                        <div
                          className="rounded-md px-1 py-0.5 inline-block text-[11px]"
                          style={{
                            backgroundColor: getColor(value),
                            opacity: 0.85,
                          }}
                        >
                          {value.toFixed(2)}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Tooltip */}
            {hovered && (
              <div
                className="absolute bg-black text-white text-xs px-3 py-1 rounded-md shadow-md pointer-events-none z-50 transition-opacity duration-200"
                style={{
                  top: hovered.y - 120,
                  left: hovered.x - 250,
                }}
              >
                <span className="font-semibold">{hovered.fund}</span>:{" "}
                {hovered.value.toFixed(2)}
                <div className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-2 h-2 bg-black rotate-45"></div>
              </div>
            )}
          </div>

          {/* Side Scale */}
          <div className="flex flex-row items-stretch justify-center sm:justify-start mt-4 sm:mt-0 sm:ml-4">
            <div className="w-3 h-48 sm:h-auto rounded-full bg-gradient-to-t from-blue-900 via-blue-400 to-white relative" />
            <div className="flex flex-col justify-between ml-2 text-[11px] text-gray-400">
              <span>40</span>
              <span>30</span>
              <span>20</span>
              <span>10</span>
              <span>0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeatmapChart;
