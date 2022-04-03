(function () {
  'use strict';

  angular
    .module('salaries')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('createSalaries', {
        url: '/salaries/create',
        templateUrl: '/modules/salaries/client/views/create-salary.client.view.html',
        data: {
          roles: ['admin','manager']
        },
      })
      .state('listSalaries', {
        url: '/salaries/list',
        templateUrl: '/modules/salaries/client/views/list-salaries.client.view.html',
        data: {
          roles: ['admin','manager']
        },
      })
      .state('editSalaries', {
        url: '/salaries/:salaryId',
        templateUrl: '/modules/salaries/client/views/edit-salary.client.view.html',
        data: {
          roles: ['admin','manager']
        },
      });
  }

}());
