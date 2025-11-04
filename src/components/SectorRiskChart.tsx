import React, { useState } from "react";
import { Search, ArrowUpDown } from "lucide-react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const COLORS = ["#22c55e", "#3b82f6", "#eab308", "#f97316", "#ef4444"];

const SectorRiskChart = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [sortField, setSortField] = useState<string>("1YReturn");
    const [sortAsc, setSortAsc] = useState<boolean>(false);

    const sectors = [
        { label: "En Düşük", value: "%3" },
        { label: "Düşük", value: "%8" },
        { label: "Orta", value: "%14" },
        { label: "Yüksek", value: "%49,3" },
        { label: "Çok Yüksek", value: "%12,53" },
    ];

    const topFunds = [
        {
            name: "Atlas Portföy Yönetimi Fonu",
            company: "Deniz Portföy Yönetimi A.Ş.",
            category: "Bond Funds",
            "1YReturn": 10.53,
            "3YReturn": 23.35,
            risk: "Low",
        },
        {
            name: "Yapı Kredi Portföy Yönetimi Fonu",
            company: "Yapı Kredi Portföy",
            category: "Equity Funds",
            "1YReturn": 12.66,
            "3YReturn": 25.22,
            risk: "High",
        },
        {
            name: "Garanti Portföy Karma Fon",
            company: "Garanti Portföy",
            category: "Mixed Funds",
            "1YReturn": 9.45,
            "3YReturn": 22.11,
            risk: "Medium",
        },
    ];

    const gradients = [
        "from-[#0f172a] to-[#4ade80]",
        "from-[#0f172a] to-[#60a5fa]",
        "from-[#0f172a] to-[#fde047]",
        "from-[#0f172a] to-[#fb923c]",
        "from-[#0f172a] to-[#c084fc]",
    ];

    const data = sectors.map((s) => ({
        ...s,
        numericValue: parseFloat(s.value.replace("%", "").replace(",", ".")),
    }));

    // Sorting logic
    const sortedFunds = [...topFunds].sort((a, b) => {
        const valA = a[sortField as keyof typeof a];
        const valB = b[sortField as keyof typeof b];
        if (typeof valA === "number" && typeof valB === "number") {
            return sortAsc ? valA - valB : valB - valA;
        }
        if (typeof valA === "string" && typeof valB === "string") {
            return sortAsc
                ? valA.localeCompare(valB)
                : valB.localeCompare(valA);
        }
        return 0;
    });

    const handleSort = (field: string) => {
        if (sortField === field) setSortAsc(!sortAsc);
        else {
            setSortField(field);
            setSortAsc(true);
        }
    };

    return (
        <div className="border border-white/10 p-6 rounded-2xl text-white mt-10 shadow-lg bg-[#0f172a]">
            <h1 className="text-2xl font-semibold mb-4 text-center sm:text-left">
                Sektör Risk Analizi
            </h1>

            {/* ===== Chart Section ===== */}
            <div className="bg-[#162037] p-5 rounded-xl mb-6">
                <h2 className="text-xl font-semibold mb-4 text-center sm:text-left">
                    Sektör Fonları Risk Analizi
                </h2>

                <div className="w-full h-[350px]">
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="numericValue"
                                nameKey="label"
                                cx="50%"
                                cy="50%"
                                innerRadius={90}
                                outerRadius={140}
                                paddingAngle={2}
                                onMouseEnter={(_, index) => setActiveIndex(index)}
                                onMouseLeave={() => setActiveIndex(null)}
                                isAnimationActive={true}
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                        strokeWidth={activeIndex === index ? 5 : 1}
                                        stroke="#1E293B"
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#111827",
                                    borderRadius: "8px",
                                    border: "1px solid #334155",
                                    color: "white",
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* ===== Sector Summary Boxes ===== */}
                <div className="flex justify-center sm:justify-around mt-6 flex-wrap gap-6">
                    {sectors.map((s, i) => (
                        <div
                            key={i}
                            className={`text-center px-6 py-4 min-w-[130px] rounded-xl shadow-md 
                bg-gradient-to-r ${gradients[i % gradients.length]} 
                hover:scale-105 hover:shadow-xl hover:brightness-110 
                transition-all duration-300 ease-in-out`}
                        >
                            <div className="text-sm text-gray-200 mb-1 font-medium">
                                {s.label}
                            </div>
                            <div className="text-2xl font-bold text-white drop-shadow-sm">
                                {s.value}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ===== Table Section ===== */}
            <div className="bg-[#162037] p-5 rounded-xl mb-6">
                <h3 className="text-lg font-semibold mb-3">
                    Sektörde En İyi Performans Gösteren Fonlar
                </h3>

                <div className="relative w-full mb-3">
                    <input
                        className="bg-[#1E293B] border border-gray-600 rounded-xl px-4 py-2 w-full text-sm text-gray-200"
                        type="text"
                        placeholder="Fon adı, kurucu, kategori ara…"
                    />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>

                <table className="w-full text-sm text-gray-300">
                    <thead>
                        <tr className="border-b border-gray-700">
                            {[
                                { label: "Fon Adı", key: "name" },
                                { label: "Kurucu", key: "company" },
                                { label: "Kategori", key: "category" },
                                { label: "1Y Return", key: "1YReturn" },
                                { label: "3Y Return", key: "3YReturn" },
                                { label: "Risk", key: "risk" },
                            ].map((col) => (
                                <th
                                    key={col.key}
                                    className={`py-2 ${["1YReturn", "3YReturn", "risk"].includes(col.key)
                                        ? "text-right"
                                        : "text-left"
                                        } cursor-pointer select-none hover:text-blue-400`}
                                    onClick={() => handleSort(col.key)}
                                >
                                    <div className="flex items-center gap-1">
                                        {col.label}
                                        <ArrowUpDown className="w-3 h-3 opacity-60" />
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {sortedFunds.map((f, i) => (
                            <tr
                                key={i}
                                className="border-b border-gray-800 hover:bg-[#2A3554]/40 transition"
                            >
                                <td className="py-2">{f.name}</td>
                                <td className="py-2">{f.company}</td>
                                <td className="py-2">{f.category}</td>
                                <td className="py-2 text-right">{f["1YReturn"]}%</td>
                                <td className="py-2 text-right">{f["3YReturn"]}%</td>
                                <td className="py-2 text-right">{f.risk}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SectorRiskChart;
