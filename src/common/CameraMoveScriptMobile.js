/**
 * 相机的移动,比如模型的放大,缩小,移动
 * 手机端和移动端中分别有判断
 */
//pc端上配置参数
/**
 * 是否右键旋转,默认为true，默认为右键可以触发旋转。
 */
var isRightRotate = true;

/**
 * 是否点击模型移动触发  默认为false，默认为不触发
 */
var isClickMove = false;
/**
 * 模型滑轮滚动是否触发，默认为true,默认触发
 */
var isMouseWheel = true;
//移动端配置参数

/**
 * 是否开启触摸旋转 默认为true，为开启
 */
var isTouchesRotation = true;



function CameraMoveScriptMobile() {
    CameraMoveScriptMobile.super(this);
    this.lastMouseX = NaN;
    this.lastMouseY = NaN;
    this.yawPitchRoll = new Laya.Vector3();
    this.tempRotationZ = new Laya.Quaternion();
    this.isMouseDown = false;
    //旋转的速度 0.00006
    this.rotaionSpeed = 0.00009;

    this.mainCameraAnimation = null;
    this.scene = null;
}
Laya.class(CameraMoveScriptMobile, "CameraMoveScriptMobile", Laya.Script);
//添加原型链
CameraMoveScriptMobile.prototype._initialize = function (owner) {
    var _this = this;
    CameraMoveScriptMobile.__super.prototype._initialize.call(this, owner);
    Laya.stage.on("mousedown", this, this.mouseDown);
    Laya.stage.on("mouseup", this, this.mouseUp);
    Laya.stage.on("mouseout", this, this.mouseOut);
    Laya.stage.on("mousewheel", this, this.mouseWheel);
    Laya.stage.on("mousemove", this, this.mouseMove);
    Laya.stage.on("rightmousedown", this, this.rightMouseDown);
    Laya.stage.on("rightmouseup", this, this.rightMouseUp);
    _this.camera = owner;
}

CameraMoveScriptMobile.prototype._update = function (state) {
    CameraMoveScriptMobile.__super.prototype._update.call(this, state);
    this.updateCamera(state.elapsedTime);
}

CameraMoveScriptMobile.prototype.updateCamera = function (elapsedTime) {
    if (!isNaN(this.lastMouseX) && !isNaN(this.lastMouseY)) {
        var scene = this.owner.scene;
        // keycode 37 = Left 
        // keycode 38 = Up 
        // keycode 39 = Right 
        // keycode 40 = Down
        //键盘键位 87 w 83 s 65 a 68 d 81 q 69 e
        // Laya.KeyBoardManager.hasKeyDown(87) && this.camera.moveForward(-0.002 * elapsedTime);//w
        // Laya.KeyBoardManager.hasKeyDown(38) && this.camera.moveForward(-0.002 * elapsedTime);//Up

        // Laya.KeyBoardManager.hasKeyDown(83) && this.camera.moveForward(0.002 * elapsedTime);//s
        // Laya.KeyBoardManager.hasKeyDown(40) && this.camera.moveForward(0.002 * elapsedTime);//Down

        // Laya.KeyBoardManager.hasKeyDown(65) && this.camera.moveRight(-0.002 * elapsedTime);//a
        // Laya.KeyBoardManager.hasKeyDown(37) && this.camera.moveRight(-0.002 * elapsedTime);//Left

        // Laya.KeyBoardManager.hasKeyDown(68) && this.camera.moveRight(0.002 * elapsedTime);//d
        // Laya.KeyBoardManager.hasKeyDown(39) && this.camera.moveRight(0.002 * elapsedTime);//Right

        // Laya.KeyBoardManager.hasKeyDown(81) && this.camera.moveVertical(0.002 * elapsedTime);//q
        // Laya.KeyBoardManager.hasKeyDown(69) && this.camera.moveVertical(-0.002 * elapsedTime);//e
        if (this.isMouseDown) {

            var offsetX = Laya.stage.mouseX - this.lastMouseX;
            var offsetY = Laya.stage.mouseY - this.lastMouseY;
            var yprElem = this.yawPitchRoll.elements;
            yprElem[0] -= offsetX * this.rotaionSpeed * elapsedTime;
            yprElem[1] -= offsetY * this.rotaionSpeed * elapsedTime;
            this.updateRotation();
        }

    }
    this.lastMouseX = Laya.stage.mouseX;
    this.lastMouseY = Laya.stage.mouseY;
}

CameraMoveScriptMobile.prototype.updateRotation = function (e) {
    var yprElem = this.yawPitchRoll.elements;
    // console.log(yprElem)
    if (Math.abs(yprElem[1]) < 1.50) {
        // Laya.Vector3.add(_outHitInfo.position, _offset, _vector3);
        // Laya.Tween.to(_position, { x: _vector3.x, y: _vector3.y, z: _vector3.z }, 500/**,Ease.circIn*/);
        // Laya.Quaternion.lookAt(box.transform.position, _vector3, _upVector3, _quaternion);
        Laya.Quaternion.createFromYawPitchRoll(yprElem[0], yprElem[1], yprElem[2], this.tempRotationZ);
        this.camera.transform.localRotation = this.tempRotationZ;
    }

}

CameraMoveScriptMobile.prototype.updatPosition = function (e) {
    var yprElem = this.yawPitchRoll.elements;
    // console.log(yprElem)
    if (Math.abs(yprElem[1]) < 1.50) {
        Laya.Quaternion.createFromYawPitchRoll(yprElem[0], yprElem[1], yprElem[2], this.tempRotationZ);
        this.camera.transform.localPosition = this.tempRotationZ;
    }

}

CameraMoveScriptMobile.prototype.mouseDown = function (e) {
    // Xmodel3D.transform.localPosition.getYawPitchRoll(this.yawPitchRoll)
    // this.camera.transform.localRotation.getYawPitchRoll(this.yawPitchRoll);
    // this.lastMouseX = Laya.stage.mouseX;
    // this.lastMouseY = Laya.stage.mouseY;
    isMouseMove = true;
    //禁止移动 可以旋转 可以缩放
    // whetherMove = false;
    // whetherRotate = true;
    // whetherScale = true;
    //手机触摸按下事件
    touchDown(e);


}

CameraMoveScriptMobile.prototype.mouseUp = function (e) {
    this.isMouseDown = false;
    isMouseMove = false;
    isTouches = false;
    //  //禁止移动 可以旋转 可以缩放
    // whetherMove = false;
    // whetherRotate = false;
    // whetherScale = false;
}
CameraMoveScriptMobile.prototype.mouseOut = function (e) {
    this.isMouseDown = false;
    isMouseMove = false;

}

CameraMoveScriptMobile.prototype.rightMouseDown = function (e) {
    // console.log(isRightRotate);
    if (this.camera.transform.localRotation && isRightRotate) {
        this.camera.transform.localRotation.getYawPitchRoll(this.yawPitchRoll);
        this.lastMouseX = Laya.stage.mouseX;
        this.lastMouseY = Laya.stage.mouseY;
        this.isMouseDown = true;
    }
    // console.log(e)
}

CameraMoveScriptMobile.prototype.rightMouseUp = function (e) {
    this.isMouseDown = false;
}

/**
 * 鼠标模型移动
 */

var _outPos = new Laya.Vector3();
var scaleDelta = 0;
var lastDistanceX = 0;
var lastDistanceY = 0;
var lastDistance_out = 0;
var isMouseMove = false;
var startDistanceX = 0;
var startDistanceY = 0;
//移动系数
var addNum = 0.08;
//移动偏差值
var movePoor = 10;

CameraMoveScriptMobile.prototype.mouseMove = function (e) {
    // console.log(isMouseMove)
    if (isMouseMove && isClickMove) {
        // console.log(e.stageX, e.stageY)
        var _position = clickModelMesh.transform.position;
        _outPos.x = e.stageX;
        _outPos.y = e.stageY;
        //鼠标抖动坐标差值 X Y
        var poorX = lastDistanceX - e.stageX;
        var poorY = lastDistanceY - e.stageY;
        console.log(poorY)
        if (lastDistanceX < e.stageX && Math.abs(poorX) > movePoor) {
            // console.log("向左");
            lastDistanceX = e.stageX;
            _position.x = _position.x - addNum;
            clickModelMesh.transform.position = _position;
        } else if (lastDistanceX > e.stageX && Math.abs(poorX) > movePoor) {
            // console.log("向右");
            lastDistanceX = e.stageX;
            _position.x = _position.x + addNum;
            clickModelMesh.transform.position = _position;
        } else if (lastDistanceY < e.stageY && Math.abs(poorY) > movePoor) {
            // console.log("向上");
            lastDistanceY = e.stageY;
            _position.y = _position.y - addNum;
            clickModelMesh.transform.position = _position;
        } else if (lastDistanceY > e.stageY && Math.abs(poorY) > movePoor) {
            // console.log("向下");
            lastDistanceY = e.stageY;
            _position.y = _position.y + addNum;
            clickModelMesh.transform.position = _position;
        }

    }

}
/**
 * 添加模型上相机的滑轮移动
 */

//移动相机中局部缩放的初始大小
var modelScale = 1;
CameraMoveScriptMobile.prototype.mouseWheel = function (e) {
    // console.log(isMouseWheel)
    if (isMouseWheel && Xmodel3D) {
        if (e.delta == 3 && modelScale <= 1.5) {
            modelScale += 0.05
            //主模型的局部坐标
            Xmodel3D.transform.localScale = new Laya.Vector3(modelScale, modelScale, modelScale)
            //刷新舞台
            this.updateRotation();
        } else if (e.delta == -3 && modelScale > 0.4) {
            modelScale -= 0.05
            //主模型的局部坐标
            Xmodel3D.transform.localScale = new Laya.Vector3(modelScale, modelScale, modelScale)
            //刷新舞台
            this.updateRotation();
        }
    } else if (!isMouseWheel && cloneX3D_clone) {
        if (e.delta == 3 && modelScale <= 3) {
            modelScale += 0.05
            //主模型的局部坐标
            cloneX3D_clone.transform.localScale = new Laya.Vector3(modelScale, modelScale, modelScale)
            //刷新舞台
            this.updateRotation();
        } else if (e.delta == -3 && modelScale > 0.4) {
            modelScale -= 0.05
            //主模型的局部坐标
            cloneX3D_clone.transform.localScale = new Laya.Vector3(modelScale, modelScale, modelScale)
            //刷新舞台
            this.updateRotation();
        }
    }
}

function touchDown(e) {
    if (e.touches) {
        if (e.touches.length >= 2) {
            //初始位置
            startPosition = e.touches;
        }
    }
}
/**
 * 手机触摸放大缩小
 */
var lastDistance = 0;
var lastDistanceX = 0;
var lastDistanceY = 0;
//旋转速度左右
var speedY = 0.04;
//旋转速度上下
var speedX = 0.06;
var lastStageMouseX = NaN;
var lastStageMouseY = NaN;

/**
 * 手机端 模型 是否移动 是否旋转 是否缩放
 */
var whetherMove = false;
var whetherRotate = false;
var whetherScale = false;

var whetherScaleXmodel3D = false;
var whetherScaleClone = false;
//触摸移动判断参数
var isTouches = false;

// var isTouchesBg = false;
if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
CameraMoveScriptMobile.prototype.mouseMove = function (e) {
        //舞台手指位置
        lastStageMouseX = Laya.stage.mouseX;
        lastStageMouseY = Laya.stage.mouseY;
        if (e.touches) {
            startDis = e.touches;
            if (e.touches.length == 1) {
                if (isTouches) {
                    //模型移动事件
                    modelMoveTouch(e);
                } else {
                    //只有背景按钮 
                    if (isTouchesRotation) {
                        //单指旋转
                        this.modelRotate(e);
                    }
                }
            } else if (e.touches.length >= 2) {//判断是否有两个点在屏幕上
                //结束位置
                endPostion = e.touches;
                log("**********************");
                //双指缩放
                this.modelTranslate(e);
            }
        } else if (e.touches == null) {
            // controlStart.testText.text = "点击事件";
        }

    }
}
//模型触摸事件 移动
function modelMoveTouch(e) {
    if (whetherMove) {
        if (isMouseMove && isClickMove && clickModelMesh) {
            var _position = clickModelMesh.transform.position;
            _outPos.x = e.stageX;
            _outPos.y = e.stageY;
            //鼠标抖动坐标差值 X Y
            var poorX = lastDistanceX - e.stageX;
            var poorY = lastDistanceY - e.stageY;
            if (lastDistanceX < e.stageX && Math.abs(poorX) > movePoor) {
                // console.log("向左");
                lastDistanceX = e.stageX;
                _position.x = _position.x - addNum;
                clickModelMesh.transform.position = _position;
            } else if (lastDistanceX > e.stageX && Math.abs(poorX) > movePoor) {
                // console.log("向右");
                lastDistanceX = e.stageX;
                _position.x = _position.x + addNum;
                clickModelMesh.transform.position = _position;
            } else
                if (lastDistanceY < e.stageY && Math.abs(poorY) > movePoor) {
                    // console.log("向上");
                    lastDistanceY = e.stageY;
                    _position.y = _position.y - addNum;
                    clickModelMesh.transform.position = _position;
                } else if (lastDistanceY > e.stageY && Math.abs(poorY) > movePoor) {
                    // console.log("向下");
                    lastDistanceY = e.stageY;
                    _position.y = _position.y + addNum;
                    clickModelMesh.transform.position = _position;
                }

        }
    }

}

//模型触摸事件 旋转
CameraMoveScriptMobile.prototype.modelRotate = function (e) {
    //滑动位置的差 减小旋转抖动
    var poorX = lastStageMouseX - lastDistanceX;
    var poorY = lastStageMouseY - lastDistanceY;
    //抖动差值
    var poor = 10;
    if (whetherRotate) {//旋转判断
        if (lastDistanceX < lastStageMouseX && Math.abs(poorX) > poor) {
            // console.log(isClone)
            if (whetherScaleClone && cloneX3D_clone) {
                //克隆模型旋转
                cloneX3D_clone.transform.rotate(new Laya.Vector3(0, speedY, 0))
            } else if(whetherScaleXmodel3D) {
                //模型旋转改变y大小
                Xmodel3D.transform.rotate(new Laya.Vector3(0, speedY, 0))
            }
            lastDistanceX = lastStageMouseX;
        } else if (lastDistanceX > lastStageMouseX && Math.abs(poorX) > poor) {
            if (whetherScaleClone && cloneX3D_clone) {
                //克隆模型旋转
                cloneX3D_clone.transform.rotate(new Laya.Vector3(0, -speedY, 0))
            } else if(whetherScaleXmodel3D) {
                //模型旋转改变y大小
                Xmodel3D.transform.rotate(new Laya.Vector3(0, -speedY, 0))
            }
            lastDistanceX = lastStageMouseX;
        } else if (lastDistanceY < lastStageMouseY && Math.abs(poorY) > poor) {
            if (whetherScaleClone && cloneX3D_clone) {
                //克隆模型旋转
                cloneX3D_clone.transform.rotate(new Laya.Vector3(-speedX, 0, 0))
            } else if(whetherScaleXmodel3D) {
                //模型旋转改变y大小
                Xmodel3D.transform.rotate(new Laya.Vector3(-speedX, 0, 0))
            }
            lastDistanceY = lastStageMouseY;
        } else if (lastDistanceY > lastStageMouseY && Math.abs(poorY) > poor) {
            if (whetherScaleClone && cloneX3D_clone) {
                //克隆模型旋转
                cloneX3D_clone.transform.rotate(new Laya.Vector3(speedX, 0, 0))
            } else if(whetherScaleXmodel3D) {
                //模型旋转改变y大小
                Xmodel3D.transform.rotate(new Laya.Vector3(speedX, 0, 0))
            }
            lastDistanceY = lastStageMouseY;
        }
    }

}

/**
 * 模型触摸事件 缩放
* (x1,y1)第一个点第一次点击位置
* (x2,y2)第一个点第二次点击位置
* (x3,y3)第二个点第一次点击位置
* (x4,y4)第二个点第二次点击位置
* 1.第一个点不变 第二个点外移
* 2.第一个点不变 第二个点内移
*/
CameraMoveScriptMobile.prototype.modelTranslate = function (e) {
    //起始点和移动中的点之间的差值
    distancePoor = getDistance(startPosition[0], startPosition[1]) - getDistance(endPostion[0], endPostion[1]);
    if (whetherScale) {//缩放判断  默认为不能缩放
        //模型放大的极限判断
        if (distancePoor <= 0 && modelScale <= 1.5) {
            // console.log("放大");
            modelScale += 0.05
            //主模型的局部坐标
            Xmodel3D.transform.localScale = new Laya.Vector3(modelScale, modelScale, modelScale);
            if (cloneX3D_clone) {
                //主模型的局部坐标
                cloneX3D_clone.transform.localScale = new Laya.Vector3(modelScale, modelScale, modelScale);
            }
        } else if (distancePoor > 0 && modelScale > 0.4) {
            // console.log("缩小");
            modelScale -= 0.05
            //主模型的局部坐标
            Xmodel3D.transform.localScale = new Laya.Vector3(modelScale, modelScale, modelScale);
            if (cloneX3D_clone) {
                //主模型的局部坐标
                cloneX3D_clone.transform.localScale = new Laya.Vector3(modelScale, modelScale, modelScale);
            }
        }
    }

}
//求差值平方根运算
function getDistance(p1, p2) {
    var x = p2.pageX - p1.pageX,
        y = p2.pageY - p1.pageY;
    return Math.sqrt((x * x) + (y * y));
    // return Math.sqrt(Math.abs(Math.pow(p1, 2) - Math.pow(p2, 2)));
};


