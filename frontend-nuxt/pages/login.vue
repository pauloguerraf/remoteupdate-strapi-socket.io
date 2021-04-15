<template>
  <div class="w-full flex justify-center">
    <div class="py-16">
      <div class="mx-auto">
        <div
          class="text-center font-bold text-3xl py-4 border-b-2 border-black"
        >
          Log In
        </div>

        <Notification
          v-if="error"
          type="error"
          class="bg-red-400 text-white px-8 py-4 border-none"
          :message="error"
        />

        <form method="post" class="mx-auto py-8" @submit.prevent="login">
          <div class="my-4">
            <label class="">Email</label>
            <div class="">
              <input
                v-model="email"
                type="email"
                class="border border-gray-500 w-full"
                name="email"
              />
            </div>
          </div>
          <div class="my-4">
            <label class="">Password</label>
            <div class="">
              <input
                v-model="password"
                type="password"
                class="border border-gray-500 w-full"
                name="password"
              />
            </div>
          </div>
          <div class="my-4 text-right">
            <button
              type="submit"
              class="px-4 py-2 border-2 border-black hover:text-black hover:bg-white bg-black text-white"
            >
              Log In
            </button>
          </div>
        </form>
        <div class="text-center mt-20">
          <p>
            Don't have an account?
            <nuxt-link to="/register" class="font-bold">Register</nuxt-link>
          </p>
          <p>
            <nuxt-link to="/forgot-password">Forgot Password?</nuxt-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'guest',
  data() {
    return {
      email: '',
      password: '',
      error: null,
    }
  },
  methods: {
    async login() {
      this.error = null
      try {
        await this.$auth.loginWith('local', {
          data: {
            identifier: this.email,
            password: this.password,
          },
        })
        this.$router.push('/upload')
      } catch (e) {
        this.error = e.response.data.message[0].messages[0].message
      }
    },
  },
}
</script>
