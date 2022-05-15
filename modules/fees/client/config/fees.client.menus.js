(function () {
  'use strict';

  angular
    .module('fees')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Phí ứng',
      state: 'fees',
      type: 'dropdown',
      roles: ['admin', 'manager', 'user']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'fees', {
      title: 'Danh sách phí ứng',
      state: 'listFees',
      roles: ['*']
    });
    menuService.addSubMenuItem('topbar', 'fees', {
      title: 'Thêm mới phí ứng',
      state: 'createFees',
      roles: ['admin']
    });
    
  }
}());
