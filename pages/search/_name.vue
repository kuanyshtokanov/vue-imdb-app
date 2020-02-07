<template>
  <v-app>
    <v-container>
      <MoviesList :moviesSearch = "moviesList" />
      <ErrorDialog />
    </v-container>
  </v-app>
</template>

<script>
import mazeApi from '@/middleware/MazeApi'
import MoviesList from '~/components/movieComponents/MoviesList'
import ErrorDialog from '~/components/errorComponents/ErrorDialog'

export default {
  components: {
    MoviesList,
    ErrorDialog
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
        this.setIsError()
        this.setErrorText(error)
      })
  },
  methods: {
    singleMovie (id) {
      this.$router.push('/movies/' + id)
    },
    setIsError () {
      this.$store.commit('error/setErrorFlag', true)
    },
    setErrorText (text) {
      this.$store.commit('error/setErrorText', text)
    }
  }
}
</script>

<style lang='stylus' scoped>
.v-progress-circular {
  margin: 12rem;
}
</style>
