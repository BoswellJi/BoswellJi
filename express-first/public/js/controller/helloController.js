export default (app)=>{
	app.controller('helloController',['$scope','random',($scope,random)=>{
		//new random('jmz',21).random();
		console.log('f');
		$scope.name='jmz';
		console.log(random);
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