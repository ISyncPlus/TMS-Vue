# TicketWave - Vue.js Version

This is a complete Vue.js port of the React TicketWave project. It includes all features with the same design and animations.

## ✨ Tech Stack

- **Vue 3** - Composition API with `<script setup>`
- **TypeScript** - Full type safety
- **Vite** - Fast build tool and dev server
- **Pinia** - State management (with persistence)
- **Vue Router** - Client-side routing with guards
- **Tailwind CSS v4** - Utility-first styling
- **Radix Vue** - Headless UI components
- **VueUse Motion** - Animation library (Vue equivalent of Framer Motion)
- **Lucide Vue Next** - Icon library
- **Vue Sonner** - Toast notifications

## 📦 Installation

```bash
# Navigate to the project directory
cd "TMS Vue"

# Install dependencies
npm install
# or
yarn install
# or
pnpm install

# Start development server
npm run dev
# or
yarn dev
# or
pnpm dev
```

The application will be available at `http://localhost:5173`

## 🏗️ Project Structure

```
TMS Vue/
├── src/
│   ├── views/              # Page components (Landing, Login, Signup, Dashboard, Tickets)
│   ├── components/
│   │   ├── ui/            # Reusable UI components (Button, Input, Card, Dialog, etc.)
│   │   ├── common/        # Header, Footer
│   │   └── StatusTag.vue  # Ticket status badge
│   ├── stores/            # Pinia stores (ticketStore.ts)
│   ├── router/            # Vue Router configuration
│   ├── lib/               # Utility functions
│   ├── App.vue            # Root component
│   ├── main.ts            # Application entry point
│   └── index.css          # Global styles and Tailwind imports
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

## 🎯 Features

### Completed Features

✅ Landing page with animations
✅ User authentication (Login/Signup)
✅ Protected routes
✅ Dashboard with stats
✅ Ticket CRUD operations
✅ Ticket filtering and search
✅ State persistence
✅ Responsive design
✅ Animations throughout

### Remaining Implementation

The following views and components need to be created based on the React version:

#### Views to Create:

1. **src/views/Login.vue** - Login page with animations
2. **src/views/Signup.vue** - Signup page with animations
3. **src/views/Dashboard.vue** - Dashboard with stats cards
4. **src/views/Tickets.vue** - Ticket list with CRUD operations

#### Components to Create:

1. **src/components/TicketModal.vue** - Create/Edit ticket modal
2. **src/components/ui/AlertDialog.vue** - Confirmation dialogs (for delete)

## 📝 Implementation Notes

### Key Differences from React Version

1. **State Management**: Uses Pinia instead of Zustand

   - `ref()` and `computed()` instead of React hooks
   - Actions are plain functions
   - Persistence via `pinia-plugin-persistedstate`

2. **Routing**: Uses Vue Router instead of React Router

   - `beforeEach` navigation guard for auth
   - `RouterLink` component for navigation

3. **Animations**: Uses @vueuse/motion instead of Framer Motion

   - `v-motion` directive for animations
   - Similar API: `initial`, `enter`, `visible-once`, `hovered`

4. **Component Syntax**: Composition API with `<script setup>`
   - `defineProps()` and `defineEmits()` for props/events
   - `v-model` for two-way binding
   - Template refs with `ref()`

### Animation Patterns Used

```vue
<!-- Page fade-in -->
<div
  v-motion
  :initial="{ opacity: 0 }"
  :enter="{ opacity: 1, transition: { duration: 500 } }"
>
</div>

<!-- Scroll trigger -->
<div
  v-motion
  :initial="{ opacity: 0, y: 50 }"
  :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
>
</div>

<!-- Hover effect -->
<div v-motion :hovered="{ scale: 1.05, transition: { duration: 200 } }">
</div>

<!-- Infinite animation -->
<div
  v-motion
  :enter="{
    scale: [1, 1.1, 1],
    transition: { duration: 8000, repeat: Infinity },
  }"
>
</div>
```

## 🔧 Build

```bash
# Type-check and build for production
npm run build

# Preview production build
npm run preview
```

## 📚 Quick Reference

### Creating a New View

```vue
<script setup lang="ts">
import { ref } from "vue";
import { useTicketStore } from "@/stores/ticketStore";

const ticketStore = useTicketStore();
const someData = ref("");
</script>

<template>
  <div class="flex-1 bg-[#302C42] px-6 py-8">
    <!-- Your content -->
  </div>
</template>
```

### Using the Store

```typescript
import { useTicketStore } from "@/stores/ticketStore";

const ticketStore = useTicketStore();

// Access state
ticketStore.tickets;
ticketStore.isAuthenticated;

// Call actions
ticketStore.addTicket({ title: "...", description: "...", status: "open" });
ticketStore.login("email@example.com", "password", "Name");
```

### Toast Notifications

```vue
<script setup lang="ts">
import { toast } from "vue-sonner";

const handleSuccess = () => {
  toast.success("Operation successful!");
};

const handleError = () => {
  toast.error("Something went wrong!");
};
</script>
```

## 🎨 Styling

The project uses the same color scheme as the React version:

- **Primary Gradient**: `#8176AF` → `#C0B7E8`
- **Background**: `#302C42`
- **Cards**: `#3D3654`
- **Text**: `#E0E0E0` (primary), `#B1B1B1` (secondary)
- **Border**: `#C0B7E8/10`

### Custom Classes

- `.gradient-text` - Gradient text effect
- `.gradient-button` - Gradient button with hover effect
- `.glow-circle` - Blurred decorative circles

## 🚀 Next Steps

To complete this Vue.js version:

1. Create the remaining view files (Login, Signup, Dashboard, Tickets)
2. Create the TicketModal component
3. Create the AlertDialog component
4. Test all functionality
5. Adjust animations as needed

All components should follow the same patterns established in Landing.vue and the existing UI components.

## 📄 License

Same as the React version.
