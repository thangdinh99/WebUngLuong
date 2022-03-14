(function () {
  'use strict';
  angular
    .module('companies')
    .factory('Companies', Companies);
  Companies.$inject = ['$resource'];
  function Companies($resource) {
    var Companies = $resource('/api/companies/:companyId', {
      companyId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
    return Companies;

  }
}());
