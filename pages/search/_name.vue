<template>
  <v-app>
    <v-container>
      <MoviesList :moviesSearch = "moviesList" />
    </v-container>
  </v-app>
</template>

<script>
import mazeApi from '@/middleware/MazeApi'
import MoviesList from '~/components/movieComponents/MoviesList'

export default {
  components: {
    MoviesList
  },
  data () {
    return {
      movieName: this.$route.params.name,
      moviesList: [],
      loading: true
    }
  },
  mounted () {
    mazeApi
      .fetchMoviesByName(this.$route.params.name)
      .then((response) => {
        this.moviesList = response
        this.loading = false
      })
      .catch((error) => {
        console.log(error)
      })
  },
  methods: {
    singleMovie (id) {
      this.$router.push('/movies/' + id)
    }
  }
}
</script>

<style lang='stylus' scoped>
.v-progress-circular {
  margin: 12rem;
}
</style>
