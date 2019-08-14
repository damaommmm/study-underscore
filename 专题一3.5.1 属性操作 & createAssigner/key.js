var _ = {};

_.isOjbect = function(obj) {
	return toString.call(obj) === "[object Object]"
}

//属性检测
var hasOwnProperty = Object.hasOwnProperty;
_.has = function(obj, key) {
	return obj != null && hasOwnProperty.call(obj, key);
}

var hasEnumbug = ({
	toString: null
}).propertyIsEnumerable("toString"); //true
var collet = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString",
	"valueOf"
];
// Object.keys   polyfill
_.keys = function(obj) {
	var prop;
	if (!_.isOjbect(obj)) {
		return [];
	}

	if (Object.keys) {
		return Object.keys(obj)
	}

	var result = [];
	//遍历自身 + 原型链上面的可枚举属性
	for (name in obj) {
		result.push(name);
	}

	if (!hasEnumbug) {
		//处理
		for (var i = 0; i < collet.length; i++) {
			prop = collet[i];
			if (obj[prop] !== Object.prototype[prop]) {
				result.push(prop);
			}
		}
	}

	return result;
}

_.Allkeys = function(obj) {
	var prop;
	if (!_.isOjbect(obj)) {
		return [];
	}
	var result = [];
	//遍历自身 + 原型链上面的可枚举属性
	for (name in obj) {
		result.push(name);
	}
	return result;
}

//key <=> value
_.invert = function(obj) {
	var reuslt = {};
	var keys = _.keys(obj);
	//keys[i]  属性的名称
	//obj[keys[i]]  属性的值
	for (var i = 0; i < keys.length; i++) {
		reuslt[obj[keys[i]]] = keys[i];
	}
	return reuslt;
}

var createAssigner = function(func) {
	return function(obj) {
		var length = arguments.length;
		if (obj == null || length < 2) {
			return obj;
		}
		for(var i=1; i<length; i++){
			var target = arguments[i];
			var keys = func(target);
			var len = keys.length;
			 for(var j=0; j<len; j++){
				  obj[keys[j]] = target[keys[j]];
			 }
		}
		return obj;
	}
}
//解耦 颗粒度小
_.extend = createAssigner(_.Allkeys); //自身对象可枚举的属性+原型链上可枚举的属性
_.extendOwn = createAssigner(_.keys); //自身对象可枚举的属性

/*
_.extend({}, ret, object);
_.extend(null, ret, object);
*/
//access  set  get   批量操作
