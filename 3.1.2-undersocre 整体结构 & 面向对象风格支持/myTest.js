(function (root) {
    var _ = function () {

    }

    var _ = function (obj) {
        if (obj instanceof _) {
            return obj;
        }

        if (!(this instanceof _)) {
            return new _(obj)
        }

        this._wrapped = obj;
    }

    _.unique = function (arr, callback) {
        var ret = [];
        var target, i = 0;
        for (; i < arr.length; i++) {
            target = callbacks ? callbacks(arr[i]) : arr[i];
            if (ret.indexOf(target) === -1) {
                ret.push(target)
            }
        }
    }

    _.map = function () {

    }

    _.each = function (target, callback) {
        var key, i = 0;
        if (_.isArray(target)) {
            var length = target.length
            for (; i < length; i++) {
                callback.call(target, target[i])
            }
        } else {
            for (key in target) {
                callback.call(target, key, target[key])
            }
        }
    }

    //给underscore原型上面扩展方法

    _.mixin = function (obj) {
        _.each(_.function)
    }

    root._ = _
})(this)