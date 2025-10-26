<script setup lang="ts">
import { ref, computed } from "vue";
import { useTicketStore } from "@/stores/ticketStore";
import { formatDate } from "@/lib/utils";
import { toast } from "vue-sonner";
import Card from "@/components/ui/Card.vue";
import Button from "@/components/ui/Button.vue";
import Input from "@/components/ui/Input.vue";
import StatusTag from "@/components/StatusTag.vue";
import { Search, Plus, Eye, Edit, Trash2 } from "lucide-vue-next";
import type { Ticket } from "@/stores/ticketStore";

const ticketStore = useTicketStore();

const searchQuery = ref("");
const statusFilter = ref<"all" | "open" | "in_progress" | "closed">("all");

const filteredTickets = computed(() => {
  let filtered = ticketStore.tickets;

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (t: Ticket) =>
        t.title.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query)
    );
  }

  if (statusFilter.value !== "all") {
    filtered = filtered.filter((t: Ticket) => t.status === statusFilter.value);
  }

  return filtered;
});

const handleDelete = (id: string) => {
  ticketStore.deleteTicket(id);
  toast.success("Ticket deleted successfully");
};

const handleCreate = () => {
  toast.info("Create ticket modal would open here");
};

const handleEdit = (ticket: Ticket) => {
  toast.info(`Edit ticket: ${ticket.title}`);
};

const handleView = (ticket: Ticket) => {
  toast.info(`View ticket: ${ticket.title}`);
};
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
        class="mb-6 lg:mb-8"
      >
        <h1 class="gradient-text text-3xl lg:text-4xl pb-6">Manage Tickets</h1>
      </div>

      <!-- Toolbar -->
      <div
        v-motion
        :initial="{ y: 20, opacity: 0 }"
        :enter="{ y: 0, opacity: 1, transition: { duration: 600, delay: 200 } }"
      >
        <Card
          class="mb-6 rounded-[1em] border-[#C0B7E8]/10 bg-[#3D3654] p-4 shadow-lg shadow-black/20"
        >
          <div
            class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
          >
            <div class="flex flex-col gap-4 sm:flex-row sm:flex-1">
              <div class="relative flex-1 sm:max-w-md">
                <Search
                  class="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#B1B1B1]"
                />
                <Input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search tickets..."
                  class="rounded-[1em] border-[#C0B7E8]/10 bg-[#302C42] pl-10 text-[#E0E0E0] placeholder:text-[#B1B1B1]"
                />
              </div>
              <select
                v-model="statusFilter"
                class="w-full rounded-[1em] border border-[#C0B7E8]/10 bg-[#302C42] text-[#E0E0E0] px-3 py-2 sm:w-40"
              >
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div
              v-motion
              :hovered="{ scale: 1.05, transition: { duration: 200 } }"
              :tap="{ scale: 0.95 }"
            >
              <Button
                @click="handleCreate"
                class="w-full gap-2 gradient-button rounded-[1em] sm:w-auto"
              >
                <Plus class="size-4" />
                Create Ticket
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <!-- Tickets Grid -->
      <div
        v-motion
        :initial="{ opacity: 0 }"
        :enter="{ opacity: 1, transition: { duration: 600, delay: 300 } }"
        class="grid gap-4 sm:grid-cols-2 lg:gap-6"
      >
        <transition-group
          enter-active-class="transition-all duration-300"
          enter-from-class="opacity-0 translate-y-5"
          leave-active-class="transition-all duration-300"
          leave-to-class="opacity-0 scale-90"
        >
          <div
            v-for="(ticket, index) in filteredTickets"
            :key="ticket.id"
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{
              opacity: 1,
              y: 0,
              transition: { duration: 300, delay: index * 50 },
            }"
            :hovered="{ y: -5, transition: { duration: 200 } }"
          >
            <Card
              class="group h-full rounded-[1em] border-[#C0B7E8]/10 bg-[#3D3654] p-4 shadow-lg shadow-black/20 transition-all hover:border-[#C0B7E8]/30 hover:shadow-xl sm:p-6"
            >
              <div class="flex flex-col gap-4">
                <div class="flex-1">
                  <div
                    class="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3"
                  >
                    <h3 class="text-[#E0E0E0] text-lg">{{ ticket.title }}</h3>
                    <StatusTag :status="ticket.status" />
                  </div>
                  <p class="mt-2 text-[#B1B1B1]">
                    {{
                      ticket.description.length > 120
                        ? ticket.description.substring(0, 120) + "..."
                        : ticket.description
                    }}
                  </p>
                  <p class="mt-3 text-sm text-[#B1B1B1]">
                    Created: {{ formatDate(ticket.createdAt) }}
                  </p>
                </div>
                <div class="flex gap-2 border-t border-[#C0B7E8]/10 pt-3">
                  <div
                    v-motion
                    :hovered="{ scale: 1.05, transition: { duration: 200 } }"
                    :tap="{ scale: 0.95 }"
                    class="flex-1"
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      @click="handleView(ticket)"
                      class="w-full rounded-[1em] hover:bg-[#302C42] text-[#E0E0E0]"
                    >
                      <Eye class="mr-2 size-4" />
                      View
                    </Button>
                  </div>
                  <div
                    v-motion
                    :hovered="{ scale: 1.05, transition: { duration: 200 } }"
                    :tap="{ scale: 0.95 }"
                    class="flex-1"
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      @click="handleEdit(ticket)"
                      class="w-full rounded-[1em] hover:bg-[#302C42] text-[#E0E0E0]"
                    >
                      <Edit class="mr-2 size-4" />
                      Edit
                    </Button>
                  </div>
                  <div
                    v-motion
                    :hovered="{ scale: 1.05, transition: { duration: 200 } }"
                    :tap="{ scale: 0.95 }"
                    class="flex-1"
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      @click="handleDelete(ticket.id)"
                      class="w-full rounded-[1em] hover:bg-red-900/20 text-red-400"
                    >
                      <Trash2 class="mr-2 size-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </transition-group>

        <div
          v-if="filteredTickets.length === 0"
          v-motion
          :initial="{ opacity: 0 }"
          :enter="{ opacity: 1, transition: { duration: 600, delay: 400 } }"
          class="col-span-full"
        >
          <Card
            class="rounded-[1em] border-[#C0B7E8]/10 bg-[#3D3654] p-12 text-center shadow-lg shadow-black/20"
          >
            <p class="text-[#B1B1B1]">
              {{
                searchQuery || statusFilter !== "all"
                  ? "No tickets found matching your filters."
                  : "No tickets yet. Create your first ticket to get started."
              }}
            </p>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>
