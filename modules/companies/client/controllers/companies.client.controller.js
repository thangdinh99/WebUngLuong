(function () {
  'use strict';

  angular
    .module('companies')
    .controller('CompaniesController', CompaniesController);

  CompaniesController.$inject = ['$scope', '$state', '$location', 'Authentication', 'Notification', 'Companies', '$http', 'NgTableParams', "$filter"];

  function CompaniesController($scope, $state, $location, Authentication, Notification, Companies, $http, NgTableParams, $filter) {
    const vm = this;
    vm.authentication = Authentication;
    vm.init = () => {
      $http.get('/api/companies').then(response => {
        console.log('123');
        vm.companies = response.data;

      });
      console.log('123');
      var data = [{ name: "Moroni", age: 50 },
      { name: "Tiancum", age: 43 },
      { name: "Jacob", age: 27 },
      { name: "Nephi", age: 29 },
      { name: "Enos", age: 34 },
      { name: "Tiancum", age: 43 },
      { name: "Jacob", age: 27 },
      { name: "Nephi", age: 29 },
      { name: "Enos", age: 34 },
      { name: "Tiancum", age: 43 },
      { name: "Jacob", age: 27 },
      { name: "Nephi", age: 29 },
      { name: "Enos", age: 34 },
      { name: "Tiancum", age: 43 },
      { name: "Jacob", age: 27 },
      { name: "Nephi", age: 29 },
      { name: "Enos", age: 34 }];
      vm.tableParams = new NgTableParams({}, { dataset: data});  

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
