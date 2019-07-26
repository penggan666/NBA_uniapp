<template>

	<view class="warp">
		<view class='search'>
		<form @submit="formSubmit">
		<view class="input">
             <input class="uni-input" name="input" placeholder="输入球员名字" />
        </view>
		<view class="btn">
             <button formType="submit" type="primary">搜索</button>
        </view>
		</form>
		</view>
		<view class="box">
			<t-table @change="change">
				<t-tr>
					<t-th>排名</t-th>
					<t-th>球员</t-th>
					<t-th>球队</t-th>
					<t-th>得分</t-th>
					<t-th>命中率</t-th>
					<t-th>三分命中率</t-th>
					<t-th>罚球命中率</t-th>
				</t-tr>
				<t-tr v-for="item in playerlist" :key="item.id">
					<t-td>{{ item.a}}</t-td>
					<t-td>{{ item.s }}</t-td>
					<t-td>{{ item.d }}</t-td>
					<t-td>{{ item.f }}</t-td>
					<t-td>{{ item.h }}</t-td>
					<t-td>{{ item.k }}</t-td>
					<t-td>{{ item.z }}</t-td>
				</t-tr>
			</t-table>
		</view>
	</view>
</template>

<script>
	import tTable from '@/components/t-table/t-table.vue';
	import tTh from '@/components/t-table/t-th.vue';
	import tTr from '@/components/t-table/t-tr.vue';
	import tTd from '@/components/t-table/t-td.vue';
	import GLOBAL from "../../service.js"
	export default{
		 components: {
	        tTable,
	        tTh,
	        tTr,
	        tTd
	    },
	data(){
	    return{
		playername:'',
		playerlist:[]
	}},
	onLoad(options){
			this.searchPlayer();
		},
	methods:{
		searchPlayer(){
		uni.request({
				url:GLOBAL.BASE+'/getPlayerData?playername='+this.playername,
				success: (res) => {
					this.playerlist=res.data;
				}
			})
		},
		formSubmit:function(e)
		{
			console.log(e.detail.value.input);
			this.playername=e.detail.value.input;
			this.searchPlayer();
		}
	}
	}
</script>

<style>

</style>
