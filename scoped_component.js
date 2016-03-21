$.component("menu", function($scope) {
  $scope(".get").click(function() {
    $scope(".today").html("Soup and sandwiches");
  });
  
  $scope(".reset").click(function() {
    $scope(".today").html("...");
  });
});
