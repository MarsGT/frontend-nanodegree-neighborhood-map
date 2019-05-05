# 优达学城街区地图应用项目

本应用用于展示相应社区的地图或搜索指定的社区，其功能包括：

- 显示热门地点
- 自定义地图标记
- 地点搜索
- 用于展示所有地点的列表视图

除此以外，每个地点还将会显示详细信息（例如街景图片、维基百科文章、Yelp 评论等）。

## 项目架构
本项目为单页应用，使用 React 构建，并且使用了 Google Maps API 提供的地图服务

## 怎样运行
- 在命令行克隆本项目 `git clone https://github.com/marsgt/frontend-nanodegree-neighborhood-map.git`
- 使用 `cd frontend-nanodegree-neighborhood-map`切换到根目录下，运行`yarn install`安装所有的项目依赖
- 安装依赖后，运行 `yarn start`将启动项目（开发服务器）并直接打开网页
- 可以使用 `yarn build`，将本项目编译为可在生产环境下部署的静态文件

## 需要注意
由于 Google Maps API 对免费账户调用频率上的一些限制，地图可能会显示半透明黑色遮罩以及 “For development purposes only” 字样。但并不影响使用。

## 更多内容
如果你对此项目感兴趣，可以访问 [优达学城论坛](https://discussions.youdaxue.com/c/fend/nd001-neighborhood-map-project) 了解更多相关信息。