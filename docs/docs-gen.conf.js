var path = require('canonical-path');

var Package = require('dgeni').Package;

module.exports = new Package('docs-gen', [
    require('dgeni-packages/ngdoc')
])
.processor(require('./processors/generateDocumentsJs'))
.config(function(parseTagsProcessor, getInjectables) {
  parseTagsProcessor.tagDefinitions =
      parseTagsProcessor.tagDefinitions.concat(getInjectables(require('./tag-defs')));
})
.config(function(log, readFilesProcessor, templateFinder, templateEngine, writeFilesProcessor, getInjectables) {
    log.level = 'info';
    readFilesProcessor.basePath = path.resolve(__dirname, '..');

    readFilesProcessor.sourceFiles = [
        {
            include: ['src/plugins/*.js'],
            basePath: 'src'
        }
    ];

    writeFilesProcessor.outputFolder = 'dist/docs';

    templateEngine.filters = templateEngine.filters.concat(getInjectables([
        require('./rendering/filters/code'),
        require('./rendering/filters/pathToUrl')
    ]));
    
    templateFinder.templateFolders = [path.join(__dirname, 'templates')];
    templateFinder.templatePatterns = ['${ doc.docType }.html', 'documents.js'];
})
.config(function(computePathsProcessor) {
  computePathsProcessor.pathTemplates = [{
    docTypes: ['provider', 'service', 'directive', 'input', 'object', 'function', 'filter', 'type' ],
    pathTemplate: '${area}/${module}/${docType}/${name}',
    outputPathTemplate: 'partials/${area}/${docType}/${name}.html'
  }, {
    docTypes: ['documents'],
    pathTemplate: 'documents',
    outputPathTemplate: 'documents.js'
  }];
});