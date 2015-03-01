describe("appAvailability", function() {
    var $compile,
        $rootScope,
        $window,
        $document,
        $timeout;

    beforeEach(module('cordovaData.appAvailability'));

    beforeEach(inject(function(_$compile_, _$rootScope_, _$window_, _$document_, _$timeout_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $window = _$window_;
        $document = _$document_;
        $timeout = _$timeout_;
        
        $window.appAvailability = {
            check: function(uri, success, error) {
                cb = uri === 'twitter://' ? success : error;
                cb();
            }
        }
    }));
    
    it("istalled application check is injected into scope", function() {
        $compile('<div cordova-app-availability="\'twitter://\'"></div>')($rootScope);
        $document[0].dispatchEvent(new Event('deviceready'));
        
        $rootScope.$digest();
        
        $timeout.flush();

        expect($rootScope.appAvailability).toBe(true);
    });
    
    it("view is updated after injection", function() {
        var element = $compile('<div cordova-app-availability="\'twitter://\'">{{appAvailability}}</div>')($rootScope);
        $document[0].dispatchEvent(new Event('deviceready'));
        
        $rootScope.$digest();
        
        $timeout.flush();

        expect(element.html()).toBe('true');
    });
    
    it("expression evaluates to string", function() {
        $compile('<div cordova-app-availability="\'twitter://\'"></div>')($rootScope);
        $document[0].dispatchEvent(new Event('deviceready'));
        
        $rootScope.$digest();
        
        $timeout.flush();

        expect($rootScope.appAvailability).toBe(true);
    });
    
    it("expression evaluates to object", function() {
        $compile('<div cordova-app-availability="{twitter: \'twitter://\'}"></div>')($rootScope);
        $document[0].dispatchEvent(new Event('deviceready'));
        
        $rootScope.$digest();
        
        $timeout.flush();

        expect($rootScope.appAvailability.twitter).toBe(true);
    });
    
    it("expression evaluates to object with multiple properties", function() {
        $compile('<div cordova-app-availability="{twitter: \'twitter://\', facebook: \'fb://\'}"></div>')($rootScope);
        $document[0].dispatchEvent(new Event('deviceready'));
        
        $rootScope.$digest();
        
        $timeout.flush();

        expect($rootScope.appAvailability.twitter).toBe(true);
        expect($rootScope.appAvailability.facebook).toBe(false);
    });
    
    it("expression evaluates to array", function() {
        $compile('<div cordova-app-availability="[\'twitter://\']"></div>')($rootScope);
        $document[0].dispatchEvent(new Event('deviceready'));
        
        $rootScope.$digest();
        
        $timeout.flush();

        expect($rootScope.appAvailability[0]).toBe(true);
    });
    
    it("expression evaluates to array with multiple elements", function() {
        $compile('<div cordova-app-availability="[\'twitter://\', \'fb://\']"></div>')($rootScope);
        $document[0].dispatchEvent(new Event('deviceready'));
        
        $rootScope.$digest();
        
        $timeout.flush();

        expect($rootScope.appAvailability[0]).toBe(true);
        expect($rootScope.appAvailability[1]).toBe(false);
    });
    
    it("expression changes", function() {
        $compile('<div cordova-app-availability="filter"></div>')($rootScope);
        
        $rootScope.filter = 'twitter://';
        
        $document[0].dispatchEvent(new Event('deviceready'));
        
        $rootScope.$digest();
        
        $timeout.flush();

        expect($rootScope.appAvailability).toBe(true);
        
        $rootScope.filter = 'fb://';
        
        $rootScope.$digest();
        
        $timeout.flush();
        
        expect($rootScope.appAvailability).toBe(false);
    });
});