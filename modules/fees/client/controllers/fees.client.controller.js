(function () {
  'use strict';

  angular
    .module('fees')
    .controller('FeesController', FeesController);

  FeesController.$inject = ['$scope', '$state', '$location', 'Authentication', 'Notification', 'Fees', '$http', 'NgTableParams', "$filter", 'ConfirmModal'];

  function FeesController($scope, $state, $location, Authentication, Notification, Fees, $http, NgTableParams, $filter, ConfirmModal) {
    const vm = this;
    vm.authentication = Authentication;
    vm.user = Authentication.user;
    vm.fees = {};
    vm.init = () => {
      Fees.query((data) => {
        console.log(data);
        vm.fees = data
        vm.feeTable = new NgTableParams({}, { dataset: vm.fees })
      });
    }

    vm.create = () => {
      if(vm.fees.startMoney >= vm.fees.endMoney){ 
        Notification.error({ message: 'Hạn mốc bắt đầu phí ứng phải nhỏ hơn hạn mốc kết thúc phí ứng' });
        return;
      }
      if(vm.fees.startMoney <= 0 || (vm.fees.startMoney % 1000 != 0)){
        Notification.error({ message: 'Hạn mốc bắt đầu phí ứng phải lớn hơn 0 và chia hết cho 1000' });
        return;
      }
      if(vm.fees.endMoney <= 0 || (vm.fees.endMoney % 1000 != 0)){
        Notification.error({ message: 'Hạn mốc kết thúc phí ứng phải lớn hơn 0 và chia hết cho 1000' });
        return;
      }
      if(vm.fees.feeMoney <= 0 || (vm.fees.feeMoney % 1000 != 0)){
        Notification.error({ message: 'Số tiền phí phải lớn hơn 0 và chia hết cho 1000' });
        return;
      }
      const fees = new Fees(vm.fees)
      return fees
        .$save()
        .then(() => {
          $location.path('/fees/create')
          Notification.success(`Tạo phí ứng thành công`)
          $state.reload()
        })
        .catch((err) => {
          Notification.error({ message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Có lỗi xảy ra!' });
        })
        .finally(() => {

        })
    }

    vm.findOne = () => {
      console.log($state.params.feeId);
      Fees.get({
        feeId: $state.params.feeId
      }, (data) => {
        vm.fees = data
      })
    }

    vm.update = () => {
      if(vm.fees.startMoney >= vm.fees.endMoney){ 
        Notification.error({ message: 'Hạn mốc bắt đầu phí ứng phải nhỏ hơn hạn mốc kết thúc phí ứng' });
        return;
      }
      if(vm.fees.startMoney <= 0 || (vm.fees.startMoney % 1000 != 0)){
        Notification.error({ message: 'Hạn mốc bắt đầu phí ứng phải lớn hơn 0 và chia hết cho 1000' });
        return;
      }
      if(vm.fees.endMoney <= 0 || (vm.fees.endMoney % 1000 != 0)){
        Notification.error({ message: 'Hạn mốc kết thúc phí ứng phải lớn hơn 0 và chia hết cho 1000' });
        return;
      }
      if(vm.fees.feeMoney <= 0 || (vm.fees.feeMoney % 1000 != 0)){
        Notification.error({ message: 'Số tiền phí phải lớn hơn 0 và chia hết cho 1000' });
        return;
      }
      vm.fees
        .$update()
        .then(() => {
          Notification.success(`Cập nhật phí ứng thành công`)
          $state.go('listFees')
        })
        .catch(
          (err) => {
            Notification.error({ message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Có lỗi xảy ra!' });
          }
        )
    }

    vm.remove = (index,fee) => {
      
      ConfirmModal.show(
      ).then(() => {
        fee
          .$remove()
          .then(() => {
            Notification.success(`Xóa phí ứng thành công`)
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
