(function () {
  'use strict';
  angular
    .module('fees')
    .factory('Fees', Fees);
    Fees.$inject = ['$resource'];
  function Fees($resource) {
    var Fees = $resource('/api/fees/:feeId', {
      feeId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
    return Fees;

  }
}());
