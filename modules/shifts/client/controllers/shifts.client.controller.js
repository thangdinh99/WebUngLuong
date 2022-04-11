(function () {
  'use strict';

  angular
    .module('shifts')
    .controller('ShiftsController', ShiftsController);

  ShiftsController.$inject = ['$scope', '$state', '$location', 'Authentication', 'Notification', 'Shifts', 'AdminService', '$http', 'NgTableParams', "$filter", 'ConfirmModal'];

  function ShiftsController($scope, $state, $location, Authentication, Notification, Shifts, AdminService, $http, NgTableParams, $filter, ConfirmModal) {
    const vm = this;
    vm.authentication = Authentication;
    vm.shifts = {};

    vm.getAllUser = () => {
      console.log(moment().format('YYYY-MM-DD'));
      AdminService.query(function (data) {
        vm.users = data;
      });
    }
    vm.init = () => {
      Shifts.query((data) => {
        console.log(data);
        vm.shifts = data
        vm.shiftTable = new NgTableParams({}, { dataset: vm.shifts })
      });
    }

    vm.create = () => {
      if (vm.shifts.startDate && vm.shifts.endDate) {
        if (!moment(vm.shifts.startDate).isBefore(moment(vm.shifts.endDate))) {
          Notification.error({ message: 'Giờ bắt đầu phải nhỏ hơn giờ kết thúc chấm công' });
        }
      }
      const shifts = new Shifts(vm.shifts)
      return shifts
        .$save()
        .then(() => {
          $location.path('/shifts/create')
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
      console.log($state.params.shiftId);
      Shifts.get({
        shiftId: $state.params.shiftId
      }, (data) => {
        vm.shifts = data
      })
    }

    vm.update = () => {

      vm.shifts
        .$update()
        .then(() => {
          Notification.success(`Cập nhật chấm công thành công`)
          $state.go('listShifts')
        })
        .catch(
          (err) => {
            Notification.error({ message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Có lỗi xảy ra!' });
          }
        )
    }

    vm.remove = (index, shift) => {

      ConfirmModal.show(
      ).then(() => {
        shift
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
