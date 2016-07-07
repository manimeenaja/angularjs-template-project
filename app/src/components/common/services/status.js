'use strict';

angular.module('sas-ux.components.common.services').service('StatusService', [function() {
	
	var allStatuses = [
        {code : 'PAP', value : 'Pending Approval'},
        {code : 'APR', value : 'Approved'},
        {code : 'RJC', value : 'Rejected'},
		{code : 'FTR', value : 'Future'},
		{code : 'SLV', value : 'Solved'},
		{code : 'NXT', value : 'Next'},
		{code : 'INP', value : 'In Progress'},
		{code : 'CMP', value : 'Completed'}
	];
	
	var allSubjectStatuses = [
	        {code : 'ALL', value : 'All', level : -1},
			{code : 'FTR', value : 'Future', level : 0},
			{code : 'INP', value : 'In Progress', level : 1},
			{code : 'CMP', value : 'Completed', level : 2}
		];

	var allUserVoiceStatuses = [
   	        {code : 'PAP', value : 'Pending Approval'},
   	        {code : 'APR', value : 'Approved'},
   	        {code : 'RJC', value : 'Rejected'},
   			{code : 'FTR', value : 'Future'},
   			{code : 'NXT', value : 'Next'},
   			{code : 'INP', value : 'In Progress'},
   			{code : 'CMP', value : 'Completed'}
   		];
	
	this.findUserVoiceStatusByCode = function(code)
	{
		var searchStatus;
		if(code)
		{
			for(var i=0; i < allUserVoiceStatuses.length; i++)
			{
				var status = allUserVoiceStatuses[i];
				if(status.code.toUpperCase() == code.toUpperCase())
				{
					searchStatus = status;
					break;
				}
			}
		}
		return searchStatus;
	};

	this.findStatusByCode = function(code)
	{
		var searchStatus;
		if(code)
		{
			for(var i=0; i < allStatuses.length; i++)
			{
				var status = allStatuses[i];
				if(status.code.toUpperCase() == code.toUpperCase())
				{
					searchStatus = status;
					break;
				}
			}
		}
		return searchStatus;
	};

	this.findStatusValueByCode = function(code)
	{
		var searchStatusValue = 'NA';
		if(code)
		{
			for(var i=0; i < allStatuses.length; i++)
			{
				var status = allStatuses[i];
				if(status.code.toUpperCase() == code.toUpperCase())
				{
					searchStatusValue = status.value;
					break;
				}
			}
		}
		return searchStatusValue;
	};

	this.findStatusLevelByCode = function(code)
	{
		var status = this.findStatusByCode(code);
		if(status)
		{
			return status.level;
		}
	};
	
	this.findAllSubjectStatuses = function()
	{
		return allSubjectStatuses;
	};
	
	this.findAllUserVoicesStatuses = function()
	{
		return allUserVoiceStatuses;
	}
}]);