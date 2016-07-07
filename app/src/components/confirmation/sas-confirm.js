'use strict';

(function() {
	angular.module('sas-ux.components.confirmation')
	.directive('sasConfirm', ['$modal', function($modal) {
				return {
					link : function(scope, element, attr)
					{
						var msg = attr.confirmMessage;
						scope.confirmMessage = msg;
						var confirmYesAction = attr.confirmYes;
						var confirmNoAction = attr.confirmNo;
						element.bind('click', function(event)
						{
							var modalInstance = $modal.open({
								templateUrl : 'src/components/confirmation/sas-confirm.tpl.html',
								windowClass : 'small',
								scope : scope,
								controller : 'SasConfirmCtrl'
							});
							modalInstance.result.then(function()
							{
								scope.$eval(confirmYesAction);
							}, function()
							{
								scope.$eval(confirmNoAction);
							});

						});
					}
				};
			} ]);
}).call(this);