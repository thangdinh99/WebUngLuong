(function () {
  'use strict';

  angular
    .module('companies')
    .factory('Companies', Coompanies);

    Coompanies.$inject = ['$resource', '$log'];

  function Coompanies($resource) {
    var Coompanies = $resource('/companies/:companyId', {
      companyId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
    return Coompanies;

  }
}());
