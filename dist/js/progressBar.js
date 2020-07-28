(function (root){
    function ProgressBar(){
        this.curTimeDom = document.getElementsByClassName("cur-time")[0];
        this.totolTimeDom = document.getElementsByClassName("totol-time")[0];
        this.circleDom = document.getElementsByClassName("circle")[0];
        this.shallowBarDom = document.getElementsByClassName("shallow-bar")[0];
    }
    ProgressBar.prototype = {
        /**
         * 设置每首歌的总时长
         * @param {*} data 当前歌曲的数据信息
         */
        render(data){
            this.totolTimeDom.innerHTML = this.conversion(data.duration);
        },
        /**
         * 辅助函数，根据value值转换为'00:00'格式的时间
         * @param {*} value 
         */
        conversion(value){
            var minute = Math.floor(value / 60) < 10 ? ("0"+Math.floor(value / 60)) : ("" + Math.floor(value / 60));//分钟
            var second = value % 60 < 10 ? ("0" + value % 60) : (""+value % 60);//秒钟
            return `${minute}:${second}`;
        },
        /**
         * 
         * @param {*} audio 音频对象
         */
        events(audio){
            var _this = this;
            var timer = null;
            audio.addEventListener("playing", function () {
                clearInterval(timer);
                timer = setInterval(() => {
                    _this.curTimeDom.innerHTML =  _this.conversion(Math.floor(audio.currentTime))
                }, 1000)
            })
            audio.addEventListener("pause", function () {
                clearInterval(timer);
            })
        }
    }
    root.progressBar = new ProgressBar();
})(window.player || (window.player = {}))