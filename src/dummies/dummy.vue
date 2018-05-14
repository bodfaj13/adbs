<template>
  <div class="content">
      {{msg | toUppercase}}
  </div>
</template>

<script>
export default {
  name: 'dummy',
  data: () => ({
    msg: 'Welcome to dummy Component!'
  }),
  filters: {
      toUppercase (value) {
        return value.toUpperCase()
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @media only screen and (max-width: 600px) {

  }

  @media only screen and (min-width: 600px) and (max-width: 992px) {

  }
  @media only screen and (min-width: 993px) {

  }
</style>
