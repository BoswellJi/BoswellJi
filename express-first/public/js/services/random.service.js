import angular from 'angular';


class random{
	constructor(name,age){
		this.name=name;
		this.age=age;
	}

	random(){
		console.log(this.name+this.age);
	}
}



export default angular.module('service.random',[]).service('random',random).name;