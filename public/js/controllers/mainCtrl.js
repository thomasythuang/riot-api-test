// js/controllers/mainCtrl.js

var app = angular.module('mainController', []);

app.controller('mainController', function($scope, $http, Summoner, Static){
	// Default region = NA (NA > EU 5ever amirite)
	$scope.region="na";

	// Init function
	$scope.onLoad = function(){
		// Load current patch number
		Static.getPatch($scope.region)
			.success(function(data){
				$scope.patch = data[0];
			})
			.error(function(data, status, headers, config){
				console.log(status);
			});

		// Load all champions
		Static.getChamps($scope.region)
			.success(function(data){
				$scope.allChamps = data.data;
				console.log($scope.allChamps);
			})
			.error(function(data, status, headers, config){
				console.log(status);
			});
	};

	$scope.onLoad();
	/*
	// Change region on selection
	$scope.$watch('region', function(){
		$scope.getPatch();
	}); */

	// Get basic info for a summoner
	$scope.search = function(name){
		$scope.start();
		Summoner.getBasicInfo($scope.region, name)
			.success(function(data){
				$scope.processData(data);
				//$scope.end();
			})
			.error(function(data, status, headers, config){
				$scope.handleSearchError(status);
				$scope.end();
			});
	};

	$scope.processData = function(obj){
		$scope.summoner = obj[Object.keys(obj)];

		// Get runes
		Summoner.getRunes($scope.region, $scope.summoner.id)
			.success(function(data){
				$scope.summoner.runes = data[Object.keys(data)].pages;
			})
			.error(function(data, status, headers, config){
				console.log(status);
			});

		// Get masteries
		Summoner.getMasteries($scope.region, $scope.summoner.id)
			.success(function(data){
				$scope.summoner.masteries = data[Object.keys(data)].pages;
			})
			.error(function(data, status, headers, config){
				console.log(status);
			});
		
		// Get ranked stats
		Summoner.getStats($scope.region, $scope.summoner.id)
			.success(function(data){
				console.log(data);
				$scope.end();
			})
			.error(function(data, status, headers, config){
				console.log(status);
				if (status == 404)
					$scope.errMsg = "No recent ranked stats were found";
				$scope.end();
			});

	};

	$scope.handleSearchError = function(code){
		if (code == 404){
			$scope.errMsg = "Sorry! That is not a valid summoner name. Check your spelling or region and try again."
		}else{
			$scope.errMsg = "Sorry! Something went wrong. Please try again"
		}
		console.log("handled");
	};

	$scope.start = function(){
		$scope.inProgress = true;
		$scope.done = false;
		$scope.errMsg = "";
	}

	$scope.end = function(){
		$scope.inProgress = false;
		$scope.done = true;
	}

	$scope.test = function(){
		
	};

});