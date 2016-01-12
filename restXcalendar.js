
//Se invoca el calendario sobre un id
$(document).ready(function () {
	$('#calendarRest').eCalendarRest();
});

// plugin for each calendar //for example Kanalu Rest. 
	$.fn.eCalendarRest.defaults = {
		weekDays: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
		months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
		textArrows: {previous: '<', next: '>'},
		eventTitle: 'Actividades del mes',
		url: '',
		
		//Creacion de Eventos
		events: [
			//Evento 1
			{
				/*Recurso de la Imagen*/
				imgSrc: '../img/restaurants/restX/actividades/activityNull.jpg',

				//Titulo... o Nombre del Restaurante
				title: 'Apertura de nueva sucursal',

				//Nombre del Restaurante... o Titulo
				description: 'Detalles de la Actividad',
				
				//Descripción o Condiciones
				//Máximo 110 caracteres
				conditions: 'Condiciones para la actividad. Condiciones para la actividad. Condiciones para la actividad. Condiciones para.',

				//Fecha del evento en formato: 
					//Año, Mes de 0 a 11, Día, Hora, Minutos
				datetime: new Date(2016, 0, 31, 12, 30),

				//Indicar si es am/pm
				fechaAc: 'pm',
			}, 
			
			//Evento 2	
			{
				imgSrc: '../img/restaurants/restX/actividades/activityNull.jpg',
				title: 'Costa Rica vrs México', 
				description: 'Segundo juego de la selección de Costa Rica', 
				datetime: new Date(2016, 0, 17, 1),
				fechaAc: 'pm',
			},

			//Evento 3
			{
				imgSrc: '../img/restaurants/restX/actividades/activityNull.jpg',
				title: 'Costa Rica vrs Camerún', 
				description: 'Tercer juego de la selección de Costa Rica', 
				datetime: new Date(2016, 0, 23, 3),
				fechaAc: 'pm',
			},

			//Evento 4
			{
				imgSrc: '../img/restaurants/restX/actividades/activityNull.jpg',
				title: 'Costa Rica vrs Argentina', 
				description: 'Cuarto y ultimo juego de la selección de Costa Rica :-(', 
				datetime: new Date(2016, 0, 23, 3),
				fechaAc: 'pm',
			},
		]
	};

