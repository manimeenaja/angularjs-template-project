'use strict';

angular.module('sas-ux.components.common.filters').filter('trustSanitize', [ '$sce', function($sce)
{
	return function(html)
	{
		return $sce.trustAsHtml(html);
	}
} ])
