<template>
	<view class="page-container">
		<view class="home-banner">
			<view class="">
				Hello,The Shire
			</view>
			<view class="slogan">
				麻雀虽小，五脏俱全<br>
				极简麻雀
			</view>
			<view class="search-box">
				<uni-icons type="contact" size="30"></uni-icons>

				<uni-easyinput v-model="searchValue" placeholder="搜索物品"></uni-easyinput>
			</view>
		</view>
		<view class="content grid grid-cols-2">
			<view class="" v-for="(item, index) in data" :key="index">
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
	}
	
	.home-banner {
		background: url('https://env-00jxty3w49y3.normal.cloudstatic.cn/sparrow/Ornament%20%282%29.webp') no-repeat;
		background-size: cover;
		min-height: 800rpx;
		padding-top: 216rpx;
		padding-bottom: 32rpx;
		padding-inline: 48rpx;
		color: #FFF;
	}

	.content {
		padding-inline: 48rpx;
	}

	.img {
		width: 100%;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}

	.slogan {
		font-size: 56rpx;
		font-weight: 700;
		margin-top: 16rpx;
	}
</style>