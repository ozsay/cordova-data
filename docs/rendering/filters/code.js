module.exports = function() {
    return {
        name: 'code',
        process: function(str) {
            str = str.replace(/<pre>/g, '<pre class="prettyprint">');
            str = str.replace(/<code/g, '<code ng-non-bindable');
            return str;
        }
    };
};