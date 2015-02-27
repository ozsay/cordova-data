describe("network", function() {
    var $compile,
        $rootScope,
        $window,
        $timeout;

    beforeEach(module('cordovaData.network'));

    beforeEach(inject(function(_$compile_, _$rootScope_, _$window_, _$timeout_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $window = _$window_;
        $timeout = _$timeout_;
        
        $window.navigator.connection = {type: 'none'};
    }));
        
    it("network is injected into scope", function() {
        $compile('<div cordova-network></div>')($rootScope);
        document.dispatchEvent(new Event('deviceready'));
        
        $timeout.flush();
        
        expect($rootScope.network).toBe('none');
    });
    
    it("network is changed during runtime", function() {
        $compile('<div cordova-network></div>')($rootScope);
        document.dispatchEvent(new Event('deviceready'));
        
        $timeout.flush();
        
        expect($rootScope.network).toBe('none');
        
        $window.navigator.connection.type = 'wifi';
        
        document.dispatchEvent(new Event('online'));
        
        $timeout.flush();
        
        expect($rootScope.network).toBe('wifi');
    });
    
    it("network is changed during runtime to offline state", function() {
        $compile('<div cordova-network></div>')($rootScope);
        document.dispatchEvent(new Event('deviceready'));
        
        $timeout.flush();
        
        expect($rootScope.network).toBe('none');
        
        $window.navigator.connection.type = 'wifi';
        
        document.dispatchEvent(new Event('online'));
        
        $timeout.flush();
        
        expect($rootScope.network).toBe('wifi');
        
        $window.navigator.connection.type = 'none';
        
        document.dispatchEvent(new Event('offline'));
        
        $timeout.flush();
        
        expect($rootScope.network).toBe('none');
    });
    
    it("view is updated after network changing", function() {
        var element = $compile('<div cordova-network>network is {{network}}</div>')($rootScope);
        document.dispatchEvent(new Event('deviceready'));
        
        $window.navigator.connection.type = 'wifi';
        
        $timeout.flush();
        
        expect(element.html()).toBe('network is wifi');
    });
});