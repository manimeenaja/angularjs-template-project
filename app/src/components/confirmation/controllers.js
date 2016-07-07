'use strict';

angular.module('sas-ux.components.confirmation.controllers')
	.controller('SasConfirmCtrl',['$scope', '$modalInstance', function($scope, $modalInstance) {
		$scope.ok = function() {
			$modalInstance.close();
		};

		$scope.cancel = function() {
		    $modalInstance.dismiss('cancel');
		};
}]);
