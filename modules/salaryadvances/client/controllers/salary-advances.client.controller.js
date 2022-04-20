(function () {
  'use strict';

  angular
    .module('salaryAdvances')
    .controller('SalaryAdvancesController', SalaryAdvancesController);

  SalaryAdvancesController.$inject = ['$scope', '$state', '$location', 'Authentication', 'Notification', 'SalaryAdvances', 'AdminService', '$http', 'NgTableParams', "$filter", 'ConfirmModal'];

  function SalaryAdvancesController($scope, $state, $location, Authentication, Notification, SalaryAdvances, AdminService, $http, NgTableParams, $filter, ConfirmModal) {
    const vm = this;
    vm.authentication = Authentication;
    vm.user = Authentication.user;
    console.log(vm.user);
    vm.salaryAdvances = {};
    $scope.$watch('vm.salaryAdvances.moneyAdvance', function () {
      vm.salaryAdvances.moneyAdvance = parseInt(vm.salaryAdvances.moneyAdvance);
    })
    vm.init = async () => {
      SalaryAdvances.query((data) => {
        console.log(data);
        vm.salaryAdvances = data
        vm.salaryAdvanceTable = new NgTableParams({}, { dataset: vm.salaryAdvances })
      });
    }
    vm.getMoneyBefore = async () => {
      await SalaryAdvances.getCurrentSalaryByShifts().$promise.then((response) => {
        vm.salaryAdvances.moneyBefore = response.moneyBefore
      });
    }
    vm.create = () => {
      if (!vm.salaryAdvances.moneyAdvance) {
        Notification.error({ message: 'Vui lòng nhập số tiền ứng' });
        return;
      }
      if (vm.salaryAdvances.moneyAdvance > vm.salaryAdvances.moneyBefore) {
        Notification.error({ message: 'Tổng tiền trước khi ứng lương không đủ' });
        return;
      }
      if (vm.salaryAdvances.moneyAdvance < 0) {
        Notification.error({ message: 'Tổng tiền ứng lương không được âm' });
        return;
      }
      if (vm.salaryAdvances.moneyAdvance % 10000 != 0) {
        Notification.error({ message: 'Tổng tiền ứng lương phải là bội số của 10.000' });
        return;
      }
      const salaryAdvances = new SalaryAdvances(vm.salaryAdvances)
      return salaryAdvances
        .$save()
        .then(() => {
          $location.path('/salaryAdvances/create')
          Notification.success(`Gửi yêu cầu ứng lương thành công`)
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

    vm.accept = (salaryAdvance) => {
      ConfirmModal.show({
        bodyText: 'Đồng ý duyệt yêu cầu ứng lương này ?',
      }).then(() => {
        salaryAdvance.accepted = true
        salaryAdvance
          .$update()
          .then(() => {
            Notification.success(`Chấp nhận yêu cầu ứng lương thành công`)
            $state.reload()
            // $state.go('listSalaryAdvances')
          })
          .catch(
            (err) => {
              Notification.error({ message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Có lỗi xảy ra!' });
            }
          )
      })
    }



    vm.remove = (index, salaryAdvance) => {

      ConfirmModal.show(
      ).then(() => {
        salaryAdvance
          .$remove()
          .then(() => {
            Notification.success(`Hủy bỏ thành công`)
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
