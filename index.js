'use strict';
var extend = require('extend');
var events = require('events');

var CONTEXT = {};
var emitter = new events.EventEmitter(CONTEXT);

module.exports = {
		on : function(key,listener) {
			if(!this.exist(key)) return ;
			emitter.on(key,listener);
		},
		
		emit : function(key,message) {
			if(!this.exist(key)) return ;
			var value = this.get(key);
			emitter.emit(key,value,message);
		},
		
		off : function(key,listener){
			if(typeof key !== 'string') return ;
			if(arguments.length == 1) {
				emitter.removeAllListeners(key);
			} else if (arguments.length >= 2) {
				emitter.removeListener(key,listener);
			}
		},
		
		_getParent : function(key){
			if(typeof key !== 'string') return undefined;
			var keys = key.split(".") , temp = CONTEXT , result = true , length = keys.length;
			for(var i = 0;i<length-1; i ++) {
				if(!(keys[i] in temp)) {
					return undefined;
				}
				temp = temp[keys[i]];
			}
			return {parent:temp,key : keys[length-1]};
		},
		
		exist : function(key) {
			var item = this._getParent(key);
			if(!item) return false;
			return item.key in item.parent;
		},
		
		
		set : function(key,value) {
			var type = typeof key , item;
			if(type === 'string') {
				item = this._getParent(key);
				if(!item) {return this;}
				item.parent[item.key] = value;
			} else if (type === 'object') {
				extend(true,CONTEXT,key);
			}
			return this;
		},
		
		
		get : function(key) {
			var item , result;
			if(arguments.length <= 0) {
				result = {};
				extend(true,result,CONTEXT);
				return result;
			}
			item = this._getParent(key);
			if(!item) return undefined;
			return item.parent[item.key];
		},
		
		remove : function(key) {
			var item = this._getParent(key);
			if(!item) return undefined;
			delete item.parent[item.key];
		},
		
		clear : function(){
			for(var key in CONTEXT){
				delete CONTEXT[key];
			}
		}
};