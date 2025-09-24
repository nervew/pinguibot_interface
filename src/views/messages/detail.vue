<template>
  <div class="app-container">
    <el-card>
      <template #header>
        <div class="card-header">Conversation {{ id }}</div>
      </template>
      <el-descriptions :column="2" border v-if="conversation">
        <el-descriptions-item label="Chatbot">{{ conversation.chatbot_id }}</el-descriptions-item>
        <el-descriptions-item label="Client">{{ conversation.client_id }}</el-descriptions-item>
        <el-descriptions-item label="Status">
          <el-tag :type="conversation.status === 'active' ? 'success' : 'info'">{{ conversation.status }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="Created">{{ conversation.created_at }}</el-descriptions-item>
      </el-descriptions>

      <div style="margin-top:16px">
        <el-timeline>
          <el-timeline-item v-for="m in messages" :key="m.message_id" :timestamp="m.created_at" :type="m.role === 'user' ? 'primary' : 'success'">
            <strong>{{ m.role }}</strong>: {{ m.text }}
          </el-timeline-item>
        </el-timeline>
      </div>

      <el-form :inline="true" @submit.prevent style="margin-top:16px">
        <el-form-item>
          <el-input v-model="response" placeholder="Responder..." type="textarea" :rows="3" style="width:600px" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="sending" @click="onSend">Send</el-button>
        </el-form-item>
        <el-form-item>
          <el-select v-model="newStatus" placeholder="Change status">
            <el-option label="active" value="active" />
            <el-option label="closed" value="closed" />
            <el-option label="archived" value="archived" />
          </el-select>
          <el-button style="margin-left:8px" @click="onUpdateStatus">Update</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { fetchConversation, sendMessage, updateConversationStatus } from '@/api/messages';

interface MessageRow { message_id: string; conversation_id: string; role: string; text: string; tokens?: number | null; created_at: string }
interface ConversationRow { conversation_id: string; user_id: string; chatbot_id: string; client_id: string; tokens: number; status: string; created_at: string }

const route = useRoute();
const id = route.params.id as string;
const conversation = ref<ConversationRow | null>(null);
const messages = ref<MessageRow[]>([]);
const response = ref<string>('');
const sending = ref<boolean>(false);
const newStatus = ref<string>('');

async function load() {
  const res = await fetchConversation(id);
  conversation.value = res.data.conversation;
  messages.value = res.data.messages;
}

async function onSend() {
  if (!response.value) return;
  sending.value = true;
  try {
    await sendMessage({ conversation_id: id, response_text: response.value, role: 'assistant' });
    response.value = '';
    await load();
  } finally { sending.value = false; }
}

async function onUpdateStatus() {
  if (!newStatus.value) return;
  await updateConversationStatus(id, newStatus.value);
  ElMessage.success('Estado actualizado');
  await load();
}

onMounted(load);
</script>

<style scoped>
.card-header { font-weight: 600; }
</style>


