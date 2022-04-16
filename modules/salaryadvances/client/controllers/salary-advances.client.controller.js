(function () {
  'use strict';

  angular
    .module('salaryAdvances')
    .controller('SalaryAdvancesController', SalaryAdvancesController);

    SalaryAdvancesController.$inject = ['$scope', '$state', '$location', 'Authentication', 'Notification', 'SalaryAdvances', 'AdminService', '$http', 'NgTableParams', "$filter", 'ConfirmModal'];

  function SalaryAdvancesController($scope, $state, $location, Authentication, Notification, SalaryAdvances, AdminService, $http, NgTableParams, $filter, ConfirmModal) {
    const vm = this;
    vm.authentication = Authentication;
    vm.salaryAdvances = {};

    vm.getAllUser = () => {
      AdminService.query(function (data) {
        vm.users = data;
        console.log(vm.users);
      });
    }
    vm.init = () => {
      SalaryAdvances.query((data) => {
        console.log(data);
        vm.salaryAdvances = data
        vm.salaryAdvanceTable = new NgTableParams({}, { dataset: vm.salaryAdvances })
      });
    }

    vm.create = () => {
      const salaryAdvances = new SalaryAdvances(vm.salaryAdvances)
      return salaryAdvances
        .$save()
        .then(() => {
          $location.path('/salaryAdvances/create')
          Notification.success(`Tạo chấm công thành công`)
          // $state.reload()
        })
        .catch((err) => {
          Notification.error({ message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Có lỗi xảy ra!' });
        })
        .finally(() => {

        })
    }

    vm.findOne = () => {
      console.log($state.params.salaryAdvanceId);
      SalaryAdvances.get({
        salaryAdvanceId: $state.params.salaryAdvanceId
      }, (data) => {
        console.log(data);
        vm.salaryAdvances = data
        
      })
    }

    vm.update = () => {

      vm.salaryAdvances
        .$update()
        .then(() => {
          Notification.success(`Cập nhật chấm công thành công`)
          $state.go('listSalaryAdvances')
        })
        .catch(
          (err) => {
            Notification.error({ message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Có lỗi xảy ra!' });
          }
        )
    }

    vm.remove = (index, salaryAdvance) => {

      ConfirmModal.show(
      ).then(() => {
        salaryAdvance
          .$remove()
          .then(() => {
            Notification.success(`Xóa chấm công thành công`)
            $state.reload()
          })
          .catch(
            (err) => {
              Notification.error({ message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Có lỗi xảy ra!' });
            }
          )
      })
    }
  }
}());
