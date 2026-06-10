---
title: Unity 中让 Game 相机实时跟随 Scene 视图
published: 2026-06-10
description: 编辑器模式下实时同步 Scene 与 Game 视角
tags:
  - Unity
  - 编辑器工具
category: Unity
pinned: true
---
因为后处理的某些与镜头位置相关效果在Scene中效果不好或直接不用其显示，所以看具体效果每次都用`Align with View` 有点麻烦，所以写个脚本实时同步

代码：
```c#
using UnityEditor;
using UnityEngine;

[InitializeOnLoad]
public static class SceneViewGameCameraSync
{
    private static bool enabledSync;
    private static Camera cachedGameCamera;
    private static Vector3 lastScenePosition;
    private static Quaternion lastSceneRotation;
    private static bool hasLastState;
    private static bool hooked;
    static SceneViewGameCameraSync()
    {
    }
    [MenuItem("Tools/SceneView Sync/Toggle Sync %#e")]
    private static void ToggleSync()
    {
        enabledSync = !enabledSync;
        if (enabledSync)
        {
            Hook();
            hasLastState = false;
            cachedGameCamera = null;
        }
        else
        {
            Unhook();
            hasLastState = false;
            cachedGameCamera = null;
        }
    }
    [MenuItem("Tools/SceneView Sync/Toggle Sync %#e", true)]
    private static bool ToggleSyncValidate()//菜单勾选状态
    {
        Menu.SetChecked("Tools/SceneView Sync/Toggle Sync %#e", enabledSync);
        return true;
    }
    private static void Hook()
    {
        if (hooked)
            return;
        SceneView.duringSceneGui += OnSceneGUI;
        hooked = true;
    }
    private static void Unhook()
    {
        if (!hooked)
            return;
        SceneView.duringSceneGui -= OnSceneGUI;
        hooked = false;
    }
    private static void OnSceneGUI(SceneView sceneView)
    {
        if (EditorApplication.isPlaying)
            return;
        if (sceneView == null || sceneView.camera == null)
            return;
        if (cachedGameCamera == null)
            cachedGameCamera = Camera.main;
        if (cachedGameCamera == null)
            return;
        Transform sceneTf = sceneView.camera.transform;
        Vector3 scenePos = sceneTf.position;
        Quaternion sceneRot = sceneTf.rotation;
        if (hasLastState &&
            (scenePos - lastScenePosition).sqrMagnitude < 0.000001f &&
            Quaternion.Angle(sceneRot, lastSceneRotation) < 0.01f)
        {
            return;
        }
        lastScenePosition = scenePos;
        lastSceneRotation = sceneRot;
        hasLastState = true;
        Transform gameTf = cachedGameCamera.transform;
        gameTf.position = scenePos;
        gameTf.rotation = sceneRot;
    }
}
```

写的比较麻烦是因为要考虑性能问题，当Scene不动的时候，是不需要进行更新的，但`duringSceneGui` 不止在视角动的时候才调用，所以在具体的赋值函数中做了一点调整

如果觉得这样比较麻烦可以更直接的：
```c#
using UnityEngine;
using UnityEditor;
[ExecuteInEditMode]
public class SceneViewGameCameraSync : MonoBehaviour
{
    private void OnRenderObject()
    {
        transform.position = SceneView.lastActiveSceneView.camera.transform.position;
        transform.rotation = SceneView.lastActiveSceneView.camera.transform.rotation;
    }
}
```
然后挂在Camera物体下，需要的时候挂载或者移除就可以
