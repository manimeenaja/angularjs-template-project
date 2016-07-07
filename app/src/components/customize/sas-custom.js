'use strict';

(function() {
	angular.module('sas-ux.components.customize')
	.directive('sasDoneLabel', [function() {
			return {
				restrict: 'E',
				compile : function(scope, element, attr)
				{
				},
				link : function(scope, element, attr)
				{
				},
				templateUrl : 'src/components/customize/sas-done-label.tpl.html'
			};
		}]
	).directive('sasInProgressLabel', [function() {
			return {
				restrict: 'E',
				compile : function(scope, element, attr)
				{
				},
				link : function(scope, element, attr)
				{
				},
				templateUrl : 'src/components/customize/sas-in-progress-label.tpl.html'
			};
		}]
	).directive('sasFutureLabel', [function() {
			return {
				restrict: 'E',
				compile : function(scope, element, attr)
				{
				},
				link : function(scope, element, attr)
				{
				},
				templateUrl : 'src/components/customize/sas-future-label.tpl.html'
			};
		}]
	).directive('sasStatusActions', ['StatusService', function(StatusService) {
		return {
			restrict: 'EA',
			scope: {
				current : '=',
				ftraction : '&',
				inpaction : '&',
				cmpaction : '&'
			},
			controller : 'SasStatusActionsCtrl',
			compile : function(scope, element, attr)
			{
			},
			link : function(scope, element, attr)
			{
			},
			templateUrl : 'src/components/customize/sas-status-actions.tpl.html'
		};
	}]
);
}).call(this);