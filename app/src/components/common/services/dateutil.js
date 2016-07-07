'use strict';

angular.module('sas-ux.components.common.services').service('DateUtil', ['moment', function(moment) {
	var now = moment();
	var dateFormat = 'DD/MM/YYYY';
	var dateTimeFormat = 'DD/MM/YYYY HH:mm';
	var weekDaysMap = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	
	this.getCurrentDateTime = function()
	{
		return now.toDate();
	};

	this.getCurrentDate = function()
	{
		return now.startOf('day').toDate();
	};
	
	this.getFormattedDate = function(date)
	{
	  var dateMoment = moment(date);
	  return dateMoment.format(dateFormat);
	};
	
	this.getFormattedDateTime = function(date)
	{
	  var dateMoment = moment(date);
	  return dateMoment.format(dateTimeFormat);
	};
	
	this.getDatePlusDays = function(date, days)
	{
		var dateMoment = moment(date);
		dateMoment.add(days, 'days');
		return dateMoment.toDate();
	};
	
	this.getDateMinusDays = function(date, days)
	{
		var dateMoment = moment(date);
		dateMoment.subtract(days, 'days');
		return dateMoment.toDate();
	};
	
	this.getDaysBetweenDates = function(startDate, endDate)
	{
		var startDateMoment = moment(startDate);
		var endDateMoment = moment(endDate);
		return endDateMoment.diff(startDateMoment, 'days');
	};
	
	this.getWeekDayOfDate = function(date)
	{
		var dateMoment = moment(date);
		var weekDayNumber = date.weekday();
		return weekDaysMap[weekDayNumber];
	};
	
	this.isFirstDateBeforeSecondDate = function(date1, date2)
	{
		var date1Moment = moment(date1);
		var date2Moment = moment(date2);
		return date1Moment.isBefore(date2Moment);
	};
	
	this.isWeekEndDate = function(date)
	{
		var dateMoment = moment(date);
		var weekDayNumber = dateMoment.weekday();
		alert(weekDayNumber);
		return (weekDayNumber === 0  || weekDayNumber == 6);
	};
}]);