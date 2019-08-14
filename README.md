# 后台登录组件

## 统一的后台登录组件，配合标准的PHP登录接口

### 功能

- 登录后自动设置登录信息
- 可以自定义登录地址
- 可以自定义登录页面
- 一键安装即插即用

### 安装

```
npm install @sichem/login
```

### 使用

模块中没有引入element-ui的CSS，需要自行引入

```
import 'element-ui/lib/theme-chalk/index.css'
// 引入路由
import login from './login/router'

```

登录后默认跳转到 home 路由

### Props

url 登录地址，默认“Admin/account/login”
go 登录后的路由名称，默认“home”
register 注册Url
forget 忘记密码的Url
success 成功回调
error 失败回调
headerTitle 标题
buttonStyle 按钮样式
primary 按钮类型

### 关于自定义主题

- 遵循 element-ui
- 模块中没有引入element-ui的CSS，需要自行引入
