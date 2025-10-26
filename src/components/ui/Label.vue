<script setup lang="ts">
import { computed } from "vue";
import { cn } from "@/lib/utils";

interface LabelProps {
  'for'?: string;
  'class'?: string;
}

const props = defineProps<LabelProps>();

const labelClass = computed(() =>
  cn(
    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
    // use bracket access for reserved word property names
    props['class']
  )
);
</script>

<template>
  <label :for="props['for']" :class="labelClass">
    <slot />
  </label>
</template>
