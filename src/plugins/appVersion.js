angular.module('cordovaData.appVersion', [])
/**
 * @ngdoc directive
 * @name cordovaAppVersion
 * @data Application version
 * @restrict A
 *
 * @description
 * Fetches the application version.
 * 
 * @pluginId uk.co.whiteoctober.cordova.appversion
 * @pluginUrl https://github.com/whiteoctober/cordova-plugin-app-version
 * @pluginInstall 
 * ```bash
 * cordova plugin add https://github.com/whiteoctober/cordova-plugin-app-version.git
 * ```
 * @pluginVersion 0.1.5
 *
 * @example
 * ```html
 * <div cordova-app-version>
 * Version number: {{appVersion.number}}
 * Version code: {{appVersion.code}}
 * </div>
 * ```
 */
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
