'use strict';

angular.module('sas-ux.components.sidebar.controllers').controller('SideBarCtrl', [ '$scope', '$timeout', function($scope, $timeout)
{
	$scope.boolChangeClass = false;
	$scope.click = function()
	{
		$scope.boolChangeClass = !$scope.boolChangeClass;
	};

	$scope.hideBar = function()
	{
		$timeout(function() {
			if ($scope.boolChangeClass)
			{
				$scope.boolChangeClass = !$scope.boolChangeClass;
			}
		}, 2000);
	};
	
	$scope.showBar = function()
	{
		$timeout(function() {
			if (!$scope.boolChangeClass)
			{
				$scope.boolChangeClass = !$scope.boolChangeClass;
			}
		}, 2000);
	};
} ]);
