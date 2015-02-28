module.exports = function generateDocumentsJs() {
    return {
        $runAfter: ['tags-extracted'],
        $runBefore: ['computing-paths'],
        $process: function(docs) {
            var js = {
                id: 'documents',
                docType: 'documents',
                documents: docs
            };
            
            docs.push(js);
            
            return docs;
        }
    };
};