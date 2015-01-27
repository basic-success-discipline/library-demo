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

  it('should return item.copy to original item state when calling refreshEditItemView', 
    function() {
      scope.refreshEditItemView();
      expect(scope.item.copy).toEqual(scope.item.obj);
    });

  it('should toggle editMode when calling toggleEditMode', 
    function() {
      var refreshEditItemView = spyOn(scope, "refreshEditItemView");

      scope.toggleEditMode(true);
      expect(scope.editMode).toEqual(true);

      scope.toggleEditMode(false);
      expect(scope.editMode).toEqual(false);
      expect(refreshEditItemView).toHaveBeenCalled();
      expect(scope.edits.obj).toEqual({});
    });

  it('should do all the right stuff when calling saveEdit', 
    function() {
     
    });
})