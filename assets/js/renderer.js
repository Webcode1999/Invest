// 必要なモジュールを読み込みます
const { Chart, PieController, ArcElement, CategoryScale, Legend, Tooltip, LineController, LineElement, PointElement, LinearScale } = require('chart.js');
const ChartDataLabels = require('chartjs-plugin-datalabels');

// 両方のコントローラーと要素を登録します
Chart.register(PieController, ArcElement, LineController, LineElement, PointElement, CategoryScale, Legend, Tooltip, LinearScale);

// Canvasのcontextを取得します
let ctx1 = document.getElementById('myChart').getContext('2d');
let ctx2 = document.getElementById('goldPriceChart').getContext('2d');

// Pie Chart
fetch('http://localhost:3000/api/data')
    .then(responce => responce.json())
    .then(data => {
        let labels = data.transactions.map(item => `${item.symbol}`); // 通貨名と国名をラベルとして使用
        let amounts = data.transactions.map(item => item.amount);

        let myChart = new Chart(ctx1, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: amounts,
                    backgroundColor: [
                        '#ff6b78',
                        '#fff898',
                        ' #8890ff',
                        ' #3787ff',
                        '#ff4958',
                        '#4650dd',
                        '#e1ff37',
                        ' #49d5ff',
                        ' #dd88ff',
                        '#ff6bf3'
                    ]
                }]
            },
            options: {
                responsive: false,
                plugins: {
                    datalabels: {
                        formatter: (value, ctx) => {
                            let sum = 0;
                            let dataArr = ctx.chart.data.datasets[0].data;
                            dataArr.map(data => {
                                sum += data;
                            });
                            let percentage = (value * 100 / sum).toFixed(2) + "%";
                            return percentage;
                        },
                        color: '#fff',
                    }
                }
            }
        });

        let goldGram = data.gold.map(item => item.gram);
        let goldDates = data.gold.map(item => new Date(item.date).toLocaleDateString());
        let goldPriceChart = new Chart(ctx2, {
            type: 'line',
            data: {
                labels: goldDates,
                datasets: [{
                    label: 'Gold holdings',
                    data: goldGram,
                    backgroundColor: 'rgba(255, 221, 0, 1)',
                    borderColor: 'rgba(255, 153, 0, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        type: 'linear',
                    }
                }
            }
        });


    })
    .catch(error => console.error('エラーが出ました', error));


