angular.module('cordovaData.geolocation', [])
/**
 * @ngdoc directive
 * @name cordovaGeolocation
 * @data Current Device location
 * @restrict A
 *
 * @description
 * Checks the current position of the device.
 * The directive watches the position and update the scopes on changes.
 * 
 * @pluginId org.apache.cordova.geolocation
 * @pluginUrl https://github.com/apache/cordova-plugin-geolocation/blob/master/doc/index.md
 * @pluginInstall 
 * ```bash
 * cordova plugin add org.apache.cordova.geolocation
 * ```
 * @pluginVersion r0.3.12
 *
 * @param {expression} cordovaGeolocation
 * [Expression](https://docs.angularjs.org/guide/expression) which evaluates to an object
 * whose keys are sent to the plugins and affect position retrieval. Check the [official guide](https://github.com/apache/cordova-plugin-geolocation/blob/master/doc/index.md#geolocationoptions) for more info. see examples.
 *
 * @example
 * ```html
 * <div cordova-geolocation>
 * Current latitude is {{position.coords.latitude}}.
 * </div>
 * ```
 * @example
 * ```html
 * <div cordova-geolocation="{ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true }">
 * Current latitude is {{position.coords.latitude}}.
 * </div>
 * ```
 */
.directive('cordovaGeolocation', ['$document', '$window', '$timeout', function($document, $window, $timeout) {
    function watch(scope, geolocationOptions) {
        return $window.navigator.geolocation.watchPosition(function(position) {
            $timeout(function() {
                scope.geolocation = position;
            });
        }, function() {
            $timeout(function() {
                scope.geolocation = undefined;
            });
        }, geolocationOptions);
    }
    
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            $document[0].addEventListener("deviceready", function() {
                if ($window.navigator.geolocation.watchPosition !== undefined) {
                    var watchID;
                    
                    if (attrs.cordovaGeolocation === "") {
                        watchID = watch(scope);
                    } else {
                        scope.$watchCollection(attrs.cordovaGeolocation, function(geolocationOptions) {
                            if (watchID !== undefined) {
                                $window.navigator.geolocation.clearWatch(watchID);
                            }

                            watchID = watch(scope, geolocationOptions);
                        });
                    }
                    
                    scope.$on('$destroy', function() {
                        if (watchID !== undefined) {
                            $window.navigator.geolocation.clearWatch(watchID);
                        }
                    });
                }
            }, false);
        }
    };
}]);