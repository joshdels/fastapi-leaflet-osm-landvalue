/*
This activities are for the charts pattern
*/

let chartInstance = null;


export function initChart() {
  const ctx = document.getElementById("chart");

  chartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Road Distance"],
      datasets: [
        {
          label: "Distance (meters)",
          data: [0],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsiveness: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

export function updateChart(distance) {
  if (!chartInstance) return;

  chartInstance.data.datasets[0].data = [distance];
  chartInstance.update();
}
