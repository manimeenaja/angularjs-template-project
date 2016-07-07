'use strict';

(function()
{
	angular.module('sas-ux.components.attachmentpicker').directive('sasAttachmentPicker', function()
	{
		return	{
			restrict : 'E',
			templateUrl : 'src/components/attachmentpicker/sas-attachment-picker.tpl.html',
			controller : 'AttachmentsCtrl',
			scope : {
				files : '='
			},
			link : function(scope, el, attrs, cntr)
			{
				var maxFileSizeAllowed = 2100000;
				scope.list[0].onchange = function(e)
				{
					if(this && this.files[0] && this.files[0].size < maxFileSizeAllowed)
					{
						scope.isFileSizeExceeded = false;
					}
					var f = this.value;
					if (this.files)
					{
						scope.fileValue = this;
						setFileName(f);
					}
				};

				function setFileName(f)
				{
					f = f.split('\\');
					scope.fname = f[f.length - 1];
					scope.$apply();
				}
			}
		}
	});
}).call(this);