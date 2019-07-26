 <template>
    <view>
        <view class="title">主队</view>
		<picker @change="home_team" :value="index1" :range="chiname">
		    <view class="uni-input">{{chiname[index1]}}</view>
		</picker>
        <view class="title">客队</view>
        <picker @change="guest_team" :value="index2" :range="chiname">
            <view class="uni-input">{{chiname[index2]}}</view>
        </picker>
		<button type="primary" @click="confirm">预测比赛</button>
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt" >
			<view class="qiun-title-dot-light">历史数据比对</view>
		</view>
		<view class="qiun-charts" >
			<canvas canvas-id="canvasRadar" id="canvasRadar" class="charts"></canvas>
		</view>
		<view class="qiun-charts" >
			<canvas canvas-id="canvasGauge" id="canvasGauge" class="charts"></canvas>
		</view>
		<view class="qiun-charts" >
			<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" @touchstart="touchLineA"></canvas>
		</view>
	</view>
	
</template>
<script>
	import uCharts from '@/js_sdk/u-charts/components/u-charts/u-charts.js'
	import GLOBAL from "../../service.js"
	var _self;
	var canvaRadar = null;
	var canvaGauge=null;
	var canvaLineA=null;
	export default {
		data() {
			return {
				cWidth:'',
				cHeight:'',
				pixelRatio:1,
				indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`,
				  home_name : "湖人",
				  guest_name : "火箭",
				  radar_data : [],
				  index1 : 0,
				  index2 : 0,
				  title: 'picker',
				  chiname: ['火箭','马刺','鹈鹕','灰熊','独行侠','勇士','快船','湖人','国王','太阳','掘金','雷霆','开拓者','爵士','森林狼','热火','黄蜂','魔术','奇才','老鹰','雄鹿','步行者','活塞','公牛','骑士'],
				  
				  chiname_engname : {'火箭': 'Houston Rockets', '马刺': 'San Antonio Spurs', '鹈鹕': 'New Orleans Pelicans', '灰熊': 'Memphis Grizzlies', '独行侠': 'Dallas Mavericks', 
										'勇士': 'Golden State Warriors', '快船': 'Los Angeles Clippers', '湖人': 'Los Angeles Lakers', '国王': 'Sacramento Kings', '太阳': 'Phoenix Suns', 
										'掘金': 'Denver Nuggets', '雷霆': 'Oklahoma City Thunder', '开拓者': 'Portland Trail Blazers', '爵士': 'Utah Jazz', '森林狼': 'Minnesota Timberwolves', 
										'猛龙': 'Toronto Raptors', '76人': 'Philadelphia 76ers', '凯尔特人': 'Boston Celtics', '篮网': 'Brooklyn Nets', '尼克斯': 'New York Knicks',
										 '热火': 'Miami Heat', '黄蜂': 'Charlotte Hornets', '魔术': 'Orlando Magic', '奇才': 'Washington Wizards', '老鹰': 'Atlanta Hawks', '雄鹿': 'Milwaukee Bucks',
										  '步行者': 'Indiana Pacers', '活塞': 'Detroit Pistons', '公牛': 'Chicago Bulls', '骑士': 'Cleveland Cavaliers'},
				
			}
		},
		onLoad() {
		    _self = this;
			this.cWidth=uni.upx2px(750);
			this.cHeight=uni.upx2px(500);
			
		},
		methods: {
			bindChange:function(e){
				console.log("成了")
			},
			home_team: function(event){
				this.home_name = this.chiname[event.target.value]
				this.index1 = event.target.value
				console.log(this.home_name)
			},
			guest_team: function(event){
				this.guest_name = this.chiname[event.target.value]
				this.index2=event.target.value
				console.log(this.guest_name)
			},
			confirm: function(e){
				var home = this.chiname_engname[this.home_name]
				var guest = this.chiname_engname[this.guest_name]
				uni.request({
					url: GLOBAL.BASE+'/compare?Vteam='+home+'&Hteam='+guest+'',
					success: (res) => {
						console.log(res.data)
						var Gauge = {categories:[],series:[]};
						Gauge.categories =  [{
								value: 0.2,
								color: '#2fc25b'
							}, {
								value: 0.8,
								color: '#f04864'
							}, {
								value: 1,
								color: '#1890ff'
							}],
						Gauge.series = [{
							name: '主队胜率',
							data: res.data
						}]
						this.showGauge("canvasGauge",Gauge)
					}
				})
				uni.request({
					url:GLOBAL.BASE+'/'+this.home_name+'/vs/'+this.guest_name+'/eighttimes',
					success: (res) => {
						var Line = {categories:[], series:[]};
						Line.categories=res.data["date"]
						Line.series = [{
							name:this.home_name,
							data: res.data["home"],
							color: '#055121'
						},
						{
							name: this.guest_name,
							data: res.data["guest"],
							color: '#FF115F'
						}
						]
						_self.showLineA("canvasLineA",Line);
					},
				})
				uni.request({
						url:GLOBAL.BASE+'/stat/'+this.home_name+'/vs/'+this.guest_name+'',
					success: (res) =>{
						var homedata = [res.data[0][0],res.data[0][1]*1.5,res.data[0][2]*8,res.data[0][3]*1.5,res.data[0][4]*5,res.data[0][5]*5]
						var guestdata = [res.data[1][0],res.data[1][1]*1.5,res.data[1][2]*8,res.data[1][3]*1.5,res.data[1][4]*5,res.data[1][5]*5]
						var name = res.data[2]
						console.log(homedata)
						let Radar={categories:[],series:[]};
						Radar.categories=['场均得分','场均篮板', '三分命中数','进球数','罚球数','抢断']
						Radar.series=[{
							name:name[0],
							data: homedata
						},{
						    name:name[1],
							data: guestdata
						}]
						this.showRadar("canvasRadar",Radar)
					}
				})
			},
			showRadar(canvasId,chartData){
				console.log("sadadasdsadasdasd")
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
			},
			showGauge(canvasId,chartData){
				canvaGauge = new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'gauge',
					fontSize:11,
					legend:false,
					title: {
						name: Math.round(chartData.series[0].data*100)+'%',
						color: chartData.categories[1].color,
						fontSize: 25*_self.pixelRatio,
						offsetY:50*_self.pixelRatio,//新增参数，自定义调整Y轴文案距离
					},
					subtitle: {
						name: chartData.series[0].name,
						color: '#666666',
						fontSize: 15*_self.pixelRatio,
						offsetY:-50*_self.pixelRatio,//新增参数，自定义调整Y轴文案距离
					},
					extra: {
						gauge:{
							type:'default',
							width: _self.gaugeWidth*_self.pixelRatio,//仪表盘背景的宽度
							startAngle:0.75,
							endAngle:0.25,
							startNumber:0,
							endNumber:100,
							splitLine:{
								fixRadius:0,
								splitNumber:10,
								width: _self.gaugeWidth*_self.pixelRatio,//仪表盘背景的宽度
								color:'#FFFFFF',
								childNumber:5,
								childWidth:_self.gaugeWidth*0.4*_self.pixelRatio,//仪表盘背景的宽度
							},
							pointer:{
								width: _self.gaugeWidth*0.8*_self.pixelRatio,//指针宽度
								color:'auto'
							}
						}
					},
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					dataLabel: true,
				});
			},
			showLineA(canvasId,chartData){
				canvaLineA=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'line',
					fontSize:11,
					legend:true,
					dataLabel:false,
					dataPointShape:true,
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					xAxis: {
						type:'grid',
						gridColor:'#CCCCCC',
						gridType:'dash',
						dashLength:8
					},
					yAxis: {
						gridType:'dash',
						gridColor:'#CCCCCC',
						dashLength:8,
						splitNumber:5,
						min:10,
						max:180,
						format:(val)=>{return val.toFixed(0)+'分'}
					},
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					extra: {
						line:{
							type: 'straight'
						}
					}
				});
				
			},
			touchLineA(e) {
				canvaLineA.showToolTip(e, {
					format: function (item, category) {
						return category + ' ' + item.name + ':' + item.data 
					}
				});
			}
		}
	}
</script>

<style>
	.qiun-charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}
	
	.charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	} 
</style>
