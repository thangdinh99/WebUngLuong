(function () {
  'use strict';
  angular
    .module('salaryAdvances')
    .factory('SalaryAdvances', SalaryAdvances);
    SalaryAdvances.$inject = ['$resource'];
  function SalaryAdvances($resource) {
    var SalaryAdvances = $resource('/api/salaryAdvances/:salaryAdvanceId', {
      salaryAdvanceId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
    return SalaryAdvances;

  }
}());
