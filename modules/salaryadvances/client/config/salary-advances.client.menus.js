(function () {
  'use strict';

  angular
    .module('salaryAdvances')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Ứng lương',
      state: 'salaryAdvances',
      type: 'dropdown',
      roles: ['user','admin','manager']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'salaryAdvances', {
      title: 'Danh sách ứng lương',
      state: 'listSalaryAdvances',
      roles: ['user']
    });
    menuService.addSubMenuItem('topbar', 'salaryAdvances', {
      title: 'Thực hiện ứng lương',
      state: 'createSalaryAdvances',
      roles: ['*']
    });
    
  }
}());
