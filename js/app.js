(function(){
    var app = angular.module('note', [ ]);

    app.controller('NotesController', ['$http', function($http){
        this.parse = function (attr, default_value) {
            value = localStorage[attr];
            if (value != undefined) {
                this[attr] = JSON.parse(value);
            }
            else {
                this[attr] = default_value;
            };
        };

        this.save = function(attr) {
            localStorage[attr] = JSON.stringify(this[attr]);
        }

        this.submit = function() {
            this.save("notes");
            this.save("maxID");
        };

        this.deleteNote = function(note){
            var index = this.notes.indexOf(note);
            if (index != -1) {
                this.notes.splice(index, 1);
                this.save("notes");
            };
        };

        this.addNote = function(){
            var note = {'id': this.maxID + 1, 'title': '', 'body': ''};
            this.maxID += 1;
            this.notes.push(note);
        };

        this.parse("notes", []);
        this.parse("maxID", 0);
        this.parse("title", "Notes");
        this.parse("slogan", "anything can change");
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
