'use strict';

angular.module('sas-ux.components.oauth.factories', []).factory('OAuthFactory',
		[ '$q', '$resource', 'OAUTH_BASE_URL', 'OAUTH_CLIENT_ID', function($q, $resource, OAUTH_BASE_URL, OAUTH_CLIENT_ID)
		{
			var factory = {};
			var mainResource = $resource(OAUTH_BASE_URL + '/token', {}, {
				queryAccessToken : {
					method : 'GET',
					params : {
						grant_type : '@grant_type',
						client_id : '@client_id',
						refresh_token : '@refresh_token'
					},
					isArray : false,
					timeout : 20000
				},
				queryByCredentials : {
					method : 'GET',
					params : {
						grant_type : '@grant_type',
						client_id : '@client_id',
						username : '@username',
						password : '@password'
					},
					isArray : false,
					timeout : 30000
				}
			});

			factory.queryByCredentials = function(credentials)
			{
				var params = {
					grant_type : 'password',
					client_id : OAUTH_CLIENT_ID,
					username : credentials.username,
					password : credentials.password
				};
				var deferredObject = $q.defer();
				mainResource.queryByCredentials(params).$promise.then(function(response)
				{
					deferredObject.resolve(response);
				}, function(response)
				{
					deferredObject.reject(response);
				});
				return deferredObject.promise;
			};

			factory.queryAccessToken = function(refreshToken)
			{
				var params = {
					grant_type : 'refresh_token',
					client_id : OAUTH_CLIENT_ID,
					refresh_token : refreshToken
				};
				var deferredObject = $q.defer();
				mainResource.queryAccessToken(params).$promise.then(function(response)
				{
					if (response)
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

			return factory;
		} ]);