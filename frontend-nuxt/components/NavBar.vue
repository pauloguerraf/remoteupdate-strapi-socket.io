<template>
  <div class="full">
    <div class="absolute mx-4">
      <nuxt-link
        class="text-black px-4 py-2 border-2 border-black hover:text-white hover:bg-black"
        to="/"
        >Home</nuxt-link
      >
    </div>

    <div class="w-full my-8 flex justify-end px-4">
      <div v-if="isAuthenticated" class="">
        <nuxt-link
          class="px-4 py-2 border-2 border-black hover:text-white hover:bg-black"
          to="/profile"
          >My Profile</nuxt-link
        >
        <a
          class="px-4 py-2 border-2 border-black hover:text-white hover:bg-black"
          @click="logout"
          >Logout</a
        >
      </div>

      <div v-if="!isAuthenticated">
        <nuxt-link
          class="px-4 py-2 border-2 border-black hover:text-black hover:bg-white text-white bg-black"
          to="/register"
        >
          <strong>Register</strong>
        </nuxt-link>
        <nuxt-link
          class="px-4 py-2 border-2 border-black hover:text-white hover:bg-black"
          to="/login"
        >
          Log in
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },
  mounted() {},
  methods: {
    async logout() {
      await this.$auth.logout()
    },
  },
}
</script>
