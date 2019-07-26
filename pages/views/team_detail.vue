<template>
	<view>
		<view class="box-card">
			<view class='teamName'>
				<text>{{Name}}</text>
			</view>
			<view v-for="o in baseList" :key="o" class="main">
				<view class="font" style="float: center">
					<p align="left">{{o.dateToNBA}}</p>
					<p align="left">{{o.home}}</p>
					<p align="left">官网: {{o.website}}</p>
					<p align="left">{{o.coach}}</p>
					<p align="left">{{o.intro}}</p>
			</view>
    </view>
	
		<view class="qiun-charts" >
			<canvas canvas-id="canvasRadar" id="canvasRadar" class="charts"></canvas>
		</view>
	
	</view>		
		<view class="warp">
			<view class="box">
				<text>{{Name}}阵容与数据</text>
				<t-table @change="change">
					<t-tr>
						<t-th>球衣号</t-th>
						<t-th>姓名</t-th>
						<t-th>位置</t-th>
						<t-th>年龄</t-th>
						<t-th>球龄</t-th>
						<t-th>身高</t-th>
						<t-th>体重</t-th>
					</t-tr>
					<t-tr v-for="item in userList" :key="item.id">
						<t-td>{{ item.id}}</t-td>
						<t-td>{{ item.name }}</t-td>
						<t-td>{{ item.position }}</t-td>
						<t-td>{{ item.age }}</t-td>
						<t-td>{{ item.playage }}</t-td>
						<t-td>{{ item.height }}</t-td>
						<t-td>{{ item.weight }}</t-td>
					</t-tr>
				</t-table>
			</view>
		</view>
	</view>
</template>

<script>
	import tTable from '@/components/t-table/t-table.vue';
    import tTh from '@/components/t-table/t-th.vue';
    import tTr from '@/components/t-table/t-tr.vue';
    import tTd from '@/components/t-table/t-td.vue';
	import uCharts from '@/js_sdk/u-charts/components/u-charts/u-charts.js'
	import GLOBAL from "../../service.js"
	var _self;
	var canvaRadar=null;
	export default{
		 components: {
            tTable,
            tTh,
            tTr,
            tTd
        },
    data(){
        return{
		Name:'',
        userList:[],
		baseList:[],
		ScoreList:[],
		nums:[],
		cWidth:'',
		cHeight:'',
		pixelRatio:1,
    }},
	onLoad(options)
	{
		_self = this;
		this.cWidth=uni.upx2px(750);
		this.cHeight=uni.upx2px(500);
		this.Name=options.Name
		console.log(this.Name)
		uni.request({
			url:GLOBAL.BASE+'/player?Names='+this.Name,
			success: (res) => {
				console.log(res.data)
				this.userList=res.data;
				console.log('success')
			}
		}),
		uni.request({
			url:GLOBAL.BASE+'/baseinfor?Names='+this.Name,
			success: (res) => {
				this.baseList=res.data;
				console.log('success')
			}
		}),
		uni.request({
			url:GLOBAL.BASE+'/score?Names='+this.Name,
			success: (res) => {
				this.ScoreList=res.data;
				console.log('scoresuccess')
					let Radar={categories:[],series:[]};
					Radar.categories=['场均得分','场均助攻', '场均篮板','场均失分','场均失误',]
					this.nums[0]=this.ScoreList[0].score;
                    this.nums[1]=this.ScoreList[0].help;
                    this.nums[2]=this.ScoreList[0].bank;
                    this.nums[3]=this.ScoreList[0].miss;
                    this.nums[4]=this.ScoreList[0].fault;
					Radar.series=[
						        {
							  "name": "比赛情况",
							  "data": this.nums
							},
						]
					this.showRadar("canvasRadar",Radar);
		
			}
		})
	},
	methods:{
			showRadar(canvasId,chartData){
				canvaRadar=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'radar',
					fontSize:11,
					legend:true,
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					animation: true,
					dataLabel: true,
					categories: chartData.categories,
					series: chartData.series,
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					extra: {
						radar: {
							max: 120//雷达数值的最大值
						}
					}
				});
			}
	}
}
</script>

<style>
	.box-card{
		background: #D0DEE5;
	}
	.main{
		margin-left: 0rpx;
	}
	.teamName{
		color: coral;
		font-size: 34rpx;
		line-height: 1;
	}
	.main{
		font-size: 28rpx;
		color: darkcyan;
		line-height: 1;
	}
	
	.charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}
</style>
