<template>
  <div class="app-container">
    <el-card>
      <template #header>
        <div class="card-header">Create Chatbot</div>
      </template>
      <Form v-model="model" @submit="onSubmit" @cancel="onCancel" />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import Form, { ChatbotFormModel } from './components/Form.vue';
import { create } from '@/api/chatbots';
import { useRouter } from 'vue-router';

const router = useRouter();
const model = reactive<ChatbotFormModel>({ name: '', chatbot_phone: '', type: 'general', classification_policy: {} });

async function onSubmit() {
  await create({ name: model.name, chatbot_phone: model.chatbot_phone, type: model.type, classification_policy: model.classification_policy || {} });
  ElMessage.success('Created');
  router.push('/chatbots/list');
}

function onCancel() {
  router.back();
}
</script>

<style scoped>
.card-header { font-weight: 600; }
</style>


