'use strict';

/**
 * @ngdoc overview
 * @name ChangxingszAPP
 * @description
 * # ChangxingszAPP
 *
 * Main module of the application.
 */
angular
  .module('ChangxingszAPP', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .factory('UserInterceptor', ["$q","$rootScope",function ($q, $rootScope) {
    return {
      request: function (config) {
        return config;
      },
      response: function (response) {
        return response;
      },
      requestError: function (rejection) {
        return $q.reject(rejection);
      },
      responseError: function (rejection) {
        return $q.reject(rejection);
      }
    }
  }])
  .config(function ($routeProvider, $httpProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });

    $httpProvider.interceptors.push('UserInterceptor');

    // $locationProvider.html5Mode(true);
  }).run(['$rootScope', '$window', '$location', '$log', function ($rootScope, $window, $location, $log) {
    //监听事件 - 路由切换开始
    $rootScope.$on('$routeChangeStart', function (){

    });
    //监听事件 - 路由切换成功
    $rootScope.$on('$routeChangeSuccess', function (){

    });
  }]);
