(function () {
  'use strict';

  angular
    .module('salaries')
    .controller('SalariesController', SalariesController);

  SalariesController.$inject = ['$scope', '$state', '$location', 'Authentication', 'Notification', 'Salaries', '$http', 'NgTableParams', "$filter", 'ConfirmModal'];

  function SalariesController($scope, $state, $location, Authentication, Notification, Salaries, $http, NgTableParams, $filter, ConfirmModal) {
    const vm = this;
    vm.authentication = Authentication;
    vm.init = () => {
      Salaries.query((data) => {
        vm.salaries = data
        vm.salaryTable = new NgTableParams({}, { dataset: vm.salaries })
      });
    }

    vm.create = () => {
      const salaries = new Salaries(vm.salaries)
      return salaries
        .$save()
        .then(() => {
          $location.path('/salaries/create')
          Notification.success(`Tạo bậc lương thành công`)
          $state.reload()
        })
        .catch((err) => {
          Notification.error({ message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Có lỗi xảy ra!' });
        })
    }

    vm.findOne = () => {
      console.log($state.params.salaryId);
      Salaries.get({
        salaryId: $state.params.salaryId
      }, (data) => {
        vm.salaries = data
      })
    }

    vm.update = () => {
      vm.salaries
        .$update()
        .then(() => {
          Notification.success(`Cập nhật bậc lương thành công`)
          $state.go('listSalaries')
        })
        .catch(
          (err) => {
            Notification.error({ message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Có lỗi xảy ra!' });
          }
        )
    }

    vm.remove = (index, salary) => {

      ConfirmModal.show(
      ).then(() => {
        salary
          .$remove()
          .then(() => {
            Notification.success(`Xóa bậc lương thành công`)
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
