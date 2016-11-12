kompair
    .controller('HomeCtrl', ['sharedProperties', '$firebaseAuth', HomeCtrl])
    .controller('EditAccCtrl', ['sharedProperties', '$firebaseAuth', EditAccCtrl])
    .controller('ResultsCtrl', ['sharedProperties', 'CommonRoutines', ResultsCtrl])
    .controller('CompairCtrl', ['sharedProperties', CompairCtrl])
    .controller('LoginCtrl', ['sharedProperties', '$firebaseAuth', LoginCtrl])
    .controller('SignUpCtrl', ['sharedProperties', '$firebaseAuth', SignUpCtrl])
    .controller('MainCtrl', ['$scope', 'sharedProperties', MainCtrl])
    .controller('EditCtrl', ['sharedProperties', EditCtrl])
    .controller('MainCtrl', ['$scope', '$state', 'sharedProperties', MainCtrl]);

function HomeCtrl(sharedProperties, $firebaseAuth) {
    var vm = this;
    vm.oShared = sharedProperties;
    vm.oShared.bSingedIn = false;
    vm.SignIn = function() {
        vm.oShared.bSingedIn = true;
    }
    vm.LogOut = function () {
        var auth = $firebaseAuth();
        auth.$signOut();
        vm.oShared.bSingedIn = false;
        vm.oShared.ChangeStateTo('kompair.home');
    }
}

function EditAccCtrl(sharedProperties, $firebaseAuth) {
    var eda = this;
    eda.oShared = sharedProperties;
    eda.deleteAcc = function () {
        var user = firebase.auth().currentUser;
        user.delete();
        eda.oShared.bSingedIn = false;
        eda.oShared.ChangeStateTo('kompair.home');
    }
    eda.UpdateEmailAddress = function () {
        var user = firebase.auth().currentUser;
        user.updateEmail(eda.newEmail);
        //eda.oShared.sSignedInUserId = eda.NewEmail;
        eda.oShared.ChangeStateTo('kompair.home');
    }
    eda.UpdatePassword = function () {
        var user = firebase.auth().currentUser;
        user.updatePassword(eda.newPassword);
        eda.oShared.ChangeStateTo('kompair.home');
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
        arrCategories: ['Technology', 'Artificial']
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
        title: 'Apple vs Banana',
        arrCategories: ['Fruits', 'Natural']
    }, {
        id: 5,
        stars: 7,
        answers: 14,
        views: 623,
        title: 'Apple vs Blackberry',
        arrCategories: ['Phones', 'Phones', 'Phones', 'Phones', 'Technology']
    }, {
        id: 6,
        stars: 7,
        answers: 14,
        views: 623,
        title: 'Orange vs NewBlack',
        arrCategories: ['Series']
    }, {
        id: 7,
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
        oCamparables: [{
            catId: 1,
            catType: "Text",
            catName: "Scientific",
            catValues: [
                "This is some text about Apple",
                "This is some text about Orange"
            ]
        }, {
            catId: 2,
            catType: "OrderedList",
            catName: "Nutrients",
            catValues: [
                ["Alpha", "Beta", "Gamma"],
                ["Delta", "Theta", "Omega"]
            ]
        }, {
            catId: 1,
            catType: "UnOrderedList",
            catName: "Physical",
            catValues: [
                ["0.5 lbs", "6 cms"],
                ["0.76lbs", "5.3 cms"]
            ]
        }]
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

function EditCtrl(sharedProperties) {
    var ed = this;
    ed.oShared = sharedProperties;
    ed.oCompair = angular.copy(sharedProperties.oCompair);
    //ed.oCompair = sharedProperties.oCompair;

    ed.Helper = {
        BackToCompare: function(sType) {
            if (sType == 'update') {
                sharedProperties.oCompair = ed.oCompair;
                // Service to update in DB and in return func call this
                ed.oShared.ChangeStateTo('kompair.compare');

            } else {
                ed.oShared.ChangeStateTo('kompair.compare');
            }
        }
    }
}

function SignUpCtrl(sharedProperties, $firebaseAuth) {
    var su = this;
    su.oShared = sharedProperties;
    su.SignUp = function() {
        var auth = $firebaseAuth();
        auth.$createUserWithEmailAndPassword(su.user.email, su.user.password);
        su.oShared.ChangeStateTo('kompair.home');
    };

}

function LoginCtrl(sharedProperties, $firebaseAuth) {
    var lo = this;
    lo.oShared = sharedProperties;
    lo.user = {};
    lo.SignIn = function() {
        lo.firebaseUser = null;
        lo.error = null;
        var auth = $firebaseAuth();
        auth.$signInWithEmailAndPassword(lo.user.email, lo.user.password).then(function(firebaseUser) {
            lo.oShared.ChangeStateTo('kompair.home');
            lo.oShared.bSingedIn = true;
            lo.oShared.sSignedInUserId = lo.user.email;
        }).catch(function(error) {
            switch (error.code) {
                case "auth/invalid-email":
                    lo.sErrorMessage = "The email address provided is incorrect.";
                    break
                default:
                case "auth/wrong-password":
                lo.sErrorMessage = "The password entered is incorrect.";
                    break
                    lo.sErrorMessage = "Sorry. Something went wrong. Please try again.";
                    break;
            }
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
        //$state.transitionTo($state.current, $state.$current.params, { reload: true, inherit: true, notify: true });

        return;
        console.log("State Params: ", data.stateId);
    });
};
