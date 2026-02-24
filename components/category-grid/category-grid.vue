<template>
	<view class="category-grid">
		<view 
			class="category-item" 
			v-for="(item, index) in categories" 
			:key="index"
			@click="handleCategoryClick(item)"
		>
			<view class="category-icon">
				<image 
					v-if="item.icon" 
					class="icon-image" 
					:src="item.icon" 
					mode="aspectFit"
				></image>
				<view v-else class="icon-placeholder">
					<uni-icons :type="item.iconType || 'grid'" size="40" color="#FF6B35"></uni-icons>
				</view>
			</view>
			<text class="category-text">{{ item.title }}</text>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'

const categories = ref([])

// 获取分类数据
const fetchCategories = async () => {
	try {
		let sparrow = uniCloud.importObject('sparrow');
		// 调用获取分类的方法
		const res = await sparrow.getCategories();
		if (res && res.data && res.data.length > 0) {
			// 只取前5个，如果不足5个则补充"更多"
			const categoryList = res.data.slice(0, 4);
			if (categoryList.length < 5) {
				categoryList.push({
					title: '更多',
					icon: '',
					iconType: 'grid'
				});
			}
			categories.value = categoryList;
		}
	} catch (error) {
		console.error('获取分类失败:', error);
	}
}

const handleCategoryClick = (item) => {
	console.log('点击分类:', item);
	// 可以触发事件或跳转
	// this.$emit('category-click', item);
}

onMounted(() => {
	fetchCategories();
})
</script>

<style scoped>
.category-grid {
	display: flex;
	align-items: center;
	justify-content: space-around;
	padding: 48rpx 24rpx;
	position: relative;
	overflow: hidden;
}

.category-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	flex: 1;
	position: relative;
	z-index: 1;
	transition: transform 0.2s ease;
	padding: 0 8rpx;
}

.category-icon {
	width: 100rpx;
	height: 100rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 20rpx;
	position: relative;
}

.icon-image {
	width: 100%;
	height: 100%;
	object-fit: contain;
}

.icon-placeholder {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}

.category-text {
	font-size: 24rpx;
	color: #FFFFFF;
	font-weight: 400;
	letter-spacing: 0.5rpx;
	text-align: center;
	line-height: 1.4;
}
</style>