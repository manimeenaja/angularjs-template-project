'use strict';

(function(){
 
 /**
 * @ngdoc module
 * @name sas-ux.components
 * @requires 
 * @description
 * # sas-ux.components
 *
 * Main module for components
 */

 angular.module('sas-ux.components.common',[]);
 angular.module('sas-ux.components.attachmentpicker',[]);
 angular.module('sas-ux.components.localstorage', []);
 angular.module('sas-ux.components.confirmation',[]);
 angular.module('sas-ux.components.customize',[]);
 angular.module('sas-ux.components.daterangepicker',[]);
 angular.module('sas-ux.components.fileupload',[]);
 angular.module('sas-ux.components.relink',[]);

 angular.module('sas-ux.components', [
    'sas-ux.components.common',
    'sas-ux.components.attachmentpicker',
    'sas-ux.components.confirmation',
    'sas-ux.components.customize',
    'sas-ux.components.daterangepicker',
    'sas-ux.components.fileupload',
	'sas-ux.components.localstorage',
	'sas-ux.components.modal',
	'sas-ux.components.oauth',
	'sas-ux.components.relink',
	'sas-ux.components.richtexteditor',
	'sas-ux.components.spinner',
	'sas-ux.components.security',
	'sas-ux.components.sidebar'
	]);
})();