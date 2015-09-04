todoApp.controller('showATodoController', ['$scope', '$log', '$http', '$routeParams', function($scope, $log, $http, $routeParams) {

	var params = $routeParams;

	var number = params.id;

	$http.get('/todos/'+number)
		.then(function(response){
			$scope.todo = response.data;
		});

	$scope.submitEdit = function(){
		console.log('I am the number... ' + number)
		$http.put('/todos/'+number, { description: $scope.todo.description, status: $scope.todo.status, date: $scope.todo.date, id: number })
			.success(function(reply){

				var message = "Todo got updated!";

			});
		$scope.isFormShowing = false;
	}

	$scope.isFormShowing = false;

	$scope.showEditForm = function(){
		var toggle = $scope.isFormShowing;
		$scope.isFormShowing = !toggle;
	};

}]);