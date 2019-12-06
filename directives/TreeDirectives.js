app.directive('nodeTree',function(){
    return{
        template: '<node ng-repeat="node in tree"></node>',
        replace: true,
        restrict: 'E',
        scope: {
            tree: '=children'
        }
    };
});
app.directive('node',function($compile){
    return{
        restrict:'E',
        replace: true,
        templateUrl: 'templates/node.html',
        link: function(scope,element){
            /*
            here we are checking that if current node has children then compiling/rendering children.
            */
           if(scope.node && scope.node.children.site && scope.node.children.site.length > 0){
               scope.node.childrenVisibility = true;
               var childNode = $compile('<ul class="tree" ng-if="!node.childrenVisibility"><node-tree children="node.children.site"></node-tree></ul>')(scope);
               element.append(childNode);
           }else{
               scope.node.childrenVisibility = false;
           }
        },
        controller: ["$scope",function($scope){
            /*This function is for just toggle the visibility of children */
            $scope.toggleVisibility = function(node){
                if(node.children){
                    node.childrenVisibility = !node.childrenVisibility;
                }
            };
            //Here we are marking check/un-check all the nodes.
            $scope.checkNode = function(node){
                node.checked = !node.checked;
                function checkChildren(c){
                    angular.forEach(c.children.site, function(c){
                        c.checked= node.checked;
                      
                    });
                    
                }
                checkChildren(node);
            };
        }]
        
    };
});