//////////////////////////////////
//文    件:data.js                
//作    者:王勇坛                        
//时    间:2018.5.4                    
//整体说明:全局所用到的公共的变量,全局所用到的一些数组放在这里.
//修 改 人:
//修改时间:
//修改说明:                
//////////////////////////////////


// 1.多场景如何加载使用?使用多场景用索引实现,还是用多个场景的显示隐藏?
//     // ----------------------- 用到两个场景,两个UI界面, 用setChild()函数设置了索引设置多场景,多UI场景引用
//     // 添加3D场景 主场景
//     this.scene = Laya.stage.addChild(new Laya.Scene());
//     //添加3D场景 副场景
//     this.sceneVice = Laya.stage.addChild(new Laya.Scene());
//     //添加主UI
//     this.control = new CtPageUI();
//     //小部件名字改变
//     this.control.toolChangeName.text = "";
//     //UI加载到舞台中
//     Laya.stage.addChild(control);
//     //添加UI背景
//     this.controlBg = new CtPageBgUI();
//     //UI加载到舞台中
//     Laya.stage.addChild(controlBg);
//     //设置2D场景为最底层 背景UI在舞台最下层 主场景在舞台中间层  UI在舞台最上层
//     Laya.stage.setChildIndex(controlBg, 0)
//     Laya.stage.setChildIndex(this.scene, 1)
//     Laya.stage.setChildIndex(this.sceneVice, 2)
//     Laya.stage.setChildIndex(control, 3);
//     //-----------------------用到多个场景可以在UI设计中添加多个view通过显示隐藏来实现,多场景的加载
//     /**
//      * 场景的隐藏和显示
//      * 传递多个场景的参数
//      */
//     function sceneElement(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
//         //
//         this.control.scene1.visible = arg1;
//         this.control.scene2.visible = arg2;
//         this.control.scene3.visible = arg3;
//         this.control.scene4.visible = arg4;
//         this.control.scene5.visible = arg5;
//         this.control.scene6.visible = arg6;
//         this.control.scene7.visible = arg7;
//         this.control.scene8.visible = arg8;
//         this.control.scene9.visible = arg9;
//         this.control.scene10.visible = arg10;


//     }

// 2.模型的移动,旋转,缩放?
// //--------------利用移动相机来实现,模型的移动,旋转,缩放  
// //----移动实现思路------移动利用了手指移动的X轴,Y轴移动的增减量来实现移动,用到了世界坐标transform.position
// //模型触摸事件 移动 是否移动等一些判断配置,whetherMove  is
// var whetherMove = false;
// var isMouseMove = false;
// function modelMoveTouch(e) {
//     if (whetherMove) {
//         if (isMouseMove && isClickMove && clickModelMesh) {
//             var _position = clickModelMesh.transform.position;
//             _outPos.x = e.stageX;
//             _outPos.y = e.stageY;
//             //鼠标抖动坐标差值 X Y
//             var poorX = lastDistanceX - e.stageX;
//             var poorY = lastDistanceY - e.stageY;
//             if (lastDistanceX < e.stageX && Math.abs(poorX) > movePoor) {
//                 // console.log("向左");
//                 lastDistanceX = e.stageX;
//                 _position.x = _position.x - addNum;
//                 clickModelMesh.transform.position = _position;
//             } else if (lastDistanceX > e.stageX && Math.abs(poorX) > movePoor) {
//                 // console.log("向右");
//                 lastDistanceX = e.stageX;
//                 _position.x = _position.x + addNum;
//                 clickModelMesh.transform.position = _position;
//             } else
//                 if (lastDistanceY < e.stageY && Math.abs(poorY) > movePoor) {
//                     // console.log("向上");
//                     lastDistanceY = e.stageY;
//                     _position.y = _position.y - addNum;
//                     clickModelMesh.transform.position = _position;
//                 } else if (lastDistanceY > e.stageY && Math.abs(poorY) > movePoor) {
//                     // console.log("向下");
//                     lastDistanceY = e.stageY;
//                     _position.y = _position.y + addNum;
//                     clickModelMesh.transform.position = _position;
//                 }
//         }
//     }

// }
// //-----旋转实现思路-----
// 3.按钮闪光的效果制作?用显示消失实现,用透明度实现?
// 4.资源未加载完成是,页面出现滚动圆环?
// 5.如何获取子模型?
// 6.如何获取子模型的网格?
// 7.如何获取子模型的材质,并实现闪光的效果?材质中有多个材质和材质中有1个材质,图片材质和直接材质球?
// 8.如何子模型移动,旋转,缩放后归位问题?归位中材质恢复问题?
// 9.子模型的移动消失效果如何实现?
// 10.按钮的移动切换,背景改变?
// 11.模型动画的播放开始和停止播放?
// 12.页面中如何添加视频和如何让视频隐藏?
// 13.模型在导出的时候应该如何做?如何优化导出的模型,层次问题,图片问题?
// 14.图片的缩放效果实现?
// 15.如何获取子模型,用射线方式实现点击的问题?
// 16.如何克隆一个模型?
// 17.多场景,多相机如何实现?
// 18.UI中如何实现一个图片的旋转动画?
// 19.UI中如何实现按钮的大小变化动画?
