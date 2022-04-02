(function () {
  'use strict';

  angular
    .module('companies')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Công ty',
      state: 'companies',
      type: 'dropdown',
      roles: ['admin']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'companies', {
      title: 'Danh sách công ty',
      state: 'listCompanies',
      roles: ['*']
    });
    menuService.addSubMenuItem('topbar', 'companies', {
      title: 'Thêm mới công ty',
      state: 'createCompanies',
      roles: ['*']
    });
    
  }
}());
