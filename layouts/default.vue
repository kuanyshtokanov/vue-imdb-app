<template>
  <div>
    <NavBar />
    <div>
      <nuxt />
    </div>
  </div>
</template>

<script>
import NavBar from '~/components/navigation/NavBar'

export default {
  components: {
    NavBar
  },
  data () {
    return {
      searchString: ''
    }
  }
}
</script>
