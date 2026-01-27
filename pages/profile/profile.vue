<template>
	<view class="page-container">
		<!-- 用户信息区域 -->
		<view class="user-section">
			<view class="avatar-wrapper">
				<view class="avatar">
					<uni-icons type="person-filled" size="48" color="#CCCCCC"></uni-icons>
				</view>
			</view>
			<text class="username">The Shire</text>
			<text class="user-desc">记录生活中的每一件物品</text>
		</view>

		<!-- 统计信息 -->
		<view class="stats-section">
			<view class="stat-item">
				<text class="stat-number">{{ totalItems }}</text>
				<text class="stat-label">物品总数</text>
			</view>
			<view class="stat-divider"></view>
			<view class="stat-item">
				<text class="stat-number">{{ totalCategories }}</text>
				<text class="stat-label">分类数量</text>
			</view>
		</view>

		<!-- 功能菜单 -->
		<view class="menu-section">
			<view 
				class="menu-item" 
				v-for="(item, index) in menuList" 
				:key="index"
				@click="handleMenuClick(item)"
			>
				<view class="menu-icon-wrapper">
					<uni-icons :type="item.icon" size="24" :color="item.color"></uni-icons>
				</view>
				<text class="menu-text">{{ item.name }}</text>
				<uni-icons type="right" size="18" color="#CCCCCC"></uni-icons>
			</view>
		</view>

		<custom-tabbar />
	</view>
</template>

<script setup>
import { ref } from 'vue'
import CustomTabbar from "../../components/custom-tabbar/custom-tabbar.vue"

const totalItems = ref(40)
const totalCategories = ref(8)

const menuList = ref([
	{
		name: '设置',
		icon: 'gear',
		color: '#000000'
	},
	{
		name: '关于',
		icon: 'info',
		color: '#333333'
	},
	{
		name: '帮助与反馈',
		icon: 'chatbubble',
		color: '#666666'
	}
])

const handleMenuClick = (item) => {
	console.log('点击菜单:', item)
}
</script>

<style scoped>
.page-container {
	min-height: 100vh;
	background-color: #FAFAFA;
	padding-bottom: 140rpx;
}

/* 用户信息区域 */
.user-section {
	background-color: #FFFFFF;
	padding: 80rpx 48rpx 60rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	border-bottom: 1rpx solid #F0F0F0;
}

.avatar-wrapper {
	margin-bottom: 32rpx;
}

.avatar {
	width: 160rpx;
	height: 160rpx;
	border-radius: 80rpx;
	background-color: #F5F5F5;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 2rpx solid #E5E5E5;
}

.username {
	font-size: 40rpx;
	font-weight: 600;
	color: #000000;
	margin-bottom: 12rpx;
	letter-spacing: 1rpx;
}

.user-desc {
	font-size: 24rpx;
	color: #999999;
	font-weight: 300;
	letter-spacing: 0.5rpx;
}

/* 统计信息 */
.stats-section {
	background-color: #FFFFFF;
	margin-top: 24rpx;
	padding: 48rpx 0;
	display: flex;
	align-items: center;
	justify-content: center;
	border-bottom: 1rpx solid #F0F0F0;
}

.stat-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	flex: 1;
}

.stat-number {
	font-size: 48rpx;
	font-weight: 600;
	color: #000000;
	margin-bottom: 8rpx;
	letter-spacing: 1rpx;
}

.stat-label {
	font-size: 24rpx;
	color: #999999;
	font-weight: 400;
}

.stat-divider {
	width: 1rpx;
	height: 60rpx;
	background-color: #E5E5E5;
}

/* 功能菜单 */
.menu-section {
	background-color: #FFFFFF;
	margin-top: 24rpx;
	padding: 16rpx 0;
}

.menu-item {
	display: flex;
	align-items: center;
	padding: 32rpx 48rpx;
	transition: background-color 0.3s ease;
}

.menu-item:active {
	background-color: #FAFAFA;
}

.menu-icon-wrapper {
	width: 64rpx;
	height: 64rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #F5F5F5;
	border-radius: 12rpx;
	margin-right: 24rpx;
}

.menu-text {
	flex: 1;
	font-size: 30rpx;
	color: #000000;
	font-weight: 400;
	letter-spacing: 0.5rpx;
}
</style>