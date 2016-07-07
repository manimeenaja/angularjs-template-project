'use strict';

angular.module('sas-ux.components.modal.controllers')
	.controller('SasModalCtrl',['$scope', '$modalInstance', function($scope, $modalInstance) {
		$scope.ok = function() {
			$modalInstance.close();
		};

		$scope.cancel = function() {
		    $modalInstance.dismiss('cancel');
		};
}]);
