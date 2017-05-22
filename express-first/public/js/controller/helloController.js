export default (app)=>{
	app.controller('helloController',['$scope',($scope)=>{
		//new random('jmz',21).random();
		console.log('f');
		$scope.name='jmz';
		$scope.age=24;
	}]);
}


// class helloController{
// 	constructor(){

// 	}
// 	say(){
// 		console.log('df');
// 	}
// }
// helloController.$inject = ['random'];
// export default (app)=>{
// 	app.controller('helloController',helloController);
// }