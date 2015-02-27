angular.module('cordovaData.appVersion', [])
.directive('cordovaAppVersion', ['$window', '$timeout', function($window, $timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            document.addEventListener("deviceready", function() {
                $timeout(function() {
                    scope.appVersion = {};

                    if ($window.cordova.getAppVersion.getVersionNumber !== undefined) {
                        $window.cordova.getAppVersion.getVersionNumber(function (version) {
                            scope.appVersion.number = version;
                        });
                    }

                    if ($window.cordova.getAppVersion.getVersionCode !== undefined) {
                        $window.cordova.getAppVersion.getVersionCode(function (code) {
                            scope.appVersion.code = code;
                        });
                    }
                });
            }, false);
        }
    };
}]);
