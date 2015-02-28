'use strict';

angular.module('cordovaDataSite.controllers', [])
.controller('CommonController', ['$scope', 'documents', function($scope, documents) {
    $scope.documents = documents;
}]);