(function(root){

    /**
     * 音乐播放控制的构造函数
     */
    function AudioManager(){
        this.audio = new Audio(); // 音乐实例
        this.status = "pause"; //音乐播放状态，默认为暂停
    }

    AudioManager.prototype = {
        // 加载音乐
        load(src){
            this.audio.src = src;
            this.audio.load();
        },
        // 播放音乐
        play(){
            this.audio.play();
            this.status = "play";
        },
        // 暂停音乐
        pause(){
            this.audio.pause();
            this.status = "pause";
        },
        
        end(fn){
            this.audio.onended = fn;
        },
        
        // 控制音乐当前的播放时间
        playTo(time){
            this.audio.currentTime = time;//单位为秒
        }
    }

    root.music = new AudioManager();

})(window.player || (window.player = {}))