(function () {
    'use strict';
  
    angular
      .module('users.admin')
      .controller('UserCreateController', UserCreateController);
  
    UserCreateController.$inject = ['$scope', '$state', '$window', 'Authentication', 'Notification', 'Companies'];
  
    function UserCreateController($scope, $state, $window, Authentication, Notification, Companies) {
      const vm = this;
      vm.authentication = Authentication;
      vm.user = user;
      vm.init = () => {
        console.log('123');
        Companies.query().$promise.then(function (data) {
            vm.companies = data;
            console.log(vm.companies);
        });

        
      }
    }
  }());
  