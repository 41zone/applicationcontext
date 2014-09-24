Usage
===========
The Key-Value global storage, it's look like ApplicationContext for Servlet. 

API
===========
### Require
```Javascript
var AppContext = require('applicationcontext');
```

### Setter & Getter

`set([key,]value)`
* key {String}, Optional : the name of value , use this format named ,like 'a.b.c' 
* value {AnyType} : if use plain object , please note that the key named do not look like 'a.b.c', otherwise, there is some error to invoke 'get' method

```Javascript
AppContext.set("username","Jimmy Song");
console.log(AppContext.get("username"));

//Use Plain Object like this 
AppContext.set({
	session : {
		name : "user",
		expire : 3000
	},
	
	// do not name key that look like 'a.b.c', it's error
	"local.name" : "good"
});
console.log(AppContext.get("session.name")); // output : user
console.log(AppContext.get("local.name")); // output : undefined
```

`get(key)`
* key {String} : e.g `AppContext.get('username');` or `AppContext.get('session.name')`

`remove(key)`
* key {String} : e.g `AppContext.remove('username');` or `AppContext.remove('session.name')`

`clear()`
* Remove all data

### Event

`on(key,listener)`

```Javascript
// add event listener for some key
AppContext.on('session.name',function(value,message){
	// 'value' is stored value , and 'message' is extra information while the event is triggered
	console.log("the value is ",value);
	console.log("and extra message is ",message);
});
```

`emit(key,message)`

```Javascript
// emit event named 'session.name', and use extra message
AppContext.set('session.name','Freeman'); 
AppContext.emit('session.name','hi, there is extra information, just tell you the session.name value is changed');
```

`off(key [ , listener ] )`

```Javascript
// Remove the specified listener for 'session.name'
AppContext.off('session.name',listener);

// Remove all listener for 'session.name'
AppContext.off('session.name');
```911