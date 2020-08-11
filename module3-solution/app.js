(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItemsDirective);

  function FoundItemsDirective(){
    var ddo = {
      restrict: 'E',
      templateUrl: 'foundItems.html',
      scope : {
        foundItems: '<',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'narrowIt',
      bindToController: true
    };

    return ddo;
  }

  function FoundItemsDirectiveController() {
      var narrowIt = this;

      narrowIt.isEmptyItems = function() {
          if (narrowIt.foundItems !== undefined && narrowIt.foundItems.length === 0) {
              return true;
          }
          return false;
      };
    }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService){
    var ctrl = this;

    // ctrl.searchTerm = "";
    // ctrl.found = [];

    ctrl.search = function(){
      //console.log(ctrl.searchTerm);
      var promise = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);

      promise.then(function (response) {
        ctrl.found = response;
        console.log(ctrl.found);
      })

    }

    ctrl.removeItem = function(index){
      ctrl.found.splice(index, 1);
    }

  }

  MenuSearchService.$inject=['$http'];
  function MenuSearchService($http){
    var service = this;

    service.getMatchedMenuItems = function(searchTerm) {
      return $http({
        method: "GET",
        url: "https://davids-restaurant.herokuapp.com/menu_items.json"
      })
      .then(function (result){
        var foundItems = [];
        if (searchTerm !== undefined && searchTerm.length > 0){
          var items = result.data;
          console.log('items', items);
          searchTerm = searchTerm.toLowerCase();

          for (let i in items.menu_items) {

            if (items.menu_items[i].description.indexOf(searchTerm) !== -1){
              foundItems.push(items.menu_items[i]);
            }
          }
        }
        console.log('found', foundItems);
        return foundItems;
      })

    }

  }


})();
