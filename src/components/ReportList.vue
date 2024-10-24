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

  <!-- Main Content -->
  <div class="min-h-screen p-6 bg-base-100">
    <h2 class="mb-8 text-3xl font-bold text-center">Reports Management</h2>

    <!-- Tabs navigation -->
    <div class="tabs tabs-boxed">
      <a
        class="tab"
        :class="{ 'tab-active': activeTab === 'urlReports' }"
        @click="activeTab = 'urlReports'"
      >
        URL Reports
      </a>
      <a
        class="tab"
        :class="{ 'tab-active': activeTab === 'pharosReports' }"
        @click="activeTab = 'pharosReports'"
      >
        Pharos Reports
      </a>
    </div>

    <!-- Pharos Reports Tab -->
    <div v-if="activeTab === 'pharosReports'" class="mt-6">
      <h3 class="mb-4 text-2xl font-bold">Pharos Reports Management</h3>
      <div class="w-full overflow-x-auto">
        <table class="table w-full">
          <thead>
            <tr>
              <th class="text-left">Report ID</th>
              <th class="text-left">Reported URL</th>
              <th class="text-left">Email</th>
              <th class="text-left">Cause</th>
              <th class="text-left">Status</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="report in pharosReports" :key="report.id">
              <td>{{ report.id }}</td>
              <td>{{ report.url }}</td>
              <td>{{ report.email }}</td>
              <td>{{ report.cause }}</td>
              <td>
                <span
                  :class="{
                    'badge badge-info': report.status === 'Pending',
                    'badge badge-primary': report.status === 'Sent to pharos',
                  }"
                >
                  {{ report.status }}
                </span>
              </td>
              <td class="text-center">
                <button
                  class="mr-2 btn btn-sm btn-primary"
                  @click="sendToPharos(report.id)"
                >
                  Send to Pharos
                </button>
                <button
                  class="btn btn-sm btn-error"
                  @click="removePharosReport(report.id)"
                >
                  Remove
                </button>
                <router-link
                  :to="{ name: 'ReportDetails', params: { id: report.id } }"
                  class="ml-2 btn btn-sm"
                >
                  View Details
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Sample Pharos reports data (with added email field and more entries)
const pharosReports = ref([
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
])

// Active tab state
const activeTab = ref('pharosReports')

function sendToPharos(reportId: number) {
  const report = pharosReports.value.find(r => r.id === reportId)
  if (report) {
    report.status = 'Sent to pharos'
  }
}

function removePharosReport(reportId: number) {
  const reportIndex = pharosReports.value.findIndex(r => r.id === reportId)
  if (reportIndex !== -1) {
    pharosReports.value.splice(reportIndex, 1)
  }
}
</script>
