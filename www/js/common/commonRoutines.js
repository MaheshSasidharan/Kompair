kompair

    .factory('CommonRoutines', [CommonRoutines])

function CommonRoutines() {
    var oCommonRoutine = {
        FindItemInArray: function(array, keyName, keyVal, returnType) {
            var found = false;
            if (undefined === keyVal || null === keyVal) {
                return null;
            }
            for (var i in array) {
                if (array[i][keyName] == keyVal) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                return null;
            }
            if (returnType === "index") {
                return i;
            } else { //item
                return array[i];
            }
        },
        FindItemInArrayLike: function (array, keyName, keyVal) {
            var returnArray = [];
            if (undefined === keyVal || null === keyVal) {
                return null;
            }
                for (var i in array) {
                    if (keyName === 'createdBy') {
                        if (array[i][keyName].uId.toLowerCase().indexOf(keyVal.toLowerCase()) >= 0) {
                            returnArray.push(array[i]);
                        }
                    }
                    else {
                        if (array[i][keyName].toLowerCase().indexOf(keyVal.toLowerCase()) >= 0) {
                            returnArray.push(array[i]);
                        }
                    }
                }
            return returnArray;
        },
        CleanObjects: function(oVal) {
            for (var property in oVal) {
                if (oVal.hasOwnProperty(property) && (oVal[property] instanceof Array || oVal[property] instanceof Object)) {
                    oCommonRoutine.CleanObjects(oVal[property]);
                }
                if (oVal.hasOwnProperty(property) && (typeof oVal[property] === "string" && oVal[property].trim() === "" || typeof oVal[property] === "function"))  {
                    if (oVal instanceof Array && typeof parseInt(property) === "number") {
                        oVal.splice(parseInt(property), 1);
                    } else {
                        delete oVal[property];
                    }
                }
            }
        },
        GetErrorMessage: function(errorCode) {
            var message = "";
            switch (errorCode) {
                case "auth/invalid-email":
                    message = "The email address provided is incorrect.";
                    break;
                case "auth/wrong-password":
                    message = "The password entered is incorrect.";
                    break;
                case "auth/weak-password":
                    message = "The password entered is weak.";
                    break;
                case "auth/email-already-in-use":
                    message = "Sorry! This email is already in use.";
                    break;
                    case "auth/user-not-found":
                    message = "Sorry. User not found."
                    break;
                default:
                    message = "Sorry. Something went wrong. Please try again.";
                    break;
            }
            return message;
        },
        Constants: {
            ArrOfTypeOfCategories: [{
                type: "Text"
            }, {
                type: "OrderedList"
            }, {
                type: "UnOrderedList"
            }]
        }
    }
    return oCommonRoutine;
}
