'use strict';

/**
 * @ngdoc controller
 * @module sas-ux.navigation.controllers
 * @name planDetailsCtr
 * @requires $scope, $log, $timeout
 * @description
 * # NavigationCtrl
 * Controller to manage the navigation.
 */
angular.module('sas-ux.navigation.controllers')
	.controller('NavigationCtrl',['$scope', '$rootScope', '$state', 'LocalStorage', 'Session', 'UserService', 'AUTH_EVENTS' ,
	                              function($scope, $rootScope, $state, LocalStorage, Session, UserService, AUTH_EVENTS) {
	$scope.logout = function()
	{
		var promise = UserService.logoutUser();
		if(promise)
		{
			promise.then(function(response) {
				LocalStorage.clearAll();
				$rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
			}, function(reason) {
				LocalStorage.clearAll();
				$rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
			})
		}
		else
		{
			LocalStorage.clearAll();
			$rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
		}
	};

	$scope.initializeNavigation = function()
	{
		if(Session.getSessionUser() && Session.getSessionUser().firstName)
		{
			$scope.name = Session.getSessionUser().firstName;
		}
		else
		{
			$scope.name = "User";
		}
	};

	$scope.getSessionUserName = function()
	{
		return (Session.getSessionUser().firstName || 'User');
	};
	
}]).controller('NavigationSearchCtrl',['$scope', '$rootScope', '$state', 'LocalStorage', 'Session', 'AUTH_EVENTS' ,
	                              function($scope, $rootScope, $state, LocalStorage, Session, AUTH_EVENTS) {
	$scope.searchQuestions = function(searchText)
	{
		$state.go('student.question.result', {'searchText' : searchText});
	};
	
	$scope.enterSearch = function(event)
	{
		if(event.keyCode == 13)
		{
			$scope.searchQuestions($scope.searchText);
		};
	};
}]);
