<template>
  <div>
    <bar-chart
      v-if="this.loaded"
      :chartdata="barChartData"
      :options="barChartOptions"
      :height="200"
    />
  </div>
</template>

<script>
import axios from 'axios'

export default {
  head() {
    return {
      title: 'Crypto Market Cap', //Page Title
    }
  },
  data() {
    this.loaded = false //Variable Initialization for: Prevent mounting the chart component before data received
    this.tooltipTitle = []

    return {
      barChartOptions: {
        // Includes Bar Charts' all options
        responsive: true,
        legend: {
          display: true, //In the page, creates a legend below the title
        },
        maintainAspectRatio: true,
        title: {
          display: true,
          text: 'Cryptocurrency Market Caps',
          fontSize: 24,
          fontColor: '#6b7280',
        },
        tooltips: {
          //Options for tooltips that open while cursor is on the single chart
          callbacks: {
            title: (tooltipItem, data) =>
              data['tooltipLabels'][tooltipItem[0]['index']], //Utilizes corresponding coin symbol for tooltips title
          },
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
              },
              scaleLabel: {
                display: true,
                labelString: 'Rank',
              },
            },
          ],
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Market Cap (Billion $)',
              },

              ticks: {
                beginAtZero: true, 
                min: 0,

                callback: function (value, index, values) {
                  //needed to change the scientific notation results from using logarithmic scale.
                  return value.toLocaleString()
                },
              },

              afterBuildTicks: function (chart) {
                //X-axis scaling
                var maxTicks = 20
                var maxLog = Math.log(chart.ticks[0])
                var minLogDensity = maxLog / maxTicks

                var ticks = []
                var currLog = -Infinity
                chart.ticks.reverse().forEach(function (tick) {
                  var log = Math.max(0, Math.log(tick))
                  if (log - currLog > minLogDensity) {
                    ticks.push(tick)
                    currLog = log
                  }
                })
                chart.ticks = ticks
              },

              gridLines: {
                display: true,
              },
              type: 'logarithmic',
            },
          ],
        },
      },
    }
  },

  async mounted() {
    this.loaded = false //Prevent mounting the chart component before data received

    axios
      .get('http://localhost:5000/getData')
      .then((res) => {
        const resData = res.data

        this.barChartData = {
          labels: resData.map((item) => item.rank),
          tooltipLabels: resData.map((item) => item.symbol),
          datasets: [
            {
              label: 'Market Cap (billion $)',
              backgroundColor: '#f2a900',
              data: resData.map((item) => item.market_cap_usd),
            },
          ],
        }
        this.loaded = true
        this.$forceUpdate() //For force re-rendering.
      })
      .catch((err) => console.log(err))
  },
}
</script>
