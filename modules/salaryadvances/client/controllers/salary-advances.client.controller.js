(function () {
  'use strict';

  angular
    .module('salaryAdvances')
    .controller('SalaryAdvancesController', SalaryAdvancesController);

  SalaryAdvancesController.$inject = ['$scope', '$state', '$location', 'Authentication', 'Notification', 'SalaryAdvances','Salaries', 'AdminService', '$http', 'NgTableParams', "$filter", 'ConfirmModal'];

  function SalaryAdvancesController($scope, $state, $location, Authentication, Notification, SalaryAdvances,Salaries, AdminService, $http, NgTableParams, $filter, ConfirmModal) {
    const vm = this;
    vm.authentication = Authentication;
    vm.user = Authentication.user;
    console.log(vm.user);
    vm.salaryAdvances = {};
    $scope.$watch('vm.salaryAdvances.moneyAdvance', function () {
      vm.salaryAdvances.moneyAdvance = parseInt(vm.salaryAdvances.moneyAdvance);
    })
    vm.init = async () => {
      vm.salaryAdvances = SalaryAdvances.query()
      vm.salaryAdvances.$promise.then(function (data) {
        if (vm.user.roles.includes('admin')) {
          vm.salaryAdvances = data;
        }
        else {
          vm.salaryAdvances = _.filter(data,(salaryAdvance)=>{
            return salaryAdvance.user.company && (salaryAdvance.user.company._id == vm.user.company)
          })
        }
        vm.salaryAdvanceTable = new NgTableParams({}, { dataset: vm.salaryAdvances })
      });
        
      // SalaryAdvances.query((data) => {
      //   console.log(data);
      //   vm.salaryAdvances = data
      //   vm.salaryAdvanceTable = new NgTableParams({}, { dataset: vm.salaryAdvances })
      // });

    }
    vm.getSalary = async () =>{
      Salaries.get({
        salaryId: vm.user.salary
      }, (data) => {
        vm.currentSalary = data.salary
        console.log(vm.currentSalary);
      })
    }
    vm.getMoneyBefore = async () => {
      await SalaryAdvances.getCurrentSalaryByShifts().$promise.then((response) => {
        vm.salaryAdvances.moneyBefore = response.moneyBefore
        console.log(vm.salaryAdvances.moneyBefore);
      });
    }
    vm.create = () => {
      if (!vm.salaryAdvances.moneyAdvance) {
        Notification.error({ message: 'Vui l??ng nh???p s??? ti???n ???ng' });
        return;
      }
      if (vm.salaryAdvances.moneyAdvance > vm.salaryAdvances.moneyBefore) {
        Notification.error({ message: 'T???ng ti???n tr?????c khi ???ng l????ng kh??ng ?????' });
        return;
      }
      if (vm.salaryAdvances.moneyAdvance < 0) {
        Notification.error({ message: 'T???ng ti???n ???ng l????ng kh??ng ???????c ??m' });
        return;
      }
      if (vm.salaryAdvances.moneyAdvance % 10000 != 0) {
        Notification.error({ message: 'T???ng ti???n ???ng l????ng ph???i l?? b???i s??? c???a 10.000' });
        return;
      }
      const salaryAdvances = new SalaryAdvances(vm.salaryAdvances)
      return salaryAdvances
        .$save()
        .then(() => {
          $location.path('/salaryAdvances/create')
          Notification.success(`G???i y??u c???u ???ng l????ng th??nh c??ng`)
          // $state.reload()
        })
        .catch((err) => {
          Notification.error({ message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> C?? l???i x???y ra!' });
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
        bodyText: '?????ng ?? duy???t y??u c???u ???ng l????ng n??y ?',
      }).then(() => {
        salaryAdvance.accepted = true
        salaryAdvance
          .$update()
          .then(() => {
            Notification.success(`Ch???p nh???n y??u c???u ???ng l????ng th??nh c??ng`)
            $state.reload()
            // $state.go('listSalaryAdvances')
          })
          .catch(
            (err) => {
              Notification.error({ message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> C?? l???i x???y ra!' });
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
            Notification.success(`H???y b??? th??nh c??ng`)
            $state.reload()
          })
          .catch(
            (err) => {
              Notification.error({ message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> C?? l???i x???y ra!' });
            }
          )
      })
    }
  }
}());
