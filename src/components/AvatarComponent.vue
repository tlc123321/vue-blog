<template>
  <div class="flex flex-col items-center space-y-3 relative">
    <div class="avatar-container" @mouseover="showControl = true" @mouseleave="showControl = false" @click="toggleMusic">
      <div class="avatar-background" :class="{ 'darken': showControl }"></div>
      <el-avatar :size="128" :src="avatarUrl" :style="{ transform: avatarTransform }" class="shadow-lg elevated-avatar" />
      <div v-if="showControl" class="control-overlay">
        <img :src="isPlaying ? playIcon : pauseIcon" alt="Control Icon" class="control-icon" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch, reactive, toRefs, computed } from 'vue';
import { useMusicStore } from '@/stores/musicStore';
import pauseIcon from '@/assets/pause.png';
import playIcon from '@/assets/play.png';

const props = defineProps({
  avatarUrl: {
    type: String,
    required: true
  }
});

// 定义组件的本地状态
const state = reactive({
  showControl: false, // 控制按钮的显示状态
  avatarTransform: 'rotate(0deg)', // 头像的旋转角度
});

const { showControl, avatarTransform } = toRefs(state);

let rotationInterval = null; // 用于存储旋转动画的定时器
let angle = 0; // 当前旋转角度

const musicStore = useMusicStore();

// 计算属性，用于获取音乐播放状态
const isPlaying = computed(() => musicStore.isMusicPlaying);

// 创建音频对象
const audio = new Audio('http://music.163.com/song/media/outer/url?id=2097486090.mp3'); // 替换为您的音乐文件路径

// 监听音频播放结束事件，自动重新播放
audio.addEventListener('ended', () => {
  if (musicStore.isMusicPlaying) {
    audio.currentTime = 0; // 重置播放时间
    audio.play(); // 重新播放
  }
});

// 开始旋转动画
const startRotation = () => {
  rotationInterval = setInterval(() => {
    angle = (angle + 1) % 360; // 每次增加1度，达到360度后重置
    avatarTransform.value = `rotate(${angle}deg)`;
  }, 50); // 每50毫秒更新一次
};

// 停止旋转动画
const stopRotation = () => {
  clearInterval(rotationInterval);
  rotationInterval = null;
};

// 切换音乐播放状态
const toggleMusic = () => {
  musicStore.toggleMusic();
  if (musicStore.isMusicPlaying) {
    audio.play();
  } else {
    audio.pause();
  }
};

// 监听音乐播放状态的变化，控制旋转动画的开始和停止
watch(() => musicStore.isMusicPlaying, (newVal) => {
  if (newVal) {
    startRotation();
    console.log('播放音乐');
  } else {
    stopRotation();
    console.log('暂停音乐');
  }
});
</script>

<style scoped>
.shadow-lg {
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
}

.elevated-avatar {
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.5);
  background: linear-gradient(145deg, #ffffff, #e6e6e6);
  border-radius: 50%;
}

.avatar-container {
  position: relative;
  display: inline-block;
  width: 128px;
  height: 128px;
}

.avatar-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transition: background-color 0.3s ease;
  z-index: 10;
}

.darken {
  background-color: rgba(0, 0, 0, 0.2);
}

.control-overlay {
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 128px;
  height: 128px;
  z-index: 1;
}

.control-icon {
  width: 24px;
  height: 24px;
}
</style> 