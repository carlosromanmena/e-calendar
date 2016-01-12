/**
 * @license e-Calendar v0.9.2
 * (c) 2014-2016 - Jhonis de Souza
 * License: GNU
 */

(function ($) {

	var eCalendarRest = function (options, object) {
		// Initializing global variables
		var adDay = new Date().getDate();
		var adMonth = new Date().getMonth();
		var adYear = new Date().getFullYear();
		var dDay = adDay;
		var dMonth = adMonth;
		var dYear = adYear;
		var instance = object;

		var settings = $.extend({}, $.fn.eCalendarRest.defaults, options);

		function lpad(value, length, pad) {
			if (typeof pad == 'undefined') {
				pad = '0';
			}
			var p;
			for (var i = 0; i < length; i++) {
				p += pad;
			}
			return (p + value).slice(-length);
		}

		var mouseOver = function () {
			$(this).addClass('c-nav-btn-over');
		};
		var mouseLeave = function () {
			$(this).removeClass('c-nav-btn-over');
		};

		var mouseOverEvent = function () {
			$(this).addClass('c-event-over');
			var d = $(this).attr('data-event-day');
			$('div.c-event-item[data-event-day="' + d + '"]').addClass('c-eve-day-over');
		};
		var mouseLeaveEvent = function () {
			$(this).removeClass('c-event-over')
			var d = $(this).attr('data-event-day');
			$('div.c-event-item[data-event-day="' + d + '"]').removeClass('c-eve-day-over');
		};
		var mouseClickDayEv = function () {
			//Animacion: mover scroll hasta el evento
			var d = $(this).attr('data-event-day');
			$('html, body').animate({
				scrollTop: $('div.c-event-item[data-event-day="' + d + '"]').offset().top
			}, 1000);
		};

		var mouseOverItem = function () {
			$(this).addClass('c-eve-day-over');
			var d = $(this).attr('data-event-day');
			$('div.c-event[data-event-day="' + d + '"]').addClass('c-event-over');
		};
		var mouseLeaveItem = function () {
			$(this).removeClass('c-eve-day-over')
			var d = $(this).attr('data-event-day');
			$('div.c-event[data-event-day="' + d + '"]').removeClass('c-event-over');
		};
		var mouseClickEvIt = function () {
			//Animacion: mover scroll hasta el evento
			var d = $(this).attr('data-event-day');
			$('html, body').animate({
				scrollTop: $('.calendar').offset().top
			}, 1000);
		};

		var nextMonth = function () {
			if (dMonth < 11) {
				dMonth++;
			} else {
				dMonth = 0;
				dYear++;
			}
			print();
		};
		var previousMonth = function () {
			if (dMonth > 0) {
				dMonth--;
			} else {
				dMonth = 11;
				dYear--;
			}
			print();
		};

		function loadEvents() {
			if (typeof settings.url != 'undefined' && settings.url != '') {
				$.ajax({url: settings.url,
					async: false,
					success: function (result) {
						settings.events = result;
					}
				});
			}
		}

		function print() {
			loadEvents();
			var dWeekDayOfMonthStart = new Date(dYear, dMonth, 1).getDay();
			var dLastDayOfMonth = new Date(dYear, dMonth + 1, 0).getDate();
			var dLastDayOfPreviousMonth = new Date(dYear, dMonth + 1, 0).getDate() - dWeekDayOfMonthStart + 1;

			var cBody = $('<div/>').addClass('c-grid trans5sEase');
			var cEvents = $('<div/>').addClass('c-event-grid');
			var cEventsBody = $('<div/>').addClass('c-event-body');
			var cEventsTitle = $('<div/>').addClass('c-event-title c-pad-top changeEvTitle');
			//var cEventTitleDate = $('<b/>').addClass('c-event-titleDate');
			cEvents.append(cEventsTitle.html(settings.eventTitle));
			//cEventsTitle.append(cEventTitleDate);
			cEvents.append(cEventsBody);
			
			var cNext = $('<div/>').addClass('c-next c-grid-title c-pad-top');
			var cMonth = $('<div/>').addClass('c-month c-grid-title c-pad-top');
			var cPrevious = $('<div/>').addClass('c-previous c-grid-title c-pad-top');
			//cPrevious.html(settings.textArrows.previous);
			cMonth.html(settings.months[dMonth] + ' ' + dYear);
			//cNext.html(settings.textArrows.next);

			cPrevious.on('mouseover', mouseOver).on('mouseleave', mouseLeave).on('click', previousMonth);
			cNext.on('mouseover', mouseOver).on('mouseleave', mouseLeave).on('click', nextMonth);

			cBody.append(cPrevious);
			cBody.append(cMonth);
			cBody.append(cNext);
			for (var i = 0; i < settings.weekDays.length; i++) {
				var cWeekDay = $('<div/>').addClass('c-week-day c-pad-top');
				cWeekDay.html(settings.weekDays[i]);
				cBody.append(cWeekDay);
			}
			var day = 1;
			var dayOfNextMonth = 1;
			for (var i = 0; i < 42; i++) {
				var cDay = $('<div/>');
				if (i < dWeekDayOfMonthStart) {
					cDay.addClass('c-day-previous-month c-pad-top');
					cDay.html(dLastDayOfPreviousMonth++);
				} else if (day <= dLastDayOfMonth) {
					cDay.addClass('c-day c-pad-top');
					if (day == dDay && adMonth == dMonth && adYear == dYear) {
						cDay.addClass('c-today');
					}
					for (var j = 0; j < settings.events.length; j++) {
						var d = settings.events[j].datetime;
						//if (d.getDate() == day && (d.getMonth() - 1) == dMonth && d.getFullYear() == dYear) {
						  if (d.getDate() == day && d.getMonth() == dMonth && d.getFullYear() == dYear) {
							cDay.addClass('c-event').attr('data-event-day', d.getDate());
							cDay.on('mouseover', mouseOverEvent).on('mouseleave', mouseLeaveEvent).on('click', mouseClickDayEv);
						}
					}
					cDay.html(day++);
				} else {
					cDay.addClass('c-day-next-month c-pad-top');
					cDay.html(dayOfNextMonth++);
				}
				cBody.append(cDay);
			}
			var eventList = $('<div/>').addClass('c-event-list');
			
			for (var i = 0; i < settings.events.length; i++) {
				var d = settings.events[i].datetime;
				//if ((d.getMonth() - 1) == dMonth && d.getFullYear() == dYear) {
				  if (d.getMonth() == dMonth && d.getFullYear() == dYear) {
					//var date = 'Fecha: ' + lpad(d.getDate(), 2) + '/' + lpad(d.getMonth(), 2) + '/' + lpad(d.getFullYear(), 4) + ' a las ' + lpad(d.getHours(), 2) + ':' + lpad(d.getMinutes(), 2);
                      var date = 'Fecha: ' + lpad(d.getDate(), 2) + '/' + lpad(d.getMonth() + 1, 2) + '/' + lpad(d.getHours(), 2) + ' a las ' + lpad(d.getMinutes(), 2);
					var item = $('<div/>').addClass('c-event-item');
					
					//cEvents.append($('<div/>').addClass('c-event-title c-pad-top').html(settings.eventTitle));
					
					/*Creo el recurso de la imagen*/
					var imgSrc = settings.events[i].imgSrc;

					/*Creo la Imagen*/
					var image = $('<img/>', {
						/*Recurso de la imagen*/
						'name' : 'img' + i,
						'src' : imgSrc,
						/*Clase css de la imagen*/
						'class' : 'c-event-image ' + 'calPhoto',
					}).html(settings.events[i]);

					
					/*Titulo de la Actividad*/
					var title = $('<h3/>').addClass('title').html(settings.events[i].title);
					
					/*Descripcion*/
					var description = $('<h4/>').addClass('description').html(settings.events[i].description);

					/*Fecha*/
					var fechaAc = $('<p/>').addClass('dateAc').html(date + '  ' + settings.events[i].fechaAc);

					/*Condiciones*/
					var conditions = $('<p/>').addClass('conditions').html(settings.events[i].conditions);
					
					item.attr('data-event-day', d.getDate());
					item.on('mouseover', mouseOverItem).on('mouseleave', mouseLeaveItem).on('click', mouseClickEvIt);
					
					//Se ordenan y ubican las etiquetas html 
					item.append(image).append(title).append(description).append(conditions).append(fechaAc);
					eventList.append(item);
				}
			}
			$(instance).addClass('calendar');
			cEventsBody.append(eventList);
			$(instance).html(cBody).append(cEvents);
		}

		return print();
	}

	$.fn.eCalendarRest = function (oInit) {
		return this.each(function () {
			return eCalendarRest(oInit, $(this));
		});
	};



}(jQuery));
