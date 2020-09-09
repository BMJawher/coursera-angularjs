(function () {
'use strict';

angular.module('public')
.controller('SignupController', SignupController);

SignupController.$inject = ['MenuService', 'signupService'];
function SignupController(MenuService, signupService){
  var signupCtrl = this;

  signupCtrl.pref = {};

  signupCtrl.submit = function(){
    MenuService.getMenuItemByShortName(signupCtrl.pref.menuNumber)
      .then(function(response){
              console.log(response);
              signupCtrl.favDish = response;
              signupCtrl.valid = true;
              signupCtrl.invalid = false;
              signupService.setUserPref(signupCtrl.pref);
            },
            function(error){
              console.log("no such menu number exists");
              signupCtrl.invalid = true;
              signupCtrl.valid = false;
            });
  }

  signupCtrl.registred = function(){
    if (signupCtrl.valid) {return true;}
    else {return false;}
  }
}

})();
