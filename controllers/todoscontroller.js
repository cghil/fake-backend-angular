todoApp.controller('todosController', ['$scope', '$log', '$http', function($scope, $log, $http) {

	$scope.newTodo = '';

	// $scope.$watch('newTodo', function(){
	// 	$log.info($scope.newTodo);
	// })
	
	$http.get('/todos')
        .success(function(response){
            $scope.todos = response;
        })
        .error(function(data, status){
            console.log(data);
        });

    $scope.addATodo = function(){
    	
    	var date = new Date();
    	var day = date.getDate();
    	var month = date.getMonth();
    	var year = date.getFullYear();

    	var date = month + "/" + day + "/" + year;

    	$http.post('/todos', {description: $scope.newTodo, status: "incomplete", date: date })
    		.success(function(response){
    			
    			$scope.todos = response;
    			$scope.newTodo = '';

    		}).error(function(data, status){

    			console.log(data);

    		})

    }

}]);