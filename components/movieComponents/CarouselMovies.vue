<template>
  <div class="text-center">
    <h3>
      {{ 'Highest ratings!' }}
    </h3>
    <v-carousel
      :hide-delimiters="true"
      cycle
      height="auto"
      hide-delimiter-background
      show-arrows-on-hover
    >
      <v-carousel-item v-for="(slide, i) in moviesByRating" :key="i">
        <v-row class="fill-height" justify="center">
          <div>
            <SingleMovie :movie="slide" :ratio="1" :heightCard="heightSingle" />
          </div>
        </v-row>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>
<script>
import SingleMovie from '~/components/movieComponents/MovieCard'

export default {
  components: {
    SingleMovie
  },
  props: ['allMoviesList', 'height'],
  data () {
    return {
      waitText: this.showWait,
      moviesByRating: this.allMoviesList,
      heightSingle: this.height
    }
  },
  watch: {
    height (val) {
      this.heightSingle = val
    }
  }
}
</script>
