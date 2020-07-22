(function () {
'use strict'

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope){

  $scope.menu = "";
  $scope.color = "";
  $scope.borderColor = "white";


  $scope.menuCheck = function(){
    var items = $scope.menu.split(',');
    console.log("items", items)
    console.log("itemsLength", items.length)
    if ($scope.menu == "") {
      $scope.message = "Please enter data first";
      $scope.color = "red";
      $scope.borderColor = "red";
    }
    else if (items.length <= 3) {
      $scope.message = "Enjoy!";
      $scope.color = "green";
      $scope.borderColor = "green";
    }
    else {
      $scope.message = "Too much!";
      $scope.color = "green";
      $scope.borderColor = "green";
    }
  }

}


})();
