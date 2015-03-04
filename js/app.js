(function(){
    var app = angular.module('note', [ ]);

    app.controller('NotesController', ['$http', function($http){
        this.notes = JSON.parse(localStorage["notes"]);
        this.notes = this.notes ? this.notes : [];
        this.maxID = parseInt(localStorage["maxID"]);
        this.maxID = this.maxID ? this.maxID : 0;
        this.saveToLocalData = function() {
            localStorage["maxID"] = JSON.stringify(this.maxID);
            localStorage["notes"] = JSON.stringify(this.notes);
        };
        this.submit = function(note){
            this.saveToLocalData();
           };
        this.deleteNote = function(note){
            var index = this.notes.findIndex(function(candidate){
                return candidate["title"] == note["title"];
            });
            this.notes.splice(index, 1);
            this.saveToLocalData();
        };
        this.addNote = function(){
            var note = {'id': this.maxID + 1, 'title': '', 'body': ''};
            this.maxID += 1;
            this.notes.push(note);
        };
        notesController = this;
    }]);

    app.directive('overview', function(){
        return {
            restrict: 'E',
            templateUrl: 'templates/overview.html',
        };
    });

    app.directive('notes', function(){
        return {
            restrict: 'E',
            templateUrl: 'templates/notes.html',
        };
    });
})();
