'use strict';

/**
 * @ngdoc function
 * @name ChangxingszAPP.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ChangxingszAPP
 */
angular.module('ChangxingszAPP')
  .controller('MainCtrl', [
  	'$scope',
  	'$rootScope',
  	'$controller',
  	'$route',
  	'$routeParams',
  	'$location',
    'MapService', function ($scope, $rootScope, $controller, $route, $routeParams, $location, MapService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    //BaseCtrl
    var BaseCtrl = $controller('BaseCtrl', {$rootScope: $rootScope, $scope: $scope});

    //BDMap对象
    $scope.BDMap = function (){
      var DefaultLat = 31.307776;
      var DefaultLng = 120.628489;

      //初始化地图对象
      $scope.BDMapObject = new BMap.Map("BDMap", {minZoom:12, maxZoom:20});
      //设置中心点和缩放级别
      $scope.BDMapObject.centerAndZoom(new BMap.Point(DefaultLng, DefaultLat), 15);

      //启用鼠标滚轮缩放
      $scope.BDMapObject.enableScrollWheelZoom(true);
      //加载缩放控件
      $scope.BDMapObject.addControl(new BMap.NavigationControl({anchor: BMAP_ANCHOR_BOTTOM_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL}));
    }

    //BDMap画线
    $scope.DrawLine = function ($roadline){
      var roadline = $roadline;

      var points = [];
      //遍历点
      for (var index in roadline.points) {
        var point = roadline.points[index];
        points.push(new BMap.Point(point.lng,point.lat));
      }

      var roadpolyline = new BMap.Polyline(points, {strokeColor:"blue", strokeWeight:5, strokeOpacity:0.75});
      //注册点击事件
      roadpolyline.addEventListener("click", roadpolylineCLick);
      $scope.BDMapObject.addOverlay(roadpolyline);

      //折线点击事件
      function roadpolylineCLick (e){
        var roadlineid = roadline.id;

        var p = e.target;
        if(p instanceof BMap.Polyline){
          console.log(p);
          alert(roadlineid);
        }
      }
    }

    //获取路段信息
    $scope.getRoadList = function (){
      var params = {};
      MapService.getRoadList(params);
      //监听事件 - getRoadList.success
      $scope.$on('getRoadList.success', function (event, d) {
        $scope.$roadlist = MapService.roadlist;
        for (var index in $scope.$roadlist.roadlist) {
          $scope.DrawLine($scope.$roadlist.roadlist[index]);
        }
      });
    }

    $scope.BDMap();
    $scope.getRoadList();
  }]);
