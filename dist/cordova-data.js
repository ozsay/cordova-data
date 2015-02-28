(function(window, angular, undefined) {
'use strict';
angular.module('cordovaData', ['cordovaData.appAvailability', 'cordovaData.appVersion', 'cordovaData.battery', 'cordovaData.device', 'cordovaData.deviceMotion', 'cordovaData.deviceOrientation', 'cordovaData.geolocation', 'cordovaData.network']);

angular.module('cordovaData.appAvailability', [])
/**
 * @ngdoc directive
 * @name cordovaAppAvailability
 * @data Installed Applications
 * @restrict A
 *
 * @description
 * Checks installed applications
 * 
 * @pluginId com.ohh2ahh.plugins.appavailability
 * @pluginUrl https://github.com/ohh2ahh/AppAvailability
 * @pluginInstall 
 * ```bash
 * cordova plugin add https://github.com/ohh2ahh/AppAvailability.git
 * ```
 * @pluginVersion 0.3.1
 *
 * @param {expression} cordovaAppAvailability
 * [Expression](https://docs.angularjs.org/guide/expression) which evaluates to an
 * object, an array or a string. When string, it is being checked as uri scheme and
 * result accessible from scope.appAvailability.
 * When object, it's values are being checked and accessible as object whose keys are the
 * corresponding keys from the original object.
 * When array, it's elements are being checked and accessible as array whose elements are the
 * results in the same order as the original array. see examples.
 *
 * @example
 * ```html
 * <div cordova-app-availability="'twitter://'">
 * Twitter is {{appAvailability ? '' : 'not'}} available.
 * </div>
 * ```
 * @example
 * ```html
 * <div cordova-app-availability="{twitter: 'twitter://', facebook: 'fb://'}">
 * Twitter is {{appAvailability.twitter ? '' : 'not'}} available.
 * Facebook is {{appAvailability.facebook ? '' : 'not'}} available.
 * </div>
 * ```
 * @example
 * ```html
 * <div cordova-app-availability="['twitter://', 'fb://']">
 * Twitter is {{appAvailability[0] ? '' : 'not'}} available.
 * Facebook is {{appAvailability[1] ? '' : 'not'}} available.
 * </div>
 * ```
 */
.directive('cordovaAppAvailability', ['$window', '$timeout', function($window, $timeout) {
    function checkAndUpdate(uri, scope, key) {
        appAvailability.check(
            uri,
            function() {
                $timeout(function() {
                    if (key !== undefined) {
                        scope.appAvailability[key] = true;
                    } else {
                        scope.appAvailability = true;
                    }
                });
            },
            function() {
                $timeout(function() {
                    if (key !== undefined) {
                        scope.appAvailability[key] = false;
                    } else {
                        scope.appAvailability = false;
                    }
                });
            }
        );
    }
    
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            document.addEventListener("deviceready", function() {
                if ($window.appAvailability.check !== undefined) {
                    scope.$watchCollection(attrs.cordovaAppAvailability, function(apps) {
                        if (angular.isString(apps)) {
                            checkAndUpdate(apps, scope);
                        } else if (angular.isObject(apps) || angular.isArray(apps)){
                            scope.appAvailability = angular.isObject(apps) ? {} : [];
                            angular.forEach(apps, function(app, key) {
                                checkAndUpdate(app, scope, key);
                            });
                        }
                    });
                }
            }, false);
        }
    };
}]);
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
.directive('cordovaGeolocation', ['$window', '$timeout', function($window, $timeout) {
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
            document.addEventListener("deviceready", function() {
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
angular.module('cordovaData.network', [])
/**
 * @ngdoc directive
 * @name cordovaNetwork
 * @data Current Network
 * @restrict A
 *
 * @description
 * Fetches the current network available (WIFI, 3G, etc.).
 * The directive keeps updating the scope on network changes.
 * 
 * @pluginId org.apache.cordova.network-information
 * @pluginUrl https://github.com/apache/cordova-plugin-network-information/blob/master/doc/index.md
 * @pluginInstall 
 * ```bash
 * cordova plugin add org.apache.cordova.network-information
 * ```
 * @pluginVersion r0.2.15
 *
 * @example
 * ```html
 * <div cordova-network>
 * Current network: {{network}}
 * </div>
 * ```
 */
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