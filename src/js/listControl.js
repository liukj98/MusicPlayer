(function(root){

    function ListControl(){
        this.ddDoms = []; // 保存dd（歌曲的）的dom数组，后续对他们（歌单）点击以展示对应歌曲
        this.songList = null;// 保存歌曲列表的顶级元素，方便后续对他添加类名操作以展示歌曲列表页面
        this.close = null;// 保存歌曲列表中关闭按钮，方便后续对他点击添加类名操作以关闭歌曲列表
    }
    ListControl.prototype = {
        createListDom(data, wrap){
            var _this = this;
            var songList = document.createElement("div"); 
            var dl = document.createElement("dl"); 
            var dt = document.createElement("dt"); 
            var close = document.createElement("div"); 

            dt.innerHTML = "播放列表";
            close.classList.add("close");
            close.innerHTML = "关闭";
            songList.classList.add("song-list");

            dl.appendChild(dt);
            data.forEach(function(value, i){
                var dd = document.createElement("dd");
                dd.innerHTML = value.name;
                dl.appendChild(dd);
                _this.ddDoms.push(dd);
            })
            songList.appendChild(dl);
            songList.appendChild(close);
            wrap.appendChild(songList);

            this.songList = songList;
            this.close = close;
        }
    }

    root.ListControl = ListControl;

})(window.player || (window.player = {}))