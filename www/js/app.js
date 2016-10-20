// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.config(function($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
})

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
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

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('kompair', {
            url: "",
            abstract: true,
            templateUrl: "templates/tabs.html"
        })
        .state('kompair.home', {
            url: "/home",
            views: {
                'home-tab': {
                    templateUrl: "templates/home.html",
                    controller: 'HomeTabCtrl'
                }
            }
        })
        .state('kompair.results', {
            url: "/results",
            views: {
                'home-tab': {
                    templateUrl: "templates/kompair/results.html"
                }
            }
        })
        .state('kompair.compare', {
            url: "/compare",
            views: {
                'home-tab': {
                    templateUrl: "templates/kompair/compare.html"
                }
            }
        })
        .state('kompair.edit', {
            url: "/edit",
            views: {
                'home-tab': {
                    templateUrl: "templates/kompair/edit.html"
                }
            }
        })
        .state('kompair.facts', {
            url: "/facts",
            views: {
                'home-tab': {
                    templateUrl: "templates/facts.html"
                }
            }
        })
        .state('kompair.facts2', {
            url: "/facts2",
            views: {
                'home-tab': {
                    templateUrl: "templates/facts2.html"
                }
            }
        })
        .state('kompair.about', {
            url: "/about",
            views: {
                'about-tab': {
                    templateUrl: "templates/base/about.html"
                }
            }
        })
        .state('kompair.contact', {
            url: "/contact",
            views: {
                'contact-tab': {
                    templateUrl: "templates/base/contact.html"
                }
            }
        })
        .state('kompair.navstack', {
            url: "/navstack",
            views: {
                'about-tab': {
                    templateUrl: "templates/nav-stack.html"
                }
            }
        });


    $urlRouterProvider.otherwise("/home");


    /*
    $stateProvider
        .state('kompair', {
          abstract: true,
          url: '',
          //controller: 'AppCtrl',
          templateUrl: "templates/base/tabs.html"
        })
            .state('kompair.home', {
              url: '/home',
              templateUrl: 'templates/base/home.html'
            })
            .state('kompair.about', {
              url: '/about',
              templateUrl: 'templates/base/about.html'
            })
            .state('kompair.contact', {
              url: '/contact',
              templateUrl: 'templates/base/contact.html'
            })
            .state('kompair.app', {
              url: '/kompair',
              //templateUrl: 'templates/assessments/assessments.html',
              //controller: 'AssessmentsCtrl as vm'
            })
                    .state('kompair.app.compare', {
                      templateUrl: 'templates/kompair/compare.html'
                    })
                    .state('kompair.app.edit', {
                      templateUrl: 'templates/kompair/edit.html'
                    })
                    .state('kompair.assessments.results', {
                      templateUrl: 'templates/kompair/results.html',
                      controller: 'VideoCtrl as vid'
                    });
        //$urlRouterProvider.when('/', '/kompair');
        $urlRouterProvider.otherwise('/home');
        */
    /*
      $stateProvider
        .state('kompair', {
          url: "/tab",
          abstract: true,
          templateUrl: "templates/tabs.html"
        })
        .state('kompair.home', {
          url: "/home",
          views: {
            'home-tab': {
              templateUrl: "templates/home.html",
              controller: 'HomeTabCtrl'
            }
          }
        })
        .state('kompair.results', {
          url: "/results",
          views: {
            'home-tab': {
              templateUrl: "templates/results.html"
            }
          }
        })
        .state('kompair.answer', {
          url: "/answer",
          views: {
            'home-tab': {
              templateUrl: "templates/answer.html"
            }
          }
        })
        .state('kompair.about', {
          url: "/about",
          views: {
            'about-tab': {
              templateUrl: "templates/about.html"
            }
          }
        })
        .state('kompair.navstack', {
          url: "/navstack",
          views: {
            'about-tab': {
              templateUrl: "templates/nav-stack.html"
            }
          }
        })
        .state('kompair.contact', {
          url: "/contact",
          views: {
            'contact-tab': {
              templateUrl: "templates/contact.html"
            }
          }
        })
        .state('kompair.logged_in_home', {
          url: "/logged_in_home",
          views: {
              'home-tab': {
                  templateUrl: "templates/logged_in_home.html"
              }
          }
        })
        .state('kompair.answer2', {
            url: "/answer2",
            views: {
                'home-tab': {
                    templateUrl: "templates/answer2.html"
                }
            }
         })
         .state('kompair.new', {
             url: "/new",
             views: {
                 'home-tab': {
                     templateUrl: "templates/new.html"
                 }
             }
         });


       $urlRouterProvider.otherwise("/tab/home");
       */
})

.controller('HomeTabCtrl', function($scope) {

})

.controller('MainCtrl', function($scope) {
    $scope.$on("$ionicView.beforeEnter", function(event, data) {
        // handle event
        return;
        console.log("State Params: ", data.stateId);
        $scope.showNavHeader = data.stateId === "tabs.home" || data.stateId === "tabs.results" || data.stateId === "tabs.answer" || data.stateId === "tabs.logged_in_home" || data.stateId === "tabs.answer2" || data.stateId === "tabs.new" ? false : true;
    });

    $scope.$on("$ionicView.enter", function(event, data) {
        // handle event
        return;
        console.log("State Params: ", data.stateId);
    });

    $scope.$on("$ionicView.afterEnter", function(event, data) {
        // handle event
        return;
        console.log("State Params: ", data.stateId);
    });
});
