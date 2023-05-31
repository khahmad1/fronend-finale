import { Bar } from "react-chartjs-2";

function LineCharts() {
  return (
    <div className="card_charts">
      <h2>Number Of Customer By Month </h2>
      <div style={{ maxWidth: "750px" }}>
        <Bar
          data={{
            // Name of the variables on x-axies for each bar
            labels: ["1st bar", "2nd bar", "3rd bar", "4th bar"],
            datasets: [
              {
                // Label for bars
                label: "total count/value",
                // Data or value of your each variable
                data: [1552, 1319, 613, 1400],
                // Color of each bar
                backgroundColor: ["#295982", "#6FABD0", "#92C0D7", "#3e9fae"],
                // Border color of each bar
                borderColor: ["#295982", "#6FABD0", "#92C0D7", "#3e9fae"],
                borderWidth: 0.5,
              },
            ],
          }}
          // Height of graph
          height={400}
          style={{ marginLeft: "4pc" }}
          options={{
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    // The y-axis value will start from zero
                    beginAtZero: true,
                  },
                },
              ],
            },
            legend: {
              labels: {
                fontSize: 15,
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default LineCharts;
