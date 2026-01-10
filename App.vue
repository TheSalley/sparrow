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
	/*每个页面公共css */
	body {
		font-family: 'Inter';
	}
</style>
