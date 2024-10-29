<template>
  <div class="settings-wrapper">
    <div class="settings-card">
      <h2 class="settings-title">系统设置</h2>
      
      <div class="setting-item">
        <div class="setting-label">
          <span>媒体库更新</span>
          <span class="setting-description">更新您的媒体文件索引</span>
        </div>
        <button 
          class="update-btn"
          :class="{ 'loading': isUpdating }"
          @click="updateMediaLibrary">
          {{ isUpdating ? '更新中...' : '更新媒体库' }}
        </button>
      </div>

      <div class="setting-divider"></div>

      <div class="setting-item">
        <div class="setting-label">
          <span>HLS 流媒体</span>
          <span class="setting-description">启用 HLS 推流（兼容性更强）</span>
        </div>
        <div class="checkbox-wrapper">
          <input 
            type="checkbox" 
            id="hlsToggle" 
            class="checkbox-input"
            v-model="hlsEnabled"
            @change="toggleHLS"
          >
          <label for="hlsToggle" class="checkbox-label">
            <span class="status-text">{{ hlsEnabled ? '已启用' : '未启用' }}</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const API_BASE_URL = process.env.VUE_APP_API_HOST;

export default {
  data() {
    return {
      hlsEnabled: false,
      isUpdating: false
    };
  },
  async created() {
    // 页面加载时获取HLS状态
    await this.fetchHLSStatus();
  },
  methods: {
    async fetchHLSStatus() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/hls/enabled`);
        const data = await response.json();
        this.hlsEnabled = data.hls_enabled;
      } catch (error) {
        console.error('获取HLS状态失败:', error);
        this.$message.error('获取HLS状态失败');
      }
    },
    
    async updateMediaLibrary() {
      this.isUpdating = true;
      try {
        const response = await fetch(`${API_BASE_URL}/api/bangumi/media_library`, {
          method: 'POST',
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        this.$message.success('媒体库更新成功');
      } catch (error) {
        console.error('更新媒体库失败:', error);
        this.$message.error('更新媒体库失败，请重试');
      } finally {
        this.isUpdating = false;
      }
    },

    async toggleHLS(event) {
      const newStatus = event.target.checked;
      try {
        const response = await fetch(`${API_BASE_URL}/api/hls_enable?enable=${newStatus}`, {
          method: 'PUT',
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        this.$message.success(`HLS ${newStatus ? '启用' : '禁用'}成功`);
      } catch (error) {
        console.error('切换HLS状态失败:', error);
        this.$message.error('切换HLS状态失败');
        // 恢复原来的状态
        this.hlsEnabled = !newStatus;
      }
    }
  },
};
</script>


<style scoped>
.settings-wrapper {
  min-height: 100vh;
  background-color: #1a1a1a;
  padding: 50px 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.settings-card {
  width: 60%;
  max-width: 800px;
  background: #2a2a2a;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.settings-title {
  color: #ffffff;
  font-size: 24px;
  margin-bottom: 30px;
  font-weight: 500;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
}

.setting-label {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.setting-label span:first-child {
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
}

.setting-description {
  color: #888;
  font-size: 14px;
}

.setting-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 0;
}

.update-btn {
  min-width: 120px;
  padding: 10px 20px;
  background-color: #4a90e2;
  border: none;
  border-radius: 6px;
  color: white;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.update-btn:hover {
  background-color: #357abd;
}

.update-btn.loading {
  background-color: #357abd;
  cursor: wait;
}

/* 新增的checkbox相关样式 */
.checkbox-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.checkbox-input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkbox-label {
  padding: 10px 20px;
  background-color: #3a3a3a;
  border-radius: 6px;
  color: white;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
  display: inline-block;
  user-select: none;
}

.checkbox-input:checked + .checkbox-label {
  background-color: #4a90e2;
}

.checkbox-label:hover {
  background-color: #4a4a4a;
}

.checkbox-input:checked + .checkbox-label:hover {
  background-color: #357abd;
}

/* 响应式设计 */
@media screen and (max-width: 768px) {
  .settings-card {
    width: 90%;
    padding: 20px;
  }
  
  .setting-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .update-btn,
  .checkbox-wrapper {
    align-self: flex-start;
  }
}
</style>