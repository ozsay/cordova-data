angular.module('cordovaData.battery', [])
.directive('cordovaBattery', ['$window', '$timeout', function($window, $timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            $window.addEventListener("batterystatus", function(info) {
                $timeout(function() {
                    scope.battery = {
                        isPlugged: info.isPlugged,
                        level: info.level
                    };
                });
            }, false);
        }
    };
}]);
