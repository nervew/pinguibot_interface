<template>
  <el-form ref="formRef" :model="form" :rules="rules" label-width="120px">
    <el-form-item label="Name" prop="name">
      <el-input v-model="form.name" placeholder="Chatbot name" />
    </el-form-item>
    <el-form-item label="Phone" prop="chatbot_phone">
      <el-input v-model="form.chatbot_phone" placeholder="Optional" />
    </el-form-item>
    <el-form-item label="Type" prop="type">
      <el-select v-model="form.type" placeholder="Select">
        <el-option label="general" value="general" />
        <el-option label="support" value="support" />
        <el-option label="sales" value="sales" />
      </el-select>
    </el-form-item>
    <el-form-item label="Policy" prop="classification_policy">
      <el-input v-model="policy" type="textarea" placeholder="Policy JSON" rows="4" />
      <div class="el-form-item__extra">JSON format; it will be parsed to an object.</div>
    </el-form-item>
    <slot name="extra" />
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Save</el-button>
      <el-button @click="$emit('cancel')">Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue';

export interface ChatbotFormModel {
  name: string;
  chatbot_phone?: string | null;
  type: string;
  classification_policy: Record<string, unknown> | null;
}

const props = defineProps<{ modelValue: ChatbotFormModel }>();
const emit = defineEmits<{ (e: 'update:modelValue', v: ChatbotFormModel): void; (e: 'submit'): void; (e: 'cancel'): void }>();

const formRef = ref();
const form = reactive<ChatbotFormModel>({ name: '', chatbot_phone: '', type: 'general', classification_policy: {} });

watch(() => props.modelValue, (v) => {
  Object.assign(form, v || {});
}, { immediate: true, deep: true });

watch(form, (v) => emit('update:modelValue', { ...v }), { deep: true });

const policy = ref<string>('{}');
watch(() => form.classification_policy, (v) => { policy.value = JSON.stringify(v || {}, null, 2); }, { immediate: true });
watch(policy, (v) => {
  try { form.classification_policy = v ? JSON.parse(v) : {}; } catch { /* ignore parse errors until submit */ }
});

const rules = {
  name: [{ required: true, message: 'Required', trigger: 'blur' }],
  type: [{ required: true, message: 'Required', trigger: 'change' }]
};

function onSubmit() {
  (formRef.value as any).validate((valid: boolean) => {
    if (valid) emit('submit');
  });
}
</script>

<style scoped>
.el-form-item__extra {
  color: var(--el-text-color-secondary);
  font-size: 12px;
  margin-left: 12px;
}
</style>


