<template>
	<view class="page-container">
		<!-- 顶部品牌区域 -->
		<view class="brand-section">
			<view class="brand-icon">
				<uni-icons type="person-filled" size="56" color="#FFFFFF"></uni-icons>
			</view>
			<text class="brand-title">极简麻雀</text>
			<text class="brand-desc">欢迎回来</text>
		</view>

		<!-- 登录表单 -->
		<view class="form-section">
			<view class="input-group">
				<view class="input-item">
					<uni-icons type="person" size="22" color="#999999"></uni-icons>
					<input
						class="input-field"
						v-model="account"
						type="text"
						placeholder="请输入账号/邮箱"
						placeholder-class="placeholder-style"
						maxlength="50"
					/>
				</view>
				<view class="input-item">
					<uni-icons type="locked" size="22" color="#999999"></uni-icons>
					<input
						class="input-field"
						v-model="password"
						:type="showPassword ? 'text' : 'password'"
						placeholder="请输入密码"
						placeholder-class="placeholder-style"
						maxlength="32"
					/>
					<view class="eye-icon" @click="togglePassword">
						<uni-icons :type="showPassword ? 'eye' : 'eye-slash'" size="22" color="#999999"></uni-icons>
					</view>
				</view>
			</view>

			<!-- 登录按钮 -->
			<button
				class="login-btn"
				:class="{ 'btn-disabled': !canLogin }"
				:disabled="!canLogin || loading"
				@click="handleLogin"
			>
				<text v-if="!loading">登 录</text>
				<text v-else>登录中...</text>
			</button>

			<!-- 辅助操作 -->
			<view class="action-row">
				<text class="action-link" @click="goRegister">注册账号</text>
				<text class="action-link" @click="goForgotPassword">忘记密码</text>
			</view>
		</view>

		<!-- 底部提示 -->
		<view class="footer-tip">
			<text class="tip-text">登录即表示同意</text>
			<text class="tip-link" @click="goTerms">《用户协议》</text>
			<text class="tip-text">与</text>
			<text class="tip-link" @click="goPrivacy">《隐私政策》</text>
		</view>
	</view>
</template>

<script setup>
import { ref, computed } from 'vue'

const account = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)

const canLogin = computed(() => {
	return account.value.trim().length > 0 && password.value.length > 0
})

const togglePassword = () => {
	showPassword.value = !showPassword.value
}

const handleLogin = async () => {
	if (!canLogin.value || loading.value) return

	loading.value = true
	try {
		// TODO: 对接真实登录接口
		// const res = await uniCloud.importObject('sparrow').login({
		//   account: account.value.trim(),
		//   password: password.value
		// })
		// 模拟登录
		await new Promise(resolve => setTimeout(resolve, 800))

		uni.showToast({
			title: '登录成功',
			icon: 'success'
		})

		// 返回上一页
		setTimeout(() => {
			uni.navigateBack()
		}, 300)
	} catch (err) {
		uni.showToast({
			title: err.message || '登录失败，请重试',
			icon: 'none'
		})
	} finally {
		loading.value = false
	}
}

const goRegister = () => {
	// TODO: 跳转注册页
	uni.showToast({
		title: '注册功能开发中',
		icon: 'none'
	})
}

const goForgotPassword = () => {
	// TODO: 跳转忘记密码页
	uni.showToast({
		title: '功能开发中',
		icon: 'none'
	})
}

const goTerms = () => {
	console.log('跳转用户协议')
}

const goPrivacy = () => {
	console.log('跳转隐私政策')
}
</script>

<style scoped>
.page-container {
	min-height: 100vh;
	background-color: #FAFAFA;
	display: flex;
	flex-direction: column;
}

/* ===== 顶部品牌区域 ===== */
.brand-section {
	background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
	padding: 160rpx 48rpx 80rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.brand-icon {
	width: 120rpx;
	height: 120rpx;
	border-radius: 60rpx;
	background-color: rgba(255, 255, 255, 0.1);
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 32rpx;
	backdrop-filter: blur(10rpx);
}

.brand-title {
	font-size: 44rpx;
	font-weight: 700;
	color: #FFFFFF;
	letter-spacing: 4rpx;
	margin-bottom: 16rpx;
}

.brand-desc {
	font-size: 28rpx;
	color: rgba(255, 255, 255, 0.6);
	font-weight: 300;
	letter-spacing: 1rpx;
}

/* ===== 登录表单 ===== */
.form-section {
	background-color: #FFFFFF;
	margin: -40rpx 32rpx 0;
	border-radius: 24rpx;
	padding: 48rpx 40rpx;
	box-shadow: 0 4rpx 24rpx rgba(0, 0, 0, 0.04);
	z-index: 1;
}

.input-group {
	margin-bottom: 48rpx;
}

.input-item {
	display: flex;
	align-items: center;
	padding: 28rpx 0;
	border-bottom: 1rpx solid #F0F0F0;
	gap: 20rpx;
}

.input-item:first-child {
	border-bottom: 1rpx solid #F0F0F0;
}

.input-field {
	flex: 1;
	font-size: 30rpx;
	color: #000000;
	height: 48rpx;
	line-height: 48rpx;
	background: transparent;
}

.placeholder-style {
	color: #C0C0C0;
	font-size: 30rpx;
	font-weight: 300;
}

.eye-icon {
	padding: 8rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

/* ===== 登录按钮 ===== */
.login-btn {
	width: 100%;
	height: 96rpx;
	line-height: 96rpx;
	text-align: center;
	background-color: #000000;
	color: #FFFFFF;
	font-size: 32rpx;
	font-weight: 600;
	border-radius: 48rpx;
	border: none;
	letter-spacing: 6rpx;
	transition: all 0.3s ease;
	padding: 0;
}

.login-btn:active {
	background-color: #333333;
	transform: scale(0.98);
}

.login-btn.btn-disabled {
	background-color: #D0D0D0;
	color: rgba(255, 255, 255, 0.6);
}

/* ===== 辅助操作 ===== */
.action-row {
	display: flex;
	justify-content: space-between;
	margin-top: 36rpx;
}

.action-link {
	font-size: 26rpx;
	color: #999999;
	font-weight: 300;
	letter-spacing: 0.5rpx;
	padding: 8rpx 0;
}

.action-link:active {
	color: #000000;
}

/* ===== 底部提示 ===== */
.footer-tip {
	position: fixed;
	bottom: 80rpx;
	left: 0;
	right: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 4rpx;
}

.tip-text {
	font-size: 22rpx;
	color: #C0C0C0;
	font-weight: 300;
}

.tip-link {
	font-size: 22rpx;
	color: #999999;
	font-weight: 400;
	text-decoration: underline;
	text-underline-offset: 2rpx;
}

.tip-link:active {
	color: #000000;
}
</style>
