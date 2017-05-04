import '../css/index.css';


import angular from 'angular';
import angularUiRouter from 'angular-ui-router';

import '../views/index.html';
import router from './router/router.js';

import hello from './dircetive/hello.js';

import one from './utils/test.js';

import ngInfiniteScroll from 'ng-infinite-scroll';


//,[angularUiRouter,'ionic',ngInfiniteScroll
const app=angular.module('app',[angularUiRouter]);



hello(app);

router(app);    



