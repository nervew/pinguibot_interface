<template>
  <div class="app-container">
    <el-card>
      <template #header>
        <div class="card-header">Subscriptions</div>
      </template>
      <el-form :inline="true" :model="form" @submit.prevent>
        <el-form-item label="Plan"><el-input v-model="form.plan" /></el-form-item>
        <el-form-item label="Start"><el-date-picker v-model="form.period_start" type="datetime" placeholder="Optional" /></el-form-item>
        <el-form-item label="End"><el-date-picker v-model="form.period_end" type="datetime" placeholder="Optional" /></el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="creating" @click="onCreate">Create</el-button>
          <el-button @click="load">Refresh</el-button>
        </el-form-item>
      </el-form>

      <el-table v-loading="loading" :data="rows" border fit style="margin-top:16px">
        <el-table-column prop="id" label="ID" width="220" />
        <el-table-column prop="plan" label="Plan" width="140" />
        <el-table-column prop="status" label="Status" width="120" />
        <el-table-column prop="period_start" label="Start" width="200" />
        <el-table-column prop="period_end" label="End" width="200" />
        <el-table-column prop="created_at" label="Created" width="180" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { listSubscriptions, createSubscription } from '@/api/billing';

interface SubscriptionRow { id: string; user_id: string; plan: string; status: string; period_start?: string | null; period_end?: string | null; usage_counters: Record<string, unknown>; created_at: string }

const rows = ref<SubscriptionRow[]>([]);
const loading = ref(false);
const creating = ref(false);
const form = reactive<{ plan: string; period_start?: string | null; period_end?: string | null }>({ plan: '' });

async function load() {
  loading.value = true;
  try { const res = await listSubscriptions(); rows.value = res.data as unknown as SubscriptionRow[]; }
  finally { loading.value = false; }
}

async function onCreate() {
  creating.value = true;
  try {
    await createSubscription({ plan: form.plan, period_start: form.period_start || undefined, period_end: form.period_end || undefined });
    ElMessage.success('Creada');
    await load();
  } finally { creating.value = false; }
}

onMounted(load);
</script>

<style scoped>
.card-header { font-weight: 600; }
</style>


