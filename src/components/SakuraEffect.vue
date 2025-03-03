<template>
  <div v-if="state.isSakuraEnabled" class="sakura-container" @mousemove="handleMouseMove">
    <div v-for="(sakura, index) in sakuras" :key="'sakura-' + index" class="absolute pointer-events-none"
      :style="{
        left: sakura.x + 'px',
        top: sakura.y + 'px',
        transform: `rotate(${sakura.angle}deg)`,
        opacity: sakura.opacity
      }">
      <el-icon class="text-pink-300" :style="{ fontSize: sakura.size + 'px' }">
        <Cherry />
      </el-icon>
    </div>
  </div>
</template>

<script setup>
import { reactive, toRefs, onMounted, onBeforeUnmount } from 'vue';
import { Cherry } from '@element-plus/icons-vue';


const state = reactive({
  isSakuraEnabled: true,
  sakuras: [],
});

const { isSakuraEnabled, sakuras } = toRefs(state);

const createSakura = (x) => {
  const sakura = {
    x,
    y: -10,
    size: Math.random() * 15 + 10,
    angle: Math.random() * 360,
    speed: Math.random() * 2 + 1,
    opacity: 0.7,
  };
  sakuras.value.push(sakura);
};

const updateSakuras = () => {
  sakuras.value = sakuras.value.filter(sakura => {
    sakura.y += sakura.speed;
    sakura.x += Math.sin(sakura.angle) * 0.5;
    sakura.angle += 0.02;
    sakura.opacity -= 0.002;
    return sakura.y < window.innerHeight && sakura.opacity > 0;
  });
};

const handleMouseMove = (e) => {
  if (Math.random() < 0.1) {
    createSakura(e.clientX);
  }
};

const animate = () => {
  updateSakuras();
  requestAnimationFrame(animate);
};

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove);
  requestAnimationFrame(animate);

  window.addEventListener('toggleSakura', (event) => {
    isSakuraEnabled.value = event.detail;
  });
});

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', handleMouseMove);
  window.removeEventListener('toggleSakura', (event) => {
    isSakuraEnabled.value = event.detail;
  });
});
</script>

<style scoped>
.sakura-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  z-index: 1000;
}
</style> 