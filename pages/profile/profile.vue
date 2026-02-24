<template>
	<view class="page-container">
		<!-- 顶部深色背景区域 -->
		<view class="home-banner">
			<view class="header-title">我的</view>
			<!-- 个人资料区域 -->
			<view class="profile-section">
				<view class="avatar-container">
					<image class="avatar" src="/static/logo.png" mode="aspectFill"></image>
					<view class="avatar-edit">
						<uni-icons type="camera" size="20" color="#FFFFFF"></uni-icons>
					</view>
				</view>
				<text class="username">TheShire</text>
				<text class="email">theshire7@qq.com</text>
			</view>
		</view>



		<!-- 主要内容区域 - 白色卡片 -->
		<view class="content-card">
			<!-- 账户部分 -->
			<view class="section">
				<view class="section-title">账户</view>
				<view class="menu-item" v-for="(item, index) in accountMenu" :key="index"
					@click="handleMenuClick(item)">
					<view class="menu-icon">
						<uni-icons :type="item.icon" size="22" :color="item.color"></uni-icons>
					</view>
					<view class="menu-content">
						<text class="menu-title">{{ item.title }}</text>
						<text class="menu-desc">{{ item.desc }}</text>
					</view>
					<uni-icons type="right" size="18" color="#CCCCCC"></uni-icons>
				</view>
			</view>

			<!-- 更多部分 -->
			<!-- <view class="section">
				<view class="section-title">更多</view>
				<view class="menu-item" v-for="(item, index) in moreMenu" :key="index" @click="handleMenuClick(item)"
					:class="{ 'logout-item': item.isLogout }">
					<view class="menu-icon">
						<uni-icons :type="item.icon" size="22" :color="item.color"></uni-icons>
					</view>
					<view class="menu-content">
						<text class="menu-title" :class="{ 'logout-text': item.isLogout }">{{ item.title }}</text>
						<text class="menu-desc" v-if="item.desc">{{ item.desc }}</text>
					</view>
					<uni-icons type="right" size="18" :color="item.isLogout ? '#FF3B30' : '#CCCCCC'"></uni-icons>
				</view>
			</view> -->
		</view>

		<custom-tabbar />
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	import CustomTabbar from "../../components/custom-tabbar/custom-tabbar.vue"

	// 账户菜单
	const accountMenu = ref([{
			title: '个人信息',
			desc: '姓名、电子邮件地址、电话号码...',
			icon: 'person',
			color: '#000000'
		},
		{
			title: '账号密码',
			desc: '••••••••••',
			icon: 'locked-filled',
			color: '#000000'
		},
		{
			title: '银行卡',
			desc: '银行卡、信用卡',
			icon: 'location',
			color: '#000000'
		}
	])

	// 更多菜单
	const moreMenu = ref([{
			title: '帮助中心',
			desc: '有什么问题请联系客服处理',
			icon: 'chatbubble-filled',
			color: '#000000'
		},
		{
			title: '条款和条件',
			desc: '我们的服务',
			icon: 'info-filled',
			color: '#000000'
		},
		{
			title: '退出登录',
			desc: '',
			icon: 'closeempty',
			color: '#FF3B30',
			isLogout: true
		}
	])

	const handleMenuClick = (item) => {
		console.log('点击菜单:', item)
		if (item.isLogout) {
			uni.showModal({
				title: '提示',
				content: '确定要退出登录吗？',
				success: (res) => {
					if (res.confirm) {
						console.log('退出登录')
						// 这里可以添加退出登录的逻辑
					}
				}
			})
		}
	}
</script>

<style scoped>
	.page-container {
		min-height: 100vh;
		background-color: #FAFAFA;
		padding-bottom: 140rpx;
	}

	.home-banner {
		background: url("/static/Ornament.png") no-repeat center/cover;
		min-height: 800rpx;
		padding-top: 80rpx;
		padding-inline: 48rpx;
		color: #FFFFFF;
	}

	.header-title {
		font-size: 40rpx;
		font-weight: 700;
		color: #FFFFFF;
		text-align: center;
	}

	/* 个人资料区域 */
	.profile-section {
		margin-top: 32rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
	}

	.avatar-container {
		position: relative;
		margin-bottom: 32rpx;
	}

	.avatar {
		width: 160rpx;
		height: 160rpx;
		border-radius: 80rpx;
		border: 4rpx solid #FFFFFF;
		background-color: #F5F5F5;
	}

	.avatar-edit {
		position: absolute;
		bottom: 0;
		right: 0;
		width: 48rpx;
		height: 48rpx;
		border-radius: 24rpx;
		background-color: #FF9500;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 3rpx solid #FFFFFF;
	}

	.username {
		font-size: 40rpx;
		font-weight: 600;
		color: #FFFFFF;
		margin-bottom: 12rpx;
		letter-spacing: 1rpx;
	}

	.email {
		font-size: 28rpx;
		color: rgba(255, 255, 255, 0.8);
		font-weight: 400;
		letter-spacing: 0.5rpx;
	}

	/* 主要内容卡片 */
	.content-card {
		background-color: #FFFFFF;
		margin: -280rpx 48rpx 0;
		border-radius: 36rpx;
		padding: 48rpx 0;
		box-shadow: 0px 16px 70px  rgba(8, 16, 31, 0.04);
	}

	.section {
		margin-bottom: 48rpx;
	}

	.section:last-child {
		margin-bottom: 0;
	}

	.section-title {
		font-size: 32rpx;
		font-weight: 600;
		color: #000000;
		padding: 0 48rpx 24rpx;
		letter-spacing: 1rpx;
	}

	.menu-item {
		display: flex;
		align-items: center;
		padding: 32rpx 48rpx;
		transition: background-color 0.2s ease;
	}

	.menu-item:active {
		background-color: #FAFAFA;
	}

	.menu-item.logout-item:active {
		background-color: #FFF5F5;
	}

	.menu-icon {
		width: 48rpx;
		height: 48rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 24rpx;
	}

	.menu-content {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.menu-title {
		font-size: 30rpx;
		color: #000000;
		font-weight: 500;
		margin-bottom: 8rpx;
		letter-spacing: 0.5rpx;
	}

	.menu-title.logout-text {
		color: #FF3B30;
	}

	.menu-desc {
		font-size: 24rpx;
		color: #999999;
		font-weight: 400;
		line-height: 1.4;
		letter-spacing: 0.5rpx;
	}
</style>