'use strict';

angular.module('sas-ux.users.factories', []).factory('UserFactory',
	[ '$q', '$resource', 'RESOURCE_BASE_URL', 'SECURE_RESOURCE_BASE_URL',
	function($q, $resource, RESOURCE_BASE_URL, SECURE_RESOURCE_BASE_URL)
	{
	
		var factory = {};
		var usernameBasicResource = $resource(RESOURCE_BASE_URL + '/users/username/:username', {
			username : '@username'
		}, {
			query : {
				method : 'GET',
				isArray : false,
				cache : true
			}
		});
	
		var basicResource = $resource(RESOURCE_BASE_URL + '/users', {}, {
			create : {
				method : 'POST',
				timeout : 30000
			}
		});
	
		var mainResource = $resource(SECURE_RESOURCE_BASE_URL + '/users', {}, {
			query : {
				method : 'GET',
				cache : true,
				timeout : 60000
			},
			queryByActive : {
				method : 'GET',
				params : {
					active : '@active'
				},
				timeout : 60000
			},
			queryByCredentials : {
				method : 'GET',
				params : {
					username : '@username',
					password : '@password',
					active : '@active'
				},
				timeout : 30000
			},
			queryByClassId : {
				method : 'GET',
				params : {
					classId : '@classId'
				},
				isArray : false,
				timeout : 30000
			},
			create : {
				method : 'POST',
				timeout : 30000
			},
			update : {
				method : 'PUT',
				timeout : 30000
			}
		});
	
		var staffMainResource = $resource(SECURE_RESOURCE_BASE_URL + '/staff', {}, {
			query : {
				method : 'GET',
				cache : true,
				timeout : 60000
			}
		});
	
		var pathParamResource = $resource(SECURE_RESOURCE_BASE_URL + '/users/:userId', {
			userId : '@id'
		}, {
			queryById : {
				method : 'GET',
				isArray : false,
				timeout : 30000
			},
			deleteById : {
				method : 'DELETE',
				timeout : 30000
			},
			update : {
				method : 'PUT',
				timeout : 30000
			}
		});
	
		var multiParamsResource = $resource(SECURE_RESOURCE_BASE_URL + '/users/:userIds', {
			userIds : '@userIds'
		}, {
			deleteByIds : {
				method : 'DELETE',
				timeout : 60000
			}
		});
		
		var credentialResource = $resource(SECURE_RESOURCE_BASE_URL + '/user/credential', {
		}, {
			update : {
				method : 'PUT'
			}
		});

		var forgotPasswordResource = $resource(RESOURCE_BASE_URL + '/user/credential/forgot', {
		}, {
			update : {
				method : 'PUT'
			}
		});

		var credentialUserIdParamResource = $resource(SECURE_RESOURCE_BASE_URL + '/user/:userId/credential', {
			userId : '@userId'
		}, {
			update : {
				method : 'PUT'
			}
		});

		var logoutResource = $resource(SECURE_RESOURCE_BASE_URL + '/logout', {}, {
			logout : {
				method : 'POST',
				timeout : 30000
			}
		});

		factory.query = function()
		{
			var deferredObject = $q.defer();
			mainResource.query().$promise.then(function(response)
			{
				if (response && response.status.status == 'SUCCESS')
				{
					deferredObject.resolve(response.values);
				} else
				{
					deferredObject.reject(response);
				}
			}, function(response)
			{
				deferredObject.reject(response);
			});
			return deferredObject.promise;
		};
	
		factory.queryByActiveFlag = function(activeFlag)
		{
			var params = {
				'active' : activeFlag
			};
			var deferredObject = $q.defer();
			mainResource.queryByActive(params).$promise.then(function(response)
			{
				if (response && response.status.status == 'SUCCESS')
				{
					deferredObject.resolve(response.values);
				} else
				{
					deferredObject.reject(response);
				}
			}, function(response)
			{
				deferredObject.reject(response);
			});
			return deferredObject.promise;
		};
	
		factory.queryByClassId = function(classId)
		{
			var params = {
				'classId' : classId
			};
			var deferredObject = $q.defer();
			mainResource.queryByClassId(params).$promise.then(function(response)
			{
				deferredObject.resolve(response);
			}, function(response)
			{
				deferredObject.reject(response);
			});
			return deferredObject.promise;
		};
	
		factory.queryByCredentials = function(credentials, activeFlag)
		{
			var deferredObject = $q.defer();
			mainResource.queryByCredentials(credentials).$promise.then(function(response)
			{
				if (response && response.status.status == 'SUCCESS' && response.value)
				{
					deferredObject.resolve(response.value);
				} else
				{
					deferredObject.reject(response);
				}
			}, function(response)
			{
				deferredObject.reject(response);
			});
			return deferredObject.promise;
		};
	
		factory.create = function(user)
		{
			var deferredObject = $q.defer();
			basicResource.create(user).$promise.then(function(response)
			{
				deferredObject.resolve(response);
			}, function(response)
			{
				deferredObject.reject(response);
			});
			return deferredObject.promise;
		};
	
		factory.updateAll = function(users)
		{
			var deferredObject = $q.defer();
			mainResource.update({}, users).$promise.then(function(response)
			{
				if (response && response.status == 'SUCCESS')
				{
					deferredObject.resolve(response);
				} else
				{
					deferredObject.reject(response);
				}
			}, function(response)
			{
				deferredObject.reject(response);
			});
			return deferredObject.promise;
		};
	
		factory.deleteByIds = function(userIds)
		{
			var deferredObject = $q.defer();
			multiParamsResource.deleteByIds({
				'userIds' : userIds.toString()
			}).$promise.then(function(response)
			{
				if (response && response.status == 'SUCCESS')
				{
					deferredObject.resolve(response);
				} else
				{
					deferredObject.reject(response);
				}
			}, function(response)
			{
				deferredObject.reject(response);
			});
			return deferredObject.promise;
		};
	
		factory.update = function(user)
		{
			var deferredObject = $q.defer();
			pathParamResource.update({
				'id' : user.id
			}, user).$promise.then(function(response)
			{
				if (response && response.status == 'SUCCESS')
				{
					deferredObject.resolve(response);
				} else
				{
					deferredObject.reject(response);
				}
			}, function(response)
			{
				deferredObject.reject(response);
			});
			return deferredObject.promise;
		};
	
		factory.getById = function(id)
		{
			var deferredObject = $q.defer();
			pathParamResource.queryById({
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
	
		factory.queryUsernameAvailbility = function(username)
		{
			var deferredObject = $q.defer();
			usernameBasicResource.query({
				'username' : username
			}).$promise.then(function(response)
			{
				if (response && response.status && response.status.status == 'SUCCESS')
				{
					deferredObject.resolve(response.value);
				} else
				{
					deferredObject.reject(response);
				}
			}, function(response)
			{
				deferredObject.reject(response);
			});
			return deferredObject.promise;
		};
	
		factory.queryStaff = function()
		{
			var deferredObject = $q.defer();
			staffMainResource.query({}).$promise.then(function(response)
			{
				deferredObject.resolve(response);
			}, function(response)
			{
				deferredObject.reject(response);
			});
			return deferredObject.promise;
		};

		factory.updatePasswordByUserId = function(userId, credential)
		{
			var deferredObject = $q.defer();
			credentialUserIdParamResource.update({
				'userId' : userId
			}, credential).$promise.then(function(response)
			{
				if (response)
				{
					deferredObject.resolve(response);
				} else
				{
					deferredObject.reject("Error occured");
				}
			}, function(response)
			{
				deferredObject.reject(response);
			});
			return deferredObject.promise;
		};

		factory.resetPassword = function(credential)
		{
			var deferredObject = $q.defer();
			forgotPasswordResource.update({
			}, credential).$promise.then(function(response)
			{
				if (response)
				{
					deferredObject.resolve(response);
				} else
				{
					deferredObject.reject("Password reset failed");
				}
			}, function(response)
			{
				deferredObject.reject(response);
			});
			return deferredObject.promise;
		};

		factory.updatePassword = function(credential)
		{
			var deferredObject = $q.defer();
			credentialResource.update({
			}, credential).$promise.then(function(response)
			{
				if (response)
				{
					deferredObject.resolve(response);
				} else
				{
					deferredObject.reject("Error occured");
				}
			}, function(response)
			{
				deferredObject.reject(response);
			});
			return deferredObject.promise;
		};
		
		factory.logout = function(token)
		{
			var deferredObject = $q.defer();
			logoutResource.logout({
			}, token).$promise.then(function(response)
			{
				if (response)
				{
					deferredObject.resolve(response);
				} else
				{
					deferredObject.reject("Error occured");
				}
			}, function(response)
			{
				deferredObject.reject(response);
			});
			return deferredObject.promise;
		};
	
		return factory;
	}
]);