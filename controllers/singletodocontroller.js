todoApp.controller('showATodoController', ['$scope', '$log', '$http', '$routeParams', function($scope, $log, $http, $routeParams) {

	var params = $routeParams;

	var number = params.id;


	$http.get('/todos/'+number)
		.then(function(response){
			$scope.todo = response.data;
		})

}]);