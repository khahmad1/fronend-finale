import { Bar } from "react-chartjs-2";

function LineCharts() {
  return (
    <div className="card_charts">
      <h2>Number Of Facility Per Month </h2>
      <div style={{ maxWidth: "750px" }}>
        <Bar
          data={{
            // Name of the variables on x-axies for each bar
            labels: ["March", "April", "May", "June"],
            datasets: [
              {
                // Label for bars
                label:   "June",
                // Data or value of your each variable
                data: [30, 50, 20, 40],
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
          // style={{ marginLeft: "4pc" }}
          options={{
            maintainAspectRatio: false,

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
