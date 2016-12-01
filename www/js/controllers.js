kompair
    .controller('HomeCtrl', ['$scope','sharedProperties', '$firebaseAuth', HomeCtrl])
    .controller('EditAccCtrl', ['$scope', 'sharedProperties', EditAccCtrl])
    .controller('ResultsCtrl', ['$scope', 'sharedProperties', ResultsCtrl])
    .controller('YourQCtrl', ['$scope', 'sharedProperties', YourQCtrl])
    .controller('CompairCtrl', ['sharedProperties', CompairCtrl])
    .controller('LoginCtrl', ['$scope', 'sharedProperties', '$firebaseAuth', LoginCtrl])
    .controller('SignUpCtrl', ['$scope', 'sharedProperties', '$firebaseAuth', SignUpCtrl])
    .controller('MainCtrl', ['$scope', 'sharedProperties', MainCtrl])
    .controller('EditCtrl', ['sharedProperties', EditCtrl])
    .controller('MainCtrl', ['$scope', 'sharedProperties', MainCtrl]);

function HomeCtrl($scope, sharedProperties, $firebaseAuth) {
    var vm = this;
    vm.oShared = sharedProperties;
    vm.oShared.bSingedIn = false;
    vm.SignIn = function() {
        vm.oShared.bSingedIn = true;
    }
    vm.LogOut = function() {
        var auth = $firebaseAuth();
        auth.$signOut();
        sharedProperties.GetUserDetail("none", $scope);
        vm.oShared.oSignedInUser.UpdateDisplayName(false);
        vm.oShared.bSingedIn = false;
        vm.oShared.ChangeStateTo('kompair.home');
    }
}

function EditAccCtrl($scope, sharedProperties) {
    var eda = this;
    eda.oShared = sharedProperties;
    eda.deleteAcc = function() {
        sharedProperties.oFireBaseManager.SaveWholeData("users/" + sharedProperties.oSignedInUser.sUId, {}, false);
        var user = firebase.auth().currentUser;
        user.delete()
            .then(function(result) {
                eda.oShared.bSingedIn = false;
                eda.oShared.ChangeStateTo('kompair.home');
            })
            .catch(eda.CatchHandler);
    }
    eda.UpdateEmailAddress = function() {
        var user = firebase.auth().currentUser;
        user.updateEmail(eda.newEmail)
            .then(function() {
                // Remove old user details
                sharedProperties.oFireBaseManager.SaveWholeData("users/" + sharedProperties.oSignedInUser.sUId, {}, false);
                eda.UpdateUserDetails(user);
                eda.oShared.ChangeStateTo('kompair.home');
            })
            .catch(eda.CatchHandler);
    }
    eda.UpdateDisplayName = function() {
        var user = firebase.auth().currentUser;
        user.updateProfile({
                displayName: eda.displayName
            })
            .then(function() {
                // Remove old user details
                sharedProperties.oFireBaseManager.SaveWholeData("users/" + sharedProperties.oSignedInUser.sUId, {}, false);
                eda.UpdateUserDetails(user);
                eda.oShared.ChangeStateTo('kompair.home');
            })
            .catch(eda.CatchHandler);
    }
    eda.UpdatePassword = function() {
        var user = firebase.auth().currentUser;
        user.updatePassword(eda.newPassword)
            .then(function(result) {
                eda.oShared.ChangeStateTo('kompair.home');
            })
            .catch(eda.CatchHandler);
    }
    eda.UpdateUserDetails = function(user) {
        var result = {
            email: user.email,
            uid: user.uid,
            displayName: user.displayName
        }
        sharedProperties.AddThisUser(result);
    }
    eda.CatchHandler = function(error) {
        if (error.code) {
            eda.sErrorMessage = sharedProperties.oCommonFactory.GetErrorMessage(error.code);
            $scope.$apply();
        } else {
            su.oShared.ChangeStateTo('kompair.home');
        }
    }
}

function ResultsCtrl($scope, sharedProperties) {
    var res = this;
    res.oShared = sharedProperties;

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
                tempArrResults = [];
                for (x in oResults) {
                    tempArrResults.push(oResults[x]);
                }
                res.arrResults = sharedProperties.oCommonFactory.FindItemInArrayLike(tempArrResults, "title", sharedProperties.oSearch.sSearchTerms);
                //console.log(res.arrResults);
                $scope.$apply();
            });
        },
        Init: function() {
            this.GetAllData('results');
        }
    }
    res.Helper.Init();
}

function YourQCtrl($scope, sharedProperties) {
    var qRes = this;
    qRes.oShared = sharedProperties;

    qRes.Helper = {
        GetCompare: function (oItem) {
            qRes.oShared.oCompair = oItem; //res.oService.GetCompare(id);
            qRes.oShared.ChangeStateTo('kompair.compare');
        },
        GetAllData: function (sKey) {
            sharedProperties.oFireBaseManager.GetDataByKey(sKey).then(function (oResults) {
                qRes.arrResults = [];
                tempArrResults = [];
                for (x in oResults) {
                    tempArrResults.push(oResults[x]);
                }
                qRes.arrResults = sharedProperties.oCommonFactory.FindItemInArrayLike(tempArrResults, "createdBy", sharedProperties.oSignedInUser.sUId);
                $scope.$apply();
            });
        },
        Init: function () {
            this.GetAllData('results');
        }
    }
    qRes.Helper.Init();
}

function CompairCtrl(sharedProperties) {
    var com = this;
    com.oCompair = sharedProperties.oCompair;
}

function EditCtrl(sharedProperties) {
    var ed = this;
    ed.oShared = sharedProperties;
    ed.sTypeOfCategory = null; //ed.oShared.oCommonFactory.Constants.ArrOfTypeOfCategories[0].type;
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
                sharedProperties.oCommonFactory.CleanObjects(ed.oCompair);
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

function SignUpCtrl($scope, sharedProperties) {
    var su = this;
    su.sErrorMessage = "";
    su.oShared = sharedProperties;
    su.SignUp = function() {
        firebase.auth().createUserWithEmailAndPassword(su.user.email, su.user.password)
            .then(function(result) {
                console.log(result);
                var oUser = new sharedProperties.oConstructor.Constructor_User();
                oUser.email = result.email;
                oUser.uid = result.uid;
                oUser.displayName = result.displayName;
                sharedProperties.oCommonFactory.CleanObjects(oUser);
                sharedProperties.oFireBaseManager.SaveWholeData("users/" + result.uid, oUser, false);
                su.oShared.ChangeStateTo('kompair.home');
                su.oShared.bSingedIn = true;
                su.oShared.oSignedInUser.sSignedInUserId = su.user.email;
            })
            .catch(function(error) {
                if (error.code) {
                    su.sErrorMessage = sharedProperties.oCommonFactory.GetErrorMessage(error.code);
                    $scope.$apply();
                } else {
                    su.oShared.ChangeStateTo('kompair.home');
                }
            });
    };
}

function LoginCtrl($scope, sharedProperties, $firebaseAuth) {
    var lo = this;
    lo.oShared = sharedProperties;
    lo.user = {};
    lo.fbSignin = function() {
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(function(result) {
                lo.HandleSuccessfulLogin(result.user);
            }).catch(function(error) {
                lo.sErrorMessage = sharedProperties.oCommonFactory.GetErrorMessage(error.code);
                $scope.$apply();
            });
    }
    lo.SignIn = function() {
        lo.firebaseUser = null;
        lo.error = null;
        firebase.auth().signInWithEmailAndPassword(lo.user.email, lo.user.password)
            .then(function(result) {
                lo.HandleSuccessfulLogin(result);
            }).catch(function(error) {
                lo.sErrorMessage = sharedProperties.oCommonFactory.GetErrorMessage(error.code);
                $scope.$apply();
            });
    }
    lo.HandleSuccessfulLogin = function(result) {
        sharedProperties.AddThisUser(result);
        sharedProperties.GetUserDetail(result.uid, $scope);

        lo.oShared.ChangeStateTo('kompair.home');
        lo.oShared.bSingedIn = true;
        $scope.$apply();
    }
    lo.UpdateUserDetails = function(sDisplayName) {
        var oUpdatedUser = {};

        oUpdatedUser.email = sharedProperties.oSignedInUser.sSignedInEmailId;
        oUpdatedUser.uid = sharedProperties.oSignedInUser.sUId;
        oUpdatedUser.displayName = sDisplayName; //sharedProperties.oSignedInUser.sDisplayName;

        sharedProperties.oCommonFactory.CleanObjects(oUpdatedUser);
        var savePath = "users" + "/" + oUpdatedUser.uid;
        var sStatus = sharedProperties.oFireBaseManager.SaveWholeData(savePath, oUpdatedUser, false);
        if (sStatus) {
            console.log("UPDATED;")
                //sharedProperties.oCompair = ed.oCompair;
                //ed.oShared.ChangeStateTo('kompair.compare');
        }
    }
}

function MainCtrl($scope, sharedProperties) {
    var main = this;
    main.oShared = sharedProperties;
    main.refresh = function() {
        main.oShared.oSignedInUser.UpdateDisplayName(true);
        main.DisplayName = main.oShared.oSignedInUser.sDisplayValue;
    }
    main.oShared.oSignedInUser.RefreshCallBack = main.refresh;

    main.refresh();
    //main.hi = sharedProperties.oSignedInUser.sDisplayValue;

    $scope.$watch('main.DisplayName', function() {
        console.log('CHANGED!');
    });

    $scope.$on("$ionicView.beforeEnter", function(event, data) {
        // handle event
        //return;
        //data.enableBack = true;
        //console.log("State Params: ", data.stateId);
        //main.showNavHeader = sharedProperties.bSingedIn;
        //main.showNavHeader = data.stateId === "tabs.home" || data.stateId === "tabs.results" || data.stateId === "tabs.answer" || data.stateId === "tabs.logged_in_home" || data.stateId === "tabs.answer2" || data.stateId === "tabs.new" ? false : true;
    });
    $scope.$on("$ionicView.enter", function(event, data) {
        // handle event
        //return;
        //console.log("State Params: ", data.stateId);
    });
    $scope.$on("$ionicView.afterEnter", function(event, data) {
        // handle event
        //$state.transitionTo($state.current, $state.$current.params, { reload: true, inherit: true, notify: true });

        return;
        console.log("State Params: ", data.stateId);
    });
};
