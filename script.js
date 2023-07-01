/* --------------- Spin Wheel  --------------------- */
const spinWheel = document.getElementById("spinWheel");
const spinBtn = document.getElementById("spin_btn");
const text = document.getElementById("text");



/* --------------- Minimum And Maximum Angle For A value  --------------------- */
const spinValues = [
  { minDegree: 0, maxDegree: 30, value: "50% off"},
  { minDegree: 31, maxDegree: 110, value: "Better Luck!"},
  { minDegree: 111, maxDegree: 150, value: "20% off"},
  { minDegree: 151, maxDegree: 180, value:  "Try again"},
  { minDegree: 181, maxDegree: 240, value: "40% off"},
  { minDegree: 241, maxDegree: 270, value: "Try again"},
  { minDegree: 271, maxDegree: 300, value: "30% off"},
  { minDegree: 301, maxDegree: 330, value: "Try again"},
 
];
/* --------------- Size Of Each Piece  --------------------- */
const size = [10, 10, 10, 10, 10, 10, 10, 10,];
/* --------------- Background Colors  --------------------- */
var spinColors = [
  "red",
  "blue",
  "lightgreen",
  "yellowgreen",
  "lightblue",
  "#D35400",
  "#138D75",
  "#F1C40F",
];
/* --------------- Chart --------------------- */

let spinChart = new Chart(spinWheel, {
  plugins: [ChartDataLabels],
  type: "pie",
  data: {
    labels: [1,2,3,4,5,6,7,8],
    datasets: [
      {
        backgroundColor: spinColors,
        data: size,
      },
    ],
  },
  options: {
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      tooltip: false,
      legend: {
        display: false,
      },
      datalabels: {
        rotation: 90,
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 16 },
      },
    },
  },
});
/* --------------- Display Value Based On The Angle --------------------- */
 let i=0;
const generateValue = (angleValue) => {
  if(i== 0){
    spinBtn.disabled = false;
  text.innerHTML = `<p>Try again</p>`;
    i++;
  }
  else{
  for (let i of spinValues) {
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      text.innerHTML = `<p>You Won ${i.value}! </p>`;
    
      spinBtn.disabled = false;
      break;
    }
  }
}
};
/* --------------- Spinning Code --------------------- */
let count = 0;
let resultValue = 101;
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  text.innerHTML = `<p>if spin can't work! refresh again</p>`;
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  let rotationInterval = window.setInterval(() => {
    spinChart.options.rotation = spinChart.options.rotation + resultValue;
    spinChart.update();
    if (spinChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      spinChart.options.rotation = 0;
    } else if (count > 15 && spinChart.options.rotation == randomDegree) {
      generateValue(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }

  }, 10);
});
/* --------------- End Spin Wheel  --------------------- */