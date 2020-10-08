(function(window){
'use strict';
var App = window.App || {};
var $ = window.jQuery;

function RemoteDataStore(url){
    if(!url){
        throw new Error('No remote URL supplied.');
    }
    this.serverUrl = url;
}


//$.post method==> sends a post request in the background as an XMLHttpRequest object
RemoteDataStore.prototype.add = function (key, val) {
    $.post(this.serverUrl, val, function (serverResponse) {
    console.log(serverResponse);
    });
    };


//$.get ==> it can retrieve all orders from the server

RemoteDataStore.prototype.getAll = function(cb){
        $.get(this.serverUrl, function (serverResponse) {
            console.log(serverResponse);

            //add callback argument
            cb(serverResponse);
            });
    };

//callback function
RemoteDataStore.prototype.get = function (key, cb) {
    $.get(this.serverUrl + '/' + key, function (serverResponse) {
    console.log(serverResponse);
    cb(serverResponse);
    });
    };


//delete data from server use$.ajax method
RemoteDataStore.prototype.remove = function(key){
    $.ajax(this.serverUrl + '/' +key, {
        type : 'DELETE'
    });
};

App.RemoteDataStore = RemoteDataStore;
window.App = App;
})(window);