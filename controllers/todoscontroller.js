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

    	$http.post('/todos', {description: $scope.newTodo, status: "incomplete", date: date, showDelete: false })
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
    		$http.put('/todos/'+ id, { description: description, status: "incomplete" , id: id, date: date, showDelete: false})
    			.success(function(response){
    				$scope.todos = response;
    			});
    	} else {
    		$http.put('/todos/'+id, { description: description, status: "completed", id: id, date: date, showDelete: false })
    			.success(function(response){
    				$scope.todos = response;
    			});
    	}
    };

    $scope.hover = function(todo){

    	return todo.showDelete = ! todo.showDelete;

    };

    $scope.delete = function(todo){
    	
    	$http.delete('/todos/'+ todo.id).success(function(response){
    		$scope.todos = response;
    	});

    };

    $scope.numberOfActiveTodos = function(){

    	
    	var todos = $scope.todos;

    	if (todos !== undefined){

	    	function filterForActiveTodos(todos){

	    		var activeTodos = [];
	    		todos.forEach(function(todo){

	    			if (todo.status === "incomplete") {
	    				activeTodos.push(todo);
	    			}

	    		});
	    		return activeTodos;
	    	};

	    	var activeTodos = filterForActiveTodos(todos);

	    	return activeTodos.length;
    	} else {
    		return 0;
    	}

    };

    $scope.numberOfFinishedTodos = function(){
    	var todos = $scope.todos;

    	if (todos !== undefined) {
    		function filterForFinishedTodos(todos){

    			var finishedTodos = [];

    			todos.forEach(function(todo){

    				if (todo.status === "completed") {
    					finishedTodos.push(todo);
    				}
    			});

    			return finishedTodos;

    		}
    		var finishedTodos = filterForFinishedTodos(todos);

    		return finishedTodos.length;
    	} else {
    		return 0;
    	}
    };

    $scope.totalTodos = function(todos){
    	if (todos === undefined) {
    		return 0;
    	} else {
    		return todos.length
    	}
    };

}]);