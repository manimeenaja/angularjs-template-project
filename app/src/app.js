'use strict';

(function(){
 
/**
 * @ngdoc module
 * @name sas-ux
 * @requires ngAnimate, ngCookies, ngResource, ui.router, ngSanitize
 * @description
 * # sas-ux
 *
 * Main module of the application.
 */
 angular
  .module('sas-ux', [
    'angularMoment',
	'angularSpinner',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ui.router',
    'ngSanitize',
    'mm.foundation',
    'sas-ux.components',
	'sas-ux-templates',
	'sas-ux.dashboard',
	'sas-ux.navigation',
	'sas-ux.user'
  ]).controller('AuthentiationCtrl',['$scope', '$rootScope', '$timeout', '$location', '$state', 'LocalStorage', 'OAuthService', 'RolesService',
                                     'SecurityService', 'AUTH_EVENTS', 
                                     function($scope, $rootScope, $window, $timeout, $location, $state, LocalStorage, OAuthService, RolesService,
                                    		 SecurityService, AUTH_EVENTS) {
	  $scope.initializeApp = function()
	  {
	  };

  }]).run(['$rootScope', '$window', '$timeout', 'SecurityService', 'AUTH_EVENTS', 'Session', '$cookies', '$state','LocalStorage',
           function($rootScope, $window, $timeout, SecurityService, AUTH_EVENTS, Session, $cookies, $state, LocalStorage) {
	  $rootScope.appTitle = 'My App';
	  $rootScope.role = null;
	  angular.element(document).ready(function () {
	  });

	  $rootScope.$on('$stateChangeStart', function (event, next) {
		    if(next && next.data)
		    {
		    	var authorizedRoles = next.data.authorizedRoles;
		    }
		    if(angular.isUndefined(authorizedRoles))
		    {
		    	event.preventDefault();
		    }
		    else
		    if(authorizedRoles.length == 0)
		    {
		    	if(SecurityService.isAuthenticated())
		    	{
		    		$rootScope.$broadcast(AUTH_EVENTS.loggedin);
		    		$state.go('dashboard');
		    	}
		    }
		    else
		    if (!SecurityService.isAuthorized(authorizedRoles)) {
		        event.preventDefault();
		        if (SecurityService.isAuthenticated()) {
		        	// user is not allowed
		        	$rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
		        } else {
		        	// user is not logged in
		        	$rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
		        }
		    }
		    else
		    {
		    	if(!$rootScope.role)
		    	{
		    		$rootScope.$broadcast(AUTH_EVENTS.loggedin);
		    	}
		    }
	 });

	 $rootScope.$on(AUTH_EVENTS.loginSuccess, function(event) {
		 LocalStorage.setData('sas-session', Session.getUserSession());
		 $rootScope.role = Session.getPlayingRole();
	 });

	 $rootScope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
		 LocalStorage.clearAll();
		 $rootScope.role = undefined;
		 $state.go('login');
	 });
	 
	 $rootScope.$on(AUTH_EVENTS.loggedin, function(event) {
		 var sessionCookie = LocalStorage.getData('sas-session');
		 if(!sessionCookie)
		 {
			 $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
		 }
		 else
		 {
			 $rootScope.role = sessionCookie.playingRole;
		 }
	 });

	 $rootScope.$on(AUTH_EVENTS.logoutSuccess, function(event) {
		 LocalStorage.clearAll();
		 $rootScope.role = undefined;
		 $state.go('login');
	 });

	 $rootScope.reloadPage = function()
	 {
		 $timeout(function() {
			 $window.location.reload();
		 }, 2000);
	 };

  }]);
})();
