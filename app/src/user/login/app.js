'use strict';

(function(){
	
	/**
	 * @ngdoc controller
	 * @module sas-ux.query.student.controllers
	 * @name planDetailsCtr
	 * @requires $scope, $log, $timeout
	 * @description # NavigationCtrl Controller to manage the navigation.
	 */
	angular.module('sas-ux.user.login.controllers', []);
	/**
	 * @ngdoc module
	 * @name sas-ux.query
	 * @requires sas-ux.components, ui.router
	 * @description
	 * # sas-ux.app
	 *
	 * Main module of the application.
	 */
	 angular
	  .module('sas-ux.user.login', [
		'sas-ux.components',
		'sas-ux.user.login.controllers',
		'ui.router',
		'mm.foundation'
	  ]);
})();