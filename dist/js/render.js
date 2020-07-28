(function(root){

    /**
     * 渲染图片
     * @param {*} src 图片路径
     */
    function renderImage(src){
        root.blurImg(src); // 

        document.querySelector(".song-img img").src = src;
    }

    /**
     * 渲染音乐信息
     * @param {*} data 一首音乐相关信息的对象
     */
    function renderInfo(data){
        document.querySelector(".song-info .song").textContent = data.name;
        document.querySelector(".song-info .singer").textContent = data.singer;
        document.querySelector(".song-info .album").textContent = data.album;
    }

    // 渲染是否喜欢
    function renderIsLike(isLike){
        document.querySelector(".menu-bar li").classList.remove("like");
        if(isLike){
            document.querySelector(".menu-bar li").classList.add("like");
        }
    }

    root.render = function(data){
        renderImage(data.image);
        renderInfo(data);
        renderIsLike(data.isLike);
    };

})(window.player || (window.player = {}))