describe("deviceMotion", function() {
    var $compile,
        $rootScope,
        $window,
        $timeout,
        _success;

    beforeEach(module('cordovaData.deviceMotion'));

    beforeEach(inject(function(_$compile_, _$rootScope_, _$window_, _$timeout_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $window = _$window_;
        $timeout = _$timeout_;
        
        $window.navigator.accelerometer = {
            watchAcceleration: function(success, error, frequency) {
                _success = success;
                
                return 1;
            },
            clearWatch: function(id) {
            }
        }
        
        spyOn($window.navigator.accelerometer, 'clearWatch').and.callThrough();
    }));
    
    beforeEach(function() {
        jasmine.clock().install();
    });

    afterEach(function() {
        jasmine.clock().uninstall();
    });
    
    it("Device motion is injected into scope", function() {
        $compile('<div cordova-device-motion></div>')($rootScope);
        document.dispatchEvent(new Event('deviceready'));
        
        setInterval(function() {
            _success({x: 15});
            $timeout.flush();
        }, 100);

        jasmine.clock().tick(101);
        
        expect($rootScope.deviceMotion.x).toBe(15);
    });
    
    it("view is updated after change", function() {
        var element = $compile('<div cordova-device-motion>{{deviceMotion.x}}</div>')($rootScope);
        document.dispatchEvent(new Event('deviceready'));
        
        setInterval(function() {
            _success({x: 15});
            $timeout.flush();
        }, 100);

        jasmine.clock().tick(101);
        
        expect(element.html()).toBe('15');
    });
    
    it("scope is updated after every change", function() {
        var element = $compile('<div cordova-device-motion></div>')($rootScope);
        document.dispatchEvent(new Event('deviceready'));
        
        var i = 0;
        
        setInterval(function() {
            _success({x: (i++ * 10)});
            $timeout.flush();
        }, 100);

        jasmine.clock().tick(101);
        expect($rootScope.deviceMotion.x).toBe(0);
        
        jasmine.clock().tick(101);
        expect($rootScope.deviceMotion.x).toBe(10);
        
        jasmine.clock().tick(101);
        expect($rootScope.deviceMotion.x).toBe(20);
    });
    
    it("Calling stop watch on scope destroy", function() {
        $compile('<div cordova-device-motion></div>')($rootScope);
        document.dispatchEvent(new Event('deviceready'));
        
        setInterval(function() {
            _success({x: 15});
            $timeout.flush();
        }, 100);

        jasmine.clock().tick(101);
        
        expect($rootScope.deviceMotion.x).toBe(15);
        
        $rootScope.$destroy();
        
        expect($window.navigator.accelerometer.clearWatch.calls.count()).toBe(1);
        expect($window.navigator.accelerometer.clearWatch).toHaveBeenCalledWith(1);
    });
    
    it("scope is updated with options", function() {
        var element = $compile('<div cordova-device-motion="100"></div>')($rootScope);
        document.dispatchEvent(new Event('deviceready'));
        
        $rootScope.$digest();
        
        setInterval(function() {
            _success({x: 15});
            $timeout.flush();
        }, 100);

        jasmine.clock().tick(101);
        expect($rootScope.deviceMotion.x).toBe(15);
    });
    
    it("restart watch after options changing", function() {
        var element = $compile('<div cordova-device-motion="options"></div>')($rootScope);
        document.dispatchEvent(new Event('deviceready'));
        
        var i = 15;
        
        $rootScope.options = 100;
        $rootScope.$digest();
        
        setInterval(function() {
            _success({x: i});
            $timeout.flush();
        }, 100);

        jasmine.clock().tick(101);
        expect($rootScope.deviceMotion.x).toBe(15);
        
        i = 30;
        $rootScope.options = 200;
        $rootScope.$digest();
        
        expect($window.navigator.accelerometer.clearWatch.calls.count()).toBe(1);
        expect($window.navigator.accelerometer.clearWatch).toHaveBeenCalledWith(1);
        
        jasmine.clock().tick(101);
        expect($rootScope.deviceMotion.x).toBe(30);
    });
});