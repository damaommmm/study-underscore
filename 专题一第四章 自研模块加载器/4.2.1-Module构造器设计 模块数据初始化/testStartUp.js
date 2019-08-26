(function (window) {
    function StartUp() {
        this.use = function (arr, callback) {
            arr.forEach((item) => {
                const elem = document.createElement('script')
                elem.setAttribute('src', item)
                document.body.append(elem)
            })
        }
    }

    function define(callback) {
        let myRequire, myExports, myModule
        callback(myRequire,myExports,myModule)
    }

    window.startUp = new StartUp()
    window.define = define

    // window.
})(window)