<script setup lang="ts">
import { computed } from "vue";
import { cn } from "@/lib/utils";

interface TextareaProps {
  modelValue?: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<TextareaProps>(), {
  modelValue: "",
  rows: 4,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const textareaClass = computed(() =>
  cn(
    "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    props.class
  )
);

function handleInput(event: Event) {
  emit("update:modelValue", (event.target as HTMLTextAreaElement).value);
}
</script>

<template>
  <textarea
    :value="modelValue"
    :placeholder="placeholder"
    :rows="rows"
    :required="required"
    :class="textareaClass"
    @input="handleInput"
  />
</template>
