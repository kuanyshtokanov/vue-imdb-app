<template>
  <v-container>
    <v-container v-if="loading">
      <Progress showWait='Prepare for AWESOME!' />
    </v-container>

    <v-container v-else grid-list-xl>
      <BestMovies :allMoviesList="ratedgMovies" />
      <v-layout wrap style="padding-top: 10px">
        <v-flex v-for="(item, index) in currentMoviesList" :key="index" xs4 mb-2>
          <SingleMovie :movie="item" />
        </v-flex>
      </v-layout>
      <div class="text-center">
        <v-container>
          <v-row justify="center">
            <v-col cols="8">
              <v-container class="max-width">
                <v-pagination
                  v-model="page"
                  :length="pages"
                  :total-visible="12"
                  @input="next"
                  class="my-4"
                />
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-container>
  </v-container>
</template>

<script>
import mazeApi from '@/middleware/MazeApi'
import Progress from '~/components/progressComponents/Progress'
import BestMovies from '~/components/movieComponents/CarouselMovies'
import SingleMovie from '~/components/movieComponents/SingleMovie'

export default {
  components: {
    Progress,
    BestMovies,
    SingleMovie
  },
  data () {
    return {
      movieName: this.$route.params.name,
      moviesList: [],
      currentMoviesList: [],
      carouselMoviesList: [],
      moviesByRating: [],
      loading: true,
      pages: 0,
      page: 1,
      showWait: 'Prepare for AWESOME!'
    }
  },
  mounted () {
    mazeApi
      .fetchAllShows()
      .then((response) => {
        this.moviesList = response
        this.loading = false
        this.pages = Math.ceil(response.length / process.env.MAX_ITEMS_ON_PAGE)
        this.next(1)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  computed: {
    ratedgMovies () {
      this.getHighestRatingMovies()
      return this.moviesByRating.slice(0, 9)
    }
  },
  methods: {
    next (page) {
      console.log(page)
      this.currentMoviesList = this.moviesList.slice(page > 1 ? (page - 1) * 9 : 0, page * 9)
      console.log(this.currentMoviesList)
    },
    getHighestRatingMovies () {
      const allMovies = this.moviesList.slice()
      this.moviesByRating = allMovies.sort((a, b) =>
        (a.rating.average > b.rating.average) ? -1 : 1
      )
    }
  }
}
</script>

<style lang='stylus' scoped>
.v-progress-circular {
  margin: 12rem;
}
</style>
