<template>
	<view>
 <view class="part2">  
    <swiper class="banner-box" indicator-dots autoplay  
        indicator-active-color="#169bd5"  circular  
        :interval="5000" :duration="300" indicator-color="rgba(0,0,0,.3)">  
        <swiper-item>  
            <image src="https://w1.hoopchina.com.cn/a4/4b/6b/a44b6b3c8ec5110b1ec33678348586dc002.png" class="banner-image" mode="aspectFill" lazy-load @click="toNews()"></image>  
        </swiper-item>  
        <swiper-item>  
            <image src="https://w1.hoopchina.com.cn/21/62/77/216277d5d4996c64f00e466e9ec92e31002.png" class="banner-image" mode="aspectFill" lazy-load @click="toNews()"></image>  
        </swiper-item>  
        <swiper-item>  
            <image src="https://c2.hoopchina.com.cn/uploads/star/event/images/190626/b4919dcf4a8153d6c5b7a4ec1d456a990f45049c.jpg?x-oss-process=image/resize,w_800/format,webp" class="banner-image" mode="aspectFill" lazy-load @click="toNews()"></image>  
        </swiper-item>  
    </swiper>  
</view>  
<scroll-view scroll-y="true" style="height: 970rpx;">
<view class='item-list'>
  <view class='pro-item' v-for="(team,index) in Team" :key="index">
    <img class='pro-logo' :src="[require('@/logo/'+team.text+'.png')]" />
    <view class='pro-body'>
      <view class='pro-title'>{{team.text}}</view>
      <view class='pro-time'>{{team.time}}进入NBA</view>
	  <view class='pro-place'>主场:{{team.place}}</view>
      <view class='pro-footer'>
        <button class='btn-detail' @click="getName(team.text)" type="primary">查看详情</button>
      </view>
    </view>
  </view>
</view>
</scroll-view>
</view>
</template>

<script>
	export default {
  name: 'App',
  data(){
    return{
	baselist:[],
    Team: [
      {text: '76人',time:'1949年',place:'富国银行中心'},
      {text: '步行者',time:'1976年',place:'银行家人寿球馆'},
      {text: '独行侠',time:'1980年',place:'美国航空中心'},
      {text: '公牛',time:'1966年',place:'联合中心'},
      {text: '国王',time:'1951年',place:'黄金一号中心'},
      {text: '湖人',time:'1947年',place:'斯台普斯中心'},
      {text: '黄蜂',time:'1988年',place:'时代华纳有线球馆'},
      {text: '灰熊',time:'1995年',place:'联邦快递球馆'},
      {text: '活塞',time:'1948年',place:'小凯撒球馆'},
      {text: '火箭',time:'1967年',place:'丰田中心'},
      {text: '掘金',time:'1967年',place:'百事中心'},
      {text: '爵士',time:'1974年',place:'威英特智能家居球馆 '},
      {text: '开拓者',time:'1977年',place:'摩达中心 '},
      {text: '凯尔特人',time:'1946年',place:'TD 花园'},
      {text: '快船',time:'1970年',place:'斯台普斯中心'},
      {text: '篮网',time:'1967年',place:'巴克莱中心'},
      {text: '老鹰',time:'1949年',place:'菲利普斯球馆 '},
      {text: '雷霆',time:'1979年',place:'切萨皮克能源球馆'},
      {text: '马刺',time:'1976年',place:'AT&T 中心'},
      {text: '猛龙',time:'1995年',place:'加拿大丰业银行球馆'},
      {text: '魔术',time:'1989年',place:'安利球馆'},
      {text: '尼克斯',time:'1946年',place:'麦迪逊广场花园'},
      {text: '奇才',time:'1961年',place:'威瑞森中心'},
      {text: '骑士',time:'1970年',place:'速贷球馆'},
      {text: '热火',time:'1988年',place:'美国航空球馆'},
      {text: '森林狼',time:'1989年',place:'标靶中心'},
      {text: '太阳',time:'1968年',place:'托金斯迪克度假酒店球馆'},
      {text: '鹈鹕',time:'1987年',place:'冰沙王中心'},
      {text: '雄鹿',time:'1968年',place:'Fiserv广场球馆'},
      {text: '勇士',time:'1946年',place:'甲骨文球馆'},
    ]
    }
  },
methods:{
    getName:function(Name){
	  console.log(Name)
      var _this=this
	  uni.navigateTo({
	  	url:'./team_detail?Name='+Name
	  })
    },
	toNews(){
		uni.navigateTo({
			url:'./News'
		})
	}
}
}
</script>

<style>
	swiper{
		width: 100%;
		height: 340rpx;
	}
	swiper image{
		display: block;
		width: 100%;
		height: 100%;
	}
	.item-list{
		
	}
	.pro-item{
		overflow: hidden;
		padding: 30rpx;
	}
	.pro-logo{
  float:left;
  width: 195rpx;
  height: 190rpx;
}
.pro-body{
  margin-left: 210rpx;
}
.pro-title{
  color: #212121;
  font-size: 34rpx;
  line-height: 1.5;
}
.pro-time{
  font-size: 24rpx;
  color: #9a9a0a;
  line-height: 1.5;
}
.pro-place{
  font-size: 24rpx;
  color: #9a9a0a;
  line-height: 1.5;
}
.pro-footer{
  overflow: hidden
}
.btn-detail{
  font-size: 24rpx;
  background-color: #2e5e86;
  color: #fff;
  float: left;
  width: 170rpx;
  height: 52rpx;
}
</style>
