'use strict';

angular.module('sas-ux.user.services', [])
	.service('UserService',['UserFactory', 'Session', 'CommonUtil', function(UserFactory, Session, CommonUtil) {
		
	this.createUser = function(user)
	{
		return UserFactory.create(user);
	};
	
	this.updateUser = function(user)
	{
		return UserFactory.update(user);
	};
	
	this.updateUsers = function(users)
	{
		return UserFactory.updateAll(users);
	};
	
	this.deleteUsers = function(users)
	{
		var userIds = [];
		angular.forEach(users, function(user) {
			if(user && user.id)
			{
				userIds.push(user.id);
			}
		});
		
		return UserFactory.deleteByIds(userIds);
	};
	
	this.getUserByUsername = function(username)
	{
		var params = {'username' : username};
		return UserFactory.queryByCredentials(params);
	};
	
	this.findAll = function()
	{
		return UserFactory.query();
	};
	
	this.findAllActive = function()
	{
		var active = true;
		return UserFactory.queryByActiveFlag(active);
	};
	
	this.queryAllStaff = function()
	{
		return UserFactory.queryStaff();
	};

	this.updatePasswordByUserId = function(userId, credential)
	{
		return UserFactory.updatePasswordByUserId(userId,credential);
	};

	this.updatePassword = function(credential)
	{
		return UserFactory.updatePassword(credential);
	};

	this.setDisplayRoles = function(user)
	{
		var rolesLabel = '';
		if(user && user.roles)
		{
			var descriptions = _.pluck(user.roles, 'description');
			rolesLabel = _(descriptions).toString();
		}
		user.rolesLabel = rolesLabel;
	};

	this.getUserRoleNames = function(user)
	{
		var roleNameVal = '';
		if(user && user.roles)
		{
			var roleNames = _.pluck(user.roles, 'name');
			roleNameVal = _(roleNames).toString();
		}
		return roleNameVal;
	};

	this.setDisplayAttributes = function(users)
	{
		for(var i=0; i< users.length; i++)
		{
			var user = users[i];
			this.setDisplayRoles(user);
			this.setStatusByActiveFlag(user);
		}
	};

	this.isApproved = function(user)
	{
		return user.isActivated;
	};
	
	this.approveUser = function(user)
	{
		user.isActivated = true;
		this.setStatusByActiveFlag(user);
	};
	
	this.rejectUser = function(user)
	{
		user.isActivated = false;
		this.setStatusByActiveFlag(user);
	};

	this.resetPassword = function(usercredential)
	{
		return UserFactory.resetPassword(usercredential);
	};

	this.logoutUser = function()
	{
		var accessToken = Session.getAccessToken();
		if(CommonUtil.isNotUndefinedOrNull(accessToken))
		{
			return UserFactory.logout(accessToken);
		}
		return undefined;
	};

	this.isUsernameAvailable = function(username)
	{
		return UserFactory.queryUsernameAvailbility(username);
	};

	this.setStatusByActiveFlag = function(user)
	{
		var flag = user.isActivated;
		if(flag)
		{
			user.status =  'Approved';
		}
		else
		{
			user.status = 'Not Approved';
		}
	};

}]);
