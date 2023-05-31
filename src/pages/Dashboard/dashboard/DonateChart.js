import React, { useRef, useEffect } from "react";
import { Chart } from "chart.js/auto";
export default function DonateCharts({ data, labels, colors }) {
  const chartRef = useRef(null);

  useEffect(() => {
    const myChartRef = chartRef.current.getContext("2d");
    let myDoughnutChart = new Chart(myChartRef, {
      type: "doughnut",
      data: {
        labels:  ["order", "Facility", "Medicine", "Category"],
        datasets: [
          {
            data: [30, 50, 20,30],
            backgroundColor:  ["#295982", "#6FABD0", "#92C0D7", "#3e9fae"],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio:false
      },
    });
    return () => {
      myDoughnutChart.destroy();
    };
  }, [data, colors, labels]);

  return (
    <div className="card_charts">
      <h2>Number of order per month</h2>
      <div className="chart">
      <canvas id="myChart" ref={chartRef} height="40px" />
      </div>
    </div>
  );
}
// ["#295982", "#6FABD0", "#92C0D7", "#3e9fae"]