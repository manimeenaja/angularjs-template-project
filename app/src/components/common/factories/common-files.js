'use strict';

angular.module('sas-ux.components.common.factories', []).factory('CommonFilesFactory',
[ '$q', '$resource', '$http', 'SECURE_RESOURCE_BASE_URL', function($q, $resource, $http, SECURE_RESOURCE_BASE_URL)
	{
		var factory = {};
		var mainResource = $resource(SECURE_RESOURCE_BASE_URL + '/common/files', {}, {
			
		});

		var pathParamResource = $resource(SECURE_RESOURCE_BASE_URL + '/common/files/:id', {
			id : '@id'
		}, {
			deleteById : {
				method : 'DELETE',
				timeout : 30000
			}
		});

		factory.create = function(files)
		{
			var fileData = new FormData();
			angular.forEach(files,function(fileObj) {
				fileData.append('files', fileObj);
			});
			var deferredObject = $q.defer();
			$http.post(SECURE_RESOURCE_BASE_URL + '/common/files',fileData , {
		            transformRequest: angular.identity,
		            headers: {'Content-Type': undefined}
		        }).success(function(response){
		        	deferredObject.resolve(response.data);
		        }).error(function(response){
		        	deferredObject.reject(response);
		        });
			return deferredObject.promise;
		};

		factory.deleteById = function(id)
		{
			var deferredObject = $q.defer();
			pathParamResource.deleteById({
				'id' : id
			}).$promise.then(function(response)
			{
				deferredObject.resolve(response);
			}, function(response)
			{
				deferredObject.reject(response);
			});
			return deferredObject.promise;
		};

		return factory;
	}
]);