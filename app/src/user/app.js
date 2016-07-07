'use strict';

(function(){
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
  .module('sas-ux.user', [
	'sas-ux.components',
	'sas-ux.user.register',
	'sas-ux.user.login',
	'sas-ux.users.factories',
	'sas-ux.user.services',
	'ui.router',
	'mm.foundation'
  ]);
})();