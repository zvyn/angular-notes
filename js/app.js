(function(){
    var app = angular.module('note', [ ]);

    app.controller('NotesController', ['$http', function($http){
        this.notes = [];
        this.maxID = 0;
        this.submit = function(note){
            console.log("save", note, "(not implemented)");
            };
        this.deleteNote = function(note){
            var index = this.notes.findIndex(function(candidate){
                return candidate["title"] == note["title"];
            });
            this.notes.splice(index, 1);
            console.log("delete", note, "(not implemented)");
        }
        this.addNote = function(){
            var note = {'id': this.maxID + 1, 'title': '', 'body': ''};
            this.maxID += 1;
            this.notes.push(note);
            console.log("add", note, "(not implemented)");
        };
        notesController = this;
        $http.get('api/notes.json').success(function(data){
            notesController.notes = data["notes"];
            notesController.maxID = data["maxID"];
        });
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
