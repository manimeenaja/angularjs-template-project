'use strict';

(function() {
	angular.module('sas-ux.components.fileupload')
	.directive("ngScopeElement", function() {
	  var directiveDefinitionObject = {
	    restrict: "A",
	    compile: function compile(tElement, tAttrs, transclude) {
	      return {
	        pre: function preLink(scope, iElement, iAttrs, controller) {
	          scope[iAttrs.ngScopeElement] = iElement;
	        }
	      };
	    }
	  };
	  return directiveDefinitionObject;
	}).directive('sasFileUpload', function() {
	  return {
	    restrict: 'E',
	    templateUrl : 'src/components/fileupload/sas-file-upload.tpl.html',
	    scope: {
	      fileValue: '='
	    },
	    link: function(scope, el, attrs, cntr)
	    {
	    	var maxFileSizeAllowed = 2100000;
	        scope.list[0].onchange = function(e)
	        {
	          if(this && this.files[0] && this.files[0].size < maxFileSizeAllowed)
			  {
	        	scope.isFileSizeExceeded = false;
	        	var f = this.value;
	        	if (this.files)
	        	{
	        		scope.fileValue = this;
	        		setFileName(f);
	        	}
			  }
	          if(this && this.files[0] && this.files[0].size > maxFileSizeAllowed)
	          {
	        	scope.isFileSizeExceeded = true;
	        	scope.fname = '';
				scope.fileValue = undefined;
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