'use strict';

(function(){
	
	/**
	 * @ngdoc controller
	 * @module sas-ux.query.student.controllers
	 * @name planDetailsCtr
	 * @requires $scope, $log, $timeout
	 * @description # NavigationCtrl Controller to manage the navigation.
	 */
	angular.module('sas-ux.dashboard.controllers', []);
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
	  .module('sas-ux.dashboard', [
		'sas-ux.components',
		'sas-ux.dashboard.controllers',
		'sas-ux.dashboard.admin',
		'sas-ux.dashboard.staff',
		'sas-ux.dashboard.student',
		'mm.foundation',
		'ui.router'
	  ]);
})();