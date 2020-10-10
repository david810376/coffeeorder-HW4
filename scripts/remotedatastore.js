(function(window){
'use strict';
var App = window.App || {};
var $ = window.jQuery;

//book code
/*
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
*/

// prof code
class RemoteDataStore {
    constructor(url){
        console.log('running the DataStore Function');
        if(!url){
            throw new Error('No remote URL supplied');
        };
        this.serverUrl = url;
    }
    ajaxposthelper(type, url, val){
        $.ajax({ type: type, url: url, contentType: 'application/json', data: JSON.stringify(val),
        success: function(response){ console.log('function required: ' + JSON.stringify(response));}
        });
    }
    ajaxhelper(type, url, cb) {
        $.ajax({ type: type, url: url, contentType: 'application/json', 
        success: function(response){
            console.log('function returned: ' + JSON.stringify(response));
            if (cb !== undefined) {cb(response);}
        }})
    }
    add(key,val) { this.ajaxposthelper('POST', this.serverUrl, val);}
    get(key,cb) { this.ajaxhelper('GET', this.serverUrl + '/' + key,cb);}
    getAll(cb)  { this.ajaxhelper('GET', this.serverUrl, cb);}
    remove(key) { this.ajaxhelper('DELETE', this.serverUrl + '/' + key);}
}

App.RemoteDataStore = RemoteDataStore;
window.App = App;
})(window);