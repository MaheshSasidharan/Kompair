kompair
    .service('sharedProperties', ['$state', SharedProp]);

function SharedProp($state) {
    var oSharedObj = {
        bSingedIn: false,
        sSignedInUserId: null,
        oCompair: null,
        ChangeStateTo: function(sState) {
            $state.go(sState);
        }
    }
    return oSharedObj;
}
