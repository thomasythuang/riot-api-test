// js/controllers/mainCtrl.js

// Global Controller- contains functions needed for multiple views

var app = angular.module('mainController', []);

app.controller('mainController', function($scope, $http){
	// Init variables
	// I should probably keep the key more secure somewhere (tell me how if you know!)
	var key = '2f89bda6-7788-47b6-9bc0-8d11287f63ce' 
	$scope.region="na";

	$scope.onLoad = function(){
		$http.get('https://na.api.pvp.net/api/lol/static-data/' + $scope.region + '/v1.2/versions/?api_key=' + key)
			.success(function(data){
				$scope.patch = data[0];
			})
			.error(function(data, status, headers, config){
				console.log(status);
			});
	};
		
	$scope.onLoad();

	$scope.$watch('region', function(){
		$scope.onLoad();
	});

	$scope.search = function(name){
		$scope.summoner = undefined;
		$scope.inProgress = true;
		$http.get('https://' + $scope.region + '.api.pvp.net/api/lol/' + $scope.region + '/v1.4/summoner/by-name/' + name + '?api_key=' + key)
			.success(function(data){
				console.log("Success!");
				$scope.inProgress = false;
				$scope.errMsg = "";
				$scope.processData(data);
			})
			.error(function(data, status, headers, config){
				$scope.inProgress = false;
				$scope.handleSearchError(status);
			});
	};

	$scope.processData = function(data){
		$scope.summoner = data[Object.keys(data)];
		
		console.log($scope.summoner);
	};

	$scope.handleSearchError = function(code){
		if (code == 404){
			$scope.errMsg = "Sorry! That is not a valid summoner name. Check your spelling or region and try again."
		}else{
			$scope.errMsg = "Sorry! Something went wrong. Please try again"
		}
		console.log("handled");
	};

	$scope.test = function(){
		
	};

});