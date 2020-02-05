<template>
  <div class="text-center">
    <v-carousel
      :hide-delimiters="true"
      cycle
      height="400"
      hide-delimiter-background
      show-arrows-on-hover
    >
      <v-carousel-item v-for="(slide, i) in moviesByRating" :key="i">
        <v-row class="fill-height" justify="center">
          <div>
            <SingleMovie :movie="slide" :height="200" :ratio="1" />
          </div>
        </v-row>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>
<script>
import SingleMovie from '~/components/movieComponents/SingleMovie'

export default {
  components: {
    SingleMovie
  },
  props: ['allMoviesList'],
  data () {
    return {
      waitText: this.showWait,
      moviesByRating: this.allMoviesList
    }
  }
}
</script>
