<template>
	<view class="page-container">
		<!-- 顶部标题区域 -->
		<view class="header-section">
			<text class="page-title">分类</text>
			<text class="page-subtitle">管理你的物品分类</text>
		</view>

		<!-- 分类列表 -->
		<view class="category-section">
			<view 
				class="category-item" 
				v-for="(category, index) in categories" 
				:key="index"
				@click="handleCategoryClick(category)"
			>
				<view class="category-icon-wrapper">
					<uni-icons :type="category.icon" size="32" :color="category.color"></uni-icons>
				</view>
				<view class="category-info">
					<text class="category-name">{{ category.name }}</text>
					<text class="category-count">{{ category.count }} 件</text>
				</view>
				<uni-icons type="right" size="18" color="#CCCCCC"></uni-icons>
			</view>
		</view>

		<!-- 空状态 -->
		<view v-if="categories.length === 0" class="empty-state">
			<uni-icons type="folder" size="80" color="#CCCCCC"></uni-icons>
			<text class="empty-text">还没有分类</text>
			<text class="empty-hint">创建你的第一个分类</text>
		</view>

		<custom-tabbar />
	</view>
</template>

<script setup>
import { ref } from 'vue'
import CustomTabbar from "../../components/custom-tabbar/custom-tabbar.vue"

const categories = ref([
	{
		name: '电子产品',
		count: 12,
		icon: 'phone',
		color: '#000000'
	},
	{
		name: '书籍',
		count: 8,
		icon: 'book',
		color: '#333333'
	},
	{
		name: '衣物',
		count: 15,
		icon: 'shopping',
		color: '#666666'
	},
	{
		name: '其他',
		count: 5,
		icon: 'grid',
		color: '#999999'
	}
])

const handleCategoryClick = (category) => {
	console.log('点击分类:', category)
}
</script>

<style scoped>
.page-container {
	min-height: 100vh;
	background-color: #FAFAFA;
	padding-bottom: 140rpx;
}

/* 顶部区域 */
.header-section {
	padding: 80rpx 48rpx 60rpx;
	background-color: #FFFFFF;
	border-bottom: 1rpx solid #F0F0F0;
}

.page-title {
	font-size: 56rpx;
	font-weight: 600;
	color: #000000;
	display: block;
	margin-bottom: 12rpx;
	letter-spacing: 2rpx;
}

.page-subtitle {
	font-size: 24rpx;
	color: #999999;
	font-weight: 300;
	letter-spacing: 1rpx;
}

/* 分类区域 */
.category-section {
	padding: 32rpx 24rpx;
}

.category-item {
	display: flex;
	align-items: center;
	background-color: #FFFFFF;
	border-radius: 16rpx;
	padding: 32rpx 24rpx;
	margin-bottom: 16rpx;
	box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.04);
	transition: all 0.3s ease;
}

.category-item:active {
	transform: scale(0.98);
	box-shadow: 0 1rpx 8rpx rgba(0, 0, 0, 0.06);
}

.category-icon-wrapper {
	width: 88rpx;
	height: 88rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #F5F5F5;
	border-radius: 16rpx;
	margin-right: 24rpx;
}

.category-info {
	flex: 1;
	display: flex;
	flex-direction: column;
}

.category-name {
	font-size: 32rpx;
	color: #000000;
	font-weight: 500;
	margin-bottom: 8rpx;
	letter-spacing: 0.5rpx;
}

.category-count {
	font-size: 24rpx;
	color: #999999;
	font-weight: 400;
}

/* 空状态 */
.empty-state {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 120rpx 48rpx;
}

.empty-text {
	font-size: 32rpx;
	color: #666666;
	margin-top: 32rpx;
	font-weight: 500;
}

.empty-hint {
	font-size: 24rpx;
	color: #999999;
	margin-top: 16rpx;
}
</style>