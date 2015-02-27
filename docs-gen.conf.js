var path = require('canonical-path');

var Package = require('dgeni').Package;

module.exports = new Package('docs-gen', [
  require('dgeni-packages/ngdoc')
])
.config(function(log, readFilesProcessor, templateFinder, writeFilesProcessor) {
  log.level = 'info';
  readFilesProcessor.basePath = path.resolve(__dirname);

  readFilesProcessor.sourceFiles = [
    {
      include: 'src/**/*.js',
      basePath: 'src'
    }
  ];
    
  writeFilesProcessor.outputFolder  = 'dist/docs';
});