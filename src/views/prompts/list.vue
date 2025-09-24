<template>
  <div class="app-container">
    <el-form :inline="true" :model="query" @submit.prevent>
      <el-form-item label="Chatbot">
        <el-input v-model="query.chatbot_id" placeholder="Chatbot ID" clearable />
      </el-form-item>
      <el-form-item label="Type">
        <el-input v-model="query.type" placeholder="Type" clearable />
      </el-form-item>
      <el-form-item label="Active">
        <el-select v-model="query.is_active" clearable placeholder="All">
          <el-option label="Yes" :value="true" />
          <el-option label="No" :value="false" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">Search</el-button>
        <el-button @click="onReset">Reset</el-button>
      </el-form-item>
      <el-form-item>
        <router-link to="/prompts/create">
          <el-button type="success">New</el-button>
        </router-link>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="rows" border fit>
      <el-table-column prop="prompt_id" label="ID" width="220" />
      <el-table-column prop="chatbot_id" label="Chatbot" width="220" />
      <el-table-column prop="type" label="Type" width="120" />
      <el-table-column prop="version" label="Version" width="100" />
      <el-table-column prop="is_active" label="Active" width="100">
        <template #default="{ row }">
          <el-tag :type="row.is_active ? 'success' : 'info'">{{ row.is_active ? 'Yes' : 'No' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="prompt_text" label="Text" min-width="300" show-overflow-tooltip />
      <el-table-column align="center" label="Actions" width="200">
        <template #default="{ row }">
          <router-link :to="`/prompts/edit/${row.prompt_id}`">
            <el-button size="small" type="primary">Edit</el-button>
          </router-link>
          <el-button size="small" type="danger" @click="onDelete(row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { fetchList, remove } from '@/api/prompts';

interface PromptRow {
  prompt_id: string;
  chatbot_id: string;
  user_id: string;
  prompt_text: string;
  tokens?: number | null;
  version: string;
  type: string;
  is_active: boolean;
  created_at: string;
}

const rows = ref<PromptRow[]>([]);
const loading = ref<boolean>(false);
const query = reactive<{ chatbot_id?: string; type?: string; is_active?: boolean | null }>({ chatbot_id: '', type: '', is_active: null });

function onSearch() { load(); }
function onReset() { query.chatbot_id = ''; query.type = ''; query.is_active = null; load(); }

async function load() {
  loading.value = true;
  try {
    const res = await fetchList({ chatbot_id: query.chatbot_id || undefined, type: query.type || undefined, is_active: query.is_active ?? undefined });
    rows.value = res.data as unknown as PromptRow[];
  } finally { loading.value = false; }
}

async function onDelete(row: PromptRow) {
  try {
    await ElMessageBox.confirm('Confirm delete this prompt?', 'Confirmation', { type: 'warning' });
    await remove(row.prompt_id);
    ElMessage.success('Deleted');
    load();
  } catch {}
}

onMounted(load);
</script>

<style scoped>
</style>


