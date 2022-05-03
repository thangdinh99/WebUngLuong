(function () {
  'use strict';

  angular
    .module('articles')
    .controller('ArticlesListController', ArticlesListController);

  ArticlesListController.$inject = ['ArticlesService', '$scope', '$state', '$window', 'Authentication', 'Notification'];

  function ArticlesListController(ArticlesService, $scope, $state, $window, Authentication, Notification) {
    var vm = this;
    vm.authentication = Authentication;
    vm.user = Authentication.user;
    vm.articles = ArticlesService.query();
    ;
    vm.articles.$promise.then(function (data) {
      // vm.articles = data
      console.log(data);
      if(vm.user.roles.includes('admin')){
        vm.articles = data;
      }
      else{
        vm.articlesAdmin = _.filter(data,(article)=>{
          return !article.user.company
        })
        vm.articlesInCompany = _.filter(data,(article)=>{
          return article.user.company && (article.user.company._id == vm.user.company)
        })
        vm.articles = vm.articlesAdmin.concat(vm.articlesInCompany)
      }
    });
    // console.log(vm.articles);
    // console.log(vm.user);
    // // _.forEach(vm.articles, function (article) {
    // //   console.log(article);
    // // });
    // // console.log(vm.articles);
    // vm.articles1 = _.filter(vm.articles, function (article) {
    //   return article.title == 'Công ty newman'
    // })
  }
}());
