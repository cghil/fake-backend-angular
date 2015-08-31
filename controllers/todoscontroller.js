todoApp.controller('todosController', ['$scope', '$log', '$http', '$routeParams', function($scope, $log, $http, $routeParams) {

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

    		});

    };

    $scope.isComplete = function(status){

    	if (status === "completed") {
    		return true;
    	} else {
    		return false;
    	}
    };

    $scope.changeStatus = function(status, id, description, date){

    	if (status === "completed") {
    		$http.put('/todos/'+ id, { description: description, status: "incomplete" , id: id, date: date})
    			.success(function(response){
    				$scope.todos = response;
    			});
    	} else {
    		$http.put('/todos/'+id, { description: description, status: "completed", id: id, date: date })
    			.success(function(response){
    				$scope.todos = response;
    			});
    	}
    };

}]);