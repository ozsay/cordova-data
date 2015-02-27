angular.module('cordovaData.device', [])
.directive('cordovaDevice', ['$window', '$document', '$timeout', function($window, $document, $timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            $document[0].addEventListener("deviceready", function() {
                $timeout(function() {
                    scope.device = $window.device;
                });
            }, false);
        }
    };
}]);
