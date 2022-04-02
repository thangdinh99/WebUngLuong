(function () {
  'use strict';

  angular
    .module('users.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  // Configuring the Users module
  function menuConfig(menuService) {
    menuService.addSubMenuItem('topbar', 'admin', {
      title: 'Danh sách người dùng',
      state: 'admin.users'
    });
    menuService.addSubMenuItem('topbar', 'admin', {
      title: 'Thêm mới ngườii dùng',
      state: 'admin.user-create'
    });
  }
}());
