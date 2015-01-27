describe('Unit: itemListCtrl', function() {
  // Load the module with MainController
  beforeEach(module('myApp'));

  var ctrl, 
  scope,
  sharedProperties;
  // inject the $controller and $rootScope services
  // in the beforeEach block
  beforeEach(inject(function($controller, $rootScope, _sharedProperties_) {
    // Create a new scope that's a child of the $rootScope
    scope = $rootScope.$new();
    // Create the controller
    sharedProperties = _sharedProperties_;
        ctrl = $controller('itemListCtrl', {
      $scope: scope,
      sharedProperties: sharedProperties
    });
  }));

  it('should create $scope.greeting when calling sayHello', 
    function() {
      expect(scope.greeting).toBeUndefined();
      scope.sayHello();
      expect(scope.greeting).toEqual("Hello, world");
  });

  it('should set the item when calling showEditItemView', 
    function() {
      var item = "test item";
      scope.showEditItemView(item);
      expect(sharedProperties.getEditItem()).toEqual(item); 
  });





})