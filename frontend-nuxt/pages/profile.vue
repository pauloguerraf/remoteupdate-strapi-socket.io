<template>
  <div class="w-full flex items-center justify-center">
    <div class="py-16">
      <div class="text-left font-bold text-3xl py-4 border-b-2 border-black">
        My Profile
      </div>
      <div class="text-2xl my-8">
        <p class="py-4">
          <strong>Username:</strong>
          {{ loggedInUser.username }}
        </p>
        <p class="py-4">
          <strong>Email:</strong>
          {{ loggedInUser.email }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  middleware: 'auth',
  computed: {
    ...mapGetters(['loggedInUser']),
  },
}
</script>
