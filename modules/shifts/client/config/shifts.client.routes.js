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
        data: {
          roles: ['admin','manager']
        },
      })
      .state('listShifts', {
        url: '/shifts/list',
        templateUrl: '/modules/shifts/client/views/list-shifts.client.view.html',
        data: {
          roles: ['admin','manager']
        },
      })
      .state('editShifts', {
        url: '/shifts/:shiftId',
        templateUrl: '/modules/shifts/client/views/edit-shift.client.view.html',
        data: {
          roles: ['admin','manager']
        },
      });
  }

}());
