#Weathertime

Think "Hammer Time"!!

Weather time is a dash board that displays the date, time and current temperature.  
##Prerequisites
 * [Node](http://nodejs.org) is required to run **weathertime** locally.  
 * A [Dark Sky](https://darksky.net/dev/) API key is also required.
Their API returns JSON and the first 1,000 calls/day are FREE. Don't forget to
credit them with a "Powered by forcast.io" badge that links to
[Dark Sky](https://darksky.net/poweredby/).

##Install and Run
 * Clone this repo and navigate into it  
`git clone git@github.com:makenova/weathertime.git && cd weathertime`

 * Install dependencies  
`npm install`

 * Fill out config data
  * Open the config.js file
  * Enter your
    * Forecast.io API key
    * Your location latitude
    * Your location longitude

 * Run  
`npm start`
