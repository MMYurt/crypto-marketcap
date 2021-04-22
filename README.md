
# Project Overview

A bar chart showing the market capitalization of cryptocurrencies has been created using NodeJS (ExpressJS) on backend and NuxtJS with ChartJS on frontend. You can see the production screenshot in the below:

![Demo SS](https://i.imgur.com/IZvHkm9.png)
## Solution
- **Backend**<br>
	A bidirectional RESTful API was created with ExpressJs that communicates with Coinlore API and processes the incoming data. Then, sends it to the frontend. 
	
	Memoization technique was used in order not to repeat the process in every request sent to the API. When the server is initialized, the first data is fetched and stored in memory. The data is checked according to the time of the request sent by the client, and if the TTL time of 1 minute is exceeded, a new request is sent to the Coinlore API.
	
	`/getData` endpoint accepts requests.
	

- **Frontend**<br>
A NuxtJs project was created with the `npm init nuxt-app` command. Since I haven't experienced Vue frameworks before, it took me a while to understand with lifecycle and related methods. However, I was able to reach the optimal solution.

	ChartJs framework was used to create bar charts. To use it in Nuxt, the `vue-chartjs` module has been included in the project.



# Getting Started
Instructions for running the project locally are given below.
## Prerequisites
- npm 
`npm install npm@latest -g`
## Installation
1. Clone the repo
`git clone https://github.com/MMYurt/aimultiple-task.git`
2. Install the packages separately for backend and frontend (assuming you are in the project's root directory) :
	- Backend
	`cd api && npm install`
	
	- Frontend
	`cd frontend && npm install`
# Usage
To run locally, you must run both Node and Nuxt with separate CLI. There are commands below for this (assuming you are in the project's root directory):
- Backend
`cd api && node index.js`

- Frontend
`cd frontend && npm run dev`

After these are started properly, you will be able to access with your browser by entering: `http://localhost:3333`



# Challenges

- ChartJs v3 was released recently, but the vue-chartjs library, which allows it to be used with Nuxt, does not support this version. For this reason, it was downgraded to ChartJs v2.
- Since the data coming to frontend from the API is asynchronous, the chart component rendered before the data received. To overcome this:
	- While using the component in the Vue template, the render is controlled by assigning a variable to the v-if prop and making it true after the data received. [1]
	-  Component force update is performed after the data is received in the mounted method with `this.$forceUpdate()`. [2]
- When logarithmic scale is used in the bar chart, the x-axis is shown as scientific notation. Although I used a callback function (`/pages/index.vue line: 69`) in the related setting to convert it to normal representation, it could not be properly scaled. To overcome this, I used an additional settings (`/pages/index.vue line:75`) [3].

# Trade-Offs
- It was necessary to transform the data from the Coinlore API to be able to use it meaningfully. I decided to do this in backend instead of frontend. Since caching is used, this process is less costly and more efficient to do here.
- I decided to use a logarithmic scale in the bar chart because there are extreme differences between values (BTC dominance). Otherwise there wouldn't be a meaningful chart.
- Since the `market_cap_usd` values coming from the Coinlore API are in 1 dollar unit, it is made more meaningful by dividing it by 1 billion while visualizing.

# Live Demo
I've created a Firebase Project for API and Netlify Demo Web Site. You can enter the site from this link:
 https://tender-yalow-521313.netlify.app/

# Future Works
A more effective product can be created by updating in real time on the chart. The socket.io library can be used for this.

# References
[1] - https://stackoverflow.com/questions/60650972/vuejs-chartjs-chart-only-renders-after-code-change <br>
[2] - https://michaelnthiessen.com/force-re-render/ <br>
[3] - https://stackoverflow.com/a/47892526/5769933 <br>
[4] - https://nuxtjs.org/docs/2.x/get-started/installation
