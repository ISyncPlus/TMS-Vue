<script setup lang="ts">
import { RouterView } from "vue-router";
import { Toaster } from "vue-sonner";
import Header from "./components/common/Header.vue";
import Footer from "./components/common/Footer.vue";
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <Header />
    <RouterView />
    <Footer />
    <Toaster position="top-right" />
  </div>
</template>
