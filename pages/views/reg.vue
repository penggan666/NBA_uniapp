<template>
    <view class="content">
        <view class="input-group">
            <view class="input-row border">
                <text class="title">账号：</text>
                <input type="text" focus clearable v-model="account" placeholder="请输入账号"></input>
            </view>
            <view class="input-row border">
                <text class="title">密码：</text>
                <input type="password" displayable v-model="password" placeholder="请输入密码"></input>
            </view>
            <view class="input-row">
                <text class="title">邮箱：</text>
                <input type="text" clearable v-model="email" placeholder="请输入邮箱"></input>
            </view>
			<view class="input-row">
			    <text class="title">年龄：</text>
			    <input type="text" clearable v-model="age" placeholder="请输入年龄"></input>
			</view>
			<view class="input-row">
			    <text class="title">性别：</text>
			    <input type="text" clearable v-model="sex" placeholder="请输入性别"></input>
			</view>
        </view>
        <view class="btn-row">
            <button type="primary" class="primary" @tap="register">注册</button>
        </view>
    </view>
</template>

<script>
    // import mInput from '../../components/m-input.vue';
import GLOBAL from "../../service.js"
    export default {
        // components: {
        //     mInput
        // },
        data() {
            return {
                account: '',
                password: '',
                email: '',
				age:'',
				sex:''
            }
        },
        methods: {
            register() {
                /**
                 * 客户端对账号信息进行一些必要的校验。
                 * 实际开发中，根据业务需要进行处理，这里仅做示例。
                 */
                if (this.account.length < 5) {
                    uni.showToast({
                        icon: 'none',
                        title: '账号最短为 5 个字符'
                    });
                    return;
                }
                if (this.password.length < 6) {
                    uni.showToast({
                        icon: 'none',
                        title: '密码最短为 6 个字符'
                    });
                    return;
                }
                // if (this.email.length < 11) {
                //     uni.showToast({
                //         icon: 'none',
                //         title: '电话号码不合法'
                //     });
                //     return;
                // }
				uni.request({
					
					url:GLOBAL.BASE+'/signin',
					method:'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					data:{
						username: this.account,
						password: this.password,
						tele: this.email,
						age:this.age,
						sex:this.sex
					},
					
					success: (res) => {
						console.log(res.data.info)
						if(res.data.info==1)
						{
							uni.showToast({
							    title: '注册成功'
							});
							uni.reLaunch({
								url:'/pages/views/Team'
							})
							console.log("注册成功")
						}
						else{
						uni.showToast({
						    title: '注册失败'
						});
						}
					}
					
				})
                
            }
        }
    }
</script>

<style>

</style>
