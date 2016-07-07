'use strict';

(function() {
	angular.module('sas-ux.components.sidebar')
	.directive('sasSidebar',['$rootScope', function($rootScope) {
	  return {
	    restrict: 'E',
	    templateUrl : 'src/components/sidebar/sas-sidebar.tpl.html',
	    link: function(scope, el, attrs, cntr)
	    {
	    }
	  }
	}]);
}).call(this);