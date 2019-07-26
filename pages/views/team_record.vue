<template>
    <view class="warp">
        <view class="box">
            <view class="title">东部</view>
            <t-table @change="change">
                <t-tr>
                    <t-th>排名</t-th>
                    <t-th>队名</t-th>
                    <t-th>胜场</t-th>
                    <t-th>负场</t-th>
                    <t-th>胜率</t-th>
                    <t-th>胜场差</t-th>
                    <t-th>得分</t-th>
                    <t-th>失分</t-th>
                    <t-th>连胜</t-th>
				</t-tr>
                <t-tr v-for="item in east_tableList" :key="item.id">
                    <t-td>{{ item.rank }}</t-td>
                    <t-td>{{ item.name }}</t-td>
                    <t-td>{{ item.v }}</t-td>
					<t-td>{{ item.l }}</t-td>
					<t-td>{{ item.v_per }}</t-td>
					<t-td>{{ item.v_dif }}</t-td>
					<t-td>{{ item.score }}</t-td>
					<t-td>{{ item.losing }}</t-td>
					<t-td>{{ item.s }}</t-td>
                </t-tr>
            </t-table>
        </view>
		<view class="title">西部</view>
		    <t-table @change="change">
		        <t-tr>
		            <t-th>排名</t-th>
		            <t-th>队名</t-th>
		            <t-th>胜场</t-th>
					<t-th>负场</t-th>
					<t-th>胜率</t-th>
					<t-th>胜场差</t-th>
					<t-th>得分</t-th>
					<t-th>失分</t-th>
					<t-th>连胜</t-th>
				</t-tr>
		        <t-tr v-for="item in west_tableList" :key="item.id">
		            <t-td>{{ item.rank }}</t-td>
		            <t-td>{{ item.name }}</t-td>
		            <t-td>{{ item.v }}</t-td>
		            <t-td>{{ item.l }}</t-td>
		            <t-td>{{ item.v_per }}</t-td>
		            <t-td>{{ item.v_dif }}</t-td>
		            <t-td>{{ item.score }}</t-td>
		            <t-td>{{ item.losing }}</t-td>
		            <t-td>{{ item.s }}</t-td>
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
export default {
        components: {
            tTable,
            tTh,
            tTr,
            tTd
        },
        data() {
            return {
                east_tableList: [],
				west_tableList: []
            };
        },
		onLoad() {
			this.getinfo()
		},
        methods: {
            getinfo(){
				uni.request({
					url:GLOBAL.BASE+'/getGame_conditon',
					success: (res)=>{
						console.log(res.data)
						this.east_tableList = res.data['east'],
						this.west_tableList = res.data['west']
					}
				})
			}
        }
    };
	
</script>