(function () {
  'use strict';

  angular
    .module('shifts')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('createShifts', {
        url: '/shifts/create',
        templateUrl: '/modules/shifts/client/views/create-shift.client.view.html',
      })
      .state('listShifts', {
        url: '/shifts/list',
        templateUrl: '/modules/shifts/client/views/list-shifts.client.view.html',
      })
      .state('editShifts', {
        url: '/shifts/:shiftId',
        templateUrl: '/modules/shifts/client/views/edit-shift.client.view.html',
      });
  }

}());
