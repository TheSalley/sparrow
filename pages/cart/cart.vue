<template>
	<view class="page-container">
		<view class="cart">
			<view class="header">
				<text class="title">购物车</text>
			</view>
			<view class="content">
				<text>购物车页面内容</text>
			</view>
		</view>
		<custom-tabbar />
	</view>
</template>

<script setup>
import CustomTabbar from "../../components/custom-tabbar/custom-tabbar.vue"
// 购物车页面逻辑
</script>

<style scoped>
.page-container {
	padding-bottom: 120rpx; /* 为tabbar留出空间 */
}

.cart {
	padding: 20rpx;
}

.header {
	text-align: center;
	margin-bottom: 40rpx;
}

.title {
	font-size: 36rpx;
	font-weight: bold;
}

.content {
	text-align: center;
	color: #666;
}
</style>