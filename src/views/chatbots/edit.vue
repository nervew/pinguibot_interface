<template>
  <div class="app-container">
    <el-card>
      <template #header>
        <div class="card-header">Edit Chatbot</div>
      </template>
      <Form v-model="model" @submit="onSubmit" @cancel="onCancel" />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Form, { ChatbotFormModel } from './components/Form.vue';
import { fetchOne, update } from '@/api/chatbots';

const route = useRoute();
const router = useRouter();
const id = route.params.id as string;
const model = reactive<ChatbotFormModel>({ name: '', chatbot_phone: '', type: 'general', classification_policy: {} });

async function load() {
  const res = await fetchOne(id);
  const data = res.data;
  model.name = data.name;
  model.chatbot_phone = data.chatbot_phone;
  model.type = data.type;
  model.classification_policy = data.classification_policy || {};
}

async function onSubmit() {
  await update(id, { name: model.name, chatbot_phone: model.chatbot_phone, type: model.type, classification_policy: model.classification_policy || {} });
  ElMessage.success('Updated');
  router.push('/chatbots/list');
}

function onCancel() {
  router.back();
}

onMounted(load);
</script>

<style scoped>
.card-header { font-weight: 600; }
</style>


