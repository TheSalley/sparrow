<template>
	<view class="page-container">
		<view class="home-banner">
			<view class="greeting">
				Hello,The Shire
			</view>
			<view class="slogan">
				麻雀虽小，五脏俱全<br>
				极简麻雀
			</view>
			<view class="search-box">
				<uni-icons type="search" size="30" color="#999999"></uni-icons>
				<uni-easyinput v-model="searchValue" placeholder="搜索物品"></uni-easyinput>
			</view>
		</view>
		<view class="content grid grid-cols-2">
			<view class="item-wrapper" v-for="(item, index) in data" :key="index">
				<image class="img" :src="item.coverImg" alt="" />
				<view class="title">{{ item.title }}</view>
			</view>
		</view>
		<custom-tabbar />
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue';
	import uniEasyinput from "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.vue"
	import CustomTabbar from "../../components/custom-tabbar/custom-tabbar.vue"

	const data = ref([]);
	const searchValue = ref("");

	onMounted(async () => {
		const sparrow = uniCloud.importObject('sparrow')
		const res = await sparrow.getData();
		data.value = res.data;
	})
</script>

<style>
	.page-container {
		padding-bottom: 120rpx; /* 为tabbar留出空间 */
		background-color: #FAFAFA;
	}
	
	.home-banner {
		background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
		min-height: 800rpx;
		padding-top: 216rpx;
		padding-bottom: 32rpx;
		padding-inline: 48rpx;
		color: #FFFFFF;
	}

	.greeting {
		font-size: 32rpx;
		color: #CCCCCC;
		font-weight: 400;
		margin-bottom: 24rpx;
		letter-spacing: 1rpx;
	}

	.slogan {
		font-size: 56rpx;
		font-weight: 700;
		margin-top: 16rpx;
		margin-bottom: 48rpx;
		color: #FFFFFF;
		line-height: 1.4;
		letter-spacing: 2rpx;
	}

	.search-box {
		display: flex;
		align-items: center;
		background-color: rgba(255, 255, 255, 0.1);
		border-radius: 24rpx;
		padding: 24rpx 32rpx;
		gap: 16rpx;
		backdrop-filter: blur(10rpx);
	}

	.content {
		padding-inline: 48rpx;
		padding-top: 48rpx;
	}

	.item-wrapper {
		margin-bottom: 32rpx;
		background-color: #FFFFFF;
		border-radius: 16rpx;
		overflow: hidden;
		box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.04);
		transition: all 0.3s ease;
	}

	.item-wrapper:active {
		transform: scale(0.98);
		box-shadow: 0 1rpx 8rpx rgba(0, 0, 0, 0.06);
	}

	.img {
		width: 100%;
		height: 400rpx;
		object-fit: cover;
		background-color: #F5F5F5;
	}

	.title {
		font-size: 28rpx;
		color: #000000;
		padding: 24rpx;
		font-weight: 500;
		letter-spacing: 0.5rpx;
	}
</style>