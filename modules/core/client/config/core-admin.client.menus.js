(function () {
  'use strict';

  angular
    .module('core.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Người dùng',
      state: 'admin',
      type: 'dropdown',
      roles: ['admin']
    });
  }
}());
