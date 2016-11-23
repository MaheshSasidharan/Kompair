kompair
//.constant('FirebaseUrl', 'https://kompair-7ff3b.firebaseio.com/')
    .service('sharedProperties', ['$state', 'Constructor', 'CommonRoutines', 'FireBaseManager', SharedProp])
    .service('FireBaseManager', ['$firebaseArray', '$firebaseObject', FireBaseManager]);

function SharedProp($state, Constructor, CommonFactory, FireBaseManager) {
    var oSharedObj = {
        oSignedInUser: {
            sUId: null,
            sSignedInEmailId: null,
            sDisplayName: null,
            sDisplayValue: null,
            RefreshCallBack: null,
            UpdateDisplayName: function(bRefresh) {
                bRefresh = !bRefresh;
                this.sDisplayValue = this.sDisplayName ? this.sDisplayName : this.sSignedInEmailId ? this.sSignedInEmailId : "Login";
                if (bRefresh && typeof this.RefreshCallBack === "function") {
                    this.RefreshCallBack();
                }
            },
        },
        oSearch: {
            sSearchTerms: ""
        },
        bSingedIn: false,
        sSignedInUserDisplayName: null,
        oCompair: null,
        ChangeStateTo: function(sState) {
            $state.go(sState);
        },
        oConstructor: Constructor,
        oCommonFactory: CommonFactory,
        oFireBaseManager: FireBaseManager,
        AddThisUser: function(result) {
            var oUser = new oSharedObj.oConstructor.Constructor_User();
            oUser.email = result.email;
            oUser.uid = result.uid;
            oUser.displayName = result.displayName;
            oSharedObj.oCommonFactory.CleanObjects(oUser);
            oSharedObj.oFireBaseManager.SaveWholeData("users/" + result.uid, oUser, false);
        },
        GetUserDetail: function(sKey, $scope) {
            oSharedObj.oFireBaseManager.GetDataByKey('users/' + sKey)
                .then(function(oResults) {
                    if(!oResults){
                        oResults = {};
                    }
                    oSharedObj.oSignedInUser.sSignedInEmailId = oResults.email;
                    oSharedObj.oSignedInUser.sUId = oResults.uid;
                    oSharedObj.oSignedInUser.sDisplayName = oResults.displayName;
                    oSharedObj.oSignedInUser.UpdateDisplayName();
                    $scope.$apply();
                }).catch(function() {
                    oSharedObj.oSignedInUser.sSignedInEmailId = null;
                    oSharedObj.oSignedInUser.sUId = null;
                    oSharedObj.oSignedInUser.sDisplayName = null;
                    oSharedObj.oSignedInUser.UpdateDisplayName();
                    $scope.$apply();
                });
        }
    }
    return oSharedObj;
}

function FireBaseManager($firebaseArray, $firebaseObject) {
    var oManager = {
        GetDataByKey: function(sKey) {
            /*
            var currentUser = firebase.auth().currentUser;
            var userId = null;
            if (currentUser) {
                userId = firebase.auth().currentUser.uid;
            } else {
                return { status: false, msg: "Not logged in" }
            }
            */
            return firebase.database().ref(sKey).once('value').then(function(snapshot) {
                var x = snapshot.val();
                return x;
            });
        },
        SaveWholeData: function(sKey, oVal, bGenKey) {
            bGenKey = bGenKey === undefined ? true : bGenKey;
            var oOriginalProperty = angular.copy(oVal);
            for (var property in oVal) {
                if (oVal.hasOwnProperty(property) && oVal[property] instanceof Array) {
                    console.log(property);
                    oVal[property] = "$|$";
                }
            }
            var sOwnRef = oManager.SaveDataByKey(sKey, oVal, bGenKey);
            for (var property in oVal) {
                if (oVal.hasOwnProperty(property) && oVal[property] === "$|$") {
                    oVal[property] = oOriginalProperty[property];
                    var updatedReference = sOwnRef + "/" + property;
                    oManager.SaveWholeData(updatedReference, oVal[property], false);
                }
            }
            return true;
            //return sOwnRef.split("/")[1];
        },
        SaveDataByKey: function(sKey, oVal, bGenKey) {
            if (bGenKey) {
                var newPostKey = firebase.database().ref(sKey).push().key;
                oVal.genKey = newPostKey;
                firebase.database().ref(sKey).child(newPostKey).set(oVal);
                return sKey + "/" + newPostKey;
            } else {
                firebase.database().ref(sKey).set(oVal);
                return sKey;
            }
        }
    }
    return oManager;
}
