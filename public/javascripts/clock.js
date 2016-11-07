;(function() {

	function setTime() {
		var dateTime = moment();

		dateElem.innerHTML = dateTime.format('dddd, MMMM Do YYYY');
		timeElem.innerHTML = dateTime.format('h:mmA');
		var fontSize = +$('body').css('font-size').slice(0,-2);
		if (isScrollable()) {
			$('body').css('font-size', fontSize - 0.1);
			// console.log('body size: ', $('body').css('font-size'));
			// console.log('isScrollable', 'document: ' + $(document).height(), 'window: ' + $(window).height());
		}
		var isStretchTime = (dateTime.hour() === 9 || dateTime.hour() === 16) && (dateTime.minute() < 10);
		if(isStretchTime)
			$('#time-row #action').show();
		else
			$('#time-row #action').hide();
	}

	function setWeather() {
		var query = '/get/forecast';
		var query = Boolean(location.search) ?
			query + location.search :
			query;
		console.log(query);

		$.get(query, function(data) {
			// console.log(data);

			var icon = '<span id="icon" style="color:'+ color(data.icon) +'">' +
									upCase(data.icon) + '</span>';
			var temp = data.temperature + ' &deg;F';
			var feels = 'Feels Like : ' + setFeelsLike(data.feelsLike) + ' &deg;F';
			weather.innerHTML = icon + " : " + temp + '<br/>' + feels;
		});
	}

	function upCase( string ){
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	function setFeelsLike( feelsLike ) {
    if ( feelsLike > 98 ) {
      return '<span style="color:rgb(255, 0, 61)">HELL</span>';
    }
    return feelsLike;
	}

	function color( icon ){
		var iconMatch = {
			"clear-day": "rgb(226, 226, 76)",
			"clear-night": "rgb(116, 59, 202)",
			"rain": "rgb(92, 148, 162)",
			"snow": "rgb(93, 164, 230)",
			"sleet": "rgb(28, 113, 192)",
			"wind": "rgb(150, 204, 255)",
			"fog": "rgb(87, 94, 109)",
			"cloudy": "rgb(77, 80, 71)",
			"partly-cloudy-day": "rgb(111, 114, 104)",
			"partly-cloudy-night": "rgb(63, 48, 62)",
			"hail": "rgb(235, 19, 62)",
			"thunderstorm": "rgb(235, 19, 62)",
			"tornado": "rgb(235, 19, 62)"
		};
		return iconMatch[ icon ];
	}

	function isScrollable() {
	  var docHeight = $(document).height();
	  var windowHeight = $(window).height();
	  return docHeight > windowHeight;
	}

	var timeElem = document.getElementById('time');
	var dateElem = document.getElementById('date');
	var weatherElem = document.getElementById('weather');

	// update time every 10 seconds
	setTime();
	setInterval(function() { setTime(); }, 1000);

	// update weather every 3 minutes
	setWeather();
	setInterval(function() { setWeather(); }, 3 * 60000);

}());
