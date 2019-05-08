# 优达学城街区地图应用项目

本应用用于显示相应位置或搜索位置附近，其功能主要包括：

- 对当前位置进行定位
- 搜索附近的地点
- 用于展示搜索结果的列表视图
- 在地图上显示相应位置
- 点击搜索列表，可显示相应项目的详细信息

## 项目架构
本项目为单页应用，使用 React 构建，内容部分使用了 Google Maps API 提供的地图服务，以及 Foursquare 提供的信息数据。

## 怎样运行
- 在命令行克隆本项目 `git clone https://github.com/marsgt/frontend-nanodegree-neighborhood-map.git`
- 使用 `cd frontend-nanodegree-neighborhood-map`切换到根目录下，运行`yarn install`安装所有的项目依赖
- 安装依赖后，运行 `yarn start`将启动项目（开发服务器）并直接打开网页
- 可以使用 `yarn build`，将本项目编译为可在生产环境下部署的静态文件

## 需要注意
项目中所用到的 Google Maps API 以及 Foursquare 对免费账户会在调用频率上做一些限制，所以，地图可能会显示半透明黑色遮罩、警告信息以及 “For development purposes only” 字样，而搜索也经常会失败。这里需要注意一下。

## 更多内容
如果你对此项目感兴趣，可以访问 [优达学城论坛](https://discussions.youdaxue.com/c/fend/nd001-neighborhood-map-project) 了解更多相关信息。

## 参考索引
- [Maps JavaScript API - Overview](https://developers.google.com/maps/documentation/javascript/tutorial)
- [Google Map React Component](https://github.com/fullstackreact/google-maps-react)
- [How to Write a Google Maps React Component](https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/)
- [Documentation - Foursquare Developer](https://developer.foursquare.com/docs)
- [RSUITE 3](https://rsuitejs.com/)
- [@rsuite/react-frame](https://github.com/rsuite/react-frame)