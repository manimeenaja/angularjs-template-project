'use strict';

(function () {

	/**
	 * @ngdoc controller
	 * @module sas-ux.query.student.controllers
	 * @name planDetailsCtr
	 * @requires $scope, $log, $timeout
	 * @description # NavigationCtrl Controller to manage the navigation.
	 */
	angular.module('sas-ux.dashboard.admin.controllers', []);
	/**
	 * @ngdoc module
	 * @name sas-ux.query.student
	 * @requires
	 * @description Main module for Navigation
	 */
	angular.module('sas-ux.dashboard.admin', [
		'sas-ux.dashboard.admin.controllers',
		'mm.foundation'
	]);
})();