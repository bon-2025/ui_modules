import { useEffect, useState } from "react";

// Example data simulating API response
const exampleData = {
  widgets: [
    {
      title: "Graves Added",
      value: 125,
      icon: "bi-tree", // optional icon
      chartData: [10, 15, 20, 25, 30, 45],
    },
    {
      title: "Active Employees",
      value: 12,
      icon: "bi-people",
      chartData: [2, 3, 2, 4, 1, 0],
    },
    {
      title: "Backups",
      value: 3,
      icon: "bi-hdd",
      chartData: [1, 0, 1, 1, 0, 0],
    },
    {
      title: "Pending Tasks",
      value: 5,
      icon: "bi-clock",
      chartData: [1, 1, 0, 2, 1, 0],
    },
  ],
  statusWidgets: [
    { title: "Pending Reports", value: 5, color: "warning", progress: 40 },
    { title: "Completed Tasks", value: 45, color: "success", progress: 90 },
    { title: "Alerts", value: 2, color: "danger", progress: 20 },
    { title: "Archived Records", value: 120, color: "info", progress: 60 },
  ],
  chartData: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    renewable: [12, 15, 8, 10, 20, 18],
    expiring: [5, 7, 4, 6, 3, 5],
    expired: [2, 3, 1, 0, 1, 2],
  },
};

export const useDashboardData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      // Simulate network/API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Set example data
      setData(exampleData);
      setLoading(false);
    };

    load();
  }, []);

  return { data, loading };
};
