todoApp.run(function($httpBackend){
	
	// var todos = [{description: 'Get milk', status: 'completed'}, {description: 'Write letter to mom', status: 'incomplete'}];

	// $httpBackend.whenGET('/todos').respond(todos);

	var todos = [{description: 'get milk', status: 'completed'}, {description: 'laundry needs to be folded', status: 'incomplete'}, {description: 'clean the kitchen', status: 'completed'}];

    //returns the current list of todos
    $httpBackend.whenGET('/todos').respond(todos);

    $httpBackend.whenGET('pages/home.html').passThrough();
    $httpBackend.whenGET('pages/todos.html').passThrough();
    $httpBackend.whenGET('directives/todopanel.html').passThrough();

});