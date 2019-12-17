(function (w){
    w.gesture = (ele,callback) => {
        let isStart = false;
        ele.addEventListener("touchstart",(event) => {
            if(event.touches.length >= 2){
                isStart = true;
                // 两点初始距离
                this.startDistance = getDistance(event.touches[0], event.touches[1]);
                // 初始角度
                this.startDeg = getDeg(event.touches[0], event.touches[1]);

                if(callback && typeof callback['start'] === "function"){
                    callback['start']();
                }
            }
        });
        ele.addEventListener("touchmove",(event)=>{
            // 判断屏幕上触点的个数
            if(event.touches.length >= 2){
                // 记录两个触点实时位置
                var currDistance = getDistance(event.touches[0], event.touches[1]);
                // 记录实时角度
                var currDeg = getDeg(event.touches[0], event.touches[1]);
                // 计算实时距离与初始距离的比例,传入event属性里
                event.scale = currDistance / this.startDistance;
                // 计算实时角度与初始角度的差值
                event.rotation = currDeg - this.startDeg;

                if(callback && typeof callback['change'] === "function"){
                    callback['change'](event);
                }
            }
        });
        ele.addEventListener("touchend",(event) => {
            if(event.touches.length < 2 && isStart){
                if(callback && typeof(callback['change']) === "function"){
                    callback['end']();
                }
            }
            isStart = false;
        })
        // 两点的距离
        function getDistance(touch1, touch2){
            var a = touch1.clientX - touch2.clientX;
            var b = touch1.clientY - touch2.clientY;
            // 勾股定理
            return Math.sqrt(a * a + b * b);
        }
        
        // 两触点的角度
        function getDeg(touch1, touch2){
            var x = touch1.clientX - touch2.clientX;
            var y = touch1.clientY - touch2.clientY;
            // tan值 = 对边Y / 临边X
            var radian = Math.atan2(y, x);
            return radian * 180/ Math.PI;

        }
    }
})(window);