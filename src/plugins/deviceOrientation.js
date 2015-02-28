angular.module('cordovaData.deviceOrientation', [])
/**
 * @ngdoc directive
 * @name cordovaDeviceOrientation
 * @data Current Device Orientation
 * @restrict A
 *
 * @description
 * Checks direction or heading that the device is pointed.
 * The directive watches the direction and update the scopes on changes.
 * 
 * @pluginId org.apache.cordova.device-orientation
 * @pluginUrl https://github.com/apache/cordova-plugin-device-orientation/blob/master/doc/index.md
 * @pluginInstall 
 * ```bash
 * cordova plugin add org.apache.cordova.device-orientation
 * ```
 * @pluginVersion r0.3.11
 *
 * @param {expression} cordovaDeviceOrientation
 * [Expression](https://docs.angularjs.org/guide/expression) which evaluates to an
 * object that represent update options with 'filter' or 'frequency' as keys. Check the [official guide](https://github.com/apache/cordova-plugin-device-orientation/blob/master/doc/index.md#navigatorcompasswatchheading) for more info. Default value is frequency=100. see examples.
 *
 * @example
 * ```html
 * <div cordova-device-orientation>
 * Current heading is updating every 100 millis and is {{deviceOrientation.magneticHeading}}.
 * </div>
 * ```
 * @example
 * ```html
 * <div cordova-device-orientation="{frequency: 500}">
 * Current heading is updating every 500 millis and is {{deviceOrientation.magneticHeading}}.
 * </div>
 * ```
 * @example
 * ```html
 * <div cordova-device-orientation="{filter: 30}">
 * Current heading is {{deviceOrientation.magneticHeading}}.
 * Only updates when the change in degrees is over 30.
 * </div>
 * ```
 */
.directive('cordovaDeviceOrientation', ['$window', '$timeout', function($window, $timeout) {
    function watch(scope, compassOptions) {
        return $window.navigator.compass.watchHeading(function(heading) {
            $timeout(function() {
                scope.deviceOrientation = heading;
            });
        }, function() {
            $timeout(function() {
                scope.deviceOrientation = undefined;
            });
        }, compassOptions);
    }
    
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            document.addEventListener("deviceready", function() {
                if ($window.navigator.compass.watchHeading !== undefined) {
                    var watchID;
                    
                    if (attrs.cordovaDeviceOrientation === "") {
                        watchID = watch(scope);
                    } else {
                        scope.$watchCollection(attrs.cordovaDeviceOrientation, function(compassOptions) {
                            if (watchID !== undefined) {
                                $window.navigator.compass.clearWatch(watchID);
                            }

                            watchID = watch(scope, compassOptions);
                        });
                    }
                    
                    scope.$on('$destroy', function() {
                        if (watchID !== undefined) {
                            $window.navigator.compass.clearWatch(watchID);
                        }
                    });
                }
            }, false);
        }
    };
}]);