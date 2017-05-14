import '../css/index.css';


import angular from 'angular';
import angularUiRouter from 'angular-ui-router';

import '../views/index.html';
import router from './router/router.js';

import hello from './dircetive/hello.js';

import one from './utils/test.js';

import ngInfiniteScroll from 'ng-infinite-scroll';

// services
import randoms from './services/random.service.js';

<<<<<<< HEAD
=======
const app=angular.module('app',[angularUiRouter]);
>>>>>>> 23e40de081c09ab018f692afa1c0468b22ca2abd

console.log(randoms);

// controller

// controller
import oneController from './controller/oneController.js';

<<<<<<< HEAD

const app=angular.module('app',[angularUiRouter,randoms.name]);
 
 import helloController from './controller/helloController.js';
helloController(app);

=======
const app=angular.module('app',[angularUiRouter,ngInfiniteScroll]);

oneController(app);

>>>>>>> 23e40de081c09ab018f692afa1c0468b22ca2abd
hello(app);
  
router(app);    



