// js/services/mainService.js

var app = angular.module('mainService', []);

// I should probably keep the key more secure somewhere (tell me how if you know!)
var key = '2f89bda6-7788-47b6-9bc0-8d11287f63ce'

app.factory('Static', function($http){
	return{
		getPatch: function(region){
			return $http.get('https://na.api.pvp.net/api/lol/static-data/' + region + '/v1.2/versions?api_key=' + key);
		},
		getChamps: function(region){
			return $http.get('https://' + region + '.api.pvp.net/api/lol/static-data/' + region + '/v1.2/champion?api_key=' + key);
		},
	};
});

app.factory('Summoner', function($http){
	return{
		getBasicInfo: function(region, name){
			return $http.get('https://' + region + '.api.pvp.net/api/lol/' + region + '/v1.4/summoner/by-name/' + name + '?api_key=' + key)
		},
		getRunes: function(region, id){
			return $http.get('https://' + region + '.api.pvp.net/api/lol/' + region + '/v1.4/summoner/' + id + '/runes?api_key=' + key)
		},
		getMasteries: function(region, id){
			return $http.get('https://' + region + '.api.pvp.net/api/lol/' + region + '/v1.4/summoner/' + id + '/masteries?api_key=' + key)
		},
		getStats: function(region, id){
			return $http.get('https://' + region + '.api.pvp.net/api/lol/' + region + '/v1.3/stats/by-summoner/' + id + '/ranked?api_key=' + key)
		},
	};
});