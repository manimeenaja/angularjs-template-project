'use strict';

/**
 * @ngdoc factory
 * @module sas-ux.components.localstorage
 * @name QueryStudentCtrl
 * @requires $scope, $log, $timeout
 * @description
 * # LocalStorage
 * Service to use the local storage.
 */

angular.module('sas-ux.components.localstorage').factory('LocalStorage', ['$window', '$rootScope', function($window, $rootScope) {
  return {
    setData: function(label, val) {
	     $window.localStorage && $window.localStorage.setItem(label, JSON.stringify(val));
	     return this;
    },
    getData: function(label) {
    	return $window.localStorage && JSON.parse($window.localStorage.getItem(label));
    },
    removeData: function(label) {
    	if(this.getData(label))
    	{
    		$window.localStorage.removeItem(label);
    	}
    },
    clearAll : function() {
    	$window.localStorage.clear();
    }
  };
}]);