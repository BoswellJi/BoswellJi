import '../css/index.css';

import angular from 'angular';
import angularUiRouter from 'angular-ui-router';

import '../views/index.html';
import router from './router/router.js';

import hello from './dircetive/hello.js';

import one from './utils/test.js';

const app=angular.module('app',[angularUiRouter]);

console.log(one);

hello(app);

router(app);


