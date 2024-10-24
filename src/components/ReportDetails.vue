<template>
  <!-- Navbar -->
  <div class="shadow-md navbar bg-base-content text-base-100">
    <div class="flex-1">
      <a class="text-xl normal-case btn btn-ghost">Purifyr Admin</a>
    </div>
    <div class="flex-none">
      <!-- User Dropdown -->
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img
              alt="User Avatar"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
        >
          <li>
            <a class="justify-between">
              Profile
              <span class="badge">New</span>
            </a>
          </li>
          <li><a>Settings</a></li>
          <li><a>Logout</a></li>
        </ul>
      </div>
    </div>
  </div>
  <div class="flex items-center justify-center min-h-screen p-8 bg-gray-100">
    <div class="w-full max-w-3xl p-6 bg-white rounded-lg shadow-md">
      <!-- Header -->
      <h2 class="mb-6 text-4xl font-bold text-center text-gray-800">
        Report Details
      </h2>

      <div v-if="report">
        <!-- Report Info -->
        <div class="mb-6">
          <h3 class="mb-4 text-2xl font-semibold text-gray-700">
            Report Information
          </h3>
          <div class="space-y-2">
            <p>
              <strong class="text-gray-600">Report ID :</strong> {{ report.id }}
            </p>
            <p>
              <strong class="text-gray-600">Reported URL : </strong>
              <a
                href="{{ report.url }}"
                target="_blank"
                class="text-blue-500 underline"
                >{{ report.url }}</a
              >
            </p>
            <p>
              <strong class="text-gray-600">Email :</strong> {{ report.email }}
            </p>
            <p>
              <strong class="text-gray-600">Cause :</strong> {{ report.cause }}
            </p>
            <p>
              <strong class="text-gray-600">Status :</strong>
              <span
                :class="{
                  'text-green-600': report.status === 'Approved',
                  'text-red-600': report.status === 'Rejected',
                  'text-yellow-600': report.status === 'Pending',
                  'text-blue-600': report.status === 'Sent to pharos',
                }"
              >
                &nbsp;{{ report.status }}
              </span>
            </p>
          </div>
        </div>

        <!-- Screenshot Section -->
        <div class="mb-8">
          <h3 class="mb-4 text-2xl font-semibold text-gray-700">Screenshot</h3>
          <div class="overflow-hidden rounded-lg shadow-lg">
            <img
              class="object-cover w-full h-64"
              alt="Screenshot of the reported URL"
              src="https://i.ibb.co/H2C0L4j/photo-2024-10-17-22-03-11.jpg"
            />
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-center space-x-4">
          <button
            class="px-4 py-2 font-semibold text-white transition bg-blue-600 rounded-md shadow-md hover:bg-blue-700"
            @click="sendToPharos(report.id)"
          >
            Send to Pharos
          </button>
          <button
            class="px-4 py-2 font-semibold text-white transition bg-red-600 rounded-md shadow-md hover:bg-red-700"
            @click="removePharosReport(report.id)"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const report = ref(null)

// Simulated data (this could come from an API)
const pharosReports = [
  {
    id: 1,
    url: 'https://phishing.com',
    email: 'user1@example.com',
    cause: 'Phishing',
    status: 'Pending',
  },
  {
    id: 2,
    url: 'https://illegal.com',
    email: 'user2@example.com',
    cause: 'Illegal Content',
    status: 'Pending',
  },
  {
    id: 3,
    url: 'https://scampharos.com',
    email: 'user3@example.com',
    cause: 'Scam',
    status: 'Pending',
  },
  {
    id: 4,
    url: 'https://spampharos.com',
    email: 'user4@example.com',
    cause: 'Spam',
    status: 'Pending',
  },
  {
    id: 5,
    url: 'https://www.instagram.com/pokewave_officiel/p/C2OxbjuIPWR/',
    email: 'influenceuse@example.fr',
    cause: 'Misinformation',
    status: 'Pending',
  },
]

// Load the report by ID from route params
onMounted(() => {
  const reportId = Number(route.params.id)
  report.value = pharosReports.find(r => r.id === reportId)
})

// Mock functions for Pharos reports
function sendToPharos(reportId: number) {
  if (report.value && report.value.id === reportId) {
    report.value.status = 'Sent to pharos'
  }
}

function removePharosReport(reportId: number) {
  if (report.value && report.value.id === reportId) {
    report.value = null
  }
}
</script>

<style scoped>
/* Additional optional styles */
body {
  font-family: 'Inter', sans-serif;
}

h2,
h3 {
  letter-spacing: -0.5px;
}
</style>
