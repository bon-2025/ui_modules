import React from "react";
import "./Dashboard.css";

import { useDashboardData } from "./hooks/useDashboardData";
import { TopWidgetGroup } from "./components/TopWidgetGroup";
import { StatusWidgetGroup } from "./components/StatusWidgetGroup";
import { StatusChart } from "./components/StatusChart";

const Dashboard = () => {
  const { data, loading } = useDashboardData();

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container-fluid p-3">
      {/* Top widgets section */}
      <TopWidgetGroup widgets={data.widgets} />

      {/* Chart section */}
      <div className="container-fluid bg-light p-3 border border-dark-subtle my-3">
        <h4 className="mb-3">Contract Status Overview</h4>
        <StatusChart />
      </div>

      {/* Status widgets section */}
      <StatusWidgetGroup widgets={data.statusWidgets} />
    </div>
  );
};

export default Dashboard;
