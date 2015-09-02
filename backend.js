todoApp.run(function($httpBackend){

    function todosInStorage(){
    	if (localStorage.getItem('todos') === null) {
    		var todos = [];
    	} else {
	        var todos = JSON.parse(localStorage['todos']);
	        var todos = todos;
    	}
    	return todos;
    };

    function setTodosInStorage(todos){
        localStorage.setItem("todos", JSON.stringify(todos));
    };

    var todos = todosInStorage();

    //returns the current list of todos
    $httpBackend.whenGET('/todos').respond(todos);

    $httpBackend.whenPOST('/todos').respond(function(method, url, data){
    	var todo = angular.fromJson(data);
    	var id = todos.length + 1;
    	todo.id = id;
    	todos.unshift(todo);
        setTodosInStorage(todos);
    	return [200, todos];
    });

    $httpBackend.whenGET(/^\/todos\/\d+$/).respond(function(method, url, headers){
    	// console.log(url);
    	var regexp = /(\d+)/
    	var found = url.match(regexp);
    	var number = found[0];
    	var todo = '';
    	for (var i = 0; i < todos.length; i++){
    		if (todos[i].id == number) {
    			var todo = todos[i];
    			break;
    		}
    	}
    	return [200, todo];
    });

    $httpBackend.whenPUT(/^\/todos\/\d+$/).respond(function(method, url, data){
    	var regexp =  /(\d+)/;
    	var found = url.match(regexp);
    	var number = found[0]
    	var data = angular.fromJson(data);
    	for (var i = 0; i < todos.length; i++){
    		if (todos[i].id == number) {
    			todos[i] = data;
    			break;
    		}
    	}
        setTodosInStorage(todos);
    	return [200, todos]
    });

    $httpBackend.whenDELETE(/^\/todos\/\d+$/).respond(function(method, url, data){
    	var regexp =  /(\d+)/;
    	var found = url.match(regexp);
    	var number = found[0];
    	console.log(number);
    	for (var i = 0; i < todos.length; i++){
    		console.log(todos[i].id)
    		if (todos[i].id == number) {
    			todos.splice(i, 1)
    			break;
    		}
    	}
        setTodosInStorage(todos);
    	return [200, todos]
    })

    $httpBackend.whenGET(/^pages\/.*/).passThrough();
    $httpBackend.whenGET('directives/todopanel.html').passThrough();

});