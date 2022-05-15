(function () {
  'use strict';

  angular
    .module('fees')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('createFees', {
        url: '/fees/create',
        templateUrl: '/modules/fees/client/views/create-fee.client.view.html',
       
      })
      .state('listFees', {
        url: '/fees/list',
        templateUrl: '/modules/fees/client/views/list-fees.client.view.html',
       
      })
      .state('editFees', {
        url: '/fees/:feeId',
        templateUrl: '/modules/fees/client/views/edit-fee.client.view.html',
      
      });
  }

}());
