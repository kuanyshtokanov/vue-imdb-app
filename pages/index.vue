<template>
  <v-app>
    <v-content>
      <Movies />
    </v-content>
  </v-app>
</template>

<script>
import Movies from '~/components/movieComponents/MoviesList'

export default {
  components: {
    Movies
  }
}
</script>
