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
        CleanObjects: function(oVal) {
            for (var property in oVal) {
                if (oVal.hasOwnProperty(property) && (oVal[property] instanceof Array || oVal[property] instanceof Object)) {
                    oCommonRoutine.CleanObjects(oVal[property]);
                }
                if (oVal.hasOwnProperty(property) && typeof oVal[property] === "string" && oVal[property].trim() === "") {
                    if (oVal instanceof Array && typeof parseInt(property) === "number") {
                        oVal.splice(parseInt(property), 1);
                    } else {
                        delete oVal[property];
                    }
                }
            }
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
