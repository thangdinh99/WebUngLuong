(function () {
  'use strict';

  angular
    .module('salaries')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Bậc lương',
      state: 'salaries',
      type: 'dropdown',
      roles: ['admin','manager']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'salaries', {
      title: 'Danh sách bâc lương',
      state: 'listSalaries',
      roles: ['*']
    });
    menuService.addSubMenuItem('topbar', 'salaries', {
      title: 'Thêm mới bậc lương',
      state: 'createSalaries',
      roles: ['*']
    });
    
  }
}());
