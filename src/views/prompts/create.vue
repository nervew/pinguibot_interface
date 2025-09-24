<template>
  <div class="app-container">
    <el-card>
      <template #header>
        <div class="card-header">Create Prompt</div>
      </template>
      <Form v-model="model" @submit="onSubmit" @cancel="onCancel" />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import Form, { PromptFormModel } from './components/Form.vue';
import { create } from '@/api/prompts';
import { useRouter } from 'vue-router';

const router = useRouter();
const model = reactive<PromptFormModel>({ chatbot_id: '', prompt_text: '', type: '', version: 'v1', is_active: true });

async function onSubmit() {
  await create({ ...model });
  ElMessage.success('Created');
  router.push('/prompts/list');
}

function onCancel() { router.back(); }
</script>

<style scoped>
.card-header { font-weight: 600; }
</style>


