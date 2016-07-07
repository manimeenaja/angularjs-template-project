'use strict';

(function() {

	/**
	 * @ngdoc controller
	 * @module sas-ux.query.student.controllers
	 * @name planDetailsCtr
	 * @requires $scope, $log, $timeout
	 * @description # NavigationCtrl Controller to manage the navigation.
	 */
	angular.module('sas-ux.dashboard.student.controllers', []);
	/**
	 * @ngdoc module
	 * @name sas-ux.query.student
	 * @requires
	 * @description Main module for Navigation
	 */
	angular.module('sas-ux.dashboard.student', [
	  'sas-ux.dashboard.student.controllers',
	  'mm.foundation'
	  ]);
})();