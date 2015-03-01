describe("appVersion", function() {
    var $compile,
        $rootScope,
        $window,
        $document,
        $timeout;

    beforeEach(module('cordovaData.appVersion'));

    beforeEach(inject(function(_$compile_, _$rootScope_, _$window_, _$document_, _$timeout_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $window = _$window_;
        $document = _$document_;
        $timeout = _$timeout_;
        
        $window.cordova = {
            getAppVersion: {
                getVersionNumber: function(cb) {
                    cb(1);
                },
                getVersionCode: function(cb) {
                    cb('alpha');
                }
            }
        }
    }));
    
    it("Application version number is injected into scope", function() {
        $compile('<div cordova-app-version></div>')($rootScope);
        $document[0].dispatchEvent(new Event('deviceready'));
        
        $timeout.flush();

        expect($rootScope.appVersion.number).toBe(1);
    });
    
    it("Application version code is injected into scope", function() {
        $compile('<div cordova-app-version></div>')($rootScope);
        $document[0].dispatchEvent(new Event('deviceready'));
        
        $timeout.flush();

        expect($rootScope.appVersion.code).toBe('alpha');
    });
    
    it("view is updated after injection", function() {
        var element = $compile('<div cordova-app-version>{{appVersion.number}} - {{appVersion.code}}</div>')($rootScope);
        $document[0].dispatchEvent(new Event('deviceready'));
        
        $timeout.flush();

        expect(element.html()).toBe('1 - alpha');
    });
});