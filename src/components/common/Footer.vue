<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer
    v-motion
    :initial="{ opacity: 0 }"
    :visible-once="{ opacity: 1, transition: { duration: 500 } }"
    class="border-t border-[#C0B7E8]/10 bg-[#302C42] mt-auto"
  >
    <div class="mx-auto max-w-[1440px] px-6 py-8">
      <div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p class="text-center text-[#B1B1B1] sm:text-left">
          &copy; {{ currentYear }} TicketWave. All rights reserved.
        </p>
        <div class="flex flex-wrap justify-center gap-4 sm:gap-6">
          <a
            v-motion
            :hovered="{ scale: 1.1, y: -2, transition: { duration: 200 } }"
            href="#"
            class="text-[#B1B1B1] transition-colors hover:text-[#C0B7E8]"
          >
            Privacy Policy
          </a>
          <a
            v-motion
            :hovered="{ scale: 1.1, y: -2, transition: { duration: 200 } }"
            href="#"
            class="text-[#B1B1B1] transition-colors hover:text-[#C0B7E8]"
          >
            Terms of Service
          </a>
          <a
            v-motion
            :hovered="{ scale: 1.1, y: -2, transition: { duration: 200 } }"
            href="#"
            class="text-[#B1B1B1] transition-colors hover:text-[#C0B7E8]"
          >
            Support
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
