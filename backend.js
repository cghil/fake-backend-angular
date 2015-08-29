todoApp.run(function($httpBackend){
	
	// var todos = [{description: 'Get milk', status: 'completed'}, {description: 'Write letter to mom', status: 'incomplete'}];

	// $httpBackend.whenGET('/todos').respond(todos);

	todos = [{id: 1, description: 'get milk', status: 'completed'}, {id: 2, description: 'laundry needs to be folded', status: 'incomplete'}, {id: 3, description: 'clean the kitchen', status: 'completed'}];

    //returns the current list of todos
    $httpBackend.whenGET('/todos').respond(todos);

    $httpBackend.whenPOST('/todos').respond(function(method, url, data){
    	var todo = angular.fromJson(data);
    	var id = todos.length + 1;
    	todo.id = id;
    	todos.unshift(todo);
    	return [200, todos];
    });

    $httpBackend.whenGET('pages/home.html').passThrough();
    $httpBackend.whenGET('pages/todos.html').passThrough();
    $httpBackend.whenGET('directives/todopanel.html').passThrough();

});