'use strict';

angular.module('sas-ux.components.attachmentpicker.controllers').controller('AttachmentsCtrl', [ '$scope', 'CommonUtil', function($scope, CommonUtil)
{
	$scope.files = [];
	var uploadFile = function()
	{
		if($scope.fileValue && $scope.fileValue.files.length > 0)
		{
			$scope.isFileSizeExceeded = false;
			var maxFileSizeAllowed = 2100000;
			var file = $scope.fileValue;
			if(CommonUtil.isUndefinedOrNull(file))
			{
				return;
			}
			var fileName = $scope.fname;
			var fileObject = $scope.fileValue.files[0];
			if(fileObject.size > 2100000)
			{
				$scope.isFileSizeExceeded = true;
				return;
			}
			var newFile = {
					fileVal : fileObject,
					name : fileName
			};
			
			var isFileExists = false;
			
			if ($scope.files && $scope.files.length > 0)
			{
				for (var i = 0; i < $scope.files.length; i++)
				{
					var currFile = $scope.files[i];
					if (angular.equals(currFile, newFile))
					{
						isFileExists = true;
						break;
					}
				}
			}
			if (!isFileExists)
			{
				if(CommonUtil.isUndefinedOrNull($scope.files))
				{
					$scope.files = [];
				}
				$scope.files.push(newFile);
				$scope.fname = '';
				$scope.fileValue = undefined;
			}
		}
	};
	$scope.upload = function()
	{
		if($scope.isFileSizeExceeded)
		{
			$scope.isFileSizeExceeded = false;
			$scope.fname = '';
			$scope.fileValue = undefined;
			return;
		}
		uploadFile();
	};

	$scope.removeFile = function(fileObj)
	{
		if ($scope.files.length > 0)
		{
			for (var i = 0; i < $scope.files.length; i++)
			{
				var currFile = $scope.files[i];
				if (angular.equals(currFile, fileObj))
				{
					$scope.files.splice(i, 1);
					break;
				}
			}
		}
	};
	
	$scope.removeAll = function()
	{
		$scope.files = [];
	}

} ]);
