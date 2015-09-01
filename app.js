//MODULE
var todoApp = angular.module('todoApp', ['ngRoute', 'ngResource', 'ngMockE2E']);


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

	.when('/todos/:id', {
		templateUrl: 'pages/singletodo.html',
		controller: 'showATodoController'
	})

});