'use strict';

angular.module('sas-ux.components.common.services').service('PriorityService', [function() {
	var allPriorities = [
	        {code : 'LOW', value : 'Low'},
	        {code : 'MEDIUM', value : 'Medium'},
	        {code : 'HIGH', value : 'High'}
		];

	this.findByCode = function(code)
	{
		var searchPriority;
		if(code)
		{
			for(var i=0; i < allPriorities.length; i++)
			{
				var priority = allPriorities[i];
				if(priority.code.toUpperCase() == code.toUpperCase())
				{
					searchPriority = priority;
					break;
				}
			}
		}
		return searchPriority;
	};

	this.findAll = function()
	{
		return allPriorities;
	};
}]);