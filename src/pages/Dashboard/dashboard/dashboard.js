import React from "react";
import Card from "./dashboardCard";
import DonateCharts from "./DonateChart";
import LineCharts from "./LineChart";
import "./dashboard.css"

function Dashboard() {
  return (
    <section className="adminDashboard">
   <h1
  style={{
    borderBottom: "4px solid var(--primary)",
    width: "30px",
  }}
>
  Dashboard
</h1>


      <Card />
      <section className="charts-dash">
        <DonateCharts />
        <LineCharts />
      </section>
    </section>
  );
}
export default Dashboard;
