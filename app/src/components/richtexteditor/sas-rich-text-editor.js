'use strict';

(function()
{
	angular.module('sas-ux.components.richtexteditor').directive('sasRichText', [ function()
	{
		return {
			restrict : 'A',
			scope : {
				rtv : '='
			},
			link : function(scope, element, attr)
			{
				element.jqte();
				scope.$watch('rtv', function(newVal, oldVal) {
					if(newVal == undefined)
					{
						($('.jqte_editor')[0]).innerText = "";
						($('textarea')[0]).value = "";
					}
					if(newVal && newVal == oldVal)
					{
						($('textarea')[0]).value = newVal;
						element.trigger('change');
					}
				});
				$('.jqte_editor').bind('change blur', function()
				{
					scope.rtv = ($('textarea')[0].value).trim() == "" ? undefined : ($('textarea')[0].value).trim();
				});
				element.bind('change blur', function()
				{
					scope.rtv = ($('textarea')[0].value).trim() == "" ? undefined : ($('textarea')[0].value).trim();
				});
			}
		};
	} ]);
}).call(this);