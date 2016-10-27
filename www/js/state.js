kompair
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('kompair', {
                url: "",
                abstract: true,
                templateUrl: "templates/base/tabs.html",
                controller: 'HomeCtrl as vm'
            })
            .state('kompair.home', {
                url: "/home",
                views: {
                    'home-tab': {
                        templateUrl: "templates/base/home.html"
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
            .state('kompair.results', {
                url: "/results",
                views: {
                    'home-tab': {
                        templateUrl: "templates/kompair/results.html",
                        controller: "ResultsCtrl as res"
                    }
                }
            })
            .state('kompair.compare', {
                url: "/compare",
                views: {
                    'home-tab': {
                        templateUrl: "templates/kompair/compare.html",
                        controller: "CompairCtrl as com"
                    }
                }
            })
            .state('kompair.edit', {
                url: "/edit",
                views: {
                    'home-tab': {
                        templateUrl: "templates/kompair/edit.html",
                        controller: "EditCtrl as ed"
                    }
                }
            });


        $urlRouterProvider.otherwise("/home");
    })
