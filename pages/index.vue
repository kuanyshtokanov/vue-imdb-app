<template>
  <v-app>
    <v-content>
      <Movies />
      <ErrorDialog />
    </v-content>
  </v-app>
</template>

<script>
import Movies from '~/components/movieComponents/MoviesList'
import ErrorDialog from '~/components/errorComponents/ErrorDialog'

export default {
  components: {
    Movies,
    ErrorDialog
  }
}
</script>
