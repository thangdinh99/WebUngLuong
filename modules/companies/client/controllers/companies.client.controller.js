(function () {
  'use strict';

  angular
    .module('companies')
    .controller('CompaniesController', CompaniesController);

  CompaniesController.$inject = ['$scope', '$state', '$location', 'Authentication', 'Notification', 'Companies', '$http', 'NgTableParams', "$filter", 'ConfirmModal'];

  function CompaniesController($scope, $state, $location, Authentication, Notification, Companies, $http, NgTableParams, $filter, ConfirmModal) {
    const vm = this;
    vm.authentication = Authentication;

    vm.init = () => {
      Companies.query((data) => {
        console.log(data);
        vm.companies = data
        vm.companyTable = new NgTableParams({}, { dataset: vm.companies })
      });
    }

    vm.create = () => {
      const companies = new Companies(vm.companies)
      return companies
        .$save()
        .then(() => {
          $location.path('/companies/create')
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
      console.log($state.params.companyId);
      Companies.get({
        companyId: $state.params.companyId
      }, (data) => {
        vm.companies = data
      })
    }

    vm.update = () => {
      console.log('123');
      vm.companies
        .$update()
        .then(() => {
          Notification.success(`Cập nhật công ty thành công`)
          $state.go('listCompanies')
        })
        .catch(
          (err) => {
            Notification.error({ message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Có lỗi xảy ra!' });
          }
        )
    }

    vm.remove = (index,company) => {
      
      ConfirmModal.show(
      ).then(() => {
        company
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
