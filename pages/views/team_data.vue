<template>
    <view class="warp">
        <view class="box">
            <view class="title">球队数据</view>
            <t-table @change="change">
                <t-tr>
                    <t-th>球队</t-th>
                    <t-th>投篮命中率</t-th>
					<t-th>三分命中率</t-th>
					<t-th>罚球命中率</t-th>
					<t-th>总篮板</t-th>
					<t-th>助攻</t-th>
					<t-th>得分</t-th>
				</t-tr>
                <t-tr v-for="item in tableList" :key="item.id">
                    <t-td>{{ item.t_name }}</t-td>
                    <t-td>{{ item.shoot_1 }}</t-td>
					<t-td>{{ item.three_1 }}</t-td>
					<t-td>{{ item.penalty_1 }}</t-td>
					<t-td>{{ item.backboard_1 }}</t-td>
					<t-td>{{ item.assist }}</t-td>
					<t-td>{{ item.score }}</t-td>
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
                tableList: []
            };
        },
		onLoad() {
			this.getinfo()
		},
        methods: {
            getinfo(){
				uni.request({
					url:GLOBAL.BASE+'/getTeam_data',
					success: (res)=>{
						console.log(res.data)
						this.tableList = res.data
					}
				})
			}
        }
    };
	
</script>