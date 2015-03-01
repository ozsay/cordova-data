# [cordova-data](http://ozsay.github.io/cordova-data/)
angularjs directives that extract data from the device into your scopes.

## Introduction
The motivation behind this library is to create a declarative way of obtaining data from devices in angularjs cordova projects.

### Examples:

#### Device Information
In order to obtain the device information you probably need to write the following code:

```html
<div ng-controller="deviceController">
Device model: {{device.model}}
</div>
```

```js
myApp.controller('deviceController', ['$scope', '$window', '$document', function($scope, $window, $document) {
  $document.addEventListener("deviceready", function() {
    $scope.device = $window.device;
  }, false);
}]);
```

With `cordova-data`, the following code achieve the same goal:

```html
<div cordova-device>
Device model: {{device.model}}
</div>
```

As you can see, the `cordova-device` directive adds the device information to the corresponding scope. No javascript required.