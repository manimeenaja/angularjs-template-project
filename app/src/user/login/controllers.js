'use strict';

/**
 * @ngdoc controller
 * @module sas-ux.plan.details.controllers
 * @name QueryStudentCtrl
 * @requires $scope, $log, $timeout
 * @description
 * # LoginCtrl
 * Controller to manage the query details
 */
angular.module('sas-ux.user.login.controllers')
	.controller('LoginCtrl',['$scope', '$rootScope', '$state', 'RolesService', 'UserService', 'LocalStorage', 'OAuthService', 
	                         'Session', 'AUTH_EVENTS',
	                         function($scope, $rootScope, $state, RolesService, UserService, LocalStorage, OAuthService,
	                          Session, AUTH_EVENTS) {

	$scope.initialzeLogin = function()
	{
		$scope.alerts = [];
		$scope.credentials = {};
	};

	$scope.login = function()
	{
		$scope.alerts = [];
		if($scope.loginForm.$valid)
		{
			var promise = OAuthService.login($scope.credentials);
			promise.then(function(response) {
				LocalStorage.clearAll();
				var refreshToken = response.refresh_token;
				Session.create(refreshToken);
				$scope.setAccessToken(refreshToken);
			},function(response) {
				if(response && response.data.error_description == 'Bad credentials')
				{
					var message = { type: 'alert radius', msg: 'Invalid credentials.' };
					$scope.alerts.push(message);
				}
				else
				if(response && response.data.error_description == 'User is disabled')
				{
					var message = { type: 'alert radius', msg: 'You account is not activated, please contact administartor!' };
					$scope.alerts.push(message);
				}
				else
				{
					var message = { type: 'alert radius', msg: 'Server unavailable, please try again later!' };
					$scope.alerts.push(message);
				}
			});
		}
		else
		{
			var message = { type: 'alert radius', msg: 'Please enter credentials.' };
			$scope.alerts.push(message);
		}
	};

	$scope.setAccessToken = function(refreshToken)
	{
		var promise = OAuthService.fetchAccessToken(refreshToken);
		promise.then(function(response) {
			Session.setAccessToken(response.access_token);
			$scope.getUser($scope.credentials.username);
		},function(response) {
			var message = { type: 'alert radius', msg: 'Session expired, please login!' };
			$scope.alerts.push(message);
		});
	};
	
	$scope.getUser = function(username)
	{
		var promise = UserService.getUserByUsername(username);
		promise.then(function(response) {
			Session.setUser(response);
			if(Session.getPlayingRole())
			{
				$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
				$state.go('dashboard');
			}
		},function(response) {
			var message = { type: 'alert radius', msg: 'Your account not activated.' };
			$scope.alerts.push(message);
		});
	};

	$scope.forgotPassword = function()
	{
		$scope.alerts = [];
		if($scope.credentials && $scope.credentials.username)
		{
			var emailId = $scope.credentials.username;
			var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
			if(emailRegex.test(emailId))
			{
				var promise = UserService.resetPassword($scope.credentials);
				promise.then(function(response) {
					var message = { type: 'success radius', msg: 'Password reset succssfully, verify your email!' };
					$scope.alerts.push(message);
				},function(response) {
					var message = { type: 'alert radius', msg: 'Server unavailable, please try again later!' };
					$scope.alerts.push(message);
				});
			}
			else
			{
				var message = { type: 'alert radius', msg: 'Please enter your registered email id, if you forgot that contact administartor!' };
				$scope.alerts.push(message);	
			}
		}
		else
		{
			var message = { type: 'alert radius', msg: 'Please enter username, if you forgot that contact administartor!' };
			$scope.alerts.push(message);
		}
	};

	$scope.getCssClass = function(ngModelController)
	{
		if(ngModelController && ngModelController.$invalid && ngModelController.$dirty)
		{
			return 'error';
		}
		return '';
	};

	$scope.showMessage = function(ngModelController)
	{
		return (ngModelController && ngModelController.$invalid && ngModelController.$dirty);
	};

	$scope.closeAlert = function(index)
	{
		$scope.alerts.splice(index, 1);
	};
}]);
