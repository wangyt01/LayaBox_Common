//////////////////////////////////
//文    件:common.js                
//作    者:王勇坛                        
//时    间:2018.5.4                    
//整体说明:项目中公共用到的函数封装在这个文件夹下
//修 改 人:
//修改时间:2018.8.15
//修改说明:
//    1.添加了部分函数       
//////////////////////////////////

/**
 * 
 * @param {*boolean} arg 
 * 当为true是 隐藏加载
 * 当为false时 显示加载
 */

function loading(arg) {
    var loading = document.getElementById("loadingBg");
    if (arg || arg == null) {
        loading.style.display = "none";
    } else {
        loading.style.display = "block";
    }
}



/**
* 列表释放显存资源方法(利用资源表方式，每个场景配置资源路径表)
* target3D 需要释放资源的对象资源表assetsUrl:String
*/
function assetsDispose(assetsUrl) {
    //加载盘释放的资源配置表
    Laya.loader.load([{ url: assetsUrl, type: Laya.Loader.JSON }],
        Laya.Handler.create(this, onAssetsOK, [assetsUrl]));
}
/*加载资源释放表完成后*/
function onAssetsOK(assetsUrl) {
    //获取加载的数据（Json数组转化成数组）
    var arr = Laya.loader.getRes(assetsUrl);
    for (var i = arr.length - 1; i > -1; i--) {
        //根据资源路径获取资源（Resource为材质、贴图、网格等的基类）
        var resource = Laya.loader.getRes(arr[i].url);
        console.log(resource)
        //资源释放
        resource.dispose();
    }
}

/**
* * 字符串是否存在于数组中判断 
* * 判断 test 字符串是否存在于 arr 数组中，存在返回true 否则false，此处将返回true
* * @param {Array} arr - 数组
* * @param {string} val - 字符串
*/
function IsInArray(arr, val) {
    var testStr = ',' + arr.join(",") + ",";
    return testStr.indexOf("," + val + ",") != -1;
}
/**
 * * 画布根据屏幕居中显示,
 * * 设置了为手机端和PC端分开显示
 * * 
 */

function canvasMiddleShow(e) {
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
        document.getElementById("layaCanvas").style.left = 0;
    } else {
        //屏幕可见宽度
        var screenSeeWidth = document.body.clientWidth;
        //画布宽度
        var canvasWidth = document.getElementById("layaCanvas").width;
        //距左中间宽度
        var leftDistance = (screenSeeWidth - canvasWidth) / 2;
        if (canvasWidth >= 1900) {
            document.getElementById("layaCanvas").style.left = 0;
        } else {
            //距左距离
            document.getElementById("layaCanvas").style.left = leftDistance + "px";
        }
        //改变屏幕大小页面刷新
        window.onresize = function () {
            window.location.reload();
        }
    }
}

/**
 * js打印函数
 */

function log(e) {
    return console.log(e);
}

function docLog(e) {
    return document.getElementById("text").innerHTML = e;
}

/** 
 * * 检查函数的错误并打印出来
 * * @param {string} e - 提示字符串
 * * @param {function} callback - 回调函数,是个函数   
 */
function showError(e, callback) {
    try {
        //运行代码
        if (typeof callback == "function") {
            callback();
        }
    } catch (err) {
        //在这里处理错误
        console.log("错误名字: " + err.name + "\n\n" + "错误描述：" + err.message);
        console.log(err);
    }
}

