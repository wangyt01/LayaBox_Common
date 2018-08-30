//////////////////////////////////
//文    件:index.js                
//作    者:王勇坛                        
//时    间:2018.5.4                    
//整体说明:主要的js,引擎的初始化,引擎的配置,闪光配置,2D|3D资源加载,按钮事件
//修 改 人:
//修改时间:
//修改说明:                
//////////////////////////////////

 /**
 * 项目中自动横屏
 * 项目中显示调试的数值
 */

//引擎的初始化
Laya3D.init(1920, 1080, true);

//适配模式(手机端自动横屏)
//https://layaair.ldc.layabox.com/api/?category=Core&class=laya.display.Stage
Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;//自动横屏

//开启统计信息
Laya.Stat.show();
//模型闪光的配置
initShader();

//2D,3D资源
var scene2D = ["res/atlas/comp.atlas",];
var model3D = ["res/model/testModel/testModel.lh",];

//加载2D界面资源
Laya.loader.load(scene2D, Laya.Handler.create(this, onUIComplete));
//UI加载函数
function onUIComplete() {
    // 添加3D场景 主场景
    this.scene = Laya.stage.addChild(new Laya.Scene());
    //如果需要多个场景添加多个场景
    this.sceneVice = Laya.stage.addChild(new Laya.Scene());
    //UI引入
    this.control = new onSceneUI();
    //UI添加到舞台中
    Laya.stage.addChild(control);
    //设置舞台中 场景的层次,UI层次 setChildIndex设置索引位置,索引值越大层次越高
    Laya.stage.setChildIndex(this.scene, 0); //最底层
    Laya.stage.setChildIndex(this.sceneVice, 1); //中间层
    Laya.stage.setChildIndex(this.control, 2) // 最上层

    //如果需要相机就创建一个相机 
    createCamera();
    //相机加载到场景
    scene.addChild(camera);
    //如果需要一个灯光就创建一个灯光
    createLight();
    //灯光添加到相机中
    camera.addChild(this.directionLight);
    //画布居中显示
    canvasMiddleShow();
    //事件类型集合
    this.Event = laya.events.Event;

    //预加载模型的数据
    Laya.loader.create(model3D, Laya.Handler.create(this, onLoadModel));
}

//加载3D资源
function onLoadModel() {
    //模型加载
    this.Xmodel3D = Laya.loader.getRes(model3D[0].url);
    //模型添加到场景中
    this.scene.addChild(this.Xmodel3D);

    //模型加载后UI中按钮事件监听
    //监听点击事件
    this.control.on(Event.CLICK, this, onClickAction);
}


//按钮事件
function onClickAction(e){
    var name = e.target.name;
}