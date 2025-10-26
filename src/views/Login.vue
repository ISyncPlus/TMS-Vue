<script setup lang="ts">
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useTicketStore } from "@/stores/ticketStore";
import { toast } from "vue-sonner";
import { Ticket } from "lucide-vue-next";
import Card from "@/components/ui/Card.vue";
import Button from "@/components/ui/Button.vue";
import Label from "@/components/ui/Label.vue";
import Input from "@/components/ui/Input.vue";

const router = useRouter();
const ticketStore = useTicketStore();

const formData = ref({
  email: "",
  password: "",
});

const errors = ref({
  email: "",
  password: "",
});

const validateForm = () => {
  const newErrors = { email: "", password: "" };
  let isValid = true;

  if (!formData.value.email) {
    newErrors.email = "Email is required";
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(formData.value.email)) {
    newErrors.email = "Email is invalid";
    isValid = false;
  }

  if (!formData.value.password) {
    newErrors.password = "Password is required";
    isValid = false;
  } else if (formData.value.password.length < 6) {
    newErrors.password = "Password must be at least 6 characters";
    isValid = false;
  }

  errors.value = newErrors;
  return isValid;
};

const handleSubmit = () => {
  if (!validateForm()) {
    toast.error("Please fix the form errors");
    return;
  }

  const userName = formData.value.email.split("@")[0] ?? "User";
  ticketStore.login(formData.value.email, formData.value.password, userName);
  toast.success("Successfully logged in!");
  router.push("/dashboard");
};
</script>

<template>
  <div
    v-motion
    :initial="{ opacity: 0 }"
    :enter="{ opacity: 1, transition: { duration: 500 } }"
    class="flex min-h-[calc(100vh-8rem)] items-center justify-center bg-[#302C42] px-6 py-12"
  >
    <div class="w-full max-w-6xl">
      <div class="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <!-- Left Column - Illustration/Gradient -->
        <div
          v-motion
          :initial="{ x: -100, opacity: 0 }"
          :enter="{
            x: 0,
            opacity: 1,
            transition: { duration: 800, delay: 200 },
          }"
          class="relative hidden overflow-hidden rounded-[1em] bg-linear-to-br from-[#8176AF] to-[#C0B7E8] p-12 lg:flex lg:flex-col lg:justify-center"
        >
          <div
            v-motion
            :enter="{ scale: 1.15, opacity: 0.4, transition: { duration: 6000, repeat: Infinity } }"
            class="glow-circle absolute -right-20 -top-20 size-64 rounded-full bg-white"
          ></div>
          <div
            v-motion
            :enter="{ scale: 1.1, opacity: 0.3, transition: { duration: 8000, repeat: Infinity } }"
            class="glow-circle absolute -bottom-20 -left-20 size-80 rounded-full bg-white"
          ></div>

          <div class="relative z-10">
            <div
              v-motion
              :hovered="{ rotate: 360, scale: 1.1, transition: { duration: 600 } }"
              class="mb-6 flex size-16 items-center justify-center rounded-[1em] bg-white/20 backdrop-blur-sm"
            >
              <Ticket class="size-10 text-white" />
            </div>
            <h2 class="mb-4 text-4xl text-white">Welcome Back to TicketWave</h2>
            <p class="text-lg text-white/90">
              Sign in to access your ticket management dashboard and streamline your
              support workflow.
            </p>
            <div class="mt-8 space-y-2 text-white/80">
              <p>✓ Manage unlimited tickets</p>
              <p>✓ Real-time collaboration</p>
              <p>✓ Advanced analytics</p>
            </div>
          </div>
        </div>

        <!-- Right Column - Form -->
        <div
          v-motion
          :initial="{ x: 100, opacity: 0 }"
          :enter="{
            x: 0,
            opacity: 1,
            transition: { duration: 800, delay: 200 },
          }"
        >
          <Card class="rounded-[1em] border-[#C0B7E8]/10 bg-[#3D3654] p-6 shadow-lg shadow-black/20 sm:p-8">
            <div class="mb-6 text-center sm:mb-8">
              <h1 class="gradient-text text-3xl">Log In</h1>
              <p class="mt-2 text-[#B1B1B1]">Enter your credentials to continue</p>
              <p class="mt-3 text-sm text-[#B1B1B1]">Test credentials: demo@user.com / password123</p>
            </div>
            <form @submit.prevent="handleSubmit" class="space-y-4" novalidate>
              <div class="space-y-2">
                <Label for="email" class="text-[#E0E0E0]">
                  Email <span class="text-red-400">*</span>
                </Label>
                <Input
                  id="email"
                  v-model="formData.email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  :class="`rounded-[1em] border-[#C0B7E8]/10 bg-[#302C42] text-[#E0E0E0] placeholder:text-[#B1B1B1] ${errors.email ? 'border-red-500' : ''}`"
                />
                <p v-if="errors.email" class="text-red-400 text-sm">
                  {{ errors.email }}
                </p>
              </div>

              <div class="space-y-2">
                <Label for="password" class="text-[#E0E0E0]">
                  Password <span class="text-red-400">*</span>
                </Label>
                <Input
                  id="password"
                  v-model="formData.password"
                  type="password"
                  placeholder="••••••••"
                  required
                  :class="`rounded-[1em] border-[#C0B7E8]/10 bg-[#302C42] text-[#E0E0E0] placeholder:text-[#B1B1B1] ${errors.password ? 'border-red-500' : ''}`"
                />
                <p v-if="errors.password" class="text-red-400 text-sm">
                  {{ errors.password }}
                </p>
              </div>

              <div
                v-motion
                :hovered="{ scale: 1.02, transition: { duration: 200 } }"
                :tap="{ scale: 0.98 }"
              >
                <Button
                  type="submit"
                  class="mt-6 w-full gradient-button rounded-[1em]"
                >
                  Log In
                </Button>
              </div>
            </form>

            <p class="mt-6 text-center text-[#B1B1B1]">
              Don't have an account?
              <RouterLink to="/signup" class="text-[#C0B7E8] hover:underline">
                Sign up
              </RouterLink>
            </p>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.glow-circle {
  filter: blur(80px);
}
</style>
