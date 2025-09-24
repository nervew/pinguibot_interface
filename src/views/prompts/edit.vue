<template>
  <div class="app-container">
    <el-card>
      <template #header>
        <div class="card-header">Edit Prompt</div>
      </template>
      <Form v-model="model" @submit="onSubmit" @cancel="onCancel" />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Form, { PromptFormModel } from './components/Form.vue';
import { fetchOne, update } from '@/api/prompts';

const route = useRoute();
const router = useRouter();
const id = route.params.id as string;
const model = reactive<PromptFormModel>({ chatbot_id: '', prompt_text: '', type: '', version: 'v1', is_active: true });

async function load() {
  const res = await fetchOne(id);
  const data = res.data;
  model.chatbot_id = data.chatbot_id;
  model.prompt_text = data.prompt_text;
  model.type = data.type;
  model.version = data.version;
  model.is_active = data.is_active;
}

async function onSubmit() {
  await update(id, { ...model });
  ElMessage.success('Updated');
  router.push('/prompts/list');
}

function onCancel() { router.back(); }

onMounted(load);
</script>

<style scoped>
.card-header { font-weight: 600; }
</style>


