(function () {
  'use strict';

  angular
    .module('shifts')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Chấm công',
      state: 'shifts',
      type: 'dropdown',
      roles: ['admin']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'shifts', {
      title: 'Danh sách chấm công',
      state: 'listShifts',
      roles: ['*']
    });
    menuService.addSubMenuItem('topbar', 'shifts', {
      title: 'Thêm mới chấm công',
      state: 'createShifts',
      roles: ['*']
    });
    
  }
}());
