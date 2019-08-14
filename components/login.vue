<template>
    <el-card class="box-card" :style="style">
        <div v-if="headerTitle" slot="header" class="clearfix">
            <span>{{headerTitle}}</span>
        </div>
        <div class="kuang">
            <el-form :rules="rules" :model="logoData" ref="login">
                <el-form-item label="" prop="username">
                    <el-input v-model="logoData.username" placeholder="请输入账号" type="text"></el-input>
                </el-form-item>
                <el-form-item label="" prop="passwd">
                    <el-input v-model="logoData.passwd" placeholder="请输入密码" style=" margin-top: 5px"
                              type="password"></el-input>
                </el-form-item>

                <el-button :type="primary" style="width: 100%; margin-top: 5px" @click="login" :loading="loading"
                           :style="buttonStyle">登 录
                </el-button>

                <el-alert
                        v-if="showMsg"
                        :title="msg"
                        :type="msgType"
                        show-icon>
                </el-alert>
                <slot name="default"></slot>
            </el-form>
        </div>
    </el-card>
</template>

<script>
    import sha1 from 'sha1'
    import Cookie from 'js-cookie'

    export default {
        name: "login",
        data() {
            return {
                loading: false,
                showMsg: false,
                msg: '',
                msgType: 'success',
                logoData: {
                    username: "",
                    passwd: ""
                },
                rules: {
                    username: [
                        {required: true, message: '请输入账号，格式为邮箱地址', trigger: 'blur'},
                        {type: 'email', message: '请输入正确的账号，格式为邮箱地址', trigger: ['blur', 'change']}
                    ],
                    passwd: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, max: 32, message: '密码长度在 6 到 32 个字符', trigger: ['blur', 'change']}
                    ]
                }
            }
        },
        props: {
            buttonStyle: {
                type: Object,
                default: function () {
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
            primary: {
                type: String,
                default: "primary"
            },
            width: {
                default: '360px'
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
                type: String
            }
        },
        computed: {
            style() {
                return {
                    border: 'none',
                    borderRadius: 0,
                    width: this.width
                }
            }
        },
        methods: {
            login() {
                const _this = this
                _this.$refs['login'].validate((valid) => {
                    if (valid) {
                        _this.loading = true
                        _this.$ajax.post(_this.url, {
                            username: _this.logoData.username,
                            password: sha1(_this.logoData.passwd)
                        }).then((res) => {
                            _this.showMsg = true
                            _this.msg = res.msg
                            if (res.errCode == 0) {
                                Cookie.set('Token', res.data.token)
                                Cookie.set('HeaderKey', res.data.HeaderKey)
                                setTimeout(() => {
                                    _this.loading = false
                                })
                                if (typeof _this.success === "function") {
                                    _this.success(res, () => {
                                        setTimeout(() => {
                                            _this.$router.push({
                                                name: _this.go
                                            })
                                        }, 1500)
                                    })
                                } else {
                                    setTimeout(() => {
                                        _this.$router.push({
                                            name: _this.go
                                        })
                                    }, 1500)
                                }

                            } else {
                                _this.logoData.passwd = ''
                                _this.msgType = 'error'
                                _this.loading = false
                                if (typeof _this.error === "function") {
                                    _this.error(res)
                                }
                                setTimeout(() => {
                                    _this.showMsg = false
                                }, 5000)
                            }
                        })
                    } else {
                        return false;
                    }
                })
            }
        }
    }
</script>

<style>
    .kuang .el-input__inner {
        height: 50px;
        line-height: 50px;
        border-radius: 0px;
    }
</style>
