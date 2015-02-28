angular.module('cordovaData.deviceMotion', [])
/**
 * @ngdoc directive
 * @name cordovaDeviceMotion
 * @data Current Device Motion
 * @restrict A
 *
 * @description
 * Checks the change (delta) in movement relative to the current device orientation, in three dimensions along the x, y, and z axis.
 * The directive watches the movement and update the scopes on changes.
 * 
 * @pluginId org.apache.cordova.device-motion
 * @pluginUrl https://github.com/apache/cordova-plugin-device-motion/blob/master/doc/index.md
 * @pluginInstall 
 * ```bash
 * cordova plugin add org.apache.cordova.device-motion
 * ```
 * @pluginVersion r0.2.11
 *
 * @param {expression} cordovaDeviceMotion
 * [Expression](https://docs.angularjs.org/guide/expression) which evaluates to number
 * that represent the frequency of updates. Check the [official guide](https://github.com/apache/cordova-plugin-device-motion/blob/master/doc/index.md#navigatoraccelerometerwatchacceleration) for more info. Default value is frequency=10000. see examples.
 *
 * @example
 * ```html
 * <div cordova-device-motion>
 * Current acceleration is updating every 10 seconds and the x axis is {{deviceMotion.x}}.
 * </div>
 * ```
 * @example
 * ```html
 * <div cordova-device-orientation="100">
 * Current acceleration is updating every 100 millis and the x axis is {{deviceMotion.x}}.
 * </div>
 * ```
 */
.directive('cordovaDeviceMotion', ['$window', '$timeout', function($window, $timeout) {
    function watch(scope, frequency) {
        return $window.navigator.accelerometer.watchAcceleration(function(acceleration) {
            $timeout(function() {
                scope.deviceMotion = acceleration;
            });
        }, function() {
            $timeout(function() {
                scope.deviceMotion = undefined;
            });
        }, frequency !== undefined ? {frequency: frequency} : undefined );
    }
    
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            document.addEventListener("deviceready", function() {
                if ($window.navigator.accelerometer.watchAcceleration !== undefined) {
                    var watchID;
                    
                    if (attrs.cordovaDeviceMotion === "") {
                        watchID = watch(scope);
                    } else {
                        scope.$watchCollection(attrs.cordovaDeviceMotion, function(frequency) {
                            if (watchID !== undefined) {
                                $window.navigator.accelerometer.clearWatch(watchID);
                            }

                            watchID = watch(scope, frequency);
                        });
                    }
                    
                    scope.$on('$destroy', function() {
                        if (watchID !== undefined) {
                            $window.navigator.accelerometer.clearWatch(watchID);
                        }
                    });
                }
            }, false);
        }
    };
}]);