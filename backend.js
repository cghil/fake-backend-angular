todoApp.run(function($httpBackend){
	
	// var todos = [{description: 'Get milk', status: 'completed'}, {description: 'Write letter to mom', status: 'incomplete'}];

	// $httpBackend.whenGET('/todos').respond(todos);

	var todos = [{id: 1, description: 'get milk', status: 'completed', date: '7/30/2015'}, {id: 2, description: 'laundry needs to be folded', status: 'incomplete', date: '7/30/2015'}, {id: 3, description: 'clean the kitchen', status: 'completed', date: '7/30/2015'}];

    //returns the current list of todos
    $httpBackend.whenGET('/todos').respond(todos);

    $httpBackend.whenPOST('/todos').respond(function(method, url, data){
    	var todo = angular.fromJson(data);
    	var id = todos.length + 1;
    	todo.id = id;
    	todos.unshift(todo);
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

    	return [200, todos]
    });

    $httpBackend.whenGET('pages/home.html').passThrough();
    $httpBackend.whenGET('pages/todos.html').passThrough();
    $httpBackend.whenGET('pages/singletodo.html').passThrough();
    $httpBackend.whenGET('directives/todopanel.html').passThrough();

});