<template>
	<div id="app-header-box">
		通用页头
	</div>
</template>
<script>
	export default {
		// 这是该组件的自定义名称，
		// 之后引用组件时就会用到这个名称。
		name: 'pc-header',
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