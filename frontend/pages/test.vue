<template>
  <div>
    <bar-chart v-if="this.loaded" :chartdata="barChartData" :options="barChartOptions" :height="200" />   
    
  </div>
</template>

<script>

import axios from 'axios'

export default {
  data() {
    this.loaded = false       //Variable Initialization for: Prevent mounting the chart component before data received

    return {
       barChartOptions: {
        responsive: true,
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: 'Google analytics data',
          fontSize: 24,
          fontColor: '#6b7280',
        },
        tooltips: {
          backgroundColor: '#17BF62',
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
              gridLines: {
                display: false,
              },
            },
          ],
        },
      },
     
    }
  },

  
  async mounted(){
    this.loaded = false       //Prevent mounting the chart component before data received
    
      
      axios.get('http://localhost:5000/getData').then((res) => {        
        const resData = res.data; 
        
        //console.log("resss2", resData[0].id, resData[0].rank)
        this.barChartData = {
          labels: resData.map(item => item.rank),
          datasets: [
            {
              label: 'Market Cap ($)',
              backgroundColor: '#f87979',
              data: resData.map(item => item.market_cap_usd)
            }
          ]
        };
        this.loaded = true;
        this.$forceUpdate();    //For force re-rendering.

        console.log(this.loaded)

        console.log("barchart", this.barChartData)
      }).catch(err => console.log(err));


    

  }
}
</script>
