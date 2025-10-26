<script setup lang="ts">
import { ref } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { Ticket, LogOut, Menu, X } from "lucide-vue-next";
import Button from "@/components/ui/Button.vue";
import { useTicketStore } from "@/stores/ticketStore";

const route = useRoute();
const ticketStore = useTicketStore();
const mobileMenuOpen = ref(false);

const isActive = (path: string) => route.path === path;

const closeMobileMenu = () => {
  mobileMenuOpen.value = false;
};
</script>

<template>
  <header
    v-motion
    :initial="{ y: -100 }"
    :enter="{ y: 0, transition: { duration: 500 } }"
    class="border-b border-[#C0B7E8]/10 sticky top-0 z-50 backdrop-blur-sm"
  >
    <div class="mx-auto max-w-[1440px] px-6 py-8">
      <nav
        class="flex items-center justify-between"
        aria-label="Main navigation"
      >
        <RouterLink to="/" class="flex items-center gap-2">
          <div
            v-motion
            :initial="{ rotate: 0, scale: 1 }"
            :hovered="{
              rotate: 360,
              scale: 1.1,
              transition: { duration: 600 },
            }"
            class="flex size-10 items-center justify-center rounded-lg bg-linear-to-r from-[#8176AF] to-[#C0B7E8]"
          >
            <Ticket class="size-6 text-white" />
          </div>
          <span class="gradient-text text-xl">TicketWave</span>
        </RouterLink>

        <!-- Mobile menu button -->
        <button
          class="lg:hidden text-[#E0E0E0]"
          @click="mobileMenuOpen = !mobileMenuOpen"
          aria-label="Toggle menu"
        >
          <X v-if="mobileMenuOpen" class="size-6" />
          <Menu v-else class="size-6" />
        </button>

        <!-- Desktop Navigation -->
        <div class="hidden items-center gap-6 lg:flex">
          <template v-if="ticketStore.isAuthenticated">
            <div
              v-motion
              :hovered="{ scale: 1.05, transition: { duration: 200 } }"
            >
              <RouterLink
                to="/dashboard"
                :class="[
                  'transition-colors',
                  isActive('/dashboard')
                    ? 'text-[#C0B7E8]'
                    : 'text-[#E0E0E0] hover:text-[#C0B7E8]',
                ]"
              >
                Dashboard
              </RouterLink>
            </div>
            <div
              v-motion
              :hovered="{ scale: 1.05, transition: { duration: 200 } }"
            >
              <RouterLink
                to="/tickets"
                :class="[
                  'transition-colors',
                  isActive('/tickets')
                    ? 'text-[#C0B7E8]'
                    : 'text-[#E0E0E0] hover:text-[#C0B7E8]',
                ]"
              >
                Tickets
              </RouterLink>
            </div>
            <div
              class="flex items-center gap-3 border-l border-[#C0B7E8]/20 pl-6"
            >
              <span class="text-[#B1B1B1]">{{ ticketStore.user?.name }}</span>
              <div
                v-motion
                :hovered="{
                  scale: 1.1,
                  rotate: 15,
                  transition: { duration: 200 },
                }"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  @click="ticketStore.logout"
                  aria-label="Log out"
                  class="hover:bg-[#3D3654]"
                >
                  <LogOut class="size-5" />
                </Button>
              </div>
            </div>
          </template>
          <template v-else>
            <RouterLink to="/login">
              <div
                v-motion
                :hovered="{ scale: 1.05, transition: { duration: 200 } }"
              >
                <Button
                  variant="ghost"
                  class="hover:bg-[#3D3654] text-[#E0E0E0]"
                >
                  Login
                </Button>
              </div>
            </RouterLink>
            <RouterLink to="/signup">
              <div
                v-motion
                :hovered="{ scale: 1.05, transition: { duration: 200 } }"
              >
                <Button class="gradient-button rounded-[1em]">
                  Get Started
                </Button>
              </div>
            </RouterLink>
          </template>
        </div>
      </nav>

      <!-- Mobile Navigation -->
      <transition
        enter-active-class="transition-all duration-300"
        enter-from-class="opacity-0 max-h-0"
        enter-to-class="opacity-100 max-h-96"
        leave-active-class="transition-all duration-300"
        leave-from-class="opacity-100 max-h-96"
        leave-to-class="opacity-0 max-h-0"
      >
        <div
          v-if="mobileMenuOpen"
          class="mt-4 border-t border-[#C0B7E8]/10 pt-4 lg:hidden overflow-hidden"
        >
          <template v-if="ticketStore.isAuthenticated">
            <div class="flex flex-col gap-4">
              <RouterLink
                to="/dashboard"
                @click="closeMobileMenu"
                :class="[
                  'block rounded-[1em] px-4 py-2 transition-colors',
                  isActive('/dashboard')
                    ? 'bg-[#3D3654] text-[#C0B7E8]'
                    : 'text-[#E0E0E0] hover:bg-[#3D3654]',
                ]"
              >
                Dashboard
              </RouterLink>
              <RouterLink
                to="/tickets"
                @click="closeMobileMenu"
                :class="[
                  'block rounded-[1em] px-4 py-2 transition-colors',
                  isActive('/tickets')
                    ? 'bg-[#3D3654] text-[#C0B7E8]'
                    : 'text-[#E0E0E0] hover:bg-[#3D3654]',
                ]"
              >
                Tickets
              </RouterLink>
              <div
                class="flex items-center justify-between border-t border-[#C0B7E8]/10 pt-4"
              >
                <span class="text-[#B1B1B1]">{{ ticketStore.user?.name }}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  @click="
                    () => {
                      ticketStore.logout();
                      closeMobileMenu();
                    }
                  "
                  class="gap-2 hover:bg-[#3D3654]"
                >
                  <LogOut class="size-4" />
                  Log Out
                </Button>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="flex flex-col gap-4">
              <RouterLink to="/login" @click="closeMobileMenu">
                <Button variant="ghost" class="w-full hover:bg-[#3D3654]">
                  Login
                </Button>
              </RouterLink>
              <RouterLink to="/signup" @click="closeMobileMenu">
                <Button class="w-full gradient-button rounded-[1em]">
                  Get Started
                </Button>
              </RouterLink>
            </div>
          </template>
        </div>
      </transition>
    </div>
  </header>
</template>
