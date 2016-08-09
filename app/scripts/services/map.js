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
      //API - getFavRoadList
      favroadlist: {},
      getFavRoadList: function (params, data) {
        var url = Api.host + Api.road.favroadlist.u;
        $http({
          method: Api.road.favroadlist.m,
          url: url,
          params: params,
          data: data
        }).success(function (data, status) {
          service.favroadlist = data;

          //广播事件 - getFavRoadList.success
          $rootScope.$broadcast('getFavRoadList.success');
        }).error(function (data, status) {
          service.roadlist = data;

          //广播事件 - apiRequest.failed
          $rootScope.$broadcast('apiRequest.failed');
        });
      },

      //API - getRoadList
      roadlist: {},
      getRoadList: function (params, data) {
        var url = Api.host + Api.road.roadlist.u;
        $http({
          method: Api.road.roadlist.m,
          url: url,
          params: params,
          data: data
        }).success(function (data, status) {
          service.roadlist = data;

          //广播事件 - getRoadList.success
          $rootScope.$broadcast('getRoadList.success');
        }).error(function (data, status) {
          service.roadlist = data;

          //广播事件 - apiRequest.failed
          $rootScope.$broadcast('apiRequest.failed');
        });
      }
    }
    return service;
  }]);
