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
          <div class="my-4 flex flex-col w-full">
            <input
              class="px-4 py-2 border-2 border-black hover:text-black hover:bg-white bg-black text-white"
              type="submit"
              name="Submit"
            />
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
          .onUploadProgress((progress) => {
            console.log(progress)
          })
          .then((res) => {
            this.expoContent.name = res.data.name
            this.expoContent.image = res.data.image
            console.log(res.data.image)
          })
      } catch (e) {
        console.log('there was an error uploading', e)
      }
    },
    async sendToStrapi() {
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
          .put('http://localhost:1337/background', formData)
          .then((res) => {
            console.log('success')
            form.reset()
            window.location.reload(true)
          })
      } catch (e) {
        console.log('there was an error uploading', e)
      }
    },
  },
}
</script>
