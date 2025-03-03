<template>
  <div class="control-panel">
    <el-dropdown trigger="click" @command="handleCommand">
      <button class="control-button" type="button">
        ⚙️
      </button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="toggleSakura">
            <div class="switch-container">
              <span>樱花下落：</span>
              <el-switch
                v-model="isSakuraEnabled"
                @change="toggleSakura"
              />
            </div>
          </el-dropdown-item>
          <el-dropdown-item command="toggleRipple">
            <div class="switch-container">
              <span>水波效果：</span>
              <el-switch
                v-model="isRippleEnabled"
                @change="toggleRipple"
              />
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { reactive, toRefs } from 'vue';
import { ElDropdown, ElDropdownMenu, ElDropdownItem, ElSwitch } from 'element-plus';

const state = reactive({
  isSakuraEnabled: true,
  isRippleEnabled: true,
});

const { isSakuraEnabled, isRippleEnabled } = toRefs(state);

const toggleSakura = () => {
  const event = new CustomEvent('toggleSakura', { detail: isSakuraEnabled.value });
  window.dispatchEvent(event);
};

const toggleRipple = () => {
  const event = new CustomEvent('toggleRipple', { detail: isRippleEnabled.value });
  window.dispatchEvent(event);
};

const handleCommand = (command) => {
  if (command === 'toggleSakura') {
    toggleSakura();
  } else if (command === 'toggleRipple') {
    toggleRipple();
  }
};
</script>

<style scoped>
.control-panel {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1100;
}

.control-button {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: white;
  color: black;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.switch-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 150px;
}
</style> 