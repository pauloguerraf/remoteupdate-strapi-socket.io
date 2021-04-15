<template>
  <div :class="`${type}`" class="border border-gray-400">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'Notification',
  props: {
    type: {
      type: String,
      default: 'success',
      validator: (val) => ['error', 'success'].includes(val),
    },
    message: {
      type: String,
      default: '',
    },
  },
}
</script>
