<template>
  <div class="app-container">
    <el-form :inline="true" :model="query" class="demo-form-inline" @submit.prevent>
      <el-form-item label="Name">
        <el-input v-model="query.name" placeholder="Search by name" clearable />
      </el-form-item>
      <el-form-item label="Status">
        <el-select v-model="query.status" placeholder="All" clearable>
          <el-option label="active" value="active" />
          <el-option label="inactive" value="inactive" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">Search</el-button>
        <el-button @click="onReset">Reset</el-button>
      </el-form-item>
      <el-form-item>
        <router-link to="/chatbots/create">
          <el-button v-permission="['admin']" type="success">New</el-button>
        </router-link>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="rows" border fit style="width: 100%">
      <el-table-column prop="chatbot_id" label="ID" width="220" />
      <el-table-column prop="name" label="Name" min-width="180" />
      <el-table-column prop="chatbot_phone" label="Phone" width="160" />
      <el-table-column prop="type" label="Type" width="120" />
      <el-table-column prop="status" label="Status" width="120">
        <template #default="{ row }">
          <el-tag :type="row.status === 'active' ? 'success' : 'info'">{{ row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Actions" width="200">
        <template #default="{ row }">
          <router-link :to="`/chatbots/edit/${row.chatbot_id}`">
            <el-button type="primary" size="small">Edit</el-button>
          </router-link>
          <el-button v-permission="['admin']" type="danger" size="small" @click="onDelete(row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" v-model:page="query.page" v-model:limit="query.limit" @pagination="load" />
  </div>
  
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import Pagination from '@/components/Pagination';
import { fetchList, remove } from '@/api/chatbots';

interface ChatbotRow {
  chatbot_id: string;
  user_id: string;
  name: string;
  chatbot_phone?: string | null;
  status: string;
  type: string;
  classification_policy: Record<string, unknown>;
  created_at: string;
}

const rows = ref<ChatbotRow[]>([]);
const total = ref<number>(0);
const loading = ref<boolean>(false);
const query = reactive<{ page: number; limit: number; name?: string; status?: string | null }>(
  { page: 1, limit: 20, name: '', status: '' }
);

function onSearch() {
  query.page = 1;
  load();
}

function onReset() {
  query.name = '';
  query.status = '' as unknown as string;
  query.page = 1;
  load();
}

async function load() {
  loading.value = true;
  try {
    const res = await fetchList({ page: query.page, limit: query.limit, name: query.name || undefined, status: query.status || undefined });
    const data = res.data as unknown as ChatbotRow[] | { items: ChatbotRow[]; total: number };
    if (Array.isArray(data)) {
      rows.value = data;
      total.value = data.length;
    } else {
      rows.value = data.items;
      total.value = data.total;
    }
  } finally {
    loading.value = false;
  }
}

async function onDelete(row: ChatbotRow) {
  try {
    await ElMessageBox.confirm('Confirm delete this chatbot?', 'Confirmation', { type: 'warning' });
    await remove(row.chatbot_id);
    ElMessage.success('Deleted');
    load();
  } catch (e) {
    // cancelled or error
  }
}

onMounted(load);
</script>

<style scoped>
</style>


