(function () {
  'use strict';

  angular
    .module('salaryAdvances')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('createSalaryAdvances', {
        url: '/salaryAdvances/create',
        templateUrl: '/modules/salaryAdvances/client/views/create-salary-advance.client.view.html',
        data: {
          roles: ['admin','manager']
        },
      })
      .state('listSalaryAdvances', {
        url: '/salaryAdvances/list',
        templateUrl: '/modules/salaryAdvances/client/views/list-salary-advances.client.view.html',
        data: {
          roles: ['admin','manager']
        },
      })
      .state('editSalaryAdvances', {
        url: '/salaryAdvances/:salaryAdvanceId',
        templateUrl: '/modules/salaryAdvances/client/views/edit-salary-advance.client.view.html',
        data: {
          roles: ['admin','manager']
        },
      });
  }

}());
