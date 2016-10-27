kompair
    .controller('HomeCtrl', ['sharedProperties', HomeCtrl])
    .controller('ResultsCtrl', ['sharedProperties', 'CommonRoutines', ResultsCtrl])
    .controller('CompairCtrl', ['sharedProperties', CompairCtrl])
    .controller('LoginCtrl', ['sharedProperties', '$firebaseAuth', LoginCtrl])
    .controller('SignUpCtrl', ['sharedProperties', '$firebaseAuth', SignUpCtrl])
    .controller('MainCtrl', ['$scope', 'sharedProperties', MainCtrl]);

function HomeCtrl(sharedProperties) {
    var vm = this;
    vm.oShared = sharedProperties;
    vm.oShared.bSingedIn = false;
    vm.SignIn = function() {
        vm.oShared.bSingedIn = true;
    }
}

function ResultsCtrl(sharedProperties, CommonRoutines) {
    var res = this;
    res.arrResults = [{
        id: 1,
        stars: 4,
        answers: 2,
        views: 36,
        title: 'Apple vs Orange',
        arrCategories: ['Food', 'Natural']
    }, {
        id: 2,
        stars: 4,
        answers: 9,
        views: 219,
        title: 'Apple vs Android',
        arrCategories: ['Tech', 'Artificial']
    }, {
        id: 3,
        stars: 0,
        answers: 0,
        views: 3,
        title: 'Blue vs Orange',
        arrCategories: ['Color', 'Natural']
    }, {
        id: 4,
        stars: 7,
        answers: 14,
        views: 623,
        title: 'Hillary vs Orange',
        arrCategories: ['Politics']
    }];
    res.oCompair = {
        id: 1,
        stars: 4,
        answers: 2,
        views: 36,
        title: 'Apple vs Orange',
        arrCategories: ['Food', 'Natural'],
        thumbsUp: 10,
        thumbsDown: 20,
        oCompairItem: [{
            item: "Apple"
        }, {
            item: "Orange"
        }],
        oCamparables: [
          {
            catId: 1,
            catType: "Text",
            catName: "Scientific",
            catValues: [
              "This is some text about Apple",
              "This is some text about Orange"
            ]
          },
          {
            catId: 2,
            catType: "OrderedList",
            catName: "Nutrients",
            catValues: [
              ["Alpha", "Beta", "Gamma"],
              ["Delta", "Theta", "Omega"]
            ]
          },
          {
            catId: 1,
            catType: "UnOrderedList",
            catName: "Physical",
            catValues: [
              ["0.5 lbs", "6 cms"],
              ["0.76lbs", "5.3 cms"]
            ]
          }
        ]
    };

    res.oShared = sharedProperties;
    res.oService = {
        GetCompare: function(id) {
            //return CommonRoutines.FindItemInArray(res.arrResults, 'id', id, 'item');
            return res.oCompair;
        }
    }

    res.Helper = {
        GetCompare: function(id) {
            res.oShared.oCompair = res.oService.GetCompare(id);
            res.oShared.ChangeStateTo('kompair.compare');
        }
    }
}

function CompairCtrl(sharedProperties) {
    var com = this;
    //com.oShared = sharedProperties;
    com.oCompair = sharedProperties.oCompair;
}

function SignUpCtrl(sharedProperties, $firebaseAuth) {
    var su = this;
    su.oShared = sharedProperties;
    su.SignUp = function () {
        var auth = $firebaseAuth();
        auth.$createUserWithEmailAndPassword(su.user.email, su.user.password)
        //$state.go('tabs.logged_in_home');
        su.oShared.ChangeStateTo('kompair.home');
    };

}

function LoginCtrl(sharedProperties, $firebaseAuth) {
    var lo = this;
    lo.oShared = sharedProperties;
    lo.user = {};
    lo.SignIn = function () {
        console.log("lo.user:" + JSON.stringify(lo.user));
        lo.firebaseUser = null;
        lo.error = null;
        var auth = $firebaseAuth();
        auth.$signInWithEmailAndPassword(lo.user.email, lo.user.password).then(function (firebaseUser) {
            lo.oShared.ChangeStateTo('kompair.home');
            lo.oShared.bSingedIn = true;
            lo.oShared.sSignedInUserId = lo.user.email;
        }).catch(function (error) {
            lo.error = error;
        });
    };
}

function MainCtrl($scope, sharedProperties) {
    var main = this;
    main.oShared = sharedProperties;

    $scope.$on("$ionicView.beforeEnter", function(event, data) {
        // handle event
        //return;
        console.log("State Params: ", data.stateId);
        //main.showNavHeader = sharedProperties.bSingedIn;
        //main.showNavHeader = data.stateId === "tabs.home" || data.stateId === "tabs.results" || data.stateId === "tabs.answer" || data.stateId === "tabs.logged_in_home" || data.stateId === "tabs.answer2" || data.stateId === "tabs.new" ? false : true;
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
};
