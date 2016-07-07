'use strict';

angular.module('sas-ux.components.security.services', []).service('SecurityService',
	[ 'OAuthFactory', 'LocalStorage', 'USER_ROLES', 'Session', '$cookies',
	  function(OAuthFactory, LocalStorage, USER_ROLES, Session, $cookies)
	{
		this.isAuthenticated = function ()
		{
			var sessionCookie = LocalStorage.getData('sas-session');
			if(!sessionCookie || !sessionCookie.playingRole)
			{
				return false;
			}
		    return true;
		};

		this.isAuthorized = function (authorizedRoles)
		{
			var sessionCookie = LocalStorage.getData('sas-session');
		    if (!angular.isArray(authorizedRoles)) {
		      authorizedRoles = [authorizedRoles];
		    }
		    return (this.isAuthenticated() &&
		    	(authorizedRoles.indexOf(USER_ROLES.any) !== -1) ||
		      (sessionCookie && authorizedRoles.indexOf(sessionCookie.playingRole) !== -1));
		};
	}]
).service('Session', ['LocalStorage', function(LocalStorage)
	{
		this.create = function(refreshToken)
		{
			this.userSession = {};
			this.userSession.id = Math.floor((Math.random()*1000)+1);
			this.userSession.refreshToken = refreshToken;
		};
		this.setAccessToken = function(accessToken)
		{
			if(angular.isDefined(this.userSession.id))
			{
				this.userSession.accessToken = accessToken;
			}
		};
		
		this.getAccessToken = function()
		{
			var us = this.getUserSession();
			if(us && us != null)
			{
				return us.accessToken;
			}
			return null;
		};
		
		this.setUser = function(user)
		{
			if(angular.isDefined(this.userSession.id) && angular.isDefined(user))
			{
				this.userSession.userId = user.id;
				this.userSession.user = user;
				if(angular.isArray(user.roles))
				{
					this.userSession.playingRole = user.roles[0].name;
					this.userSession.roles = user.roles;
				}
			}
		};

		this.getPlayingRole = function()
		{
			var us = this.getUserSession();
			if(us && us != null)
			{
				return us.playingRole;
			}
			return undefined;
		};
		
		this.getUserSession = function()
		{
			return this.userSession || LocalStorage.getData('sas-session');
		};
		
		this.getSessionUser = function()
		{
			var us = this.getUserSession();
			if(us && us != null)
			{
				return us.user;
			}
			return undefined;
		};

		this.getSessionUserId = function()
		{
			var su = this.getSessionUser();
			if(su && su != null)
			{
				return su.id;
			}
		};

		this.destroy = function()
		{
			this.userSession = null;
		};
		
	}]
);
