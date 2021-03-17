$(document).ready(function() {

	const apiKey = "b66bfd4e4c54bb4542204ce009d07e13";

	function dayOfWeek() {
		let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
		let date = new Date();

		return days[date.getDay()];
	}

	function monthAndDate() {
		let date = new Date();
		let months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь','Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

		return months[date.getMonth()] + " " + date.getDate();
	}


	$('.weather-block__dayofweek').text(dayOfWeek());
	$('.weather-block__mounth').text(monthAndDate());   


	$('.select__button').click(function() {

		$('.select__button').removeClass('active');
		$(this).addClass('active');

		let city = $(this).text();

		$.ajax({
			url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&lang=ru&appid=' + apiKey,
			dataType: "json"
		}).done(function(json) {
			$('.weather-block__city').fadeOut(500, function() {$(this).text(json.name)}).fadeIn(300);
			$('.weather-block__temp').fadeOut(500, function() {$(this).text((json.main.temp - 273.15).toFixed() + "°")}).fadeIn(300);
			$('.weather-block__feels').fadeOut(500, function() {$(this).text("ощущается как: " + (json.main.feels_like - 273.15).toFixed() + "°")}).fadeIn(300);
			$('.weather-block__description').fadeOut(500, function() {$(this).text(json.weather[0].description)}).fadeIn(300);


		});

		window.scrollTo({top: 0, behavior: 'smooth' });


	});


});