<template>
	<svg class="svg-icon" aria-hidden="true">
		<use :xlink:href="icon"></use>
	</svg>
</template>

<script setup>
import { defineProps,computed } from 'vue'
 const props=	defineProps({    
		icon: {
			type: String,
			required: true
		}
	})
 const iconName=	computed(()=>{
		return `#icon-${props-icon}`
	})
</script>

<style lang="scss" scoped>
.svg-icon{
	width: 1px;
	height: 1px;
	vertical-align: -0.15rem;
	fill: currentColor;
	overflow: hidden;
}
</style>
