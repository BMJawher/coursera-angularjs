(function () {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService){
    var list1 = this;

    list1.toBuyItems = ShoppingListCheckOffService.getToBuyItems();

    list1.buyItem = function(itemIndex){
      ShoppingListCheckOffService.buyItem(itemIndex);
    }
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService){
    var list2 = this;

    list2.boughtItems = ShoppingListCheckOffService.getBoughtItems();
  }

  function ShoppingListCheckOffService(){
    var service = this;

    var toBuyItems = [
      { name: "cookies", quantity: 10 },
      { name: "milk", quantity: 2 },
      { name: "donuts", quantity: 5 },
      { name: "chocolate", quantity: 3 },
      { name: "bread", quantity: 4 }
    ];
    var boughtItems = [];

    service.getToBuyItems = function(){ return toBuyItems;}
    service.getBoughtItems = function(){ return boughtItems;}

    service.buyItem = function(itemIndex){
      boughtItems.push(toBuyItems[itemIndex]);
      toBuyItems.splice(itemIndex, 1);
    }


  }
})();
