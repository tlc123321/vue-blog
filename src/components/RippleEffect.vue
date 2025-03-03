<template>
  <div class="ripple-container">
    <div v-for="(ripple, index) in ripples" :key="'ripple-' + index"
      class="absolute rounded-full pointer-events-none"
      :style="{
        left: ripple.x + 'px',
        top: ripple.y + 'px',
        width: ripple.size + 'px',
        height: ripple.size + 'px',
        opacity: ripple.opacity,
        transform: 'translate(-50%, -50%)',
        borderColor: 'rgba(255, 105, 180, 0.8)'
      }">
    </div>
  </div>
</template>

<script setup>
import { reactive, toRefs, onMounted, onBeforeUnmount } from 'vue';

const state = reactive({
  lastRippleTime: 0,
  rippleEnabled: true,
  ripples: [],
});

const { lastRippleTime, rippleEnabled, ripples } = toRefs(state);

const createRipple = (e) => {
  if (!rippleEnabled.value) return;
  const now = Date.now();
  if (now - lastRippleTime.value < 100) return;
  lastRippleTime.value = now;

  const ripple = {
    x: e.clientX,
    y: e.clientY,
    size: 0,
    opacity: 0.8,
    maxSize: 100,
  };
  ripples.value.push(ripple);
};

const updateRipples = () => {
  ripples.value = ripples.value.filter(ripple => {
    ripple.size += 4;
    ripple.opacity -= 0.02;
    return ripple.opacity > 0;
  });
};

const animate = () => {
  updateRipples();
  requestAnimationFrame(animate);
};

const handleToggleRipple = (event) => {
  rippleEnabled.value = event.detail;
};

onMounted(() => {
  window.addEventListener('click', createRipple);
  window.addEventListener('toggleRipple', handleToggleRipple);
  requestAnimationFrame(animate);
});

onBeforeUnmount(() => {
  window.removeEventListener('click', createRipple);
  window.removeEventListener('toggleRipple', handleToggleRipple);
});
</script>

<style scoped>
.ripple-container {
  position: fixed; /* 确保水波纹不影响页面布局 */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; /* 确保水波纹不影响其他交互 */
  overflow: hidden; /* 确保不会出现滚动条 */
  z-index: 9999; /* 提高层级，确保在所有元素之上 */
}

.absolute {
  position: absolute;
  border-width: 2px;
}
</style> 