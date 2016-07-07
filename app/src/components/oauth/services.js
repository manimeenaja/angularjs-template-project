'use strict';

angular.module('sas-ux.components.oauth.services', []).service('OAuthService', [ 'OAuthFactory', 'LocalStorage', function(OAuthFactory, LocalStorage)
{
	this.login = function(credentials)
	{
		return OAuthFactory.queryByCredentials(credentials);
	};

	this.fetchAccessToken = function(refreshToken)
	{
		return OAuthFactory.queryAccessToken(refreshToken);
	};
} ]);
