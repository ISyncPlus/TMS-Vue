<script setup lang="ts">
import { computed } from "vue";
import { cn } from "@/lib/utils";

interface CardProps {
  class?: string;
}

const props = defineProps<CardProps>();

const cardClass = computed(() =>
  cn("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border", props.class)
);
</script>

<template>
  <div :class="cardClass">
    <slot />
  </div>
</template>
