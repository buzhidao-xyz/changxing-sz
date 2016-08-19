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

    $scope.BDMapObject;
    $scope.MapMarkers = [];

    $scope.markerindex;

    //地图route类型 1订阅路段 2全部路段
    $scope.MapRouteType = 1;

    //BDMap对象
    $scope.BDMap = function (){
      var DefaultLat = 31.307776;
      var DefaultLng = 120.628489;

      //初始化地图对象
      $scope.BDMapObject = new BMap.Map("BDMap", {minZoom:13, maxZoom:23});
      //设置中心点和缩放级别
      $scope.BDMapObject.centerAndZoom(new BMap.Point(DefaultLng, DefaultLat), 15);

      //启用鼠标滚轮缩放
      $scope.BDMapObject.enableScrollWheelZoom(true);
      //加载缩放控件
      $scope.BDMapObject.addControl(new BMap.NavigationControl({anchor: BMAP_ANCHOR_BOTTOM_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL}));

      // $scope.BDMapObject.disableDragging();
      // $scope.BDMapObject.disableDoubleClickZoom();

      $scope.BDMapObject.addEventListener("touchend", function (e){
        $(".searchbox").hide();
        $(".searchiconbox").show();
        $(".roadopbox").hide();
      });

      $scope.BDMapObject.addEventListener("zoomend", function (e){
        $scope.DrawMap();
      });
      $scope.BDMapObject.addEventListener("dragend", function (e){
        $scope.DrawMap();
      });
    }

    //BDMap画线
    $scope.DrawLine = function ($roadline){
      var roadline = $roadline;

      var points = [];
      //遍历点
      for (var index in roadline.points) {
        var point = roadline.points[index];
        points.push(new BMap.Point(point.x,point.y));
      }

      //路段颜色
      var color = "#3ABD2C";
      switch (roadline.description) {
        case "严重拥堵":
          color = "#B50008"
          break;
        case "基本拥堵":
        case "拥堵":
        case "拥挤":
          color = "#EC2C33"
          break;
        case "基本畅通":
        case "缓行":
          color = "#FA9D30"
          break;
        case "畅通":
          color = "#3ABD2C"
          break;
        default:
          break;
      }

      //画线
      var roadpolyline = new BMap.Polyline(points, {strokeColor:color, strokeWeight:3, strokeOpacity:0.75, enableClicking:true});

      //画点
      var myIcon = new BMap.Icon("images/icon_marker_green_s.png", new BMap.Size(15,20), {anchor:new BMap.Size(7.5, 20)});
      var markerindex = Math.round(points.length/2);
      var marker = new BMap.Marker(points[markerindex], {icon:myIcon});
      marker.addEventListener("click", roadpolylineClick);

      // $scope.BDMapObject.addOverlay(roadpolyline);
      // $scope.BDMapObject.addOverlay(marker);

      var markerindex = $scope.MapMarkers.length;
      var routemarker = {
        "marker": marker,
        "roadpolyline": roadpolyline
      };
      $scope.MapMarkers[markerindex] = routemarker;

      //折线点击事件
      function roadpolylineClick (e){
        $(".roadopbox").attr("route_id", roadline.route_id).attr("direction_name", roadline.direction_name).attr("markerindex", markerindex);
        $(".roadopbox").find("h3").text(roadline.route_id+"("+roadline.direction_name+")");

        $scope.subcribecheck(roadline.route_id, roadline.direction_name);
      }

      // $scope.MapMarkers.push({
      //   "marker": marker,
      //   "roadpolyline": roadpolyline
      // });
      
      return routemarker;
    }

    //画点和线
    $scope.DrawMap = function () {
      var zoom = $scope.BDMapObject.getZoom();
      var bounds = $scope.BDMapObject.getBounds();

      $scope.BDMapObject.clearOverlays();

      var n = 10, i = 0;
      if (zoom <= 13) n = 10;
      if (zoom==14 || zoom==15) n = 30;
      if (zoom==16) n = 50;
      if (zoom==17) n = 70;
      for (var index in $scope.MapMarkers) {
        var marker = $scope.MapMarkers[index]["marker"];
        var roadpolyline = $scope.MapMarkers[index]["roadpolyline"];

        // if (bounds.containsPoint(marker.getPosition())) {
          if (zoom >= 15) {
            $scope.BDMapObject.addOverlay(roadpolyline);
          }
        // }

        if ($scope.MapRouteType==2 && zoom<=17) {
          var step = Math.floor($scope.MapMarkers.length/n);
          if (index != i*step) continue;
          i++;
        }

        if (bounds.containsPoint(marker.getPosition())) {
          $scope.BDMapObject.addOverlay(marker);
        }
      }
    }

    //获取收藏的路段信息
    $scope.getRouteSubcribe = function (){
      var params = {};
      MapService.getRouteSubcribe(params);
    }
    //监听事件 - getRouteSubcribe.success
    $scope.$on('getRouteSubcribe.success', function (event, d) {
      $scope.$subcriberoutelist = $scope.apiResult(MapService.subcriberoutelist);

      $scope.MapMarkers = [];
      for (var index in $scope.$subcriberoutelist.routes) {
        $scope.DrawLine($scope.$subcriberoutelist.routes[index]);
      }
      
      $scope.MapRouteType = 1;
      $scope.DrawMap();
    });

    //获取所有路段信息
    $scope.getRouteAll = function (){
      var params = {};
      MapService.getRouteAll(params);
    }
    //监听事件 - getRouteAll.success
    $scope.$on('getRouteAll.success', function (event, d) {
      $scope.$routelist = $scope.apiResult(MapService.routelist);

      $scope.MapMarkers = [];
      for (var index in $scope.$routelist.routes) {
        $scope.DrawLine($scope.$routelist.routes[index]);
      }

      $scope.MapRouteType = 2;
      $scope.DrawMap();
    });

    //获取历史路况
    $scope.subcribecheck = function (route_id, direction_name){
      var params = {
        route_id: route_id,
        direction_name: direction_name
      };
      MapService.subcribecheck(params);
    }
    //监听事件 - subcribecheck.success
    $scope.$on('subcribecheck.success', function (event, d) {
      $scope.$apiResult = MapService.apiResult;

      if ($scope.$apiResult.error) {
        $scope.alertShow($scope.$apiResult.msg);
      } else {
        if ($scope.$apiResult.result) {
          $(".roadopbox").find("a.subcribe").hide();
          $(".roadopbox").find("a.unsubcribe").show();
        } else {
          $(".roadopbox").find("a.subcribe").show();
          $(".roadopbox").find("a.unsubcribe").hide();
        }

        $(".roadopbox").show();
      }
    });

    //搜索路段信息
    $scope.searchRoute = function (keyword){
      if (!keyword) return false;

      var params = {
        keyword: keyword
      };
      MapService.searchRoute(params);
    }
    //监听事件 - searchRoute.success
    $scope.$on('searchRoute.success', function (event, d) {
      $scope.$searchresult = $scope.apiResult(MapService.searchresult);

      $scope.$routeresultlist = $scope.$searchresult.routes;
    });

    //订阅路段
    $scope.subcribe = function (route_id, direction_name){
      var params = {
        route_id: route_id,
        direction_name: direction_name
      };
      MapService.subcribe(params);
    }
    //监听事件 - subcribe.success
    $scope.$on('subcribe.success', function (event, d) {
      $scope.$apiResult = $scope.apiResult(MapService.apiResult);
      if ($scope.$apiResult) $scope.alertShow("订阅成功！");
    });

    //取消订阅路段
    $scope.unsubcribe = function (route_id, direction_name){
      var params = {
        route_id: route_id,
        direction_name: direction_name
      };
      MapService.unsubcribe(params);
    }
    //监听事件 - unsubcribe.success
    $scope.$on('unsubcribe.success', function (event, d) {
      $scope.$apiResult = $scope.apiResult(MapService.apiResult);
      if ($scope.$apiResult) {
        $scope.alertShow("已取消订阅！");

        //移除路段marker
        var marker = $scope.MapMarkers[$scope.markerindex].marker;
        $scope.BDMapObject.removeOverlay(marker);
        //移除路段roadpolyline
        // var roadpolyline = $scope.MapMarkers[$scope.markerindex].roadpolyline;
        // $scope.BDMapObject.removeOverlay(roadpolyline);
      }
    });

    //查询是否收藏过某路段
    $scope.getEcharts = function (route_id, direction_name){
      var params = {
        route_id: route_id,
        direction_name: direction_name
      };
      MapService.getEcharts(params);
    }
    //监听事件 - getEcharts.success
    $scope.$on('getEcharts.success', function (event, d) {
      $scope.$echarts = MapService.echarts;

      if ($scope.$echarts.error) {
        $scope.alertShow($scope.$echarts.msg);
      } else {
        $scope.roadLineCharts($scope.$echarts.option);
        $(".roadchartsbox").css("visibility", "visible");
      }
    });

    //路段弹出层操作
    $scope.roadopbox = function (){
      var roadopbox = $(".roadopbox");

      //订阅路段
      roadopbox.find("a.subcribe").on("click", function (){
        var route_id = roadopbox.attr("route_id");
        var direction_name = roadopbox.attr("direction_name");
        
        $scope.subcribe(route_id, direction_name);

        roadopbox.find("a.closex").click();
      });
      
      //取消订阅
      roadopbox.find("a.unsubcribe").on("click", function (){
        var route_id = roadopbox.attr("route_id");
        var direction_name = roadopbox.attr("direction_name");
        
        $scope.unsubcribe(route_id, direction_name);
        $scope.markerindex = roadopbox.attr("markerindex");

        roadopbox.find("a.closex").click();
      });
      
      //历史路况
      roadopbox.find("a.history").on("click", function (){
        var route_id = roadopbox.attr("route_id");
        var direction_name = roadopbox.attr("direction_name");

        $scope.getEcharts(route_id, direction_name);
      });

      //关闭
      roadopbox.find("a.closex").on("click", function (){
        roadopbox.attr("route_id", "").attr("direction_name", "");
        roadopbox.find("h3").text(null);
        roadopbox.hide();
      });

      $(".roadchartsbox").find("img.closex").on("click", function (){
        $(".roadchartsbox").css("visibility", "hidden");
      });
    }

    //路段搜索事件
    $scope.searchForm = function (){
      $(".searchiconbox img.searchicon").on('click', function (){
        $(".searchiconbox").hide();
        $(".searchbox").show();
      });

      //搜索事件
      $(".searchbox a.search").on('click', function (){
        var roadkeyword = $("input[name=roadkeyword]").val();

        $scope.searchRoute(roadkeyword);
      });
    }
    //搜索结果路段点击事件
    $scope.searchRouteClick = function ($route){
      var routeMarker = $scope.DrawLine($route);

      $scope.BDMapObject.addOverlay(routeMarker.marker);
      $scope.BDMapObject.addOverlay(routeMarker.roadpolyline);

      //初始化地图对象
      $scope.BDMapObject.setZoom(19);
      $scope.BDMapObject.panTo(routeMarker.marker.getPosition());

      $(".searchbox").hide();
      $(".searchiconbox").show();
    }

    //路段图层切换
    $scope.roadLayer = function (){
      $(".roadiconbox .roadicon").on('click', function (){
        $(".roadiconbox").hide();
        $(".roadfaviconbox").show();

        $(".roadopbox").hide();

        $scope.getRouteAll();
      });
      $(".roadfaviconbox .roadfavicon").on('click', function (){
        $(".roadiconbox").show();
        $(".roadfaviconbox").hide();

        $(".roadopbox").hide();

        $scope.getRouteSubcribe();
      });
    }

    //生成折线图
    $scope.roadLineCharts = function (option){
      if (!option) return true;

      var roadChartsObject = echarts.init(document.getElementById('roadcharts'));

      roadChartsObject.setOption(option);
    }

    $scope.BDMap();
    $scope.getRouteSubcribe();

    $scope.searchForm();
    $scope.roadLayer();

    $scope.roadopbox();
  }]);
