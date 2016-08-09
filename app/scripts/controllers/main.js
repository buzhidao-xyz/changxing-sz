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

      var marker = new BMap.Marker(new BMap.Point(DefaultLng, DefaultLat));
      marker.addEventListener("click", function (){
        alert(5);
      });
      $scope.BDMapObject.addOverlay(marker);

      // $scope.BDMapObject.disableDragging();
      $scope.BDMapObject.disableDoubleClickZoom();

      $scope.BDMapObject.addEventListener("touchstart", function (e){
        var p = e.target;
        console.log(e);
        e.domEvent.srcElement.click();
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

      var roadpolyline = new BMap.Polyline(points, {strokeColor:"#FF0000", strokeWeight:5, strokeOpacity:0.75, enableClicking:true});
      //注册点击事件
      roadpolyline.addEventListener("click", roadpolylineClick);
      $scope.BDMapObject.addOverlay(roadpolyline);

      //折线点击事件
      function roadpolylineClick (e){
        var roadlineid = roadline.id;

        console.log(1);
        alert(roadlineid);
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
      });
      $(".roadfaviconbox .roadfavicon").on('click', function (){
        $(".roadiconbox").show();
        $(".roadfaviconbox").hide();
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
          toolbox: {
              feature: {
                  dataZoom: {
                      yAxisIndex: 'none'
                  },
                  restore: {},
                  saveAsImage: {}
              }
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
          dataZoom: [{
              type: 'inside',
              start: 0,
              end: 10
          }, {
              start: 0,
              end: 10,
              handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
              handleSize: '80%',
              handleStyle: {
                  color: '#fff',
                  shadowBlur: 3,
                  shadowColor: 'rgba(0, 0, 0, 0.6)',
                  shadowOffsetX: 2,
                  shadowOffsetY: 2
              }
          }],
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
    $scope.getRoadList();

    $scope.searchForm();
    $scope.roadLayer();

    $scope.roadLineCharts();
  }]);
