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
