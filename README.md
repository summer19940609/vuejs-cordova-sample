# vue + cordova

![FF96UO](https://cdn.jsdelivr.net/gh/summer19940609/picture-repo@master/uPic/FF96UO.png)


## 步骤

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run serve

# build for production to run in Cordova
npm run build

```

## 第一次cordova build

Run the command :

```sh
npm run build
cd cordova_app
cordova platform add android
cordova run # or build
```

## 后续Cordova build

```sh
npm run cordova_run # or cordova_build
```

## cordova插件

- cordova-plugin-dialogs
- cordova-plugin-vibration
- cordova-plugin-geolocation
- cordova-plugin-flashlight
- cordova-plugin-camera
- phonegap-nfc
- cordova-plugin-statusbar
- cordova-plugin-headercolor
