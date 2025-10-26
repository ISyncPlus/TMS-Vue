<script setup lang="ts">
import { computed } from "vue";
import { RouterLink } from "vue-router";
import { useTicketStore } from "@/stores/ticketStore";
import { formatDate } from "@/lib/utils";
import Card from "@/components/ui/Card.vue";
import Button from "@/components/ui/Button.vue";
import StatusTag from "@/components/StatusTag.vue";
import { Ticket, Clock, CheckCircle, AlertCircle } from "lucide-vue-next";

const ticketStore = useTicketStore();

const recentTickets = computed(() => ticketStore.tickets.slice(0, 5));
</script>

<template>
  <div
    v-motion
    :initial="{ opacity: 0 }"
    :enter="{ opacity: 1, transition: { duration: 500 } }"
    class="flex-1 bg-[#302C42] px-6 py-8 lg:px-16 lg:py-12"
  >
    <div class="mx-auto max-w-[1440px]">
      <div
        v-motion
        :initial="{ y: -20, opacity: 0 }"
        :enter="{ y: 0, opacity: 1, transition: { duration: 600, delay: 100 } }"
        class="mb-8"
      >
        <h1 class="gradient-text text-3xl lg:text-4xl">Dashboard</h1>
        <p class="mt-2 text-[#B1B1B1]">
          Welcome back, {{ ticketStore.user?.name }}!
        </p>
      </div>

      <!-- Stats Grid -->
      <div class="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <div
          v-motion
          :initial="{ opacity: 0, scale: 0.9 }"
          :enter="{
            opacity: 1,
            scale: 1,
            transition: { duration: 500, delay: 200 },
          }"
          :hovered="{ scale: 1.05, transition: { duration: 300 } }"
        >
          <Card
            class="rounded-[1em] border-[#C0B7E8]/10 bg-[#3D3654] p-6 shadow-lg shadow-black/20"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-[#B1B1B1] text-sm">Total Tickets</p>
                <p
                  v-motion
                  :initial="{ opacity: 0, y: 10 }"
                  :enter="{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 400,
                      delay: 400,
                      type: 'spring',
                      stiffness: 100,
                    },
                  }"
                  class="mt-2 text-[#E0E0E0] text-3xl"
                >
                  {{ ticketStore.tickets.length }}
                </p>
              </div>
              <div
                v-motion
                :hovered="{
                  rotate: 15,
                  scale: 1.1,
                  transition: { duration: 300 },
                }"
                class="flex size-12 items-center justify-center rounded-[1em] bg-blue-500/10"
              >
                <Ticket class="size-6 text-blue-400" />
              </div>
            </div>
          </Card>
        </div>

        <div
          v-motion
          :initial="{ opacity: 0, scale: 0.9 }"
          :enter="{
            opacity: 1,
            scale: 1,
            transition: { duration: 500, delay: 300 },
          }"
          :hovered="{ scale: 1.05, transition: { duration: 300 } }"
        >
          <Card
            class="rounded-[1em] border-[#C0B7E8]/10 bg-[#3D3654] p-6 shadow-lg shadow-black/20"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-[#B1B1B1] text-sm">Open</p>
                <p
                  v-motion
                  :initial="{ opacity: 0, y: 10 }"
                  :enter="{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 400,
                      delay: 500,
                      type: 'spring',
                      stiffness: 100,
                    },
                  }"
                  class="mt-2 text-[#E0E0E0] text-3xl"
                >
                  {{ ticketStore.openTickets.length }}
                </p>
              </div>
              <div
                v-motion
                :hovered="{
                  rotate: 15,
                  scale: 1.1,
                  transition: { duration: 300 },
                }"
                class="flex size-12 items-center justify-center rounded-[1em] bg-yellow-500/10"
              >
                <AlertCircle class="size-6 text-yellow-400" />
              </div>
            </div>
          </Card>
        </div>

        <div
          v-motion
          :initial="{ opacity: 0, scale: 0.9 }"
          :enter="{
            opacity: 1,
            scale: 1,
            transition: { duration: 500, delay: 400 },
          }"
          :hovered="{ scale: 1.05, transition: { duration: 300 } }"
        >
          <Card
            class="rounded-[1em] border-[#C0B7E8]/10 bg-[#3D3654] p-6 shadow-lg shadow-black/20"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-[#B1B1B1] text-sm">In Progress</p>
                <p
                  v-motion
                  :initial="{ opacity: 0, y: 10 }"
                  :enter="{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 400,
                      delay: 600,
                      type: 'spring',
                      stiffness: 100,
                    },
                  }"
                  class="mt-2 text-[#E0E0E0] text-3xl"
                >
                  {{ ticketStore.inProgressTickets.length }}
                </p>
              </div>
              <div
                v-motion
                :hovered="{
                  rotate: 15,
                  scale: 1.1,
                  transition: { duration: 300 },
                }"
                class="flex size-12 items-center justify-center rounded-[1em] bg-blue-500/10"
              >
                <Clock class="size-6 text-blue-400" />
              </div>
            </div>
          </Card>
        </div>

        <div
          v-motion
          :initial="{ opacity: 0, scale: 0.9 }"
          :enter="{
            opacity: 1,
            scale: 1,
            transition: { duration: 500, delay: 500 },
          }"
          :hovered="{ scale: 1.05, transition: { duration: 300 } }"
        >
          <Card
            class="rounded-[1em] border-[#C0B7E8]/10 bg-[#3D3654] p-6 shadow-lg shadow-black/20"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-[#B1B1B1] text-sm">Closed</p>
                <p
                  v-motion
                  :initial="{ opacity: 0, y: 10 }"
                  :enter="{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 400,
                      delay: 700,
                      type: 'spring',
                      stiffness: 100,
                    },
                  }"
                  class="mt-2 text-[#E0E0E0] text-3xl"
                >
                  {{ ticketStore.closedTickets.length }}
                </p>
              </div>
              <div
                v-motion
                :hovered="{
                  rotate: 15,
                  scale: 1.1,
                  transition: { duration: 300 },
                }"
                class="flex size-12 items-center justify-center rounded-[1em] bg-green-500/10"
              >
                <CheckCircle class="size-6 text-green-400" />
              </div>
            </div>
          </Card>
        </div>
      </div>

      <!-- Recent Tickets -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 600 } }"
      >
        <div class="mb-6 flex items-center justify-between">
          <h2 class="gradient-text text-2xl">Recent Tickets</h2>
          <RouterLink to="/tickets">
            <Button variant="ghost" class="text-[#C0B7E8] hover:bg-[#3D3654]">
              View All
            </Button>
          </RouterLink>
        </div>

        <div class="space-y-4">
          <div
            v-for="(ticket, index) in recentTickets"
            :key="ticket.id"
            v-motion
            :initial="{ opacity: 0, x: -50 }"
            :enter="{
              opacity: 1,
              x: 0,
              transition: { duration: 400, delay: 100 * index },
            }"
            :hovered="{ x: 10, transition: { duration: 200 } }"
          >
            <Card
              class="rounded-[1em] border-[#C0B7E8]/10 bg-[#3D3654] p-4 shadow-lg shadow-black/20 transition-transform"
            >
              <div
                class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div class="flex-1">
                  <div
                    class="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3"
                  >
                    <h3 class="text-[#E0E0E0]">{{ ticket.title }}</h3>
                    <StatusTag :status="ticket.status" />
                  </div>
                  <p class="mt-2 text-[#B1B1B1] text-sm">
                    Created: {{ formatDate(ticket.createdAt) }}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div
            v-if="recentTickets.length === 0"
            v-motion
            :initial="{ opacity: 0 }"
            :enter="{ opacity: 1, transition: { duration: 600, delay: 800 } }"
          >
            <Card
              class="rounded-[1em] border-[#C0B7E8]/10 bg-[#3D3654] p-12 text-center shadow-lg shadow-black/20"
            >
              <p class="text-[#B1B1B1]">
                No tickets yet. Create your first ticket to get started.
              </p>
              <RouterLink to="/tickets">
                <div
                  v-motion
                  :hovered="{ scale: 1.05, transition: { duration: 200 } }"
                >
                  <Button class="mt-4 gradient-button rounded-[1em]">
                    Go to Tickets
                  </Button>
                </div>
              </RouterLink>
            </Card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
