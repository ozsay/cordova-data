describe("battery", function() {
    var $compile,
        $rootScope,
        $window,
        $timeout;

    beforeEach(module('cordovaData.battery'));

    beforeEach(inject(function(_$compile_, _$rootScope_, _$window_, _$timeout_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $window = _$window_;
        $timeout = _$timeout_;
    }));
    
    it("battery is injected into scope", function() {
        $compile('<div cordova-battery></div>')($rootScope);
        
        var event = document.createEvent("Events")
        event.initEvent('batterystatus', true, false);
        event.isPlugged = true;
        event.level = 55;
        $window.dispatchEvent(event);
        
        $timeout.flush();
        
        expect($rootScope.battery.isPlugged).toBe(true);
        expect($rootScope.battery.level).toBe(55);
    });
    
    it("view is updated after injection", function() {
        var element = $compile('<div cordova-battery>{{battery.level}} - {{battery.isPlugged}}</div>')($rootScope);
        document.dispatchEvent(new Event('deviceready'));
        
        var event = document.createEvent("Events")
        event.initEvent('batterystatus', true, false);
        event.isPlugged = true;
        event.level = 55;
        $window.dispatchEvent(event);
        
        $timeout.flush();

        expect(element.html()).toBe('55 - true');
    });
});