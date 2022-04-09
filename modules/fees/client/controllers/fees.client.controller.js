(function () {
  'use strict';

  angular
    .module('fees')
    .controller('FeeController', FeesController);

  FeesController.$inject = ['$scope', '$state', '$location', 'Authentication', 'Notification', 'Fees', '$http', 'NgTableParams', "$filter", 'ConfirmModal'];

  function FeesController($scope, $state, $location, Authentication, Notification, Fees, $http, NgTableParams, $filter, ConfirmModal) {
    const vm = this;
    vm.authentication = Authentication;

    vm.init = () => {
      Fees.query((data) => {
        console.log(data);
        vm.fees = data
        vm.feeTable = new NgTableParams({}, { dataset: vm.fees })
      });
    }

    vm.create = () => {
      const fees = new Fees(vm.fees)
      return fees
        .$save()
        .then(() => {
          $location.path('/fees/create')
          Notification.success(`Tạo công ty thành công`)
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
      console.log('123');
      vm.fees
        .$update()
        .then(() => {
          Notification.success(`Cập nhật công ty thành công`)
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
            Notification.success(`Xóa công ty thành công`)
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
