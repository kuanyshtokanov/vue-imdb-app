<template>
  <v-container>
    <v-container v-if="loading">
      <div class="text-xs-center">
        <v-progress-circular :size="150" :width="8" indeterminate color="green" />
      </div>
    </v-container>

    <v-container v-else grid-list-xl>
      <div class="text-center">
        <v-carousel
          cycle
          height="450"
          hide-delimiter-background
          show-arrows-on-hover
        >
          <v-carousel-item
            v-for="(slide, i) in currentMoviesList"
            :key="i"
          >
            <v-row
              class="fill-height"
              align="center"
              justify="center"
            >
              <div>
                <v-card>
                  <v-img :src="slide.image ? slide.image.medium : ''" aspect-ratio="1" />
                  <v-card-title primary-title>
                    <div>
                      <h2>{{ slide.Title }}</h2>
                      <div>Year: {{ slide.premiered }}</div>
                      <div>Type: {{ slide.type }}</div>
                      <div>IMDB-id: {{ slide.imdbID }}</div>
                    </div>
                  </v-card-title>

                  <v-card-actions class="justify-center">
                    <v-btn @click="singleMovie(slide.id)" text color="green">
                      View
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </div>
            </v-row>
          </v-carousel-item>
        </v-carousel>
      </div>
      <v-layout wrap style="padding-top: 10px">
        <v-flex v-for="(item, index) in currentMoviesList" :key="index" xs4 mb-2>
          <v-card>
            <v-img :src="item.image ? item.image.medium : ''" aspect-ratio="1" />
            <v-card-title primary-title>
              <div>
                <h2>{{ item.Title }}</h2>
                <div>Year: {{ item.premiered }}</div>
                <div>Type: {{ item.type }}</div>
                <div>IMDB-id: {{ item.imdbID }}</div>
              </div>
            </v-card-title>

            <v-card-actions class="justify-center">
              <v-btn @click="singleMovie(item.id)" text color="green">
                View
              </v-btn>
            </v-card-actions>
          </v-card>
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

export default {
  data () {
    return {
      movieName: this.$route.params.name,
      moviesList: [],
      currentMoviesList: [],
      loading: true,
      pages: 0,
      page: 1
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
  methods: {
    singleMovie (id) {
      this.$router.push('/movies/' + id)
    },
    next (page) {
      this.currentMoviesList = this.moviesList.slice(page > 1 ? (page - 1) * 9 : 0, page * 9)
      console.log(this.currentMoviesList)
    }
  }
}
</script>

<style lang='stylus' scoped>
.v-progress-circular {
  margin: 12rem;
}
</style>
