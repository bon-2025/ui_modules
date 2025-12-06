import React, { useEffect, useRef, useState } from "react";
import { CChart } from "@coreui/react-chartjs";
import { getStyle } from "@coreui/utils";

export const StatusChart = () => {
  const chartRef = useRef(null);

  const [chartData, setChartData] = useState({
    labels: [],
    renewable: [],
    expiring: [],
    expired: [],
  });

  // Load API data
  useEffect(() => {
    const loadData = async () => {
      try {
        const api = User();
        const res = await api.getContractStatus();

        setChartData({
          labels: res.labels,
          renewable: res.renewable,
          expiring: res.expiring,
          expired: res.expired,
        });
      } catch (error) {
        console.error(error);
      }
    };
    loadData();
  }, []);

  // Handle color/theme changes
  useEffect(() => {
    const handleColorSchemeChange = () => {
      const chartInstance = chartRef.current;
      if (!chartInstance) return;

      const { options } = chartInstance;
      if (options.plugins?.legend?.labels)
        options.plugins.legend.labels.color = getStyle("--cui-body-color");
      if (options.scales?.x?.grid) options.scales.x.grid.color = getStyle("--cui-border-color-translucent");
      if (options.scales?.x?.ticks) options.scales.x.ticks.color = getStyle("--cui-body-color");
      if (options.scales?.y?.grid) options.scales.y.grid.color = getStyle("--cui-border-color-translucent");
      if (options.scales?.y?.ticks) options.scales.y.ticks.color = getStyle("--cui-body-color");

      chartInstance.update();
    };

    document.documentElement.addEventListener("ColorSchemeChange", handleColorSchemeChange);
    return () => document.documentElement.removeEventListener("ColorSchemeChange", handleColorSchemeChange);
  }, []);

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: "Renewed",
        borderColor: "#1b9e3e",
        pointBackgroundColor: "#1b9e3e",
        data: chartData.renewable,
        fill: false,
      },
      {
        label: "Expiring",
        borderColor: "#f9b115",
        pointBackgroundColor: "#f9b115",
        data: chartData.expiring,
        fill: false,
      },
      {
        label: "Expired",
        borderColor: "#e55353",
        pointBackgroundColor: "#e55353",
        data: chartData.expired,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: { mode: "index", intersect: false },
    plugins: {
      legend: { labels: { color: getStyle("--cui-body-color") } },
    },
    scales: {
      x: { grid: { color: getStyle("--cui-border-color-translucent") }, ticks: { color: getStyle("--cui-body-color") } },
      y: { grid: { color: getStyle("--cui-border-color-translucent") }, ticks: { color: getStyle("--cui-body-color") } },
    },
  };

  return <CChart type="line" data={data} options={options} ref={chartRef} height={120} />;
};
