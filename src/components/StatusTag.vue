<script setup lang="ts">
import { computed } from "vue";

interface StatusTagProps {
  status: "open" | "in_progress" | "closed";
}

const props = defineProps<StatusTagProps>();

const statusConfig = computed(() => {
  switch (props.status) {
    case "open":
      return {
        label: "Open",
        class: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      };
    case "in_progress":
      return {
        label: "In Progress",
        class: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
      };
    case "closed":
      return {
        label: "Closed",
        class: "bg-green-500/10 text-green-400 border-green-500/20",
      };
    default:
      return {
        label: "Unknown",
        class: "bg-gray-500/10 text-gray-400 border-gray-500/20",
      };
  }
});
</script>

<template>
  <span
    :class="[
      'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors',
      statusConfig.class,
    ]"
  >
    {{ statusConfig.label }}
  </span>
</template>
