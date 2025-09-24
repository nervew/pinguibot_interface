<template>
  <el-form ref="formRef" :model="form" :rules="rules" label-width="120px">
    <el-form-item label="Chatbot ID" prop="chatbot_id">
      <el-input v-model="form.chatbot_id" placeholder="chatbot_id" />
    </el-form-item>
    <el-form-item label="Type" prop="type">
      <el-input v-model="form.type" placeholder="type (system|user|assistant|tool)" />
    </el-form-item>
    <el-form-item label="Version" prop="version">
      <el-input v-model="form.version" placeholder="v1" />
    </el-form-item>
    <el-form-item label="Active" prop="is_active">
      <el-switch v-model="form.is_active" />
    </el-form-item>
    <el-form-item label="Text" prop="prompt_text">
      <el-input v-model="form.prompt_text" type="textarea" :rows="6" placeholder="Prompt text" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Save</el-button>
      <el-button @click="$emit('cancel')">Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';

export interface PromptFormModel {
  chatbot_id: string;
  prompt_text: string;
  type: string;
  version: string;
  is_active: boolean;
}

const props = defineProps<{ modelValue: PromptFormModel }>();
const emit = defineEmits<{ (e: 'update:modelValue', v: PromptFormModel): void; (e: 'submit'): void; (e: 'cancel'): void }>();

const formRef = ref();
const form = reactive<PromptFormModel>({ chatbot_id: '', prompt_text: '', type: '', version: 'v1', is_active: true });

watch(() => props.modelValue, (v) => { Object.assign(form, v || {}); }, { immediate: true, deep: true });
watch(form, (v) => emit('update:modelValue', { ...v }), { deep: true });

const rules = {
  chatbot_id: [{ required: true, message: 'Requerido', trigger: 'blur' }],
  type: [{ required: true, message: 'Requerido', trigger: 'blur' }],
  prompt_text: [{ required: true, message: 'Requerido', trigger: 'blur' }]
};

function onSubmit() {
  (formRef.value as any).validate((valid: boolean) => { if (valid) emit('submit'); });
}
</script>

<style scoped>
</style>


