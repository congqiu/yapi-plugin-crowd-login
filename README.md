yapi-plugin-crowd-login
===

基于Crowd认证的YAPI登录插件

### 安装

第一步：在config.json这层目录下运行 ```yapi plugin --name yapi-plugin-crowd-login```安装插件

第二步：配置crowd认证登录config.json，options中的参数都是可选的

```json
{
    "name": "crowd-login",
    "options": {
      "url": "https://example.com/crowd",
      "name": "应用name",
      "loginBtnText": "登录按钮文字"
    }
}
```

第三步： 添加环境变量

第二步**出于安全考虑，配置文件中不支持配置应用的password**，需要在*环境变量*中配置。

```sh
// 必须，应用password
export CROWD_PASSWORD=...

// 可选，优先级高于配置文件
export CROWD_URL=...
export CROWD_NAME=...
```

第三步： 重启服务器

### 使用

配置后登录页在默认的登录/注册按钮后面会新出现一个**Crowd登录**。如果配置后登录不成功请确保配置正确后并检查日志中的报错信息。

### 更新

通过yapi-cli更新插件还是比较麻烦的，直接再执行一次命令并不会更新。因为yapi-cli安装插件实际上就是在vendors目录下执行`npm install --registry https://registry.npm.taobao.org yapi-plugin-crowd-login`，所以最后会在package.json文件中记录下开始安装的版本号，再次执行安装的还是同一个版本。

执行如下操作可以进行更新：
1. 需要先清除ykit的缓存，删除`./vendors/node_modules/.ykit_cache`文件夹
2. 修改package.json里面`yapi-plugin-crowd-login`的版本或者直接`npm i yapi-plugin-crowd-login@version`
3. 在`./vendors/`目录中执行命令`NODE_ENV=production ykit pack -m`
4. 在config.json这层目录下执行命令`yapi plugin --name yapi-plugin-crowd-login`后再重启服务器就完成安装指定版本的插件
