module.exports = function() {
    return {
        name: 'pathToUrl',
        process: function(str) {
            return str.substring(1);
        }
    };
};