(function(window, angular, undefined) {
'use strict';
angular.module('cordovaData', ['cordovaData.appVersion', 'cordovaData.battery', 'cordovaData.device', 'cordovaData.network']);

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

})(window, window.angular);