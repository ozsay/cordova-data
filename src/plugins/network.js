angular.module('cordovaData.network', [])
.directive('cordovaNetwork', ['$window', '$document', '$timeout', function($window, $document, $timeout) {
    function updateScope(scope) {
        $timeout(function() {
            scope.network = $window.navigator.connection.type;
        });
    }
    
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            $document[0].addEventListener("deviceready", function() {
                updateScope(scope);
            }, false);
            $document[0].addEventListener("online", function() {
                updateScope(scope);
            }, false);
            $document[0].addEventListener("offline", function() {
                updateScope(scope);
            }, false);
        }
    };
}]);
