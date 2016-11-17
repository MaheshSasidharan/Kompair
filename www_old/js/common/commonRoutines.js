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
        }
    }
    return oCommonRoutine;
}
