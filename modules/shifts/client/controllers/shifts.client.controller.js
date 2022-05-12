(function () {
  'use strict';

  angular
    .module('shifts')
    .controller('ShiftsController', ShiftsController);

  ShiftsController.$inject = ['$scope', '$state', '$location', 'Authentication', 'Notification', 'Shifts', 'AdminService', '$http', 'NgTableParams', "$filter", 'ConfirmModal'];

  function ShiftsController($scope, $state, $location, Authentication, Notification, Shifts, AdminService, $http, NgTableParams, $filter, ConfirmModal) {
    const vm = this;
    vm.authentication = Authentication;
    vm.user = Authentication.user;
    vm.shifts = {};

    vm.getAllUser = () => {
      AdminService.query(function (data) {
        vm.users = data;
        console.log(vm.users);
      });
    }
    vm.init = () => {
      Shifts.query((data) => {
        console.log(data);

        if (!vm.user.roles.includes('admin')) {
          vm.shifts = _.filter(data, function (shift) {
            return shift.user.company._id == vm.user.company
          })
        }
        else {
          vm.shifts = data;
        }

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
        console.log(data);
        vm.shifts = data
        vm.shifts.startDate = new Date(data.startDate)
        vm.shifts.endDate = new Date(data.endDate)
        vm.shifts.user = data.user._id
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
