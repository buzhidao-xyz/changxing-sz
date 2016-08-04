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
