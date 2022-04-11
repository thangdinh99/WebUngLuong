(function () {
  'use strict';
  angular
    .module('shifts')
    .factory('Shifts', Shifts);
    Shifts.$inject = ['$resource'];
  function Shifts($resource) {
    var Shifts = $resource('/api/shifts/:shiftId', {
      shiftId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
    return Shifts;

  }
}());
