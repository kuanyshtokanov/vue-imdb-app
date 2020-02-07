<template>
  <v-container>
    <v-container v-if="loading">
      <Progress showWait="Prepare for AWESOME!" />
    </v-container>

    <v-container v-else grid-list-xl>
      <BestMovies :allMoviesList="ratedgMovies" :height="450" />
      <v-layout wrap style="padding-top: 10px">
        <v-flex v-for="(item, index) in currentMoviesList" :key="index" xs2 mb-2 class="my-2">
          <SingleMovie :movie="item.show ? item.show : item" />
        </v-flex>
      </v-layout>
      <div v-if="pages > 0" class="text-center">
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
import SingleMovie from '~/components/movieComponents/MovieCard'

export default {
  components: {
    Progress,
    BestMovies,
    SingleMovie
  },
  props: ['moviesSearch'],
  data () {
    return {
      moviesList: [],
      currentMoviesList: this.moviesSearch ? this.moviesSearch : [],
      moviesByRating: [],
      loading: true,
      pages: 0,
      page: 1,
      showWait: 'Prepare for AWESOME!'
    }
  },
  computed: {
    ratedgMovies () {
      this.getHighestRatingMovies()
      return this.moviesByRating.slice(0, 9)
    }
  },
  watch: {
    moviesSearch (val) {
      this.currentMoviesList = val
    }
  },
  mounted () {
    // Workaround for cases when component is used in search page -
    // 0 pages when on search page
    // MAX_PAGES_NUM when others, because we dont know how many pages in total
    this.pages = this.$route.params.name ? 0 : process.env.MAX_PAGES_NUM
    this.currentMoviesList = this.moviesSearch
    mazeApi
      .fetchAllShows()
      .then((response) => {
        this.moviesList = response
        this.loading = false
        // Workaround for cases when component is used in search page -
        // it does not need to load pagination because search by name API does not give paginated response
        if (!this.$route.params.name) {
          this.next(1)
        }
      })
      .catch((error) => {
        console.log(error)
        this.setIsError()
        this.setErrorText(error)
      })
  },
  methods: {
    next (page) {
      this.loading = true
      mazeApi
        .fetchAllShowsByPage(page)
        .then((response) => {
          this.currentMoviesList = response
          this.loading = false
        })
        .catch((error) => {
          console.log(error)
          this.setIsError()
          this.setErrorText(error)
        })
    },
    getHighestRatingMovies () {
      const allMovies = this.moviesList.slice()
      this.moviesByRating = allMovies.sort((a, b) =>
        (a.rating.average > b.rating.average) ? -1 : 1
      )
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
