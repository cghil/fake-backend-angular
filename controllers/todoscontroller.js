todoApp.controller('todosController', ['$scope', '$log', '$http', function($scope, $log, $http) {

	// $http.get('/todos')
	// 	.then(function(response){
	// 		$scope.todos = response;
	// 		$log.log('todos have been found')
	// 	}, function(response){
	// 		$log.log('unable to find todos, server error')
	// 	});

	$scope.newTodo = '';
	
	$http.get('/todos')
        .success(function(response){
            $scope.todos = response;
            console.log(response);
        })
        .error(function(data, status){
            console.log(data);
        });

    $scope.addATodo = function(){

    }

}]);