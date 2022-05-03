(function () {
  'use strict';

  angular
    .module('users.admin')
    .controller('UserCreateController', UserCreateController);

  UserCreateController.$inject = ['$scope', '$state', '$window', 'Authentication', 'Notification', 'Companies','Salaries', 'AdminService'];

  function UserCreateController($scope, $state, $window, Authentication, Notification, Companies,Salaries, AdminService) {
    const vm = this;
    vm.authentication = Authentication;
    vm.user = {};
    vm.init = () => {
      Salaries.query().$promise.then(function (data) {
        vm.salaries = data;
        console.log(vm.salaries);
      });
      Companies.query().$promise.then(function (data) {
        vm.companies = data;
        console.log(vm.companies);
      });
      if(!vm.authentication.user.roles.includes('admin')){
        vm.user.company = vm.authentication.user.company;
      }
    }
    vm.create = () => {
      if(vm.authentication.user.roles.includes('manager')){
        vm.user.roles = ['user'];
      }
     
      if(!vm.user.username){
        return Notification.error({ message: 'Bạn chưa nhập tên đăng nhập', title: '<i class="glyphicon glyphicon-remove"></i> Có lỗi xảy ra!' });
      }
      if(!vm.user.password){
        return Notification.error({ message: 'Bạn chưa nhập mật khẩu', title: '<i class="glyphicon glyphicon-remove"></i> Có lỗi xảy ra!' });
      }
      if(!vm.user.email){
        return Notification.error({ message: 'Bạn chưa nhập email', title: '<i class="glyphicon glyphicon-remove"></i> Có lỗi xảy ra!' });
      }
      if(!vm.user.phone){
        return Notification.error({ message: 'Bạn chưa nhập số điện thoại', title: '<i class="glyphicon glyphicon-remove"></i> Có lỗi xảy ra!' });
      }
      if(!vm.user.address){
        return Notification.error({ message: 'Bạn chưa nhập địa chỉ', title: '<i class="glyphicon glyphicon-remove"></i> Có lỗi xảy ra!' });
      }
      if(!vm.user.roles){
        return Notification.error({ message: 'Bạn chưa chọn quyền', title: '<i class="glyphicon glyphicon-remove"></i> Có lỗi xảy ra!' });
      }
      if(!vm.user.company){
        return Notification.error({ message: 'Bạn chưa chọn công ty', title: '<i class="glyphicon glyphicon-remove"></i> Có lỗi xảy ra!' });
      }

      console.log(vm.user);
      const user = new AdminService(vm.user);
      user.$save()
        .then(() => {
          Notification.success(`Tạo tài khoản thành công`)
          vm.user = {}
          // $state.go('listUsers')
        })
        .catch((err) => {
          Notification.error({ message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Có lỗi xảy ra!' });
        });
    }
  }
}());
