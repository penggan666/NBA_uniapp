<template>
	<view>
		<view class='index-contier'>
		  <view class='index-left'>
			<view>用户名</view>
			<view>{{userData.uno}}</view>
		  </view>
		  <view class='index-center'>
			<image class='logo' src='../../../static/p6.png' ></image>
		  </view>
		  <view class='index-right'>
			<view>年龄</view>
			<view>{{userData.age}}</view>
		  </view>
		</view>
		<view class='inform'>
			  <view class='phone'>
				<span>邮箱</span>
				<span>{{userData.utel}}</span>
			  </view>
			  <view class='job'>
				<span>性别</span>
				<span>{{userData.sex}}</span>
			  </view>
			</view>

			<view class='Click'>
			  <view class='detail' @tap="toComparison">
				<span>比赛预测</span>
				<span>></span>
			  </view>
			</view>
			<view class='reset'>
			  <view class='reset2' @tap="toReset">
				<span>{{getString()}}</span>
				<span>></span>
			  </view>
			</view>
	</view>
</template>

<script>
	import GLOBAL from "../../../service.js"
	export default {
		data() {
			return {
				userData:'',
				loginType:false,
			}
		},
		onLoad(){
			this.userData=uni.getStorageSync("userData");
			console.log(this.userData)
		},
		methods: {
			toComparison(){
				if(this.loginType==true){
				uni.navigateTo({
					url:'../comparison'
				})
				}
				else{
					uni.navigateTo({
						url:'../test'
					})
				}
			},
			getString(){
				// if(uni.getStorageSync('sid')==''){
				// 	this.loginType=false
				// 	return "请登录"
				// }
				// this.loginType=true
				// return '退出登录'
				uni.request({
					url: GLOBAL.BASE+'/isAlive',
					header:{
						"Cookie":"JSESSIONID="+uni.getStorageSync("sid")
					},
					success: res => {
						if(res.data==true)
						{
							this.loginType=true
						}
						else{
							this.loginType=false
						}
					}
				})
				if(this.loginType)
				{
					return "退出登录";
				}
				else{
					return "请登录"
				}
			},
			toReset(){
				if(this.loginType==false)
				{
					uni.navigateTo({
						url:'../test'
					})
				}
				else{
					uni.request({
						url:GLOBAL.BASE+'/logout',
						header:{
							"Cookie":"JSESSIONID="+uni.getStorageSync("sid")
						}
					})
					uni.clearStorage();
					uni.reLaunch({
						url:'../Team'
					})
				}
			}
			
		}
	}
</script>

<style>
.index-contier{
  color: #fff;
  font-size: 24rpx;
  width: 100%;
  height: 250rpx;
  background: linear-gradient(#e0f1f7,#2e5e86);
  margin-bottom: 40rpx;
  }

.index-left {
    float: left;
    width: 30%;
    text-align: center;
    margin-top: 120rpx;
}
.index-center{
  float: left;
  width: 40%;
  text-align: center;
  margin-top: 40rpx;
}


.logo {
    margin: 0 auto;
    width: 80px;
    height: 80px;
    background: #ffffff;
    border: 1px solid #2e5e86;
    border-radius: 40px;
}

.index-right {
    float: left;
    width: 30%;
    text-align: center;
    margin-top: 120rpx;
}
.inform{
  padding: 0 20rpx;
  font-size: 36rpx;
  margin-bottom: 40rpx;
}

.phone {
    height: 60rpx;
    line-height: 60rpx;
    border-bottom: 1px solid #e6e5e2;
}


.phone span {
    margin: 0 10px;
}
 
.phone span:nth-child(2) {
    float: right;
}

.name {
    height: 60rpx;
    line-height: 60rpx;
    border-bottom: 1px solid #e6e5e2;
}


.name span {
    margin: 0 10px;
}
 
.name span:nth-child(2) {
    float: right;
}


.job {
    height: 60rpx;
    line-height: 60rpx;
    border-bottom: 1px solid #e6e5e2;
}


.job span {
    margin: 0 10px;
}
 
.job span:nth-child(2) {
    float: right;
}

.Click{
  padding: 0 20rpx;
  font-size: 36rpx;
  margin-bottom: 40rpx;
}

.detail {
    height: 60rpx;
    line-height: 60rpx;
    border-bottom: 1px solid #e6e5e2;
}


.detail span {
    margin: 0 10px;
}
 
.detail span:nth-child(2) {
    float: right;
}

.reset{
  padding: 0 20rpx;
  font-size: 36rpx;
  margin-bottom: 40rpx;
}

.reset2 {
    height: 60rpx;
    line-height: 60rpx;
    border-bottom: 1px solid #e6e5e2;
}


.reset2 span {
    margin: 0 10px;
}
 
.reset2 span:nth-child(2) {
    float: right;
}

</style>
