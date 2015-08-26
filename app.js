//MODULE
var todoApp = angular.module('todoApp', ['ngRoute', 'ngResource']);


//ROUTES
todoApp.config(function($routeProvider){

	$routeProvider

	.when('/', {
		templateUrl: 'pages/home.html',
		controller: 'homeController'
	})

	.when('/todos', {
		templateUrl: 'pages/todos.html',
		controller: 'todosController'
	})

});