'use strict';

angular.module('sas-ux.components.common.services').service('CommonUtil', [function() {
	this.isUndefinedOrNull = function(obj)
	{
		return (angular.isUndefined(obj) || obj == null);
	};

	this.isNotUndefinedOrNull = function(obj)
	{
		return !this.isUndefinedOrNull(obj);
	};
}]);