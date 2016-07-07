'use strict';

angular.module('sas-ux.components.customize.controllers')
	.controller('SasStatusActionsCtrl',['$scope', 'StatusService' , function($scope, StatusService) {
		var disabledStyle = {'color': 'gray'};
		var clickableStyle = {};
		var currentStyle = {'color': 'green'};
		$scope.futureTitle = 'Future';
		$scope.inProgressTitle = 'In Progress';
		$scope.doneTitle = 'Done';
		var statusLevel = StatusService.findStatusLevelByCode($scope.current);
		
		if(statusLevel > 1)
		{
			$scope.futureStyle = disabledStyle;
			$scope.inProgressStyle = disabledStyle;
			$scope.doneStyle = currentStyle;
		}
		else
		if(statusLevel > 0)
		{
			$scope.futureStyle = disabledStyle;
			$scope.inProgressStyle = currentStyle;
			$scope.doneStyle = clickableStyle;
			$scope.doneTitle = 'Mark Done';
		}
		else
		if(statusLevel == 0)
		{
			$scope.futureStyle = currentStyle;
			$scope.inProgressStyle = clickableStyle;
			$scope.doneStyle = clickableStyle;
			$scope.inProgressTitle = 'Mark In Progress';
			$scope.doneTitle = 'Mark Done';
		}
}]);
