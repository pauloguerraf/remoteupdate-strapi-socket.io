<template>
  <div class="w-full flex justify-center">
    <div class="py-16">
      <div class="mx-auto">
        <div
          class="text-center font-bold text-3xl py-4 border-b-2 border-black"
        >
          Register
        </div>
        <Notification
          v-if="success"
          type="success"
          class="bg-green-400 text-white px-8 py-4 border-none w-full"
          :message="success"
        />
        <Notification
          v-if="error"
          type="error"
          class="bg-red-400 text-white px-8 py-4 border-none w-full"
          :message="error"
        />

        <form
          v-if="!success"
          method="post"
          class="mx-auto py-8"
          @submit.prevent="register"
        >
          <div class="my-4">
            <label class="label">Username</label>
            <div class="control">
              <input
                v-model="username"
                type="text"
                class="border border-gray-500 w-full"
                name="username"
                required
              />
            </div>
          </div>
          <div class="my-4">
            <label class="">Email</label>
            <div class="">
              <input
                v-model="email"
                type="email"
                class="border border-gray-500 w-full"
                name="email"
                required
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
                required
              />
            </div>
          </div>
          <div class="my-4 text-right">
            <button
              type="submit"
              class="px-4 py-2 border-2 border-black hover:text-black hover:bg-white bg-black text-white"
            >
              Register
            </button>
          </div>
        </form>

        <div class="text-center mt-20">
          Already got an account?
          <nuxt-link to="/login" class="font-bold">Login</nuxt-link>
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
      username: '',
      email: '',
      password: '',
      success: null,
      error: null,
    }
  },
  methods: {
    async register() {
      this.error = null
      try {
        this.$axios.setToken(false)
        await this.$axios.post('auth/local/register', {
          username: this.username,
          email: this.email,
          password: this.password,
        })
        this.success = `A confirmation link has been sent to your email account. \
 Please click on the link to complete the registration process.`
      } catch (e) {
        this.error = e.response.data.message[0].messages[0].message
      }
    },
  },
}
</script>
