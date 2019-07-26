<template>
	<view>
		<uni-list>
			<uni-list-item v-for="(news,index) in newslist" :key="index" @click="goto_News_detail(news.id)" :title="news.title" show-badge="true" ></uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	
	import GLOBAL from "../../service.js"
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	export default {
		components: {uniList,uniListItem},
		data() {
			return {
				newslist:[]
			}
		},
		created(){
			uni.request({
				url:GLOBAL.BASE+'/getNews',
				success: (res) => {
					this.newslist=res.data
					console.log(this.newslist)
				}
				
			})
		},
		methods:{
			goto_News_detail(id){
				console.log(id)
				  var _this=this
				uni.navigateTo({
					url:'./News_detail/News_detail?id='+id,
				})

				
			}
		}
	}
</script>

<style>

</style>
