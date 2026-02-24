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
			<category-grid></category-grid>
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
		onMounted,
		nextTick
	} from 'vue';
	import uniEasyinput from "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.vue"
	import CustomTabbar from "../../components/custom-tabbar/custom-tabbar.vue"

	const data = ref([]);
	const searchValue = ref("");

	onMounted(async () => {
		try {
			let sparrow;
			try {
				sparrow = uniCloud.importObject('sparrow');
				console.log('importObject 返回结果:', sparrow);
				console.log('sparrow 类型:', typeof sparrow);
				console.log('sparrow 是否为 null:', sparrow === null);
				console.log('sparrow 是否为 undefined:', sparrow === undefined);
			} catch (importError) {
				console.error('导入云对象时出错:', importError);
				return;
			}
			
			// 检查 sparrow 对象是否存在
			if (!sparrow) {
				console.error('sparrow 云对象未找到，请检查：');
				console.error('1. 云对象是否已上传部署（在 HBuilderX 中右键 sparrow 云对象 -> 上传部署）');
				console.error('2. 云对象路径是否正确 (uniCloud-alipay/cloudfunctions/sparrow/index.obj.js)');
				console.error('3. 当前运行环境是否支持该云服务空间');
				console.error('4. 在 HBuilderX 中：运行 -> 运行到浏览器 -> 选择正确的云服务空间');
				
				// #ifdef H5
				console.warn('H5 环境排查步骤：');
				console.warn('1. 在 HBuilderX 中，点击"运行" -> "运行到浏览器"');
				console.warn('2. 在弹出的云服务空间选择窗口中，选择正确的云服务空间');
				console.warn('3. 确保云对象已上传部署（右键云对象文件夹 -> 上传部署）');
				console.warn('4. 如果还是不行，尝试重新关联云服务空间');
				// #endif
				return;
			}
			
			// 检查 getData 方法是否存在
			console.log('sparrow 对象的方法:', Object.keys(sparrow));
			if (typeof sparrow.getData !== 'function') {
				console.error('sparrow.getData 方法不存在');
				console.error('可用的方法:', Object.keys(sparrow));
				return;
			}
			
			console.log('开始调用 getData...');
			const res = await sparrow.getData();
			console.log('getData 返回结果:', res);
			
			// 处理返回值，支持不同的返回格式
			if (res) {
				// 如果返回格式是 { code: 200, data: [...] }
				if (res.data && Array.isArray(res.data)) {
					data.value = res.data;
					console.log('数据加载成功，共', res.data.length, '条');
				}
				// 如果返回格式是 { errCode: 0, data: [...] }
				else if (res.errCode === 0 && res.data) {
					data.value = res.data;
					console.log('数据加载成功，共', res.data.length, '条');
				}
				// 如果直接返回数组
				else if (Array.isArray(res)) {
					data.value = res;
					console.log('数据加载成功，共', res.length, '条');
				}
				else {
					console.warn('获取数据为空或格式不正确:', res);
				}
			} else {
				console.warn('获取数据为空');
			}
		} catch (error) {
			console.error('获取数据失败:', error);
			console.error('错误详情:', error.message);
			if (error.stack) {
				console.error('错误堆栈:', error.stack);
			}
		}
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
		gap: 32rpx;
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
		/* height: 400rpx; */
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