
"use strict";
var app = angular.module('SPACE', ['angular-storage']);
app.config(['storeProvider', function (storeProvider) {
	storeProvider.setStore('sessionStorage');
}]);
app.controller('adminspacecontroller', function ($scope, $http, $window, $location) {

/*****************************************************************************************************
 * insert updated data into database
 */	
	$scope.submit = function (req, res) {
		$scope.data = {}
		console.log($scope.x.SpaceId);
		console.log($scope.x.SpaceName);
		console.log($scope.x.SpaceDescription);
		console.log($scope.x.SpaceSize);
		console.log($scope.x.Pax);
		console.log($scope.x.SpacePricing);
		console.log($scope.x.SpaceAmenities);
		console.log($scope.x.Img);

		$scope.data.SpaceId = $scope.x.SpaceId;
		$scope.data.SpaceName = $scope.x.SpaceName;
		$scope.data.SpaceDescription = $scope.x.SpaceDescription;
		$scope.data.SpaceSize = $scope.x.SpaceSize;
		$scope.data.Pax = $scope.x.Pax;
		$scope.data.SpacePricing = $scope.x.SpacePricing;
		$scope.data.SpaceAmenities = $scope.x.SpaceAmenities;
		$scope.data.Img = $scope.x.Img;

		//console.log($scope.data.SpaceAmenities);
		//console.log(id);

		$http.post(baseurl + 'space/updatespace/' + $scope.data.SpaceId, $scope.data).success(function (res) {
			$scope.res = res;
			if (res.status == 'false') {
				alert(res.message);
			} else {
				alert("success");
			}
		}).error(function () {
			alert("Please check your internet connection or data source..");
		});
	}

/*****************************************************************************************************
 * get space id from url and display as pre-loaded data form
 */
	$scope.getID = function(){

		var stringUrl = $location.absUrl();
		var EqualPos = stringUrl.indexOf("=");
		var id = stringUrl.substring(EqualPos + 1);
		
		$http.get(baseurl + 'space/spacedetail/' + id).success(function (res) {

			if (res.status == 'false') {
				alert(res.message);
			} else {

				$scope.detail = res;
				console.log(res);
			}
		}).error(function () {
			console.log("error");
		})
	}

/*****************************************************************************************************
 * insert space into database through AddSpace.html
 */
	$scope.insertspace = function (req, res) {
		$scope.data = {}

		$scope.data.SpaceName = $scope.SpaceName;
		$scope.data.SpaceDescription = $scope.SpaceDescription;
		$scope.data.SpaceSize = $scope.SpaceSize;
		$scope.data.Pax = $scope.Pax;
		$scope.data.SpacePricing = $scope.SpacePricing;
		$scope.data.SpaceAmenities = $scope.SpaceAmenities;
		$scope.data.Img = $scope.Img;

		$http.post(baseurl + 'space', $scope.data).success(function (res) {
			$scope.res = res;

			if (res.status == 'false') {
				alert(res.message);
			} else {
				alert("success");
			}
		}).error(function () {
			alert("Please check your internet connection or data source..");
		});
	}
	
/*****************************************************************************************************
 * Delete space from database
 */
	$scope.del = function (id, res) {
		var tags = $http.get(baseurl + 'space/deletespace/' + id).success(function (res) {
			console.log(id);
			$scope.res = res;
			if (res.status == false) {
				alert(res.message);
			} else {
				console.log(res);
			}

		}).error(function () {
			alert("Please check your internet connection or data source..");
		})
		return tags;
	}

/*****************************************************************************************************
 * default init function
 */
	$scope.init = function () {
		console.log(baseurl);
		console.log("init function inside");
		$scope.detail = {};
		$http.get(baseurl + 'space').success(function (res) {
			if (res.status == 'false') {
			} else {

				$scope.space_des = res;

			}
		}).error(function () {
			console.log("error");
		})
	}


	var baseurl = "http://localhost:5000/api/";
});
