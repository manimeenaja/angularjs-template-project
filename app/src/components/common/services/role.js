'use strict';

angular.module('sas-ux.components.common.services').service('RolesService', [ 'LocalStorage', function(LocalStorage)
{
	var allRoles = [ {
		name : 'STU',
		description : 'Student'
	}, {
		name : 'STF',
		description : 'Staff'
	}, {
		name : 'ADMIN',
		description : 'Administrator'
	} ];

	this.findRoleByName = function(name)
	{
		var searchRole;
		if (name)
		{
			for (var i = 0; i < allRoles.length; i++)
			{
				var role = allRoles[i];
				if (role.name.toUpperCase() == name.toUpperCase())
				{
					searchRole = role;
					break;
				}
			}
		}
		return searchRole;
	};

	this.isStudentRole = function(role)
	{
		return (role && role.description == 'Student');
	};

	this.isTeacherRole = function(role)
	{
		return (role && role.description == 'Staff');
	};

	this.isAdminRole = function(role)
	{
		return (role && role.description == 'Administrator');
	};

	this.isStudent = function(name)
	{
		var role = this.findRoleByName(name);
		return (role && role.description == 'Student');
	};

	this.isTeacher = function(name)
	{
		var role = this.findRoleByName(name);
		return (role && role.description == 'Staff');
	};

	this.isAdmin = function(name)
	{
		var role = this.findRoleByName(name);
		return (role && role.description == 'Administrator');
	};

	this.findAllUserTypes = function()
	{
		return allRoles;
	};

	this.getMostSignificantRole = function()
	{
		var roles = LocalStorage.getData('sas-app-roles');
		var singificantRole = undefined;
		if (roles && roles.length > 0)
		{
			for(var i=0; i< roles.length; i++)
			{
				var role = roles[i];
				if(this.isAdminRole(role))
				{
					singificantRole = role.name;
					return singificantRole;
				}
			}
			
			for(var i=0; i< roles.length; i++)
			{
				var role = roles[i];
				if(this.isTeacherRole(role))
				{
					singificantRole = role.name;
					return singificantRole;
				}
			}
			
			for(var i=0; i< roles.length; i++)
			{
				var role = roles[i];
				if(this.isStudentRole(role))
				{
					singificantRole = role.name;
					return singificantRole;
				}
			}
		}
	};

} ]);