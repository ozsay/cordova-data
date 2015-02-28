describe("deviceOrientation", function() {
    var $compile,
        $rootScope,
        $window,
        $timeout,
        _success;

    beforeEach(module('cordovaData.deviceOrientation'));

    beforeEach(inject(function(_$compile_, _$rootScope_, _$window_, _$timeout_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $window = _$window_;
        $timeout = _$timeout_;
        
        $window.navigator.compass = {
            watchHeading: function(success, error, options) {
                _success = success;
                
                return 1;
            },
            clearWatch: function(id) {
            }
        }
        
        spyOn($window.navigator.compass, 'clearWatch').and.callThrough();
    }));
    
    beforeEach(function() {
        jasmine.clock().install();
    });

    afterEach(function() {
        jasmine.clock().uninstall();
    });
    
    it("Device heading is injected into scope", function() {
        $compile('<div cordova-device-orientation></div>')($rootScope);
        document.dispatchEvent(new Event('deviceready'));
        
        setInterval(function() {
            _success({magneticHeading: 300});
            $timeout.flush();
        }, 100);

        jasmine.clock().tick(101);
        
        expect($rootScope.deviceOrientation.magneticHeading).toBe(300);
    });
    
    it("view is updated after change", function() {
        var element = $compile('<div cordova-device-orientation>{{deviceOrientation.magneticHeading}}</div>')($rootScope);
        document.dispatchEvent(new Event('deviceready'));
        
        setInterval(function() {
            _success({magneticHeading: 300});
            $timeout.flush();
        }, 100);

        jasmine.clock().tick(101);
        
        expect(element.html()).toBe('300');
    });
    
    it("scope is updated after every change", function() {
        var element = $compile('<div cordova-device-orientation></div>')($rootScope);
        document.dispatchEvent(new Event('deviceready'));
        
        var i = 0;
        
        setInterval(function() {
            _success({magneticHeading: (i++ * 10)});
            $timeout.flush();
        }, 100);

        jasmine.clock().tick(101);
        expect($rootScope.deviceOrientation.magneticHeading).toBe(0);
        
        jasmine.clock().tick(101);
        expect($rootScope.deviceOrientation.magneticHeading).toBe(10);
        
        jasmine.clock().tick(101);
        expect($rootScope.deviceOrientation.magneticHeading).toBe(20);
    });
    
    it("Calling stop watch on scope destroy", function() {
        $compile('<div cordova-device-orientation></div>')($rootScope);
        document.dispatchEvent(new Event('deviceready'));
        
        setInterval(function() {
            _success({magneticHeading: 300});
            $timeout.flush();
        }, 100);

        jasmine.clock().tick(101);
        
        expect($rootScope.deviceOrientation.magneticHeading).toBe(300);
        
        $rootScope.$destroy();
        
        expect($window.navigator.compass.clearWatch.calls.count()).toBe(1);
        expect($window.navigator.compass.clearWatch).toHaveBeenCalledWith(1);
    });
    
    it("scope is updated with options", function() {
        var element = $compile('<div cordova-device-orientation="{frequency: 500}"></div>')($rootScope);
        document.dispatchEvent(new Event('deviceready'));
        
        $rootScope.$digest();
        
        setInterval(function() {
            _success({magneticHeading: 300});
            $timeout.flush();
        }, 100);

        jasmine.clock().tick(101);
        expect($rootScope.deviceOrientation.magneticHeading).toBe(300);
    });
    
    it("restart watch after options changing", function() {
        var element = $compile('<div cordova-device-orientation="options"></div>')($rootScope);
        document.dispatchEvent(new Event('deviceready'));
        
        var i = 300;
        
        $rootScope.options = {frequency: 500};
        $rootScope.$digest();
        
        setInterval(function() {
            _success({magneticHeading: i});
            $timeout.flush();
        }, 100);

        jasmine.clock().tick(101);
        expect($rootScope.deviceOrientation.magneticHeading).toBe(300);
        
        i = 150;
        $rootScope.options = {frequency: 400};
        $rootScope.$digest();
        
        expect($window.navigator.compass.clearWatch.calls.count()).toBe(1);
        expect($window.navigator.compass.clearWatch).toHaveBeenCalledWith(1);
        
        jasmine.clock().tick(101);
        expect($rootScope.deviceOrientation.magneticHeading).toBe(150);
    });
});