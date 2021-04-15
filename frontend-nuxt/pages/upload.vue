<template>
  <div class="w-full flex items-start justify-center">
    <div class="px-8 py-16 w-1/2">
      <div class="text-left font-bold text-3xl py-4 border-b-2 border-black">
        Current
      </div>
      <div class="text-left text-2xl py-4">
        {{ expoContent.name }}
      </div>
      <img :src="`http://localhost:1337` + expoContent.image.url" />
    </div>
    <div class="px-8 py-16 w-1/2">
      <div class="text-left font-bold text-3xl py-4 border-b-2 border-black">
        Update
      </div>
      <div class="text-2xl my-8">
        <form
          ref="uploadForm"
          class="flex flex-col"
          @submit.prevent="sendToStrapi"
        >
          <div class="my-4 flex flex-col w-full">
            <label for="file">Name</label>
            <input
              class="px-4 py-2 border-2 border-gray-400 text-black my-2"
              type="text"
              name="name"
            />
          </div>
          <div class="my-4 flex flex-col w-full">
            <label for="file">Imagen</label>
            <input align="right" class="my-2" type="file" name="image" />
          </div>
          <!-- <progress max="100" :value.prop="uploadPercentage"></progress> -->
          <div class="my-4 flex flex-col w-full">
            <button
              ref="submitButton"
              class="px-4 py-2 border-2 border-black hover:text-black hover:bg-white bg-black text-white disabled:border-gray-200 disabled:bg-gray-200 disabled:text-gray-500 my-1 cursor-hover disabled:cursor-not-allowed"
              type="submit"
              name="Submit"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  middleware: 'auth',
  data() {
    return {
      expoContent: {
        name: '',
        image: '',
      },
      // uploadPercentage: 0,
    }
  },
  computed: {
    ...mapGetters(['loggedInUser']),
  },
  mounted() {
    this.getBackgrounds()
  },
  methods: {
    async getBackgrounds() {
      try {
        await this.$axios
          .get('http://localhost:1337/background')
          .then((res) => {
            this.expoContent.name = res.data.name
            this.expoContent.image = res.data.image
          })
      } catch (e) {
        console.log('there was an error uploading', e)
      }
    },
    async sendToStrapi() {
      this.$refs.submitButton.disabled = true
      const form = this.$refs.uploadForm
      const formData = new FormData()
      const formElements = form.elements
      const data = {}
      formElements.forEach((currentElement) => {
        if (
          !['submit', 'file'].includes(currentElement.type) &&
          currentElement.value !== ''
        ) {
          data[currentElement.name] = currentElement.value
        } else if (currentElement.type === 'file') {
          if (currentElement.files.length === 1) {
            const file = currentElement.files[0]
            formData.append(`files.${currentElement.name}`, file, file.name)
          }
        }
      })
      formData.append('data', JSON.stringify(data))
      // for (const pair of formData.entries()) {
      //   console.log(pair[0] + ', ' + pair[1])
      // }
      try {
        await this.$axios
          .put('http://localhost:1337/background', formData, {
            // onUploadProgress: (progressEvent) => {
            //   this.uploadPercentage = parseInt(
            //     Math.round((progressEvent.loaded / progressEvent.total) * 100)
            //   )
            // },
          })
          .then((res) => {
            console.log('success')
            form.reset()
            this.$refs.submitButton.disabled = false
            this.getBackgrounds()
          })
      } catch (e) {
        console.log('there was an error uploading', e)
        this.$refs.submitButton.disabled = true
      }
    },
  },
}
</script>
