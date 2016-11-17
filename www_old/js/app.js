var kompair = angular.module('kompair', ['ionic', 'firebase'])

.config(function ($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.views.maxCache(0);
})

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.factory("Auth", ["$firebaseAuth",
  function ($firebaseAuth) {
      return $firebaseAuth();
 }]);

var config = {
    apiKey: "AIzaSyBzzV921lKTOZT6wlaHyswADOUhuu2jMl8",
    authDomain: "kompair-7ff3b.firebaseapp.com",
    databaseURL: "https://kompair-7ff3b.firebaseio.com",
    storageBucket: "kompair-7ff3b.appspot.com",
};

firebase.initializeApp(config);