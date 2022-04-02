(function () {
  'use strict';

  angular
    .module('companies')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Companies',
      state: 'companies',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'companies', {
      title: 'List Companies',
      state: 'listCompanies',
      roles: ['*']
    });
    menuService.addSubMenuItem('topbar', 'companies', {
      title: 'Create Companies',
      state: 'createCompanies',
      roles: ['*']
    });
    
  }
}());
