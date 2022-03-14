(function () {
  'use strict';

  angular
    .module('companies')
    .controller('CompaniesController', CompaniesController);

  CompaniesController.$inject = ['$scope', '$state', '$location', 'Authentication', 'Notification', 'Companies','$http'];

  function CompaniesController($scope, $state, $location, Authentication, Notification, Companies,$http) {
    const vm = this;
    vm.authentication = Authentication;
    vm.init = () =>{
      $http.get('/api/companies').then(response => {
        console.log('123');
        vm.companies = response.data;
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
          Notification.error(err)
        })
        .finally(() => {
        })
    }


  }
}());
