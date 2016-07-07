'use strict';

angular.module('sas-ux')
  .constant('RESOURCE_BASE_URL','/app/rest/api/v1')
  .constant('SECURE_RESOURCE_BASE_URL','/app/rest/api/v1/secure')
  .constant('OAUTH_BASE_URL','/app/rest/api/v1/oauth')
  .constant('OAUTH_CLIENT_ID','sas-trusted-client')
  .constant('STATUS_VALUES', [
{code : 'FTR', value : 'Future', level : 0},
{code : 'NXT', value : 'Next', level : 1},
{code : 'INP', value : 'In Progress', level : 2},
{code : 'CMP', value : 'Completed', level : 3}
]).constant('AUTH_EVENTS', {
	  loggedin:	'auth-already-loggedin',
	  loginSuccess: 'auth-login-success',
	  loginFailed: 'auth-login-failed',
	  logoutSuccess: 'auth-logout-success',
	  sessionTimeout: 'auth-session-timeout',
	  notAuthenticated: 'auth-not-authenticated',
	  notAuthorized: 'auth-not-authorized',
	  serviceUnavailable: 'auth-service-unavailable'
}).constant('USER_ROLES', {
	  any: '*',
	  admin: 'ADMIN',
	  student: 'STU'
});

/**
 * @ngdoc overview
 * @name sas-ux
 * @requires $httpProvider
 * @description
 *
 * Configures the @module sas-ux $httpProvider to disable IE caching
 */
angular
.module('sas-ux').factory('oauthHttpInterceptor', ['$injector', '$rootScope', 'AUTH_EVENTS', function($injector, $rootScope, AUTH_EVENTS) {
	  return {
		    'request': function(config) {
		    	
		    	var ls = $injector.get('LocalStorage');
		    	var $q = $injector.get('$q');
		    	var sn = $injector.get('Session');
		    	if(config.url.indexOf('/secure') > -1)
		    	{
		    		var accessToken = sn.getAccessToken();
		    		if(angular.isUndefined(config.headers))
		    		{
		    			config.headers = {};
		    		}
		    		var authorizationBearer = "Bearer " + accessToken;
		    		config.headers.authorization = authorizationBearer;
		    		return config;
		    	}
		    	if(!config.timeout)
		    	{
		    		config.timeout = 30000;
		    	}
		    	return config;
		    },
		    'responseError' : function (response) {
		    	var $q = $injector.get('$q');
		        $rootScope.$broadcast({
		            401: AUTH_EVENTS.notAuthenticated,
		            403: AUTH_EVENTS.notAuthorized,
		            419: AUTH_EVENTS.sessionTimeout,
		            440: AUTH_EVENTS.sessionTimeout,
		            '-1' : AUTH_EVENTS.serviceUnavailable
		          }[response.status], response);
		          return $q.reject(response);
		    }
	  };
	}]
);
angular
  .module('sas-ux')
  .config(['usSpinnerConfigProvider', function (usSpinnerConfigProvider) {
    usSpinnerConfigProvider.setDefaults({radius:20, width:8, length: 16, color : '#000066'});
  }])
  .config(['$httpProvider', function($httpProvider) {
    //initialize get if not there
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};    
    }
    //disable IE ajax request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
    $httpProvider.interceptors.push('oauthHttpInterceptor');
 }]).config(['$stateProvider', '$urlRouterProvider', 'USER_ROLES', function($stateProvider, $urlRouterProvider, USER_ROLES) {
		
	 	$urlRouterProvider.otherwise('/dashboard');
		$stateProvider.state('admin', {
			abstract : true,
			url : '/admin',
			template: '<ui-view/>',
			data: {
			      authorizedRoles: [USER_ROLES.admin]
			 }
		}).state('student', {
			abstract : true,
			url : '/stu',
			template: '<ui-view/>',
			data: {
			      authorizedRoles: [USER_ROLES.student]
			 }
		}).state('dashboard', {
        	url : '/dashboard',
        	templateUrl: 'src/dashboard/main.tpl.html',
        	data: {
			    authorizedRoles: []
			}
        }).state('changepassword', {
        	url : '/changepassword',
        	templateUrl: 'src/user/register/change-password.tpl.html',
        	data: {
			    authorizedRoles: []
			}
        }).state('login', {
        	url: '/login',
        	templateUrl: 'src/user/login/main.tpl.html',
        	data: {
			    authorizedRoles: []
			}
        }).state('register', {
        	url: '/register',
        	templateUrl: 'src/user/register/main.tpl.html',
        	data: {
			    authorizedRoles: []
			}
        });
}]);

