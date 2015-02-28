angular.module('cordovaData.device', [])
/**
 * @ngdoc directive
 * @name cordovaDevice
 * @data Device Information
 * @restrict A
 *
 * @description
 * Fetches the device information.
 * 
 * @pluginId org.apache.cordova.device 
 * @pluginUrl https://github.com/apache/cordova-plugin-device/blob/master/doc/index.md
 * @pluginInstall 
 * ```bash
 * cordova plugin add org.apache.cordova.device
 * ```
 * @pluginVersion r0.3.0
 *
 * @example
 * ```html
 * <div cordova-device>
 * Device model: {{device.model}}
 * </div>
 * ```
 */
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
