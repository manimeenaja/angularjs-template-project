'use strict';

(function() {
	angular.module('sas-ux.components.modal')
	.directive('sasModal', ['$modal', 'CommonUtil', function($modal, CommonUtil) {
				return {
					link : function(scope, element, attr)
					{
						scope.modalTitle = attr.modalTitle;
						scope.modalMessage = attr.modalMessage;
						scope.closeable = true;
						var modalCloseAction = attr.modalClose;
						element.bind('click', function(event)
						{
							var modalInstance = $modal.open({
								templateUrl : 'src/components/modal/sas-modal.tpl.html',
								windowClass : 'large',
								scope : scope,
								controller : 'SasModalCtrl'
							});
							modalInstance.result.then(function()
							{
								if(CommonUtil.isNotUndefinedOrNull(modalCloseAction))
								{
									scope.$eval(modalCloseAction);
								}
							});

						});
					}
				};
			} ]);
}).call(this);