describe("device", function() {
    var $compile,
        $rootScope,
        $timeout,
        $document,
        device = {
            model: 'ABC'
        };

    beforeEach(module('cordovaData.device'));

    beforeEach(inject(function(_$compile_, _$rootScope_, _$window_, _$document_, _$timeout_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $timeout = _$timeout_;
        $document = _$document_;
        
        _$window_.device = device;
        
    }));
    
    it("device is injected into scope", function() {
        $compile('<div cordova-device></div>')($rootScope);
        $document[0].dispatchEvent(new Event('deviceready'));
        
        $timeout.flush();

        expect($rootScope.device).toBe(device);
    });
    
    it("view is updated after injection", function() {
        var element = $compile('<div cordova-device>{{device.model}}</div>')($rootScope);
        $document[0].dispatchEvent(new Event('deviceready'));
        
        $timeout.flush();

        expect(element.html()).toBe('ABC');
    });
});