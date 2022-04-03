(function () {
  'use strict';
  angular
    .module('salaries')
    .factory('Salaries', Salaries);
  Salaries.$inject = ['$resource'];
  function Salaries($resource) {
    var Salaries = $resource('/api/salaries/:salaryId', {
      salaryId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
    return Salaries;

  }
}());
