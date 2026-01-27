<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	@import url(./static/tw.css);
	@font-face {
		font-family: 'Inter';
		src: url('./static/fonts/Inter.otf');
	}
	
	/* 全局样式 - 极简黑灰风格 */
	page {
		font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
		background-color: #FAFAFA;
		color: #000000;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
	
	/* 重置默认样式 */
	* {
		box-sizing: border-box;
	}
	
	/* 统一滚动条样式 */
	::-webkit-scrollbar {
		width: 0;
		background: transparent;
	}
</style>
