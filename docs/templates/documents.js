'use strict';

angular.module('cordovaDataSite')
.constant('documents', [
{%- for document in doc.documents -%}
{%- if document.docType != 'documents' %}
    {
        name: '{$ document.name $}',
        type: '{$ document.docType $}',
        templateUrl: '{$ document.outputPath $}',
        data: '{$ document.data $}',
        plugins: [
            {
                id: '{$ document.pluginId $}',
                url: '{$ document.pluginUrl $}'
            }
        ]
    },
{% endif -%}
{%- endfor %}
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