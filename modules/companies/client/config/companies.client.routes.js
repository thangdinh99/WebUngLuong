(function () {
    'use strict';
  
    angular
      .module('companies')
      .config(routeConfig);
  
    routeConfig.$inject = ['$stateProvider'];
  
    function routeConfig($stateProvider) {
      $stateProvider
        .state('createCompanies', {
          url: '/companies/create',
          templateUrl: '/modules/companies/client/views/create-company.client.view.html',
        })
        .state('listCompanies', {
          url: '/companies/list',
          templateUrl: '/modules/companies/client/views/list-companies.client.view.html',
        })
        .state('editCompanies', {
          url: '/companies/:companyId',
          templateUrl: '/modules/companies/client/views/edit-company.client.view.html',
        });
    }
  
  }());
  