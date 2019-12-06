app.controller('MainController',['$scope','MyService',function($scope,MyService){
    MyService.getData().then(function(data){
        $scope.tree = data.children.organisation;
        $scope.tree.forEach(function(element){
            element.checked = false;
            if(element.children.site){
                element.children.site.forEach(function(element){
                    element.checked=false;
                });
            }
        });
    });
    $scope.selectedItems = [];
    $scope.getSelected = function(){
        $scope.selectedItems = [];
        function checkChildren(c) {
            angular.forEach(c.children, function(c){
                if(c.checked){
                    $scope.selectedItems.push({"selected":c.name});
                }
                checkChildren(c);
            });
        }
        angular.forEach($scope.tree, function(value,key){
            if(value.checked){
                $scope.selectedItems.push({"selected":value.name});
            }
            checkChildren(value);
        })
    }
}]);