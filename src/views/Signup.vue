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
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const errors = ref({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const validateForm = () => {
  const newErrors = { name: "", email: "", password: "", confirmPassword: "" };
  let isValid = true;

  if (!formData.value.name.trim()) {
    newErrors.name = "Name is required";
    isValid = false;
  }

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

  if (!formData.value.confirmPassword) {
    newErrors.confirmPassword = "Please confirm your password";
    isValid = false;
  } else if (formData.value.password !== formData.value.confirmPassword) {
    newErrors.confirmPassword = "Passwords do not match";
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

  ticketStore.signup(
    formData.value.email,
    formData.value.password,
    formData.value.name
  );
  toast.success("Account created successfully!");
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
          class="relative hidden overflow-hidden rounded-[1em] bg-linear-to-br from-[#C0B7E8] to-[#8176AF] p-12 lg:flex lg:flex-col lg:justify-center"
        >
          <div
            v-motion
            :enter="{ scale: 1.2, opacity: 0.4, transition: { duration: 6000, repeat: Infinity } }"
            class="glow-circle absolute -left-20 -top-20 size-64 rounded-full bg-white"
          ></div>
          <div
            v-motion
            :enter="{ scale: 1.1, opacity: 0.3, transition: { duration: 8000, repeat: Infinity } }"
            class="glow-circle absolute -bottom-20 -right-20 size-80 rounded-full bg-[#302C42]"
          ></div>

          <div class="relative">
            <div
              v-motion
              :hovered="{ rotate: 360, scale: 1.1, transition: { duration: 600 } }"
              class="mb-6 flex size-16 items-center justify-center rounded-[1em] bg-white/20 backdrop-blur-sm"
            >
              <Ticket class="size-10 text-white" />
            </div>
            <h2 class="mb-4 text-4xl text-white">Join TicketWave Today</h2>
            <p class="text-lg text-white/90">
              Create your account and start managing your support tickets with ease.
              Everything you need in one powerful platform.
            </p>
            <div class="mt-8 space-y-2 text-white/80">
              <p>✓ Free forever plan</p>
              <p>✓ No credit card required</p>
              <p>✓ Setup in under 2 minutes</p>
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
              <h1 class="gradient-text text-3xl">Create Account</h1>
              <p class="mt-2 text-[#B1B1B1]">Sign up to start managing your tickets</p>
            </div>

            <form @submit.prevent="handleSubmit" class="space-y-4" novalidate>
              <div class="space-y-2">
                <Label for="name" class="text-[#E0E0E0]">
                  Full Name
                </Label>
                <Input
                  id="name"
                  v-model="formData.name"
                  type="text"
                  placeholder="John Doe"
                  required
                  :class="`rounded-[1em] border-[#C0B7E8]/10 bg-[#302C42] text-[#E0E0E0] placeholder:text-[#B1B1B1] ${errors.name ? 'border-red-500' : ''}`"
                />
                <p v-if="errors.name" class="text-red-400 text-sm">
                  {{ errors.name }}
                </p>
              </div>

              <div class="space-y-2">
                <Label for="email" class="text-[#E0E0E0]">Email</Label>
                <Input
                  id="email"
                  v-model="formData.email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  :class="`rounded-[1em] border-[#C0B7E8]/10 bg-[#302C42] text-[#E0E0E0] placeholder:text-[#B1B1B1] ${errors.email ? 'border-red-500' : ''}`"
                />
                <p v-if="errors.email" class="text-red-400 text-sm">
                  {{ errors.email }}
                </p>
              </div>

              <div class="space-y-2">
                <Label for="password" class="text-[#E0E0E0]">Password</Label>
                <Input
                  id="password"
                  v-model="formData.password"
                  type="password"
                  placeholder="At least 6 characters"
                  required
                  :class="`rounded-[1em] border-[#C0B7E8]/10 bg-[#302C42] text-[#E0E0E0] placeholder:text-[#B1B1B1] ${errors.password ? 'border-red-500' : ''}`"
                />
                <p v-if="errors.password" class="text-red-400 text-sm">
                  {{ errors.password }}
                </p>
              </div>

              <div class="space-y-2">
                <Label for="confirmPassword" class="text-[#E0E0E0]">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  v-model="formData.confirmPassword"
                  type="password"
                  placeholder="Re-enter your password"
                  required
                  :class="`rounded-[1em] border-[#C0B7E8]/10 bg-[#302C42] text-[#E0E0E0] placeholder:text-[#B1B1B1] ${errors.confirmPassword ? 'border-red-500' : ''}`"
                />
                <p v-if="errors.confirmPassword" class="text-red-400 text-sm">
                  {{ errors.confirmPassword }}
                </p>
              </div>

              <div
                v-motion
                :hovered="{ scale: 1.02, transition: { duration: 200 } }"
                :tap="{ scale: 0.98 }"
              >
                <Button type="submit" class="mt-6 w-full gradient-button rounded-[1em]">
                  Sign Up
                </Button>
              </div>
            </form>

            <p class="mt-6 text-center text-[#B1B1B1]">
              Already have an account?
              <RouterLink to="/login" class="text-[#C0B7E8] hover:underline">
                Log in
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
