'use strict';

angular.module('sas-ux.components.common.services')
	.service('CommonFilesService',['CommonFilesFactory', function(CommonFilesFactory) {
	
	this.deleteById = function(id)
	{
		return CommonFilesFactory.deleteById(id);
	};

	this.saveFiles = function(files)
	{
		return CommonFilesFactory.create(files);
	};

}]);
