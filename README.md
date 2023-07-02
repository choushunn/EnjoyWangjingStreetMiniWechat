
# Enjoy Wangjing Street MiniWechat

`Enjoy Wangjing Street MiniWechat`是一个基于微信小程序开发的王井街道应用。该应用提供了王井街道的地图导航、商家介绍、景点介绍、美食推荐等功能，帮助用户更好地了解和体验王府井街道的文化和生活。

## 功能列表

- 地图导航：提供王井街道的地图导航，方便用户查找商家、景点和其他地点。
- 商家介绍：提供王井街道的商家介绍，包括商家名称、地址、电话、营业时间等信息。
- 景点介绍：提供王井街道的景点介绍，包括景点名称、地址、开放时间等信息。
- 美食推荐：提供王井街道的美食推荐，包括美食名称、地址、评分等信息。
- 个人中心：提供用户的个人信息管理，包括用户资料、账户设置、消息中心等功能。

## 开发环境

- 微信小程序开发者工具 v1.2.0 或以上版本
- 微信开发者账号

## 技术栈

- 微信小程序框架
- WXML（WeiXin Markup Language）
- WXSS（WeiXin Style Sheets）
- JavaScript

## 项目结构

```
├── app.js                  // 小程序入口文件
├── app.json                // 小程序全局配置文件
├── app.wxss                // 小程序全局样式文件
├── pages                   // 小程序页面文件夹
│   ├── index               // 首页
│   ├── map                 // 地图导航页面
│   ├── merchant            // 商家介绍页面
│   ├── scenic              // 景点介绍页面
│   ├── food                // 美食推荐页面
│   └── user                // 个人中心页面
├── images                  // 小程序图片资源文件夹
├── utils                   // 小程序工具库文件夹
│   ├── api.js              // 小程序接口封装文件
│   └── util.js             // 小程序工具函数文件
└── README.md               // 项目说明文件
```

## 安装和使用

1. Clone 项目到本地：

```
git clone git@github.com:choushunn/EnjoyWangjingStreetMiniWechat.git
```

2. 在微信开发者工具中导入项目：

选择「项目」-「导入项目」，填写小程序 AppID 和项目路径，点击「导入」即可。

3. 在微信开发者工具中预览项目：

选择「预览」-「开发环境」，即可在模拟器中预览项目。

## 如何贡献代码

我们欢迎您为本项目作出贡献！您可以通过以下步骤参与贡献：

1. 贡献者需要将主项目的代码 Fork 到自己的 GitHub 账号下。

2. Clone 自己的 GitHub 仓库到本地开发环境中：

```
git clone https://github.com/your-username/EnjoyWangjingStreetMiniWechat.git
```

3. 贡献者创建一个新的本地分支，用于开发和修改：

```
git checkout -b develop
```

4. 在 develop 分支上进行代码开发和修改,将修改提交到 develop 分支，并推送到自己的 GitHub 仓库的 develop 分支上：

```
git add .
git commit -m "提交修改信息"
git push origin develop
```

5. 贡献者在自己的 fork 仓库页面上创建一个 Pull Request，将自己的 develop 分支合并到主项目的 develop 分支上。

6. 等待 Pull Request 被审核和合并。当 Pull Request 被合并后，您的修改将被包含在本仓库的 develop 分支中。

7. 主项目维护者将 develop 分支上的代码合并到 main 分支上，并推送到主项目的远程仓库

```
git checkout main
git pull origin main
git merge develop
git push origin main
```

8. 本地分支落后于远程分支解决方法。

```ssh
# 拉取远程分支的最新代码。
git fetch
# 合并远程分支的最新代码到本地分支。
git merge origin/develop
# 解决合并冲突。提交合并后的代码，并推送到远程分支。
git push
```

注意：在贡献代码之前，请确保您的代码符合本项目的代码规范和最佳实践。如果您不确定如何贡献代码，请参考 GitHub 的 Pull Request 流程和相关文档，或者向项目维护者咨询和寻求帮助。同时，为了保证代码质量和稳定性，我们建议您在修改代码之前先进行测试和调试。

## 注意事项

1. 本项目仅供学习参考，请勿用于商业用途。
2. 本项目使用了第三方地图 API，使用时请注意遵守相关服务协议和规定。

## 更多信息

更多信息和文档，请参考微信小程序开发文档和微信小程序开发社区。如有问题和建议，欢迎提出。



