<template>
	<view class="custom-tabbar">
		<view 
			class="tabbar-item" 
			v-for="(item, index) in tabList" 
			:key="index"
			:class="{ 'active': currentIndex === index }"
			@click="switchTab(index, item.pagePath)"
		>
			<view class="tabbar-icon">
				<uni-icons :type="item.icon" :size="22" :color="currentIndex === index ? '#000000' : '#999999'"></uni-icons>
			</view>
			<text class="tabbar-text" :style="{ color: currentIndex === index ? '#000000' : '#999999' }">{{ item.text }}</text>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted, onUpdated } from 'vue'

const currentIndex = ref(0)

const tabList = ref([
	{
		pagePath: '/pages/index/index',
		text: '首页',
		icon: 'home'
	},
	{
		pagePath: '/pages/category/category',
		text: '分类',
		icon: 'bars'
	},
	{
		pagePath: '/pages/profile/profile',
		text: '我的',
		icon: 'person'
	}
])

const switchTab = (index, pagePath) => {
	if (currentIndex.value === index) return
	
	currentIndex.value = index
	uni.switchTab({
		url: pagePath
	})
}

// 更新当前选中状态
const updateCurrentIndex = () => {
	const pages = getCurrentPages()
	if (pages.length === 0) return
	
	const currentPage = pages[pages.length - 1]
	const route = currentPage.route
	
	const index = tabList.value.findIndex(item => item.pagePath.includes(route))
	if (index !== -1) {
		currentIndex.value = index
	}
}

// 组件挂载时更新状态
onMounted(() => {
	updateCurrentIndex()
})

// 组件更新时更新状态
onUpdated(() => {
	updateCurrentIndex()
})
</script>

<style scoped>
.custom-tabbar {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	align-items: center;
	justify-content: space-around;
	height: 110rpx;
	background-color: #FFFFFF;
	border-top: 1rpx solid #E5E5E5;
	z-index: 999;
	padding-bottom: env(safe-area-inset-bottom);
	box-shadow: 0 -2rpx 20rpx rgba(0, 0, 0, 0.02);
}

.tabbar-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	flex: 1;
	height: 100%;
	transition: all 0.3s;
}

.tabbar-item.active {
	color: #000000;
}

.tabbar-icon {
	margin-bottom: 8rpx;
}

.tabbar-text {
	font-size: 20rpx;
	line-height: 1;
	font-weight: 400;
	letter-spacing: 0.5rpx;
}

.tabbar-item:active {
	opacity: 0.7;
}
</style>