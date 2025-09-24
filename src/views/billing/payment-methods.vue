<template>
  <div class="app-container">
    <el-card>
      <template #header>
        <div class="card-header">Payment Methods</div>
      </template>
      <el-form :inline="true" :model="form" @submit.prevent>
        <el-form-item label="Provider"><el-input v-model="form.provider" /></el-form-item>
        <el-form-item label="External ID"><el-input v-model="form.external_id" /></el-form-item>
        <el-form-item label="Last4"><el-input v-model="form.last4" /></el-form-item>
        <el-form-item label="Brand"><el-input v-model="form.brand" /></el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="creating" @click="onCreate">Attach</el-button>
          <el-button @click="load">Refresh</el-button>
        </el-form-item>
      </el-form>

      <el-table v-loading="loading" :data="rows" border fit style="margin-top:16px">
        <el-table-column prop="id" label="ID" width="220" />
        <el-table-column prop="provider" label="Provider" width="120" />
        <el-table-column prop="external_id" label="External ID" width="200" />
        <el-table-column prop="brand" label="Brand" width="120" />
        <el-table-column prop="last4" label="Last4" width="100" />
        <el-table-column prop="created_at" label="Created" width="180" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { listPaymentMethods, createPaymentMethod } from '@/api/billing';

interface PaymentMethodRow { id: string; user_id: string; provider: string; external_id: string; last4?: string | null; brand?: string | null; created_at: string }

const rows = ref<PaymentMethodRow[]>([]);
const loading = ref(false);
const creating = ref(false);
const form = reactive<{ provider: string; external_id: string; last4?: string; brand?: string }>({ provider: '', external_id: '', last4: '', brand: '' });

async function load() {
  loading.value = true;
  try { const res = await listPaymentMethods(); rows.value = res.data as unknown as PaymentMethodRow[]; }
  finally { loading.value = false; }
}

async function onCreate() {
  creating.value = true;
  try { await createPaymentMethod({ provider: form.provider, external_id: form.external_id, last4: form.last4 || undefined, brand: form.brand || undefined }); ElMessage.success('Adjuntado'); await load(); }
  finally { creating.value = false; }
}

onMounted(load);
</script>

<style scoped>
.card-header { font-weight: 600; }
</style>


