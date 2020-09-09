(function (){
  'use strict';

  angular.module('public')
  .controller('myinfoController', myinfoController);

  myinfoController.$inject = ['signupService', 'MenuService', 'ApiPath'];
  function myinfoController(signupService, MenuService, ApiPath){
    var myinfoCtrl = this;

    myinfoCtrl.pref = signupService.getUserPref();
    console.log(myinfoCtrl.pref);
    //console.log(myinfoCtrl.pref.short_name);
    if (myinfoCtrl.pref)
    {MenuService.getMenuItemByShortName(myinfoCtrl.pref.menuNumber).then(function(response){
      myinfoCtrl.favDish = response;
    });}

    myinfoCtrl.basePath = ApiPath;
  }
})();
