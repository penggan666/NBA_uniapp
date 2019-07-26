<template>
	<view class="content">
	    <view class="input-group">
	        <view class="input-row border">
	            <text class="title">账号：</text>
	            <input class="m-input" type="text" clearable focus v-model="account" placeholder="请输入账号"></input>
	        </view>
	        <view class="input-row">
	            <text class="title">密码：</text>
	            <input type="password" displayable v-model="password" placeholder="请输入密码"></input>
	        </view>
	    </view>
	    <view class="btn-row">
	        <button type="primary" class="primary" @tap="bindLogin">登录</button>
	    </view>
	    <view class="action-row">
	        <navigator url="../views/reg">注册账号</navigator>
	    </view>
	    <view class="oauth-row" v-if="hasProvider" v-bind:style="{top: positionTop + 'px'}">
	        <view class="oauth-image" v-for="provider in providerList" :key="provider.value">
	            <image :src="provider.image" @tap="oauth(provider.value)"></image>
	        </view>
	    </view>
	</view>
</template>

<script>
	// import mInput from '../../components/m-input.vue'
	import GLOBAL from "../../service.js"
	export default {
	    // components: {
	    //     mInput
	    // },
	    data() {
	        return {
	            providerList: [],
	            hasProvider: false,
	            account: '',
	            password: '',
	            positionTop: 0
	        }
	    },
	    methods: {
	        initPosition() {
	            /**
	             * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
	             * 反向使用 top 进行定位，可以避免此问题。
	             */
	            this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
	        },
	        bindLogin:function() {
	            /**
	             * 客户端对账号信息进行一些必要的校验。
	             * 实际开发中，根据业务需要进行处理，这里仅做示例。
	             */
	            // if (this.account.length < 5) {
	            //     uni.showToast({
	            //         icon: 'none',
	            //         title: '账号最短为 5 个字符'
	            //     });
	            //     return;
	            // }
	            // if (this.password.length < 6) {
	            //     uni.showToast({
	            //         icon: 'none',
	            //         title: '密码最短为 6 个字符'
	            //     });
	            //     return;
	            // }
	            /**
	             * 下面简单模拟下服务端的处理
	             * 检测用户账号密码是否在已注册的用户列表中
	             * 实际开发中，使用 uni.request 将账号信息发送至服务端，客户端在回调函数中获取结果信息。
	             */
				const validUser=0;
				uni.request({
					
					url:GLOBAL.BASE+'/loginin',
					method:'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					data:{
						username: this.account,
						password: this.password
					},
					
					success: (res) => {
						console.log(res.data.condition)
						if (res.data.condition==1) {
							console.log(res.data.sid)
							uni.setStorageSync("sid",res.data.sid)
							uni.setStorageSync("userData",res.data.data)
			
						    uni.reLaunch({
						    	url:'personal_page/personal_page'
						    })
						} else {
						    uni.showToast({
						        icon: 'none',
						        title: '用户账号或密码不正确',
						    });
						}
					}	
				})
	        },
	//         toMain(userName) {
	//             this.login(userName);
	//             /**
	//              * 强制登录时使用reLaunch方式跳转过来
	//              * 返回首页也使用reLaunch方式
	//              */
	//             if (this.forcedLogin) {
	//                 uni.reLaunch({
	//                     url: '../main/main',
	//                 });
	//             } else {
	//                 uni.navigateBack();
	//             }
	// 
	//         }
	    },
	    onReady() {
	        this.initPosition();
	    }
	}
</script>

<style>
	.action-row {
	    display: flex;
	    flex-direction: row;
	    justify-content: center;
	}
	
	.action-row navigator {
	    color: #007aff;
	    padding: 0 20upx;
	}
	
	.oauth-row {
	    display: flex;
	    flex-direction: row;
	    justify-content: center;
	    position: absolute;
	    top: 0;
	    left: 0;
	    width: 100%;
	}
	
	.oauth-image {
	    width: 100upx;
	    height: 100upx;
	    border: 1upx solid #dddddd;
	    border-radius: 100upx;
	    margin: 0 40upx;
	    background-color: #ffffff;
	}
	
	.oauth-image image {
	    width: 60upx;
	    height: 60upx;
	    margin: 20upx;
	}
</style>

