import helloPage from '../../views/helloPage.html';
import aboutPage from '../../views/aboutPage.html';




export default (app) => {
    app.config(($stateProvider) => {
        $stateProvider
        .state({
            name: 'hello',
            url: '/hello',
            templateUrl:helloPage,
            controller:'helloController'
        })
        .state({
            name: 'about',
            url: '/about',
            templateUrl: aboutPage,
            controller:'one'
        });
    });
}
