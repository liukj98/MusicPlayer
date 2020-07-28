(function ($, player) {
    /**
     * 音乐播放器函数，控制整个音乐播放器
     * @param {*} dom 音乐播放器的顶级dom元素，在这里就是id为wrapper的div
     */
    function MusicPlayer(dom) {
        this.wrap = dom;
        this.data = null; // 请求的数据
        // this.now = 0; // 当前音乐的索引
        this.indexObj = null;
        this.imgRotateTimer = null; //图片旋转定时器
        this.listSongs = null; //歌曲列表的dom元素信息

        this.progressBar = null; // 进度条数据
    }

    MusicPlayer.prototype = {
        init() {
            this.getDom();
            this.getData("../mock/data.json");
        },
        // 获取页面的dom元素
        getDom() {
            this.imgDom = document.querySelector(".song-img img");
            this.circleDom = document.querySelector(".drag .circle");
            this.menuBtnsDoms = document.getElementsByTagName("li");
        },
        // 获取音乐数据（是一个数组）
        getData(url) {
            var _this = this;
            $.ajax({
                url: url,
                method: "get",
                success: function (data) {
                    _this.data = data;
                    _this.listControl(data, _this.wrap);

                    _this.indexObj = new player.indexControl(data.length);
                    _this.loadMusic(_this.indexObj.index)
                    _this.controlMusic();
                },
                error: function (err) {
                    console.log("数据请求错误")
                }
            })
        },

        // 根据索引值加载对应的音乐
        loadMusic(index) {
            player.render(this.data[index]);//渲染音乐图片，信息
            player.music.load(this.data[index].audioSrc);//加载音乐
            if (player.music.status == "play") {
                player.music.play();
                this.menuBtnsDoms[2].classList.add("play");
                this.imgRotate(0);
            }
            player.progressBar.render(this.data[index]);
            player.progressBar.events(player.music.audio);
        },

        // 注册事件、控制音乐
        controlMusic() {//上一首、下一首、暂停、播放...
            var _this = this;
            // 点击上一首
            this.menuBtnsDoms[1].addEventListener("touchend", function () {
                // if(_this.now == 0){
                //     _this.now = _this.data.length - 1;
                // }else{
                //     _this.now --;
                // }
                _this.listSongs.ddDoms[_this.indexObj.index].classList.remove("active")
                player.music.status = "play";
                _this.loadMusic(_this.indexObj.prev());
            })
            // 点击下一首
            this.menuBtnsDoms[3].addEventListener("touchend", function () {
                // if(_this.now == _this.data.length - 1){
                //     _this.now = 0;
                // }else{
                //     _this.now ++;
                // }
                _this.listSongs.ddDoms[_this.indexObj.index].classList.remove("active")
                player.music.status = "play";
                _this.loadMusic(_this.indexObj.next());
            })
            // 点击暂停与播放
            this.menuBtnsDoms[2].addEventListener("touchend", function () {
                if (player.music.status == "play") {
                    player.music.status = "pause";
                    _this.menuBtnsDoms[2].classList.remove("play")
                    player.music.pause();
                    _this.stopImgRotate();
                } else if (player.music.status == "pause") {
                    player.music.status = "play";
                    _this.menuBtnsDoms[2].classList.add("play")
                    player.music.play();
                    _this.imgRotate(_this.imgDom.dataset.rotate || 0);
                }
            })
        },

        // 图片旋转
        imgRotate(deg) {
            var _this = this;
            clearInterval(this.imgRotateTimer);
            _this.imgRotateTimer = setInterval(function () {
                _this.imgDom.style.transform = `rotate(${deg}deg)`;
                deg = +deg + 0.2;// 前面一个加号作用是将字符串的deg转换成数字
                //自定义属性rotate来保存旋转角度，方便同一首歌曲暂停后继续播放图片从当前角度开始旋转
                _this.imgDom.dataset.rotate = deg;
            }, 1000 / 60)
        },

        //停止图片旋转
        stopImgRotate() {
            clearInterval(this.imgRotateTimer);
        },

        //控制歌曲列表相关操作
        listControl(data, wrap) {
            this.listSongs = new player.ListControl();
            this.listSongs.createListDom(data, wrap);

            var _this = this;

            // 注册歌曲列表按钮事件
            this.menuBtnsDoms[4].addEventListener("touchend", function () {
                _this.listSongs.songList.classList.add("show");
                if (!_this.listSongs.ddDoms[_this.indexObj.index].classList.contains("active")) {
                    _this.listSongs.ddDoms[_this.indexObj.index].classList.add("active");
                }
            })

            // 注册close按钮事件
            this.listSongs.close.addEventListener("touchend", function () {
                _this.listSongs.songList.classList.remove("show")
            })

            // 注册歌曲点击事件
            for (var i = 0; i < this.listSongs.ddDoms.length; i++) {
                (function (j) {
                    _this.listSongs.ddDoms[j].addEventListener("touchend", function () {
                        _this.listSongs.ddDoms[_this.indexObj.index].classList.remove("active");
                        _this.indexObj.index = j;
                        _this.loadMusic(j);
                        this.classList.add("active");
                        _this.listSongs.songList.classList.remove("show");

                        // 每次通过歌曲列表点击歌曲后 判断之前的歌曲是否在播放
                        if (player.music.status = "pause") {
                            player.music.status = "play";
                            _this.menuBtnsDoms[2].classList.add("play")
                            player.music.play();
                            _this.imgRotate(_this.imgDom.dataset.rotate || 0);
                        }

                    })
                })(i)
            }
        }
    }

    var musicPlayer = new MusicPlayer(document.getElementById("wrapper"));
    musicPlayer.init();

})(window.Zepto, window.player);