'use strict';

angular.module('cordovaDataSite', [
    'ngAnimate',
    'ui.router',
    'cordovaDataSite.filters',
    'cordovaDataSite.services',
    'cordovaDataSite.directives',
    'cordovaDataSite.controllers'
])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
    .otherwise('/');
    
    $stateProvider
    .state('main', {
        url: "/",
        views: {
            main: {
                templateUrl: 'partials/main.html',
                controller: 'CommonController'
            }
        }
    })
    .state('download', {
        url: "/download",
        views: {
            main: {
                templateUrl: 'partials/download.html'
            }
        }
    })
    .state('api', {
        url: "/api",
        views: {
            main: {
                templateUrl: 'partials/api.html',
                controller: 'CommonController'
            }
        }
    });
}]);