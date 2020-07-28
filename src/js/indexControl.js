(function(root){
    /**
     * 控制索引的构造函数
     * @param {*} len 请求数据列表的长度
     */
    function IndexControl(len){
        this.index = 0;
        this.len = len;
    }
    IndexControl.prototype = {
        // 获取上一首歌的索引值
        prev(){
            return this.get(-1);
        },
        // 获取下一首歌的索引值
        next(){
            return this.get(1);
        },
        // 根据val值（+1，-1）获取当前索引值
        get(val){
            this.index = (this.index + val + this.len) % this.len;
            return this.index;
        }
    }
    root.indexControl = IndexControl;
})(window.player || (window.player = {}))