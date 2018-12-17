<template>
	<div id="app-footer-box">
		通用页脚
	</div>
</template>
<script>
	export default {
		// 这是该组件的自定义名称，
		// 之后引用组件时就会用到这个名称。
		name: 'pc-footer',
		props: ['userDataProps'],
		data() {
			return {
				userdata: '',
			}
		},
		methods: {
		},
		mounted: function() {
		},
	}
</script>
<style>

</style>