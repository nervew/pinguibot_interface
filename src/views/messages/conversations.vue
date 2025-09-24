<template>
  <div class="app-container">
    <el-form :inline="true" :model="query" @submit.prevent>
      <el-form-item label="Chatbot">
        <el-input v-model="query.chatbot_id" placeholder="Chatbot ID" clearable />
      </el-form-item>
      <el-form-item label="Status">
        <el-input v-model="query.status" placeholder="Status" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="load">Search</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="rows" border fit @row-click="goDetail">
      <el-table-column prop="conversation_id" label="ID" width="220" />
      <el-table-column prop="chatbot_id" label="Chatbot" width="200" />
      <el-table-column prop="client_id" label="Client" width="200" />
      <el-table-column prop="status" label="Status" width="120" />
      <el-table-column prop="created_at" label="Created" width="180" />
      <el-table-column prop="chatbot_name" label="Chatbot Name" min-width="180" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { fetchConversations } from '@/api/messages';

interface ConversationRow {
  conversation_id: string;
  user_id: string;
  chatbot_id: string;
  client_id: string;
  tokens: number;
  status: string;
  created_at: string;
  chatbot_name?: string | null;
  client_name?: string | null;
  client_number?: string | null;
}

const router = useRouter();
const rows = ref<ConversationRow[]>([]);
const loading = ref<boolean>(false);
const query = reactive<{ chatbot_id?: string; status?: string; limit?: number }>({ chatbot_id: '', status: '', limit: 50 });

async function load() {
  loading.value = true;
  try {
    const res = await fetchConversations({ chatbot_id: query.chatbot_id || undefined, status: query.status || undefined, limit: query.limit });
    rows.value = res.data as unknown as ConversationRow[];
  } finally { loading.value = false; }
}

function goDetail(row: ConversationRow) {
  router.push(`/messages/conversations/${row.conversation_id}`);
}

onMounted(load);
</script>

<style scoped>
</style>


