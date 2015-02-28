'use strict';

angular.module('cordovaDataSite')
.constant('documents', [
    {
        name: 'cordovaAppAvailability',
        type: 'directive',
        templateUrl: 'partials/api/directive/cordovaAppAvailability.html',
        data: 'Installed Applications',
        plugins: [
            {
                id: 'com.ohh2ahh.plugins.appavailability',
                url: 'https://github.com/ohh2ahh/AppAvailability'
            }
        ]
    },

    {
        name: 'cordovaAppVersion',
        type: 'directive',
        templateUrl: 'partials/api/directive/cordovaAppVersion.html',
        data: 'Application version',
        plugins: [
            {
                id: 'uk.co.whiteoctober.cordova.appversion',
                url: 'https://github.com/whiteoctober/cordova-plugin-app-version'
            }
        ]
    },

    {
        name: 'cordovaBattery',
        type: 'directive',
        templateUrl: 'partials/api/directive/cordovaBattery.html',
        data: 'Current Battery Status',
        plugins: [
            {
                id: 'org.apache.cordova.battery-status',
                url: 'https://github.com/apache/cordova-plugin-battery-status/blob/master/doc/index.md'
            }
        ]
    },

    {
        name: 'cordovaDevice',
        type: 'directive',
        templateUrl: 'partials/api/directive/cordovaDevice.html',
        data: 'Device Information',
        plugins: [
            {
                id: 'org.apache.cordova.device',
                url: 'https://github.com/apache/cordova-plugin-device/blob/master/doc/index.md'
            }
        ]
    },

    {
        name: 'cordovaDeviceMotion',
        type: 'directive',
        templateUrl: 'partials/api/directive/cordovaDeviceMotion.html',
        data: 'Current Device Motion',
        plugins: [
            {
                id: 'org.apache.cordova.device-motion',
                url: 'https://github.com/apache/cordova-plugin-device-motion/blob/master/doc/index.md'
            }
        ]
    },

    {
        name: 'cordovaDeviceOrientation',
        type: 'directive',
        templateUrl: 'partials/api/directive/cordovaDeviceOrientation.html',
        data: 'Current Device Orientation',
        plugins: [
            {
                id: 'org.apache.cordova.device-orientation',
                url: 'https://github.com/apache/cordova-plugin-device-orientation/blob/master/doc/index.md'
            }
        ]
    },

    {
        name: 'cordovaGeolocation',
        type: 'directive',
        templateUrl: 'partials/api/directive/cordovaGeolocation.html',
        data: 'Current Device location',
        plugins: [
            {
                id: 'org.apache.cordova.geolocation',
                url: 'https://github.com/apache/cordova-plugin-geolocation/blob/master/doc/index.md'
            }
        ]
    },

    {
        name: 'cordovaNetwork',
        type: 'directive',
        templateUrl: 'partials/api/directive/cordovaNetwork.html',
        data: 'Current Network',
        plugins: [
            {
                id: 'org.apache.cordova.network-information',
                url: 'https://github.com/apache/cordova-plugin-network-information/blob/master/doc/index.md'
            }
        ]
    },

])
.config(['$stateProvider', 'documents', function($stateProvider, documents) {
    angular.forEach(documents, function(document) {
        $stateProvider
        .state('api.' + document.name, {
            url: '/' + document.name,
            views: {
                api: {
                    templateUrl: document.templateUrl
                }
            }
        });
    });
}]);