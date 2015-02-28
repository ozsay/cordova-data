describe("geolocation", function() {
    var $compile,
        $rootScope,
        $window,
        $timeout,
        _success;

    beforeEach(module('cordovaData.geolocation'));

    beforeEach(inject(function(_$compile_, _$rootScope_, _$window_, _$timeout_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $window = _$window_;
        $timeout = _$timeout_;
        
        $window.navigator.geolocation.watchPosition = function(success, error, options) {
            _success = success;

            return 1;
        }
        
        $window.navigator.geolocation.clearWatch = function(id) {
        }    
               
        spyOn($window.navigator.geolocation, 'clearWatch').and.callThrough();
    }));
    
    beforeEach(function() {
        jasmine.clock().install();
    });

    afterEach(function() {
        jasmine.clock().uninstall();
    });
    
    it("Geolocation is injected into scope", function() {
        $compile('<div cordova-geolocation></div>')($rootScope);
        document.dispatchEvent(new Event('deviceready'));
        
        setInterval(function() {
            _success({coords: {latitude: 150}});
            $timeout.flush();
        }, 100);

        jasmine.clock().tick(101);
        
        expect($rootScope.geolocation.coords.latitude).toBe(150);
    });
 
    it("view is updated after change", function() {
        var element = $compile('<div cordova-geolocation>{{geolocation.coords.latitude}}</div>')($rootScope);
        document.dispatchEvent(new Event('deviceready'));
        
        setInterval(function() {
            _success({coords: {latitude: 150}});
            $timeout.flush();
        }, 100);

        jasmine.clock().tick(101);
        
        expect(element.html()).toBe('150');
    });
    
    it("scope is updated after every change", function() {
        var element = $compile('<div cordova-geolocation></div>')($rootScope);
        document.dispatchEvent(new Event('deviceready'));
        
        var i = 0;
        
        setInterval(function() {
            _success({coords: {latitude: i++ * 10}});
            $timeout.flush();
        }, 100);

        jasmine.clock().tick(101);
        expect($rootScope.geolocation.coords.latitude).toBe(0);
        
        jasmine.clock().tick(101);
        expect($rootScope.geolocation.coords.latitude).toBe(10);
        
        jasmine.clock().tick(101);
        expect($rootScope.geolocation.coords.latitude).toBe(20);
    });
    
    it("Calling stop watch on scope destroy", function() {
        $compile('<div cordova-geolocation></div>')($rootScope);
        document.dispatchEvent(new Event('deviceready'));
        
        setInterval(function() {
            _success({coords: {latitude: 150}});
            $timeout.flush();
        }, 100);

        jasmine.clock().tick(101);
        
        expect($rootScope.geolocation.coords.latitude).toBe(150);
        
        $rootScope.$destroy();
        
        expect($window.navigator.geolocation.clearWatch.calls.count()).toBe(1);
        expect($window.navigator.geolocation.clearWatch).toHaveBeenCalledWith(1);
    });
    
    it("scope is updated with options", function() {
        var element = $compile('<div cordova-geolocation="{ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true }"></div>')($rootScope);
        document.dispatchEvent(new Event('deviceready'));
        
        $rootScope.$digest();
        
        setInterval(function() {
            _success({coords: {latitude: 150}});
            $timeout.flush();
        }, 100);

        jasmine.clock().tick(101);
        expect($rootScope.geolocation.coords.latitude).toBe(150);
    });
    
    it("restart watch after options changing", function() {
        var element = $compile('<div cordova-geolocation="options"></div>')($rootScope);
        document.dispatchEvent(new Event('deviceready'));
        
        var i = 15;
        
        $rootScope.options = { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true };
        $rootScope.$digest();
        
        setInterval(function() {
            _success({coords: {latitude: i}});
            $timeout.flush();
        }, 100);

        jasmine.clock().tick(101);
        expect($rootScope.geolocation.coords.latitude).toBe(15);
        
        i = 30;
        $rootScope.options.maximumAge = 200;
        $rootScope.$digest();
        
        expect($window.navigator.geolocation.clearWatch.calls.count()).toBe(1);
        expect($window.navigator.geolocation.clearWatch).toHaveBeenCalledWith(1);
        
        jasmine.clock().tick(101);
        expect($rootScope.geolocation.coords.latitude).toBe(30);
    });
});