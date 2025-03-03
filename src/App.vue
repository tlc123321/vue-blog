<template>
  <div id="app">
    <SakuraEffect />
    <RippleEffect />
    <ControlPanel />
    <router-view />
  </div>
</template>

<script setup>
import RippleEffect from './components/RippleEffect.vue';
import ControlPanel from './components/ControlPanel.vue';
import SakuraEffect from './components/SakuraEffect.vue';
</script>

<style>
/* 其他全局样式 */
</style> 