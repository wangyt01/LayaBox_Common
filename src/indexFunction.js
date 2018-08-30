//////////////////////////////////
//文    件:indexFunction.js               
//作    者:王勇坛                        
//时    间:2018.5.4                    
//整体说明:其他js所用到的函数,放在这个文件夹下面
//修 改 人:
//修改时间:
//修改说明:                
//////////////////////////////////

/**
 * 主页中用到的一些重要的函数
 */

/**
 * 创建一个相机
 * @param {*} 参数一:相机是否移动 默认移动
 * @param {*} 参数二:相机是否旋转 默认不旋转
 */
function createCamera(move, rotate) {
    //默认不旋转
    var rotate = rotate || 0;

    //实例化一个相机，设置纵横比，0为自动匹配。0.1是最近看到的距离，100是最远看到的距离
    this.camera = new Laya.Camera(0, 0.1, 1000);
    if (move == void 0 || move == null) {
        //移动相机，设置相机向z轴移动3米，true代表的是局部坐标，false是相对世界坐标
        camera.transform.translate(new Laya.Vector3(0, 0, 3), false);
    }
    if (rotate) {
        //欧拉角旋转相机。局部坐标，弧度制（false为角度制）
        camera.transform.rotate(new Laya.Vector3(0, 0, 3), true, true);
    }

    // //摄像机捕捉模型目标  先不用一般用不到
    // camera.transform.lookAt(box.transform.position, new Laya.Vector3(0, -1, 0));
}
/**
 * 创建灯光
 * 灯光颜色,灯光方向
 */
function createLight() {
    // 添加方向光
    this.directionLight = scene.addChild(new Laya.DirectionLight());
    //灯光颜色
    directionLight.color = new Laya.Vector3(1, 1, 1);
    //灯光方向
    directionLight.direction = new Laya.Vector3(1, 0, 0);


}

/**
 * 进度条加载
 * @param{*string} child 子元素
 * @param{*number} num 进度条速度
 */

function progressBarFunc() {
    this.start = function (child, num) {
        var child = child;
        this.start.changeValue = function () {
            // progressBar = control.getChildAt(4).getChildAt(1);
            if (child.value >= 1) {
                // child.value = 0;
                Global.isProgress = true;
                // Laya.timer.clear(this,changeValue);
            }
            if (!Global.isProgress) {//进度条不循环
                if (child.value <= 0.95) {
                    child.value += 0.05;
                }
            }
            // child.value += 0.05;
            this.onChange(child.value);
        }
        var num = num || 100;
        Laya.timer.loop(num, this, this.start.changeValue);
    }
    this.stop = function (child) {//进度条隐藏结束
        for (var i = 1; i < 7; i++) {
            Laya.timer.once(i * 100, this, function (e) {
                // console.log(e);
                var num = 0.95 + e * 0.01;
                child.getChildAt(1).value = num;
                this.onChange(num);
                if (e == 6) {
                    //隐藏进度条
                    child.visible = !1;
                    Laya.timer.clearAll(this);
                }
            }, [i], false);
        }
        // child.getChildAt(1).value = 1;
        // //清理函数
        // Laya.timer.clear(this, this.start.changeValue);
        // Laya.timer.once(500, this, function () {
        //     //隐藏进度条
        //     child.visible = !1;
        //     //清理函数
        //     Laya.timer.clear(this, this.start.changeValue);
        // })

    }
    this.onChange = function (value) {//下方文字改变百分比
        control.progressText.text = "资源正在加载中，当前进度为：" + Math.floor(value * 100) + "%";
    }
}
var progressBarStart = new progressBarFunc();
/**
 * 相机变成小的相机
 * 在UI设计中,直接创建一个Box来放相机,引用这个Box的大小和位置.
 * 而且还运用了一个视口函数Viewport
 * 构造函数
 */

function cameraZoomBigSmall() {
    this.name = "相机缩放";
    //相机背景放大
    this.bigCamera = function () {
        //修改摄像机2位置及角度
        cameraVice_X = control.cameraPosition_2.x;
        cameraVice_Y = control.cameraPosition_2.y;
        cameraVice_width = control.cameraPosition_2.width;
        camera3_height = control.cameraPosition_2.height;
        //设置视口为右半屏
        cameraVice.viewport = new Laya.Viewport(cameraVice_X, cameraVice_Y, cameraVice_width, camera3_height);
        //设置背景颜色
        cameraVice.clearColor = new Laya.Vector3(0.1, 0.1, 0.1);
    }
    //相机背景缩小
    this.smallCamera = function () {
        //修改摄像机2位置及角度
        cameraVice_X = control.cameraPosition.x;
        cameraVice_Y = control.cameraPosition.y;
        cameraVice_width = control.cameraPosition.width;
        camera3_height = control.cameraPosition.height;
        //设置视口为右半屏
        cameraVice.viewport = new Laya.Viewport(cameraVice_X, cameraVice_Y, cameraVice_width, camera3_height);
        //设置背景颜色
        // cameraVice.clearColor = new Laya.Vector3(0.8, 0.8, 0.8);
    }
}

var cameraZoomFun = new cameraZoomBigSmall();


/**
 * *背景音乐播放
 * *@param {boolean} e 失去焦点是否播放
 * *@param {number} num 背景音乐声音大小
 */

function musicPlayFunc() {
    //http://layaair.ldc.layabox.com/api/?category=Core&class=laya.media.SoundManager
    this.play = function (e, num) {
        var bool = e;
        if (num != void 0) {
            //背景音乐声音大小
            Laya.SoundManager.musicVolume = num;
        } else {
            //背景音乐声音大小
            Laya.SoundManager.musicVolume = 0.1;
        }

        //背景音乐地址  0代表无限循环播放
        Laya.SoundManager.playMusic(allAudioArr[0].url, 0);

        if (bool != void 0) {
            //页面失去焦点是否播放
            Laya.SoundManager.autoStopMusic = bool;
        } else {
            //页面失去焦点是否播放
            Laya.SoundManager.autoStopMusic = false;
        }
    }
    this.SoundManager = function () {
        return Laya.SoundManager;
    }
    this.stop = function () {//停止背景音乐
        Laya.SoundManager.stopMusic();
    }
    this.musicMuted = function (e) {//是否静音
        var bool = e;
        if (bool != void 0) {
            Laya.SoundManager.musicMuted = bool;
        } else {
            Laya.SoundManager.musicMuted = !1;
        }
    }
}

var musicPlay = new musicPlayFunc();

/**
 * 音效播放
 * 
 * @param {*} e 
 */

function soundPlayFunc() {
    this.playIndex = function (name) {
        if (name != void 0) {
            for (var i = 1; i < allAudioArr.length; i++) {
                if (IsInArray(allAudioArr[i].btnArr, name)) {
                    Laya.SoundManager.playSound(allAudioArr[i].url, 1);
                }
            }
        }
    }
    this.play = function (index) {
        if (index != void 0) {
            Laya.SoundManager.playSound(allAudioArr[index].url, 1);
        }
    }
}

var soundPlay = new soundPlayFunc();


/**
 * 利用albedo实现模型颜色改变闪光效果
 */
function albedoChangeMaterialColor() {
    this.color_1 = function (e) {
        //原始材质
        for (var i = 0; i < Global.materialArr.length; i++) {
            Global.materialArr[i].albedo = new Laya.Vector4(1, 1, 1, 0.4);
        }
        // //原始材质
        // m_1.albedo = new Laya.Vector4(1, 1, 1, 0.4);
        // m_2.albedo = new Laya.Vector4(1, 1, 1, 0.4);
    }
    this.color_2 = function () {
        //颜色改变2
        for (var i = 0; i < Global.materialArr.length; i++) {
            Global.materialArr[i].albedo = new Laya.Vector4(0, 0.9, 1, 0.4);
        }
        // //颜色改变2
        // m_1.albedo = new Laya.Vector4(0, 0.9, 1, 0.4);
        // m_2.albedo = new Laya.Vector4(0, 0.9, 1, 0.4);
    }
}
var changeColor = new albedoChangeMaterialColor();

/**
 * *播放动画
 * *e 0~5测量
 * *e 6 开电脑
 * *e 7 开仪器
 * *e 8 人物站立
 * *@param {*number} e  
 * *
 */
function PCplayAni(e) {//
    animatorModel_Ren.play("r_stand");
    animatorModel_WuTi.play("d_stand");
    if (e < 6) {
        animatorModel_Ren.play(Global.RenAni[e]);
        animatorModel_WuTi.play(Global.WuAni[e]);
    } else if (e == 6) {
        animatorModel_Ren.play(Global.RenAni[e]);
    } else if (e == 7) {
        animatorModel_Ren.play(Global.RenAni[e]);
    } else if (e == 8) {
        animatorModel_Ren.play("r_stand");
        animatorModel_WuTi.play("d_stand");
    }

}

/**
 * * 移动端动画播放
 * *2.0站立
 * *2.1开仪器
 * *2.2开电脑
 * *3.1~3.5 测标准溶液
 * *4.1 测样品溶液
 * @param {*number} num 
 * @param {*} bool 
 */
function playAnimator(num, bool) {
    Global.isPlay = bool;
    for (var i = 0; i < Global.isPhonePlay.length; i++) {
        if (num == Global.isPhonePlayNum[i]) {
            Global.isPhonePlay[i] = !0;
        } else {
            Global.isPhonePlay[i] = !1;
        }
    }
    if (num == 2.0) {//站立
        if (phoneInfo) {
            // Ren_Animator.play("stand_R");
            // Wu_Animator.play("stand_D");
            PCplayAni(8);
        } else {
            PCplayAni(8);
        }

    }
    if (num == 2.1) {//开仪器
        // Ren_Animator.play("KaiGuan_YiQi");
        PCplayAni(7);
    }
    if (num == 2.2) {//开电脑
        // Ren_Animator.play("KaiGuan_DianNao");
        PCplayAni(6);
    }

    if (num == 3.1) {
        PCplayAni(0);
        // Ren_Animator.play("001");
        // Wu_Animator.play("001");
        // Laya.timer.loop(1, this, function () {
        //     if (Global.isPhonePlay[0]) {
        //         // console.log( Ren_Animator.currentFrameIndex);
        //         if (Ren_Animator.currentPlayClip != void 0) {
        //             var name = Ren_Animator.currentPlayClip.name;
        //             var index = Ren_Animator.currentFrameIndex;
        //             var len = playAnimatorArr[0].name.length;
        //             // console.log(Ren_Animator.currentPlayClip.name)
        //             // console.log(Ren_Animator.currentFrameTime)
        //             for (var i = 0; i < len; i++) {
        //                 if (name == playAnimatorArr[0].name[i] && index >= FrameIndex[i] - 2) {
        //                     playNum(playAnimatorArr[0].playName[i]);
        //                 }
        //             }
        //         }
        //     }

        // })

    }
    if (num == 3.2) {
        PCplayAni(1);
        // Ren_Animator.play("006");
        // Wu_Animator.play("006");
        // Laya.timer.loop(1, this, function () {
        //     if (Global.isPhonePlay[1]) {
        //         if (Ren_Animator.currentPlayClip != void 0) {
        //             var name = Ren_Animator.currentPlayClip.name;
        //             var index = Ren_Animator.currentFrameIndex;
        //             var len = playAnimatorArr[1].name.length;
        //             // console.log(Ren_Animator.currentPlayClip.name)
        //             // console.log(Ren_Animator.currentFrameTime)
        //             for (var i = 0; i < len; i++) {
        //                 if (name == playAnimatorArr[1].name[i] && index >= FrameIndex[i] - 2) {
        //                     playNum(playAnimatorArr[1].playName[i]);

        //                 }
        //             }
        //         }
        //     }

        // })
    }
    if (num == 3.3) {
        PCplayAni(2);
        // Ren_Animator.play("006");
        // Wu_Animator.play("006");
        // Laya.timer.loop(1, this, function () {
        //     if (Global.isPhonePlay[2]) {
        //         // console.log( Ren_Animator.currentFrameIndex);
        //         if (Ren_Animator.currentPlayClip != void 0) {
        //             var name = Ren_Animator.currentPlayClip.name;
        //             var index = Ren_Animator.currentFrameIndex;
        //             var len = playAnimatorArr[2].name.length;
        //             // console.log(Ren_Animator.currentPlayClip.name)
        //             // console.log(Ren_Animator.currentFrameTime)
        //             for (var i = 0; i < len; i++) {
        //                 if (name == playAnimatorArr[2].name[i] && index >= FrameIndex[i] - 2) {
        //                     playNum(playAnimatorArr[2].playName[i]);
        //                 }
        //             }
        //         }
        //     }
        // })
    }
    if (num == 3.4) {
        PCplayAni(3);
        // Ren_Animator.play("006");
        // Wu_Animator.play("006");
        // Laya.timer.loop(1, this, function () {
        //     if (Global.isPhonePlay[3]) {
        //         // console.log( Ren_Animator.currentFrameIndex);
        //         if (Ren_Animator.currentPlayClip != void 0) {
        //             var name = Ren_Animator.currentPlayClip.name;
        //             var index = Ren_Animator.currentFrameIndex;
        //             var len = playAnimatorArr[3].name.length;
        //             // console.log(Ren_Animator.currentPlayClip.name)
        //             // console.log(Ren_Animator.currentFrameTime)
        //             for (var i = 0; i < len; i++) {
        //                 if (name == playAnimatorArr[3].name[i] && index >= FrameIndex[i] - 2) {
        //                     playNum(playAnimatorArr[3].playName[i]);
        //                 }
        //             }
        //         }
        //     }
        // })
    }
    if (num == 3.5) {
        PCplayAni(4);
        // Ren_Animator.play("006");
        // Wu_Animator.play("006");
        // Laya.timer.loop(1, this, function () {
        //     if (Global.isPhonePlay[4]) {
        //         // console.log( Ren_Animator.currentFrameIndex);
        //         if (Ren_Animator.currentPlayClip != void 0) {
        //             var name = Ren_Animator.currentPlayClip.name;
        //             var index = Ren_Animator.currentFrameIndex;
        //             var len = playAnimatorArr[4].name.length;
        //             // console.log(Ren_Animator.currentPlayClip.name)
        //             // console.log(Ren_Animator.currentFrameTime)
        //             for (var i = 0; i < len; i++) {
        //                 if (name == playAnimatorArr[4].name[i] && index >= FrameIndex[i] - 2) {
        //                     playNum(playAnimatorArr[4].playName[i]);
        //                 }
        //             }
        //         }
        //     }
        // })
    }
    if (num == 4.1) {
        PCplayAni(5);
        // Ren_Animator.play("006");
        // Wu_Animator.play("006");
        // Laya.timer.loop(1, this, function () {
        //     if (Global.isPhonePlay[5]) {
        //         // console.log( Ren_Animator.currentFrameIndex);
        //         if (Ren_Animator.currentPlayClip != void 0) {
        //             var name = Ren_Animator.currentPlayClip.name;
        //             var index = Ren_Animator.currentFrameIndex;
        //             var len = playAnimatorArr[5].name.length;
        //             // console.log(Ren_Animator.currentPlayClip.name)
        //             // console.log(Ren_Animator.currentFrameTime)
        //             for (var i = 0; i < len; i++) {
        //                 if (name == playAnimatorArr[5].name[i] && index >= FrameIndex[i] - 1) {
        //                     playNum(playAnimatorArr[5].playName[i]);
        //                 }
        //             }
        //         }
        //     }

        // })

    }
}

function playNum(num) {
    Ren_Animator.play(num);
    Wu_Animator.play(num);
}

/**
 * * 按钮缩放动画
 */

function btnChangeAnimationFun() {
    this.enlargement = function (e) {
        this.btnList.btn.scaleX += Global.ZoomNum;
        this.btnList.btn.scaleY += Global.ZoomNum;
        if (this.btnList.btn.scaleX >= 1) {
            Laya.timer.clear(this, this.enlargement);
            Laya.timer.loop(Global.ZoomTime, this, this.narrow);
        }
    }
    this.narrow = function (e) {
        this.btnList.btn.scaleX -= Global.ZoomNum;
        this.btnList.btn.scaleY -= Global.ZoomNum;
        if (this.btnList.btn.scaleX <= 0.7) {
            Laya.timer.clear(this, this.narrow);
            Laya.timer.loop(Global.ZoomTime, this, this.enlargement);
        }
    }
    this.btnList = function (index) {//按钮列表
        var index = index;
        if (index == 0) {
            this.btnList.btn = child_2[0].getChildAt(1);
        }
        if (index == 1) {//进入实验
            this.btnList.btn = child_2_1[0].getChildAt(2);
        }
        if (index == 2) {//操作前准备-下一步
            this.btnList.btn = child_2_4[7];
        }
        if (index == 3) {//测标准溶液-下一步
            this.btnList.btn = child_2_5[5];
        }
        if (index == 4) {//测样品溶液下一步
            this.btnList.btn = child_2_6[5];
        }
    }
    this.loop = function (e, btn) {
        if (phoneInfo) {

        } else {
            var bool = e;
            //按钮列表 所在位置
            var btnIndex = btn;
            this.btnList(btnIndex);
            if (btn != void 0) {
                // Laya.timer.clear(this, this.enlargement);
                // Laya.timer.clear(this, this.narrow);
                if (bool) {
                    if (this.btnList.btn.scaleX >= 1) {
                        Laya.timer.loop(Global.ZoomTime, this, this.narrow);
                    }
                }
            }
        }



    }

}


var btnChangeAnimation = new btnChangeAnimationFun();




/**
 * 模型的克隆点击下一个模型删除上一个模型
 * 模型从副相机中移除
 * arr 模型层次的数组
 * removeModelClone 移除上一个模型函数
 * istantiate()函数克隆
 */
var mArr = new Array();//克隆的模型放入一个数组中
var cloneX3D_clone = null;
var isClone = false;//是否克隆
function modelClone(arr) {
    //获取子模型
    // acquireCommon(arr);

    // this.childModel = this.commonModel;
    this.childModel = child_3D[4];
    //模型距离太长，让位置移动远一点
    // if (IsInArray(cloneScaleArr, childModel.name)) {
    //     //克隆sprite3d
    //     this.cloneX3D_clone = Laya.Sprite3D.instantiate(this.childModel, sceneVice, false, new Laya.Vector3(0, 0, -3));
    // } else {
    //克隆sprite3d
    this.cloneX3D_clone = Laya.Sprite3D.instantiate(this.childModel, sceneVice, false, new Laya.Vector3(0, 0, 0));
    // }
    //克隆模型放入一个数组
    mArr.push(cloneX3D_clone);
    //获取数组倒数第二模型，删除
    var removeModelClone = (function () {
        if (mArr.slice(-2, -1).length > 0) {
            var removeModel = mArr.slice(-2, -1)[0];
            removeModel.removeSelf();
        }
    })();
}




/**********************
 * 
 * @param {*传递的布尔值} arg 
 * 当为true是 隐藏加载
 * 当为false时 显示加载
 **********************/

function loading(arg) {
    var loading = document.getElementById("loadingBg");
    if (arg || arg == null) {
        loading.style.display = "none";
    } else {
        loading.style.display = "block";
    }
}



/** *****
* * 按钮的发光和清除
* * e 代表按钮字符串
* * shader 布尔值 false 清除闪光
* * shaderColor1 显示颜色1
* * shaderColor2 显示颜色2
* *********/
function btnShaderFunc() {
    this.shader = function (e, bool, shaderColor1, shaderColor2) {
        // console.log(arguments[0], arguments[1], arguments[2]);
        var color1 = "#fffff"; //原始颜色1
        var color2 = "#fff4da"; //原始颜色2
        var btnNum = {};
        this.bool = bool;
        this.shaderColor1 = shaderColor1;
        this.shaderColor2 = shaderColor2;
        //循环遍历 control中的属性值
        for (var name in this.control) {
            // console.log(name + ':' + this.control[name]);
            btnNum.name = this.control[e];
        }
        Global.isShaderPlay = bool;
        this.shader.showColor = function (e) { //发光颜色
            if (Global.isShaderPlay) {
                // console.log(e.name);
                if (shaderColor1) {
                    //创建一个发光滤镜 "#7CADDE"
                    var glowFilter = new Laya.GlowFilter(shaderColor1, 20, 1, 0);
                    // //设置滤镜集合为发光滤镜
                    e.filters = [glowFilter];
                } else {
                    //创建一个发光滤镜 "#7CADDE"
                    var glowFilter = new Laya.GlowFilter(color1, 20, 1, 0);
                    // //设置滤镜集合为发光滤镜
                    e.filters = [glowFilter];
                }
            }

        }
        this.shader.hideColor = function (e) {//滤镜透明
            if (Global.isShaderPlay) {
                if (shaderColor2) {
                    //创建一个发光滤镜 #ffffff
                    var glowFilter = new Laya.GlowFilter(shaderColor2, 10, 2, 0);
                    //设置滤镜集合为发光滤镜
                    e.filters = [glowFilter];
                } else {
                    //创建一个发光滤镜 #ffffff
                    var glowFilter = new Laya.GlowFilter(color2, 0, 0, 0);
                    //设置滤镜集合为发光滤镜
                    e.filters = [glowFilter];
                }
            }

        }
        //如果传递的shader的值为真或者为空都闪光
        if (bool) {
            //按钮闪光效果
            Laya.timer.loop(500, this, this.shader.showColor, [e]);
            Laya.timer.loop(1000, this, this.shader.hideColor, [e]);
        }
        //清除按钮1闪光
        if (!bool) {
            // //设置滤镜集合为发光滤镜
            // e.filters = [];
            Laya.timer.clearAll(this, this.shader.showColor);
            Laya.timer.clearAll(this, this.shader.hideColor);
        }

    }



}

var btnShader = new btnShaderFunc();
/** ***************
* 列表加载模型资源的方法
* target3D 需要加载资源的对象资源表assetsUrl:String
* **************/
function addModel(assetsUrl) {
    //加载盘释放的资源配置表
    Laya.loader.load([{ url: assetsUrl, type: Laya.Loader.JSON }], Laya.Handler.create(this, onaddModelOK, [assetsUrl]));
}
/*加载资源释放表完成后*/
function onaddModelOK(assetsUrl) {
    //获取加载的数据（Json数组转化成数组）
    var arr = Laya.loader.getRes(assetsUrl);
    Laya.loader.create(arr, Laya.Handler.create(this, function () {
        loading(true)
        for (var i = arr.length - 1; i > -1; i--) {
            var urls = arr[0].url
            //根据资源路径获取资源（Resource为材质、贴图、网格等的基类）
            var resource = Laya.loader.getRes(urls);
            //资源释放
            this.scene.addChild(resource);
        }
    }));
}


/** ******************
 * 网格获取
 * 设置网格的层次
 * arr数组代表元素镶套的层次
 * num 代表模型所在层级 最高为32层
 * acquireMeshArray 这是获取网格中的数组函数
 * @param {*e} 传递的值，决定获取数组中第几个模型
 * *******************/

function acquireMeshArray(e) {
    if (e == null) {
        for (var i = 0; i < WaiKeArr.length; i++) {
            ModelMesh3D(WaiKeArr[i].meshChild);
        }
        // console.log("获取多个模型网格")
    } else {
        ModelMesh3D(WaiKeArr[e].meshChild);
        // console.log("获取一个模型网格")
    }
}
function ModelMesh3D(arr, num) {
    //获取子模型
    acquireChildModel(arr);
    // console.log(Model3D)
    //设置模型的层级
    if (num == null || num == 0) {
        var num = 0;
        //获取这个模型的网格
        this.childModel.layer = Laya.Layer.getLayerByNumber(num);
    } else {
        //获取这个模型的网格
        this.childModel.layer = Laya.Layer.getLayerByNumber(num);
    }
    //添加网格碰撞器MeshCollider
    this.Model3DMeshCollider = this.childModel.addComponent(Laya.MeshCollider);
    //获取共享网格
    Model3DMeshCollider.mesh = this.childModel.meshFilter.sharedMesh;
    //添加网格碰撞器MeshCollider
    this.Model3DMeshCollider = this.childModel.addComponent(Laya.MeshCollider);


}

/**
 * * 进度条的效果
 */
var lineWidth = 0;
function progressBar(e) {
    var bool = e;
    //进度条的显示与隐藏
    child_1_1_2[3].getChildAt(2).visible = bool;

    Laya.timer.loop(50, this, addWidth);
}

function addWidth() {
    var width = child_1_1_2[3].getChildAt(2).width;
    var maxWidth = child_1_1_2[3].getChildAt(2).getChildAt(0).width;
    if (width <= maxWidth) {
        child_1_1_2[3].getChildAt(2).width += 18;
    } else {
        child_1_1_2[3].getChildAt(2).width = 18;
    }
}

/**
 * * 随机变化的值
 * * -10~10
 */
function numRandom(e) {
    var bool = e;
    this.loopA = function () {
        //随机数 取小数点后三位
        var num = (10 - Math.random() * 20).toFixed(3);
        //数字区 第一个变化的数字
        child_1_1_2[4].getChildAt(2).getChildAt(0).text = num;
    }
    if (bool) {
        Laya.timer.clear(this, this.loopA);
        Laya.timer.loop(1500, this, this.loopA);
    } else {
    }
}
