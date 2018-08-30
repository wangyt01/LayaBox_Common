
//发光需要的函数
function CustomMaterial() {
    CustomMaterial.__super.call(this);
    this.setShaderName("CustomShader");
}

Laya.class(CustomMaterial, "CustomMaterial", Laya.BaseMaterial);

//获取漫反射贴图
CustomMaterial.prototype.getDiffuseTexture = function () {
    return this._getTexture(CustomMaterial.DIFFUSETEXTURE);
}

//设置漫反射贴图
CustomMaterial.prototype.setDiffuseTexture = function (value) {
    this._setTexture(CustomMaterial.DIFFUSETEXTURE,value);
}

//设置边缘光照颜色。
CustomMaterial.prototype.setMarginalColor = function (value) {
    this._setColor(CustomMaterial.MARGINALCOLOR,value);
}

CustomMaterial.DIFFUSETEXTURE=1;
CustomMaterial.MARGINALCOLOR=2;


/**
 * 模型发光的基础配置
 */
function initShader() {
    var attributeMap = {
        'a_BoneIndices': Laya.VertexElementUsage.BLENDINDICES0,
        'a_BoneWeights': Laya.VertexElementUsage.BLENDWEIGHT0,
        'a_Position': Laya.VertexElementUsage.POSITION0,
        'a_Normal': Laya.VertexElementUsage.NORMAL0,
        'a_Texcoord': Laya.VertexElementUsage.TEXTURECOORDINATE0
    };
    var uniformMap = {
        'u_Bones': [Laya.SkinnedMeshSprite3D.BONES, Laya.Shader3D.PERIOD_RENDERELEMENT],
        'u_CameraPos': [Laya.BaseCamera.CAMERAPOS, Laya.Shader3D.PERIOD_CAMERA],
        'u_MvpMatrix': [Laya.Sprite3D.MVPMATRIX, Laya.Shader3D.PERIOD_SPRITE],
        'u_WorldMat': [Laya.Sprite3D.WORLDMATRIX, Laya.Shader3D.PERIOD_SPRITE],
        'u_texture': [CustomMaterial.DIFFUSETEXTURE, Laya.Shader3D.PERIOD_MATERIAL],
        'u_marginalColor': [CustomMaterial.MARGINALCOLOR, Laya.Shader3D.PERIOD_MATERIAL],
        'u_DirectionLight.Direction': [Laya.Scene.LIGHTDIRECTION, Laya.Shader3D.PERIOD_SCENE],
        'u_DirectionLight.Diffuse': [Laya.Scene.LIGHTDIRCOLOR, Laya.Shader3D.PERIOD_SCENE]
    };
    var customShader = Laya.Shader3D.nameKey.add("CustomShader");

    var vs = "attribute vec4 a_Position;\n" +
        "attribute vec2 a_Texcoord;\n" +
        "attribute vec3 a_Normal;\n" +
        "uniform mat4 u_MvpMatrix;\n" +
        "uniform mat4 u_WorldMat;\n" +
        "varying vec2 v_Texcoord;\n" +
        "varying vec3 v_Normal;\n" +
        "#ifdef BONE\n" +
        "attribute vec4 a_BoneIndices;\n" +
        "attribute vec4 a_BoneWeights;\n" +
        "const int c_MaxBoneCount = 24;\n" +
        "uniform mat4 u_Bones[c_MaxBoneCount];\n" +
        "#endif\n" +
        "#if defined(DIRECTIONLIGHT)\n" +
        "varying vec3 v_PositionWorld;\n" +
        "#endif\n" +
        "void main(){\n" +
        "#ifdef BONE\n" +
        "mat4 skinTransform=mat4(0.0);\n" +
        "skinTransform += u_Bones[int(a_BoneIndices.x)] * a_BoneWeights.x;\n" +
        "skinTransform += u_Bones[int(a_BoneIndices.y)] * a_BoneWeights.y;\n" +
        "skinTransform += u_Bones[int(a_BoneIndices.z)] * a_BoneWeights.z;\n" +
        "skinTransform += u_Bones[int(a_BoneIndices.w)] * a_BoneWeights.w;\n" +
        "vec4 position = skinTransform * a_Position;\n" +
        "gl_Position=u_MvpMatrix * position;\n" +
        "mat3 worldMat=mat3(u_WorldMat * skinTransform);\n" +
        "#else\n" +
        "gl_Position=u_MvpMatrix * a_Position;\n" +
        "mat3 worldMat=mat3(u_WorldMat);\n" +
        "#endif\n" +
        "v_Texcoord=a_Texcoord;\n" +
        "v_Normal=worldMat*a_Normal;\n" +
        "#if defined(DIRECTIONLIGHT)\n" +
        "#ifdef BONE\n" +
        "v_PositionWorld=(u_WorldMat*position).xyz;\n" +
        "#else\n" +
        "v_PositionWorld=(u_WorldMat*a_Position).xyz;\n" +
        "#endif\n" +
        "#endif\n" +
        "}";

    var ps = "#ifdef FSHIGHPRECISION\n" +
        "precision highp float;\n" +
        "#else\n" +
        "precision mediump float;\n" +
        "#endif\n" +
        "#include 'LightHelper.glsl';\n" +
        "varying vec2 v_Texcoord;\n" +
        "uniform sampler2D u_texture;\n" +
        "uniform vec3 u_marginalColor;\n" +
        "varying vec3 v_Normal;\n" +
        "#if defined(DIRECTIONLIGHT)\n" +
        "uniform vec3 u_CameraPos;\n" +
        "varying vec3 v_PositionWorld;\n" +
        "uniform DirectionLight u_DirectionLight;\n" +
        "#endif\n" +
        "void main(){\n" +
        "gl_FragColor=texture2D(u_texture,v_Texcoord);\n" +
        "vec3 normal=normalize(v_Normal);\n" +
        "vec3 toEyeDir = normalize(u_CameraPos-v_PositionWorld);\n" +
        "float Rim = 1.0 - max(0.0,dot(toEyeDir, normal));\n" +
        "vec3 Emissive = 2.0 * u_DirectionLight.Diffuse * u_marginalColor * pow(Rim,3.0);\n" +
        "gl_FragColor = texture2D(u_texture, v_Texcoord) + vec4(Emissive,1.0);\n" +
        "}";
    Laya.ShaderCompile3D.add(customShader, vs, ps, attributeMap, uniformMap);
}