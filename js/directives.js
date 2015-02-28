'use strict';

angular.module('cordovaDataSite.directives', [])
.directive('prettyprint', function() {
    return {
        restrict: 'C',
        link: function(scope, element, attrs) {
            element.html(prettyPrintOne(element.html(),'',true));
        }
    };
});