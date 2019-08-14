<template>
    <div class="bg">
        <login :url="url" class="login" :go="go" :success="success" :error="error" :primary="primary" :buttonStyle="buttonStyle" :headerTitle="headerTitle">
            <div slot="default">
                <el-form-item style="width: 300px">
                    <a :href="register" v-if="register">注册新账号</a> <a :href="forget" style="float: right" v-if="forget">忘记密码</a>
                </el-form-item>
            </div>
        </login>
    </div>
</template>

<script>
    import login from './components/login'

    export default {
        name: "loginView",
        components: {
            login
        },
        props: {
            buttonStyle: {
                type: Object,
                default: () => {
                    return {
                        'height': '50px',
                        'border-radius': '0px',
                        '-moz-box-shadow': '0px 2px 5px #999',
                        '-webkit-box-shadow': '0px 2px 5px #999',
                        'box-shadow': '0px 2px 5px #999',
                        'font-size': '22px'
                    }
                }
            },
            primary:{
                type:String,
                default: "primary"
            },
            register: {
                type: String,
                default: ''
            },
            forget: {
                type: String,
                default: ''
            },
            url: {
                type: String,
                default: 'Admin/account/login'
            },
            go: {
                type: String,
                default: 'home'
            },
            success: {
                type: Function || null
            },
            error: {
                type: Function || null
            },
            headerTitle: {
                type: String,
                default:'登录'
            }
        }
    }
</script>

<style scoped lang="less">
.bg{
    width: 100vw;
    height: 100vh;
    background-image: url("./bg.jpg");
    background-repeat: no-repeat;
    /*background-size: auto 100%;*/
    background-size: cover;
    .login{
        position: absolute;
        left: 65%;
        top: 25%;
    }
}
</style>
