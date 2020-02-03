<template>
  <v-container>
    <v-row v-if="loading" justify="center" align="center">
      <div class="text-center ma-12">
        <v-progress-circular :size="150" :width="8" :rotate="-90" indeterminate color="#B0BEC5" />
      </div>
    </v-row>
    <div v-else style="padding-top: 20px">
      <v-layout wrap>
        <v-flex xs12 mr-1 ml-1>
          <v-card>
            <v-img :src="movie.image.original" aspect-ratio="2" />
            <v-card-title primary-title>
              <div>
                <h2 class="headline mb-0">
                  {{ movie.name }}-{{ movie.premiered }}
                </h2>
                <p v-html="movie.summary" />
                <!-- {{ movie.summary }} -->
                <h3>
                  Actors:
                </h3>
                <a v-for="(actor, index) in cast" :key="index" v-bind:href="actor.person.url">
                  <span>{{ actor.person.name + ',  ' }}</span>&#32;
                </a>
                {{ movie.Actors }}
                <h4>
                  Rating:
                </h4>
                {{ movie.rating.average }}
                <h4>
                  Genre:
                </h4>
                <p> {{ genres }} </p>
                <h5>
                  Official site:
                </h5>
                <a v-bind:href="movie.officialSite">
                  <span>{{ movie.officialSite }}</span>&#32;
                </a>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn @click="back" text color="green">
                back
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
  </v-container>
</template>

<script>
import axios from 'axios'
import mazeApi from '@/middleware/MazeApi'

export default {
  //   props: ['id'],

  data () {
    return {
      id: this.$route.params.id,
      movie: '',
      genres: '',
      cast: '',
      loading: true
    }
  },

  created () {
    console.log('asdasd')
  },
  mounted () {
    axios.all([mazeApi.fetchMovieById(this.id), mazeApi.fetchShowCast(this.id)])
      .then(axios.spread((...responses) => {
        this.movie = responses[0]
        this.genres = responses[0].genres.join(', ')
        this.loading = false
        this.cast = responses[1]
        console.log(responses[1])
      })).catch((error) => {
        console.log(error)
      })
    // mazeApi
    //   .fetchMovieById(this.id)
    //   .then((response) => {
    //     this.movie = response
    //     this.genres = response.genres.join(', ')
    //     this.loading = false
    //   })
    //   .fetchShowCast(this.id)
    //   .then((res) => {
    //     this.cast = res.person.name.join(', ')
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })
  },
  methods: {
    back () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="stylus" scoped>
.v-progress-circular {
  top: 5rem;
}

.v-card {
  top: 3rem;
}
</style>
