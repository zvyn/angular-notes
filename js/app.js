/* Author: Milan Oberkirch <zvyn@oberkirch.org>
 * License: The MIT License:

Copyright (c) 2015 Milan Oberkirch, http://oberkirch.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

(function(){
    var app = angular.module('note', []);

    app.version = 0.01;
    if (localStorage["version"] != app.version) {
        localStorage.clear()
        localStorage["version"] = app.version;
    }

    app.controller('NotesController', function(){
        this.parse = function () {
            data = localStorage["NotesController"] || "{\"maxID\": {\"value\": 0, \"writable\": true}, \"title\": {\"value\": \"Untiteld Page\", \"writable\": true}, \"notes\": {\"value\": [], \"writable\": true}}"
            this.data_properties = JSON.parse(data);
            Object.defineProperties(this, this.data_properties);
        };

        this.save = function() {
            localStorage["NotesController"] = JSON.stringify(this.data_properties);
        }

        this.deleteNote = function(note){
            var index = this.notes.indexOf(note);
            if (index != -1) {
                this.notes.splice(index, 1);
                this.save("notes");
            };
        };

        this.addNote = function(){
            this.notes.push({'id': this.maxID + 1, 'title': '', 'body': ''});
            this.maxID += 1;
        };

        this.parse("notes", "[]");
        this.parse("maxID", "0");
        this.parse("title", "\"Notes\"");
    });

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
