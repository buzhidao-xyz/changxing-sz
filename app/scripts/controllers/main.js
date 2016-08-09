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

      // $scope.BDMapObject.disableDragging();
      // $scope.BDMapObject.disableDoubleClickZoom();

      $scope.BDMapObject.addEventListener("touchstart", function (e){
        
      });
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

      //画线
      var roadpolyline = new BMap.Polyline(points, {strokeColor:"#FF0000", strokeWeight:3, strokeOpacity:0.75, enableClicking:true});
      $scope.BDMapObject.addOverlay(roadpolyline);

      //画点
      var myIcon = new BMap.Icon("images/icon_marker_green_s.png", new BMap.Size(23,32), {anchor:new BMap.Size(11.5, 32)});
      var markerindex = Math.round(points.length/2);
      var marker = new BMap.Marker(points[markerindex], {icon:myIcon});
      marker.addEventListener("click", roadpolylineClick);

      $scope.BDMapObject.addOverlay(marker);

      //折线点击事件
      function roadpolylineClick (e){
        $(".raodopbox").attr("roadid", roadline.id);
        $(".raodopbox").find("h3").text(roadline.title);

        $(".raodopbox").show();
      }
    }

    //路段弹出层操作
    $scope.roadopbox = function (){
      var roadopbox = $(".raodopbox");

      //收藏路段
      roadopbox.find("a.favadd").on("click", function (){
        alert("收藏路段");
      });
      
      //取消收藏
      roadopbox.find("a.favcancel").on("click", function (){
        alert("取消收藏");
      });
      
      //历史路况
      roadopbox.find("a.history").on("click", function (){
        $scope.roadLineCharts();
        $(".roadchartsbox").css("bottom", "0px");
      });

      //关闭
      roadopbox.find("a.closex").on("click", function (){
        roadopbox.attr("roadid", "");
        roadopbox.find("h3").text(null);
        roadopbox.hide();
      });

      $(".roadchartsbox").find("img.closex").on("click", function (){
        $(".roadchartsbox").css("bottom", "-270px");
      });
    }

    //获取收藏的路段信息
    $scope.getFavRoadList = function (){
      var params = {};
      MapService.getFavRoadList(params);
    }
    //监听事件 - getFavRoadList.success
    $scope.$on('getFavRoadList.success', function (event, d) {
      $scope.$favroadlist = MapService.favroadlist;
      for (var index in $scope.$favroadlist.roadlist) {
        $scope.DrawLine($scope.$favroadlist.roadlist[index]);
      }
    });

    //获取路段信息
    $scope.getRoadList = function (){
      var params = {};
      MapService.getRoadList(params);
    }
    //监听事件 - getRoadList.success
    $scope.$on('getRoadList.success', function (event, d) {
      $scope.$roadlist = MapService.roadlist;
      for (var index in $scope.$roadlist.roadlist) {
        $scope.DrawLine($scope.$roadlist.roadlist[index]);
      }
    });

    //路段搜索事件
    $scope.searchForm = function (){
      $(".searchiconbox img.searchicon").on('click', function (){
        $(".searchiconbox").hide();
        $(".searchbox").show();
      });
      $(".searchbox a.cancel").on('click', function (){
        $(".searchiconbox").show();
        $(".searchbox").hide();
      });
    }

    //路段图层切换
    $scope.roadLayer = function (){
      $(".roadiconbox .roadicon").on('click', function (){
        $(".roadiconbox").hide();
        $(".roadfaviconbox").show();

        $scope.BDMapObject.clearOverlays();
        $scope.getRoadList();
      });
      $(".roadfaviconbox .roadfavicon").on('click', function (){
        $(".roadiconbox").show();
        $(".roadfaviconbox").hide();

        $scope.BDMapObject.clearOverlays();
        $scope.getFavRoadList();
      });
    }

    //生成折线图
    $scope.roadLineCharts = function (){
      var roadChartsObject = echarts.init(document.getElementById('roadcharts'));

      var base = +new Date(1968, 9, 3);
      var oneDay = 24 * 3600 * 1000;
      var date = [];

      var data = [Math.random() * 300];

      for (var i = 1; i < 20000; i++) {
          var now = new Date(base += oneDay);
          date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
          data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
      }

      var option = {
          tooltip: {
              trigger: 'axis',
              position: function (pt) {
                  return [pt[0], '10%'];
              }
          },
          title: {
              left: 'center',
              text: '大数据量面积图',
          },
          legend: {
              top: 'bottom',
              data:['意向']
          },
          xAxis: {
              type: 'category',
              boundaryGap: false,
              data: date
          },
          yAxis: {
              type: 'value',
              boundaryGap: [0, '100%']
          },
          series: [
              {
                  name:'模拟数据',
                  type:'line',
                  smooth:true,
                  symbol: 'none',
                  sampling: 'average',
                  itemStyle: {
                      normal: {
                          color: 'rgb(255, 70, 131)'
                      }
                  },
                  areaStyle: {
                      normal: {
                          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                              offset: 0,
                              color: 'rgb(255, 158, 68)'
                          }, {
                              offset: 1,
                              color: 'rgb(255, 70, 131)'
                          }])
                      }
                  },
                  data: data
              }
          ]
      };

      roadChartsObject.setOption(option);
    }

    $scope.BDMap();
    $scope.getFavRoadList();

    $scope.searchForm();
    $scope.roadLayer();

    $scope.roadopbox();
  }]);
