'use strict';

(function() {

	/**
	 * @ngdoc controller
	 * @module sas-ux.navigation.controllers
	 * @name planDetailsCtr
	 * @requires $scope, $log, $timeout
	 * @description # NavigationCtrl Controller to manage the navigation.
	 */
	angular.module('sas-ux.navigation.controllers', []);
	/**
	 * @ngdoc module
	 * @name sas-ux.navigation
	 * @requires
	 * @description Main module for Navigation
	 */
	angular.module('sas-ux.navigation', [
	  'sas-ux.navigation.controllers'
	  ]);
})();