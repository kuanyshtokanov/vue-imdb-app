<template>
  <v-app>
    <v-container>
      <v-container v-if="loading">
        <Progress showWait="Prepare for AWESOME MOVIES SEARCH!" />
      </v-container>
      <v-container v-else grid-list-xl style="padding-top: 60px">
        <v-layout wrap>
          <v-flex v-for="(item, index) in moviesList" :key="index" xs4 mb-2>
            <SingleMovie :movie="item.show" />
          </v-flex>
        </v-layout>
      </v-container>
    </v-container>
  </v-app>
</template>

<script>
import mazeApi from '@/middleware/MazeApi'
import Progress from '~/components/progressComponents/Progress'
import SingleMovie from '~/components/movieComponents/MovieCard'

export default {
  components: {
    Progress,
    SingleMovie
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
