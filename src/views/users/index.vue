<template>
  <div class="app-container">
    <el-card>
      <template #header>
        <div class="card-header">Users Administration</div>
      </template>
      <el-table v-loading="loading" :data="rows" border fit>
        <el-table-column prop="id" label="ID" width="220" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="email" label="Email" width="220" />
        <el-table-column prop="user_phone" label="Phone" width="160" />
        <el-table-column prop="status" label="Status" width="120" />
        <el-table-column prop="plan" label="Plan" width="140" />
        <el-table-column prop="role" label="Role" width="120" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { fetchList } from '@/api/users';

interface UserRow { id: string; name: string; email: string; user_phone?: string | null; status: string; plan?: string | null; role: string }

const loading = ref(false);
const rows = ref<UserRow[]>([]);

async function load() {
  loading.value = true;
  try { const res = await fetchList({}); rows.value = res.data as unknown as UserRow[]; }
  finally { loading.value = false; }
}

onMounted(load);
</script>

<style scoped>
.card-header { font-weight: 600; }
</style>




