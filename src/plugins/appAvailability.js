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
.directive('cordovaAppAvailability', ['$document', '$window', '$timeout', function($document, $window, $timeout) {
    function checkAndUpdate(uri, scope, key) {
        $window.appAvailability.check(
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
            $document[0].addEventListener("deviceready", function() {
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