'use strict';

angular.module('sas-ux.user.register.controllers')
	.controller('RegistrationCtrl',['$scope', '$state', '$timeout', '$window', 'ClassService', 'RolesService', 'UserService',
		                              function($scope, $state, $timeout, $window, ClassService, RolesService, UserService) {

	$scope.initializeRegistration = function()
	{
		$scope.alerts = [];
		$scope.user = {address : [{addressType : 'permanent'}], roles : [{}]};
		$scope.usernameErrorFlag = undefined;
		$scope.isRegistrationtFormSubmitted = false;
		$scope.alerts = [];
		var promise = ClassService.findAllClasses();
		promise.then(function(response) {
			$scope.userSasClasses = response;
		}, function(response) {
			var message = { type: 'alert radius', msg: 'Failed to load classes. Please try again!' };
			$scope.alerts.push(message);
		});
		$scope.userTypes = _.initial(RolesService.findAllUserTypes());
	};

	$scope.registerUser = function(user)
	{
		if(user.phone)
		{
			user.phoneNo = user.phone.toString();
		}
		user.username = user.emailId;
		$scope.isRegistrationtFormSubmitted = true;
		$scope.alerts = [];
		if($scope.registerForm.$valid)
		{
			user.isActivated = false;
			var responsePromise = UserService.createUser(user);
			responsePromise.then(function(response) {
				var message = { type: 'success radius', msg: 'Registration successful.' };
				$scope.alerts.push(message);
				$scope.resetForm();
			},function(response) {
				var message = { type: 'alert radius', msg: 'Failed to register. Please try again!' };
				$scope.alerts.push(message);
			});
		}
		else
		{
			var message = { type: 'alert radius', msg: 'Please fill all required fields appropriately.' };
			$scope.alerts.push(message);
		}
	};

	$scope.resetForm = function()
	{
		$scope.user = {address : [{addressType : 'permanent'}], roles : [{}]};
		$scope.usernameErrorFlag = undefined;
		$scope.registerForm.$setPristine();
	};

	$scope.isStudent = function()
	{
		return RolesService.isStudentRole($scope.user.roles[0]);
	};
	
	$scope.isTeacher = function()
	{
		return RolesService.isTeacherRole($scope.user.roles[0]);
	};

	$scope.getCssClass = function(ngModelController)
	{
		if(ngModelController && ngModelController.$invalid && ngModelController.$dirty)
		{
			return 'error';
		}
		return '';
	};
	
	$scope.showMessage = function(ngModelController)
	{
		return (ngModelController && ngModelController.$invalid && ngModelController.$dirty);
	};

	$scope.getConfirmPasswordCssClass = function(ngModelController)
	{
		if(ngModelController && (ngModelController.$invalid || $scope.user.confirmPassword != $scope.user.password) && ngModelController.$dirty)
		{
			return 'error';
		}
		return '';
	};
	
	$scope.showConfirmPasswordErrorMessage = function(ngModelController)
	{
		return (ngModelController && (ngModelController.$invalid || $scope.user.confirmPassword != $scope.user.password) && ngModelController.$dirty);
	};
	
	$scope.getUsernameCssClass = function(ngModelController)
	{
		if(ngModelController && ngModelController.$invalid && ngModelController.$dirty)
		{
			return 'error';
		}
		return '';
	};
	
	$scope.showUsernameErrorMessage = function(ngModelController)
	{
		if(!ngModelController.$dirty)
		{
			return;
		}
		$scope.usernameErrorFlag = undefined;
		ngModelController.$invalid = !ngModelController.$valid || ngModelController.$error.pattern;
		if (ngModelController && ngModelController.$dirty && ngModelController.$invalid)
		{
			$scope.usernameErrorFlag = 'required_error';
			return;
		}
		{
			var promise = UserService.isUsernameAvailable($scope.user.emailId);
			promise.then(function(response) {
				if(response)
				{
					$scope.usernameErrorFlag = 'unavailable_error';
					ngModelController.$invalid = true;
				}
				else
				{
					ngModelController.$invalid = false;
				}
			}, function(response) {
				$scope.alerts = [];
				var message = { type: 'alert radius', msg: 'Failed to lookup emailIds. Please try again later.' };
				$scope.alerts.push(message);
			});
		}
	};
	
	$scope.closeAlert = function(index)
	{
		$scope.alerts.splice(index, 1);
	};
}]).controller('UserActivationCtrl',['$scope', '$rootScope', '$state', '$timeout', '$window',  'RolesService', 'UserService',
                                     function($scope, $rootScope, $state, $timeout, $window,  RolesService, UserService) {
	
	$scope.initializeUserActivation = function()
	{
		if(!RolesService.isAdmin($rootScope.role))
		{
			$state.go('dashboard');
			return;
		}
		$scope.alerts = [];
		$scope.initializeAllUsers();
	};
	
	$scope.initializeAllUsers = function()
	{
		var allUsers = [];
		var promise = UserService.findAll();
		promise.then(function(response) {
			allUsers = response;
			UserService.setDisplayAttributes(allUsers);
			$scope.approvalData = {
				users : allUsers
			};
			$scope.filteredUsers = $scope.approvalData.users;
			$scope.paginateUsers();
		}, function(response) {
			var message = { type: 'alert radius', msg: 'Failed to load all users. Please try again!' };
			$scope.alerts.push(message);
		});
	};
	
	$scope.selectAllChanged = function()
	{
		if($scope.approvalData.selectAll)
		{
			for(var i=0; i < $scope.approvalData.users.length; i++)
			{
				var user = $scope.approvalData.users[i];
				user.select = true;
			}
		}
		else
		{
			for(var i=0; i < $scope.approvalData.users.length; i++)
			{
				var user = $scope.approvalData.users[i];
				user.select = false;
			}
		}
		$scope.paginateUsers();
	};
	
	$scope.approveUser = function(user)
	{
		$scope.alerts = [];
		if(UserService.isApproved(user))
		{
			var message = { type: 'info radius', msg: 'User is already approved.'};
			$scope.alerts.push(message);
			return;
		}
		UserService.approveUser(user);
		var promise = UserService.updateUser(user);
		promise.then(function(response) {
			var message = { type: 'success radius', msg: 'User approved successfully.' };
			$scope.alerts.push(message);
			$scope.reloadPage();
			
		},function(response) {
			var message = { type: 'alert radius', msg: 'Approval failed, please try again.' };
			$scope.alerts.push(message);
		});
	};
	
	$scope.rejectUser = function(user)
	{
		$scope.alerts = [];
		if(!UserService.isApproved(user))
		{
			var message = { type: 'info radius', msg: 'User is already disapproved.'};
			$scope.alerts.push(message);
			return;
		}
		UserService.rejectUser(user);
		var promise = UserService.updateUser(user);
		promise.then(function(response) {
			var message = { type: 'success radius', msg: 'User disapproved successfully.' };
			$scope.alerts.push(message);
			$scope.reloadPage();
		},function(response) {
			var message = { type: 'alert radius', msg: 'Disapproval failed, please try again.' };
			$scope.alerts.push(message);
		});
	};
	
	$scope.approveAll = function()
	{
		$scope.alerts = [];
		var approvalUsers = [];
		angular.forEach($scope.approvalData.users, function(user)
		{
			if(user.select && !UserService.isApproved(user))
			{
				UserService.approveUser(user);
				approvalUsers.push(user);
			}
		});
		if(approvalUsers && approvalUsers.length == 0)
		{
			var message = { type: 'info radius', msg: 'There are no users to approve.'};
			$scope.alerts.push(message);
			return;
		}
		
		var promise = UserService.updateUsers(approvalUsers)
		promise.then(function(response) {
			var message = { type: 'success radius', msg: 'Users approved successfully.' };
			$scope.alerts.push(message);
			$scope.reloadPage();
		},function(response) {
			var message = { type: 'alert radius', msg: 'Approval failed, please try again.' };
			$scope.alerts.push(message);
		});
	};
	
	$scope.rejectAll = function()
	{
		$scope.alerts = [];
		var disApprovalUsers = [];
		angular.forEach($scope.approvalData.users, function(user)
		{
			if(user.select && UserService.isApproved(user))
			{
				UserService.rejectUser(user);
				disApprovalUsers.push(user);
			}
		});
		if(disApprovalUsers && disApprovalUsers.length == 0)
		{
			var message = { type: 'info radius', msg: 'There are no users to disapprove.'};
			$scope.alerts.push(message);
			return;
		}
		
		var promise = UserService.updateUsers(disApprovalUsers)
		promise.then(function(response) {
			var message = { type: 'success radius', msg: 'Users disapproved successfully.' };
			$scope.alerts.push(message);
			$scope.reloadPage();
		},function(response) {
			var message = { type: 'alert radius', msg: 'Disapproval failed, please try again.' };
			$scope.alerts.push(message);
		});
	};

	$scope.deleteAll = function()
	{
		$scope.alerts = [];
		var deletedUsers = [];
		angular.forEach($scope.approvalData.users, function(user)
		{
			if(user.select)
			{
				deletedUsers.push(user);
			}
		});
		if(deletedUsers && deletedUsers.length == 0)
		{
			var message = { type: 'info radius', msg: 'There are no users to delete.'};
			$scope.alerts.push(message);
			return;
		}

		var promise = UserService.deleteUsers(deletedUsers);
		promise.then(function(response) {
			var message = { type: 'success radius', msg: 'User(s) are deleted successfully.' };
			$scope.alerts.push(message);
			$scope.reloadPage();
			
		},function(response) {
			var message = { type: 'alert radius', msg: 'Failed to delete User(s), please try again.' };
			$scope.alerts.push(message);
		});
	};

	$scope.selectUserChanged = function(selectedUser)
	{
		if(!selectedUser.select)
		{
			$scope.approvalData.selectAll = false;
		}
		angular.forEach($scope.approvalData.users, function(user)
		{
			if(user.id == selectedUser.id)
			{
				user.select = selectedUser.select;
			}
		});
	};
	
	$scope.closeAlert = function(index)
	{
		$scope.alerts.splice(index, 1);
	};
	
	$scope.paginateUsers = function()
	{
		var usersCopy = angular.copy($scope.filteredUsers);
		$scope.totalItems = usersCopy.length;
		$scope.currentPage = 1;
		$scope.itemsPerPage = 10;
		$scope.currUsers = usersCopy.slice(0, $scope.itemsPerPage);
	};
	
	$scope.pageSelected = function(page)
	{
		var usersCopy = angular.copy($scope.filteredUsers);
		if(page)
		{
			$scope.currentPage = page;
			var startIndex = (page-1) * 6;
			var endIndex = startIndex + 6;
			$scope.currUsers = usersCopy.slice(startIndex, endIndex);
		}
	};
	
	$scope.reloadPage = function()
	{
		$timeout(function() {
			$window.location.reload();
		}, 2000);
	};

}]).controller('ChangePasswordCtrl',['$scope', '$rootScope', '$state', 'RolesService', 'UserService', 'Session',
                                     function($scope, $rootScope, $state, RolesService, UserService, Session) {
	
	$scope.initialzeChangePassword = function()
	{
		$scope.alerts = [];
		$scope.credential = {};
	};
	
	$scope.changePassword = function()
	{
		$scope.alerts = [];
		var userId = Session.getSessionUserId();
		var username = Session.getSessionUser().username;
		$scope.credential.userId = Session.getSessionUserId();
		$scope.credential.username = username;
		$scope.credential.activeFlag = 1;
		if($scope.changePasswordForm.$valid && $scope.credential.password == $scope.credential.confirmPassword)
		{
			var promise = UserService.updatePasswordByUserId(userId,$scope.credential);
			promise.then(function(response) {
				var message = { type: 'success radius', msg: 'Password changed successfully.' };
				$scope.alerts.push(message);
			},function(response) {
				var message = { type: 'alert radius', msg: 'Failed to update password, please try again!' };
				$scope.alerts.push(message);
			});
			$scope.changePasswordForm.$setPristine();
			$scope.credential = {};
		}
		else
		{
			var message = { type: 'alert radius', msg: 'Please enter valid password!'};
			$scope.alerts.push(message);
		}
	};

	$scope.showMessage = function(ngModelController)
	{
		return (ngModelController && ngModelController.$invalid && ngModelController.$dirty);
	};

	$scope.getCssClass = function(ngModelController)
	{
		if(ngModelController && ngModelController.$invalid && ngModelController.$dirty)
		{
			return 'error';
		}
		return '';
	};

	$scope.getConfirmPasswordCssClass = function(ngModelController)
	{
		if(ngModelController && (ngModelController.$invalid || $scope.credential.confirmPassword != $scope.credential.password) && ngModelController.$dirty)
		{
			return 'error';
		}
		return '';
	};
	
	$scope.showConfirmPasswordErrorMessage = function(ngModelController)
	{
		return (ngModelController && (ngModelController.$invalid || $scope.credential.confirmPassword != $scope.credential.password) && ngModelController.$dirty);
	};

	$scope.closeAlert = function(index)
	{
		$scope.alerts.splice(index, 1);
	};
	
}]).controller('AdminChangePasswordCtrl',['$scope', '$rootScope', '$state', 'RolesService', 'UserService', 'Session',
                                     function($scope, $rootScope, $state, RolesService, UserService, Session) {
	
	$scope.initialzeChangePassword = function()
	{
		$scope.alerts = [];
		$scope.credential = {};
	};
	
	$scope.changePassword = function()
	{
		$scope.alerts = [];
		$scope.credential.activeFlag = 1;
		if($scope.changePasswordForm.$valid && $scope.credential.password == $scope.credential.confirmPassword)
		{
			var promise = UserService.updatePassword($scope.credential);
			promise.then(function(response) {
				var message = { type: 'success radius', msg: 'Password changed successfully.' };
				$scope.alerts.push(message);
			},function(response) {
				var message = { type: 'alert radius', msg: 'Failed to update password, please try again!' };
				$scope.alerts.push(message);
			});
			$scope.changePasswordForm.$setPristine();
			$scope.credential = {};
		}
		else
		{
			var message = { type: 'alert radius', msg: 'Please enter valid password!'};
			$scope.alerts.push(message);
		}
	};

	$scope.showMessage = function(ngModelController)
	{
		return (ngModelController && ngModelController.$invalid && ngModelController.$dirty);
	};

	$scope.getCssClass = function(ngModelController)
	{
		if(ngModelController && ngModelController.$invalid && ngModelController.$dirty)
		{
			return 'error';
		}
		return '';
	};

	$scope.getConfirmPasswordCssClass = function(ngModelController)
	{
		if(ngModelController && (ngModelController.$invalid || $scope.credential.confirmPassword != $scope.credential.password) && ngModelController.$dirty)
		{
			return 'error';
		}
		return '';
	};

	$scope.showConfirmPasswordErrorMessage = function(ngModelController)
	{
		return (ngModelController && (ngModelController.$invalid || $scope.credential.confirmPassword != $scope.credential.password) && ngModelController.$dirty);
	};

	$scope.closeAlert = function(index)
	{
		$scope.alerts.splice(index, 1);
	};
	
}]);
