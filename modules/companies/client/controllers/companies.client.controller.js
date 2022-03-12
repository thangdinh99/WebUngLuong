(function () {
  'use strict';

  angular
    .module('companies')
    .controller('CompaniesController', CompaniesController);

    CompaniesController.$inject = ['$scope', 'Authentication','Notification','Companies'];

  function CompaniesController($scope, Authentication,Notification,Companies) {
    console.log("xin chàoooooooooo");
    const vm=this;
    vm.authentication = Authentication;
    vm.init = ()=>{
      const a = _.last([1,2,3])
      console.log(a)
      Notification.error({message: ' Successfully signed in!'});
    }

    vm.create = ()=>{
      const companies = new Companies(vm.companies)
      console.log(companies);

    }
    

  }
}());
