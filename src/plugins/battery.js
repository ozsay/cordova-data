angular.module('cordovaData.battery', [])
/**
 * @ngdoc directive
 * @name cordovaBattery
 * @data Current Battery Status
 * @restrict A
 *
 * @description
 * Fetches the current battery status.
 * The directive keeps updating the scope on battery changes.
 * 
 * @pluginId org.apache.cordova.battery-status
 * @pluginUrl https://github.com/apache/cordova-plugin-battery-status/blob/master/doc/index.md
 * @pluginInstall 
 * ```bash
 * cordova plugin add org.apache.cordova.battery-status
 * ```
 * @pluginVersion r0.2.12
 *
 * @example
 * ```html
 * <div cordova-battery>
 * Battery level: {{battery.level}}
 * Is device charging?: {{battery.isPlugged}}
 * </div>
 * ```
 */
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
