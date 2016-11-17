kompair
    .service('Constructor', [ConstructorService])

function ConstructorService() {
    var oConstructor = {
        Constructor_MainResult: function(oItem) {
            this.id = 0;
            this.stars = 0;
            this.answers = 0;
            this.views = 0;
            this.title = "";
            this.arrCategories = [""];
            this.thumbsUp = 0;
            this.thumbsDown = 0;
            this.oCompairItem = [{ item: "" }, { item: "" }];
            this.oCamparables = [new oConstructor.Constructor_Comparables()];
            this.createdBy = firebase.auth().currentUser.uid,
            this.createdWhen = new Date();
        },
        Constructor_Comparables: function(sType) {
            this.catType = sType;
            this.catName = "";
            this.catValues = ["", ""];
            return this;
        },
        Constructor_Tags: function() {
            this.name = "";
            return this;
        }
    }
    return oConstructor;
}
