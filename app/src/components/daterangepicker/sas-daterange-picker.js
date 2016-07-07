'use strict';

(function() {
	angular.module('sas-ux.components.daterangepicker')
	.directive('sasDateRange', ['$modal', function($modal) {
				return {
					restrict: 'A',
					link : function(scope, element, attr)
					{
						element.daterangepicker();
					}
				};
			} ]);
}).call(this);