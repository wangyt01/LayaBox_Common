var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var onSceneUI=(function(_super){
		function onSceneUI(){
			

			onSceneUI.__super.call(this);
		}

		CLASS$(onSceneUI,'ui.onSceneUI',_super);
		var __proto__=onSceneUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(onSceneUI.uiView);

		}

		onSceneUI.uiView={"type":"View","props":{"width":1920,"height":1080}};
		return onSceneUI;
	})(View);