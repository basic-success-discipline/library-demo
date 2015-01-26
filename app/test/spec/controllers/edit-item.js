describe('editItemCtrl', function() {
  // Our tests will go here
   beforeEach(module('myApp'));

   var ctrl, scope;

    beforeEach(inject(function($controller, $rootScope) {
    // Create a new scope that's a child of the $rootScope
    scope = $rootScope.$new();
    // Create the controller
    ctrl = $controller('editItemCtrl', {
      $scope: scope
    });
  }));

    it('should only add edit when key is in item.copy', 
    function() {
      var x={};
      var key = "testFailKey";

      expect(scope.edits.obj).toEqual(x);
      scope.addEdit(key);
      expect(scope.edits.obj).toEqual(x);
  });
})