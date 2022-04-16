(function () {
  'use strict';

  angular
    .module('articles')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Thông báo',
      state: 'articles',
      type: 'dropdown',
      roles: ['user','admin', 'manager']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'articles', {
      title: 'Danh sách thông báo',
      state: 'articles.list',
      roles: ['user','admin', 'manager']
    });

    menuService.addSubMenuItem('topbar', 'articles', {
      title: 'Quản lý thông báo',
      state: 'admin.articles.list',
      roles: ['admin','manager']

    });
  }
}());
