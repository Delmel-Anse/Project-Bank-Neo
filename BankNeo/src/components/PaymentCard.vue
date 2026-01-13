<template>
  <div class="max-w-md w-full bg-white shadow-md rounded-xl p-6 border border-gray-200">
    <!-- Card header -->
    <h2 class="text-xl font-semibold text-gray-800 mb-4">
      Make a Payment
    </h2>

    <!-- From account -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-1" for="from-account">
        From Account
      </label>
      <select
          id="from-account"
          class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option disabled selected>Select account</option>
        <!-- Accounts will be dynamically added here -->
      </select>
    </div>

    <!-- To account Name -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-1" for="to-account">
        Account Name
      </label>
      <input
          type="text"
          id="to-account"
          placeholder="Recipient account Name"
          class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <!-- To account Number -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-1" for="to-account">
        Account Number
      </label>
      <input
          type="text"
          id="to-account"
          placeholder="Recipient account number"
          class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <!-- Amount -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-1" for="amount">
        Amount
      </label>
      <input
          type="number"
          id="amount"
          placeholder="0.00"
          class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <!-- Optional note -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-1" for="note">
        Note
      </label>
      <input
          type="text"
          id="note"
          placeholder="Payment description (optional)"
          class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <!-- Submit button -->
    <button
        class="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition"
    >
      Send Payment
    </button>
  </div>
</template>

<script setup lang="ts">
// TODO: Add props or state for accounts and logged-in user later
</script>