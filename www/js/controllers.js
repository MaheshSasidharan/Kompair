kompair
    .controller('HomeCtrl', ['sharedProperties', HomeCtrl])
    .controller('ResultsCtrl', ['$scope', 'sharedProperties', ResultsCtrl])
    .controller('CompairCtrl', ['sharedProperties', CompairCtrl])
    .controller('LoginCtrl', ['sharedProperties', '$firebaseAuth', LoginCtrl])
    .controller('SignUpCtrl', ['sharedProperties', '$firebaseAuth', SignUpCtrl])
    .controller('MainCtrl', ['$scope', 'sharedProperties', MainCtrl])
    .controller('EditCtrl', ['sharedProperties', EditCtrl])
    .controller('MainCtrl', ['$scope', '$state', 'sharedProperties', MainCtrl]);

function HomeCtrl(sharedProperties) {
    var vm = this;
    vm.oShared = sharedProperties;
    vm.oShared.bSingedIn = false;
    vm.SignIn = function() {
        vm.oShared.bSingedIn = true;
    }
}

function ResultsCtrl($scope, sharedProperties) {
    var res = this;
    res.oShared = sharedProperties;
    res.GetData = function() {
        sharedProperties.oFireBaseManager.GetDataByKey('results').then(function(oResults) {
            res.arrResults = [];
            for (x in oResults) {
                res.arrResults.push(oResults[x]);
            }
            $scope.$apply();
        });
    }
    res.SaveData = function(nVal) {
            var oNewResult = new sharedProperties.oConstructor.Constructor_MainResult();
            if (nVal === 1) {
                var oSave = sharedProperties.oFireBaseManager.SaveWholeData("results", res.oCompair, true);
            } else {
                //oNewResult.arrCategories.push(new sharedProperties.oConstructor.Constructor_Category());
            }
        }
        /*
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
        */
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

    res.oService = {
        GetCompare: function(oItem) {
            //return CommonRoutines.FindItemInArray(res.arrResults, 'id', id, 'item');
            return oItem;
        }
    }

    res.Helper = {
        GetCompare: function(oItem) {
            res.oShared.oCompair = oItem; //res.oService.GetCompare(id);
            res.oShared.ChangeStateTo('kompair.compare');
        },
        AddNewCompare: function() {
            res.oShared.oCompair = null;
            res.oShared.ChangeStateTo('kompair.edit');
        },
        GetAllData: function(sKey) {
            sharedProperties.oFireBaseManager.GetDataByKey(sKey).then(function(oResults) {
                res.arrResults = [];
                for (x in oResults) {
                    res.arrResults.push(oResults[x]);
                }
                $scope.$apply();
            });
        },
        Init: function() {
            this.GetAllData('results');
        }
    }
    res.Helper.Init();
}

function CompairCtrl(sharedProperties) {
    var com = this;
    //com.oShared = sharedProperties;
    com.oCompair = sharedProperties.oCompair;

}

function EditCtrl(sharedProperties) {
    var ed = this;
    ed.oShared = sharedProperties;
    ed.sTypeOfCategory = null;//ed.oShared.oCommonFactory.Constants.ArrOfTypeOfCategories[0].type;
    ed.oCompair = angular.copy(sharedProperties.oCompair);
    if (ed.oCompair == null) {
        ed.oCompair = new sharedProperties.oConstructor.Constructor_MainResult();
        ed.sMode = "Add";
    } else {
        ed.sMode = "Edit";
    }

    ed.Helper = {
        BackToCompare: function(sType) {
            if (sType == 'update') {
                sharedProperties.oCommonFactory.CleanObjects(ed.oCompair);
                var savePath = "results" + "/" + ed.oCompair.genKey;
                var sStatus = sharedProperties.oFireBaseManager.SaveWholeData(savePath, ed.oCompair, false);
                if (sStatus) {
                    sharedProperties.oCompair = ed.oCompair;
                    ed.oShared.ChangeStateTo('kompair.compare');
                }
            } else if (sType === 'cancel') {
                ed.oShared.ChangeStateTo('kompair.results');
            } else if (sType === 'add') {
                sharedProperties.oFireBaseManager.SaveWholeData("results", ed.oCompair, true);
                ed.oShared.ChangeStateTo('kompair.results');
            }
        },
        PushNewType: function(arrObj, sType, sSubType) {
            switch (sType) {
                case 'category':
                    if (!(arrObj instanceof Array)) {
                        arrObj = [];
                    }
                    arrObj.push(new sharedProperties.oConstructor.Constructor_Comparables(ed.sTypeOfCategory));
                    break;
                case 'tag':
                    if (!(arrObj instanceof Array)) {
                        arrObj = [];
                    }
                    arrObj.push("");
                case 'subCat':
                    if (!(arrObj.catValues[sSubType] instanceof Array)) {
                        arrObj.catValues[sSubType] = [];
                    }
                    arrObj.catValues[sSubType].push("");
                    break;
            }
        },
        UpdateValueInArray: function(arrObj, nIndex, sVal) {
            console.log(arrObj[nIndex]);
        },
        DeleteItem: function(oItem, nIndex, sType) {
            if (sType === 'fromArray') {
                oItem.splice(nIndex, 1);
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
                    break;
                case "auth/wrong-password":
                    lo.sErrorMessage = "The password entered is incorrect.";
                    break;
                default:
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
        //data.enableBack = true;
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
