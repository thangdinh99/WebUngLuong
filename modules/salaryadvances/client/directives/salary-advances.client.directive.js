(function () {
  'use strict';

  // Users directive used to force lowercase input
  angular
    .module('salaryAdvances')
    .directive('numberOnly', numberOnly);

  function numberOnly() {
    var directive = {
      require: 'ngModel',
      link: link
    };

    return directive;

    function link(scope, element, attrs, modelCtrl) {
      function fromUser(text) {
        if (text) {
          var transformedInput = text.replace(/[^0-9]/g, '');

          if (transformedInput !== text) {
            modelCtrl.$setViewValue(transformedInput);
            modelCtrl.$render();
          }
          return transformedInput;
        }
        return undefined;
      }
      modelCtrl.$parsers.push(fromUser);
    }
  }
}());
