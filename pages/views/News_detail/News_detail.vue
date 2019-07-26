<template>
	<view>
		
		<!-- <p class="text" v-html="news.content"></p> -->
		<view>
			<uni-card 
				:title="news.title" >
				<p class="text" v-html="news.content"></p>
			</uni-card>
			<view>
			    <view class="uni-padding-wrap">
			        <!-- 评论区 start -->
			        <view class="uni-comment">
			            <!-- <view class="uni-comment-list">
			                <view class="uni-comment-face">
			                    <image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png" mode="widthFix"></image>
			                </view>
			                <view class="uni-comment-body">
			                    <view class="uni-comment-top">
			                        <text>网友</text>
			                    </view>
			                    <view class="uni-comment-date">
			                        <text>08/10 08:12</text>
			                    </view>
			                    <view class="uni-comment-content">很酷的HBuilderX和uni-app，开发一次既能生成小程序，又能生成App</view>
			                </view>
			            </view> -->
			            <!-- <view class="uni-comment-list">
			                <view class="uni-comment-face">
			                    <image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png" mode="widthFix"></image>
			                </view>
			                <view class="uni-comment-body">
			                    <view class="uni-comment-top">
			                        <text>马克一天</text>
			                    </view>
			                    <view class="uni-comment-content">很强大，厉害了我的uni-app!</view>
			                </view>
			            </view> -->
			            <view class="uni-comment-list" v-for="(comment,index) in comment_data" :key="index">
			                <view class="uni-comment-body">
			                    <view class="uni-comment-top">
			                        <text>{{comment.user_id}}</text>
			                    </view>
			                    <view class="uni-comment-content">{{comment.content}}</view>
			                    <view class="uni-comment-date">
			                        <text>{{comment.time}}</text>
			                    </view>
			                </view>
			            </view>
			            
			        </view>
					
					
			    </view>
			</view>
			
		</view>
		
		<view >
			<input class="footer" type="text" @confirm="comment_upload" v-model="comment"  placeholder="评论" />
			<!-- <button class='footer2' @tap="comment_upload">发布</button> -->
		</view>
	</view>
</template>

<script>
	import GLOBAL from "../../../service.js"
	import {uniCard} from '@dcloudio/uni-ui'
	export default {   
		components: {uniCard},
		data() {
			return {
				id: '',
				news:'',
				title: "评论界面",
				comment_data:[],
				comment:"",
				userId:''
			}
		},
		onLoad(options)
		{
			this.userId=uni.getStorageSync("userData").uno,
			this.id = options.id,
			console.log(this.id),
			uni.request({
				url:GLOBAL.BASE+'/getIDnews/'+this.id+'',
				success: (res) => {
					this.news=res.data;
					console.log(this.news)
				}
			}),
			uni.request({
				url:GLOBAL.BASE+'/getComment?NewsId='+this.id+'',
				success: (res) =>{
					this.comment_data = res.data,
					console.log(this.comment_data)
				}
			})
			
		},
		methods: {
				comment_upload(e){
				  uni.request({
				  	url: GLOBAL.BASE+'/isAlive',
					header:{
						"Cookie":"JSESSIONID="+uni.getStorageSync("sid")
					},
				  	success: res => {
						console.log(res.data);
						if(res.data==true){
							this.comment = e.detail.value,
							uni.request({
								url:GLOBAL.BASE+'/comment?content='+this.comment+'&news_id='+this.id+'',
									header:{
									"Cookie":"JSESSIONID="+uni.getStorageSync("sid")
								}
							})
							var news_item={
							  com_id: 1,
							  content: this.comment,
							  news_id:this.id,
							  time: '今天',
							  user_id: this.userId
							}
							this.comment_data.push(news_item)
							this.comment=''
						}
						else{
							uni.clearStorage('sid');
							console.log("sid失效");
							uni.navigateTo({
								url:'../test'
							})
						}
					},
				  	fail: () => {}
				  });
				  // else{
				 //  this.comment = e.detail.value,
				 //  uni.request({
				 //  	url:GLOBAL.BASE+'/comment?content='+this.comment+'&news_id='+this.id+'',
					// header:{
					// 	"Cookie":"JSESSIONID="+uni.getStorageSync("sid")
					// }
				 //  })
				 //  var news_item={
					//   com_id: 1,
					//   content: this.comment,
					//   news_id:this.id,
					//   time: '今天',
					//   user_id: this.userId
				 //  }
				 //  this.comment_data.push(news_item)
				 //  this.comment=''
				  // }
			  }
			  
		}
	}
</script>

<style>
/* comment */
    page {
        background-color: #f8f8f8;
    }

    .uni-padding-wrap {
        padding: 30upx;
    }

    view {
        font-size: 28upx;
    }

    .uni-comment {
        padding: 5rpx 0;
        display: flex;
        flex-grow: 1;
        flex-direction: column;
    }

    .uni-comment-list {
        flex-wrap: nowrap;
        padding: 10rpx 0;
        margin: 10rpx 0;
        width: 100%;
        display: flex;
    }

    .uni-comment-face {
        width: 70upx;
        height: 70upx;
        border-radius: 100%;
        margin-right: 20upx;
        flex-shrink: 0;
        overflow: hidden;
    }

    .uni-comment-face image {
        width: 100%;
        border-radius: 100%;
    }

    .uni-comment-body {
        width: 100%;
    }

    .uni-comment-top {
        line-height: 1.5em;
        justify-content: space-between;
    }

    .uni-comment-top text {
        color: #0A98D5;
        font-size: 24upx;
    }

    .uni-comment-date {
        line-height: 38upx;
        flex-direction: row;
        justify-content: space-between;
        display: flex !important;
        flex-grow: 1;
    }

    .uni-comment-date view {
        color: #666666;
        font-size: 24upx;
        line-height: 38upx;
    }

    .uni-comment-content {
        line-height: 1.6em;
        font-size: 28upx;
        padding: 8rpx 0;
    }

    .uni-comment-replay-btn {
        background: #FFF;
        font-size: 24upx;
        line-height: 28upx;
        padding: 5rpx 20upx;
        border-radius: 30upx;
        color: #333 !important;
        margin: 0 10upx;
    }
	.footer{
		width: 100%;
		height: 100upx;
		background-color: #ddd;

		position: fixed;
		
		bottom: 0;

	}
/* 	.footer1{
		width: 80%;
		background-color: rgba(147, 147, 147, 0.44);
	}
	.footer2{
    width: 20%;
	background-color: #59b3f3;
	} */
	
</style>
