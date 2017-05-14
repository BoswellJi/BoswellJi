import hello from './hello.html';
import './hello.css';

export default (app)=>{
	app.directive('hello',()=>{
		return {
			restrict:'E',
			templateUrl:hello
		}
	});
}