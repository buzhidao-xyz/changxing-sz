'use strict';

/**
 * @ngdoc function
 * @name ChangxingszAPP.controller:MapService
 * @description
 * # MapService
 * Controller of the ChangxingszAPP
 */
angular.module('ChangxingszAPP')
  .service('MapService', ['$rootScope', '$http', function ($rootScope, $http) {
    var service = {
      apiResult: {},

      //API - getRouteSubcribe
      subcriberoutelist: {},
      getRouteSubcribe: function (params, data) {
        var url = Api.host + Api.route.subcribe.u;
        $http({
          method: Api.route.subcribe.m,
          url: url,
          params: params,
          data: data
        }).success(function (data, status) {
          service.subcriberoutelist = data;

          //广播事件 - getRouteSubcribe.success
          $rootScope.$broadcast('getRouteSubcribe.success');
        }).error(function (data, status) {
          service.subcriberoutelist = data;

          //广播事件 - apiRequest.failed
          $rootScope.$broadcast('apiRequest.failed');
        });
      },

      //API - getRouteAll
      routelist: {},
      getRouteAll: function (params, data) {
        var url = Api.host + Api.route.all.u;
        $http({
          method: Api.route.all.m,
          url: url,
          params: params,
          data: data
        }).success(function (data, status) {
          service.routelist = data;

          //广播事件 - getRouteAll.success
          $rootScope.$broadcast('getRouteAll.success');
        }).error(function (data, status) {
          service.routelist = data;

          //广播事件 - apiRequest.failed
          $rootScope.$broadcast('apiRequest.failed');
        });
      },

      //API - subcribecheck
      subcribecheck: function (params, data) {
        var url = Api.host + Api.route.subcribecheck.u;
        $http({
          method: Api.route.subcribecheck.m,
          url: url,
          params: params,
          data: data
        }).success(function (data, status) {
          service.apiResult = data;

          //广播事件 - subcribecheck.success
          $rootScope.$broadcast('subcribecheck.success');
        }).error(function (data, status) {
          service.apiResult = data;

          //广播事件 - apiRequest.failed
          $rootScope.$broadcast('apiRequest.failed');
        });
      },

      //API - searchRoute
      searchresult: {},
      searchRoute: function (params, data) {
        var url = Api.host + Api.route.all.u;
        $http({
          method: Api.route.all.m,
          url: url,
          params: params,
          data: data
        }).success(function (data, status) {
          service.searchresult = data;

          //广播事件 - searchRoute.success
          $rootScope.$broadcast('searchRoute.success');
        }).error(function (data, status) {
          service.searchresult = data;

          //广播事件 - apiRequest.failed
          $rootScope.$broadcast('apiRequest.failed');
        });
      },

      //API - subcribe
      subcribe: function (params, data) {
        var url = Api.host + Api.subcribe.u;
        $http({
          method: Api.subcribe.m,
          url: url,
          params: params,
          data: data
        }).success(function (data, status) {
          service.apiResult = data;

          //广播事件 - subcribe.success
          $rootScope.$broadcast('subcribe.success');
        }).error(function (data, status) {
          service.apiResult = data;

          //广播事件 - apiRequest.failed
          $rootScope.$broadcast('apiRequest.failed');
        });
      },

      //API - unsubcribe
      unsubcribe: function (params, data) {
        var url = Api.host + Api.unsubcribe.u;
        $http({
          method: Api.unsubcribe.m,
          url: url,
          params: params,
          data: data
        }).success(function (data, status) {
          service.apiResult = data;

          //广播事件 - unsubcribe.success
          $rootScope.$broadcast('unsubcribe.success');
        }).error(function (data, status) {
          service.apiResult = data;

          //广播事件 - apiRequest.failed
          $rootScope.$broadcast('apiRequest.failed');
        });
      },

      //API - getEcharts
      echarts: {},
      getEcharts: function (params, data) {
        var url = Api.host + Api.route.echars.u;
        $http({
          method: Api.route.echars.m,
          url: url,
          params: params,
          data: data
        }).success(function (data, status) {
          service.echarts = data;

          //广播事件 - getEcharts.success
          $rootScope.$broadcast('getEcharts.success');
        }).error(function (data, status) {
          service.echarts = data;

          //广播事件 - apiRequest.failed
          $rootScope.$broadcast('apiRequest.failed');
        });
      },

      //API - getProfile
      uprofile: {},
      getProfile: function (params, data) {
        var url = Api.host + Api.user.uinfo.u;
        $http({
          method: Api.user.uinfo.m,
          url: url,
          params: params,
          data: data
        }).success(function (data, status) {
          service.uprofile = data;

          //广播事件 - getProfile.success
          $rootScope.$broadcast('getProfile.success');
        }).error(function (data, status) {
          service.uprofile = data;

          //广播事件 - apiRequest.failed
          $rootScope.$broadcast('apiRequest.failed');
        });
      },

      //API - ProfileSave
      ProfileSave: function (params, data) {
        var url = Api.host + Api.user.completeinfo.u;
        $http({
          method: Api.user.completeinfo.m,
          url: url,
          params: params,
          data: data
        }).success(function (data, status) {
          service.apiResult = data;

          //广播事件 - ProfileSave.success
          $rootScope.$broadcast('ProfileSave.success');
        }).error(function (data, status) {
          service.apiResult = data;

          //广播事件 - apiRequest.failed
          $rootScope.$broadcast('apiRequest.failed');
        });
      },

      //API - freeindex
      FreeIndex: function (params, data) {
        var url = Api.host + Api.free.mindex.u;
        $http({
          method: Api.free.mindex.m,
          url: url,
          params: params,
          data: data
        }).success(function (data, status) {
          service.apiResult = data;

          //广播事件 - FreeIndex.success
          $rootScope.$broadcast('FreeIndex.success');
        }).error(function (data, status) {
          service.apiResult = data;

          //广播事件 - apiRequest.failed
          $rootScope.$broadcast('apiRequest.failed');
        });
      }
    }
    return service;
  }]);
