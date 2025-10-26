<script setup lang="ts">
import { RouterLink } from "vue-router";
import Button from "@/components/ui/Button.vue";
import Card from "@/components/ui/Card.vue";
import { Zap, Shield, Users } from "lucide-vue-next";
</script>

<template>
  <div
    v-motion
    :initial="{ opacity: 0 }"
    :enter="{ opacity: 1, transition: { duration: 500 } }"
    class="flex-1"
  >
    <section
      class="relative overflow-hidden bg-[#302C42] px-6 py-16 lg:px-16 lg:py-28"
    >
      <!-- Decorative Glowing Circles -->
      <div
        v-motion
        :initial="{ scale: 1, opacity: 0.3 }"
        :enter="{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.4, 0.3],
          transition: { duration: 8000, repeat: Infinity, ease: 'linear' },
        }"
        class="glow-circle absolute -left-20 top-20 size-64 rounded-full bg-[#8176AF] lg:size-96"
        aria-hidden="true"
      ></div>
      <div
        v-motion
        :initial="{ scale: 1, opacity: 0.3 }"
        :enter="{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.5, 0.3],
          transition: { duration: 10000, repeat: Infinity, ease: 'linear' },
        }"
        class="glow-circle absolute -right-20 bottom-20 size-80 rounded-full bg-[#C0B7E8] lg:size-[32rem]"
        aria-hidden="true"
      ></div>

      <div class="relative mx-auto max-w-[1440px] text-center">
        <h1
          v-motion
          :initial="{ y: -50, opacity: 0 }"
          :enter="{
            y: 0,
            opacity: 1,
            transition: { duration: 800, delay: 200 },
          }"
          class="mx-auto max-w-4xl bg-linear-to-r from-[#C0B7E8] to-[#8176AF] bg-clip-text text-transparent text-4xl lg:text-6xl"
        >
          Welcome to TicketWave
        </h1>
        <p
          v-motion
          :initial="{ y: 30, opacity: 0 }"
          :enter="{
            y: 0,
            opacity: 1,
            transition: { duration: 800, delay: 400 },
          }"
          class="mx-auto mt-6 max-w-2xl text-[#B1B1B1] text-lg lg:text-xl"
        >
          Streamline your support workflow with our powerful, intuitive ticket
          management system. Track, manage, and resolve tickets faster than
          ever.
        </p>
        <div
          v-motion
          :initial="{ y: 30, opacity: 0 }"
          :enter="{
            y: 0,
            opacity: 1,
            transition: { duration: 800, delay: 600 },
          }"
          class="mt-10 flex flex-col flex-wrap justify-center gap-4 sm:flex-row"
        >
          <RouterLink to="/signup">
            <Button
              size="lg"
              class="w-full gradient-button rounded-[1em] px-8 sm:w-auto"
            >
              Get Started
            </Button>
          </RouterLink>
          <RouterLink to="/login">
            <Button
              size="lg"
              variant="outline"
              class="w-full rounded-[1em] border-[#C0B7E8]/30 bg-transparent text-[#E0E0E0] hover:bg-[#3D3654] hover:text-white sm:w-auto"
            >
              Login
            </Button>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Wavy SVG Divider -->
    <svg
      viewBox="0 0 1440 120"
      xmlns="http://www.w3.org/2000/svg"
      class="w-full"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0,64 C320,96 640,32 960,64 C1280,96 1440,64 1440,64 L1440,0 L0,0 Z"
        fill="#3D3654"
      />
    </svg>

    <!-- Features Section -->
    <section class="bg-[#302C42] px-6 py-12 lg:px-16 lg:py-20">
      <div class="mx-auto max-w-[1440px]">
        <div
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
          class="mb-12 text-center"
        >
          <h2 class="gradient-text text-3xl lg:text-4xl">
            Why Choose TicketWave?
          </h2>
          <p class="mt-4 text-[#B1B1B1]">
            Everything you need to manage support tickets effectively
          </p>
        </div>

        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          <div
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :visible-once="{
              opacity: 1,
              y: 0,
              transition: { duration: 600, delay: 100 },
            }"
            :hovered="{ y: -10, transition: { duration: 300 } }"
          >
            <Card
              class="rounded-[1em] border-[#C0B7E8]/10 bg-[#3D3654] p-6 shadow-lg shadow-black/20 transition-transform lg:p-8 h-full"
            >
              <div
                v-motion
                :hovered="{
                  rotate: 360,
                  scale: 1.1,
                  transition: { duration: 600 },
                }"
                class="mb-4 flex size-14 items-center justify-center rounded-[1em] bg-linear-to-br from-[#8176AF] to-[#C0B7E8]"
              >
                <Zap class="size-7 text-white" />
              </div>
              <h3 class="mb-3 text-[#E0E0E0]">Lightning Fast</h3>
              <p class="text-[#B1B1B1]">
                Create, update, and resolve tickets in seconds. Our streamlined
                interface keeps your team productive.
              </p>
            </Card>
          </div>

          <div
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :visible-once="{
              opacity: 1,
              y: 0,
              transition: { duration: 600, delay: 200 },
            }"
            :hovered="{ y: -10, transition: { duration: 300 } }"
          >
            <Card
              class="rounded-[1em] border-[#C0B7E8]/10 bg-[#3D3654] p-6 shadow-lg shadow-black/20 transition-transform lg:p-8 h-full"
            >
              <div
                v-motion
                :hovered="{
                  rotate: 360,
                  scale: 1.1,
                  transition: { duration: 600 },
                }"
                class="mb-4 flex size-14 items-center justify-center rounded-[1em] bg-linear-to-br from-[#8176AF] to-[#C0B7E8]"
              >
                <Shield class="size-7 text-white" />
              </div>
              <h3 class="mb-3 text-[#E0E0E0]">Secure & Reliable</h3>
              <p class="text-[#B1B1B1]">
                Your data is protected with enterprise-grade security. Focus on
                support, not infrastructure.
              </p>
            </Card>
          </div>

          <div
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :visible-once="{
              opacity: 1,
              y: 0,
              transition: { duration: 600, delay: 300 },
            }"
            :hovered="{ y: -10, transition: { duration: 300 } }"
          >
            <Card
              class="rounded-[1em] border-[#C0B7E8]/10 bg-[#3D3654] p-6 shadow-lg shadow-black/20 transition-transform sm:col-span-2 lg:col-span-1 lg:p-8 h-full"
            >
              <div
                v-motion
                :hovered="{
                  rotate: 360,
                  scale: 1.1,
                  transition: { duration: 600 },
                }"
                class="mb-4 flex size-14 items-center justify-center rounded-[1em] bg-linear-to-br from-[#8176AF] to-[#C0B7E8]"
              >
                <Users class="size-7 text-white" />
              </div>
              <h3 class="mb-3 text-[#E0E0E0]">Team Collaboration</h3>
              <p class="text-[#B1B1B1]">
                Work together seamlessly. Assign tickets, track progress, and
                keep everyone in sync.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.glow-circle {
  filter: blur(100px);
}
</style>
