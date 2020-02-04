<template>
  <v-app>
    <v-container>
      <v-row v-if="loading" justify="center" align="center">
        <div class="text-center ma-12">
          <v-progress-circular
            :size="150"
            :width="8"
            :rotate="-90"
            value="showWait"
            indeterminate
            color="#B0BEC5">
            {{ showWait }}
          </v-progress-circular>
        </div>
      </v-row>
      <div v-else>
        <v-layout wrap>
          <v-flex xs12 mr-1 ml-1>
            <v-card>
              <v-img :src="movie.image.original" height="auto" aspect-ratio="1" />
              <v-card-title primary-title>
                <div>
                  <h2 class="headline mb-0">
                    {{ movie.name + ' ' }}-{{ ' ' + movie.premiered }}
                  </h2>
                  <p v-html="movie.summary" />
                  <h3>Actors:</h3>
                  <!-- <v-btn v-for="(actor, index) in cast" :key="index" v-bind:href="actor.person.url" text> -->
                  <v-btn
                    v-for="(actor, index) in cast"
                    :key="index"
                    @click="openDialog(actor)"
                    text
                  >
                    {{ actor.person.name + ', ' }}
                  </v-btn>
                  <h4>Rating:</h4>
                  {{ movie.rating.average }}
                  <h4>Genre:</h4>
                  <p>{{ genres }}</p>
                  <h5>Official site:</h5>
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
        <v-layout row wrap>
          <v-flex xs12>
            <div class="text-xs-center">
              <v-dialog v-model="dialog" width="600">
                <v-card>
                    <v-img :src="actorDetails.person.image.original" height="auto" aspect-ratio="1" />
                    <v-card-title primary-title>
                        <div>
                        <h2 class="headline mb-0">
                            {{ actorDetails.person.name + ' ' }}
                        </h2>
                        <h4>Character:</h4>
                        {{ actorDetails.character.name }}
                        <h3>Country:</h3>
                        {{ actorDetails.person.country.name }}
                        <h4>Born:</h4>
                        {{ actorDetails.person.birthday }}
                        <h5>Details:</h5>
                        <a v-bind:href="actorDetails.person.url">
                            <span>{{ actorDetails.person.url }}</span>&#32;
                        </a>
                        </div>
                    </v-card-title>
                    <v-card-actions>
                        <v-btn @click="dialog = false" color="primary" text>
                        back
                        </v-btn>
                    </v-card-actions>
              </v-card>
              </v-dialog>
            </div>
          </v-flex>
        </v-layout>
      </div>
    </v-container>
  </v-app>
</template>

<script>
import axios from 'axios'
import mazeApi from '@/middleware/MazeApi'

// var VueLoadImage = require('vue-load-image').default

export default {
  data () {
    return {
      id: this.$route.params.id,
      movie: '',
      genres: '',
      cast: '',
      loading: true,
      dialog: false,
      actorDetails: {},
      showWait: 'Prepare for AWESOME!'
    }
  },

  created () {
    console.log('asdasd')
  },
  mounted () {
    axios
      .all([mazeApi.fetchMovieById(this.id), mazeApi.fetchShowCast(this.id)])
      .then(
        axios.spread((...responses) => {
          this.movie = responses[0]
          this.genres = responses[0].genres.join(', ')
          this.loading = false
          this.cast = responses[1]
          this.actorDetails = responses[1][0]
          console.log(responses[1])
        })
      )
      .catch((error) => {
        console.log(error)
      })
  },
  methods: {
    back () {
      this.$router.push('/')
    },
    openDialog (actor) {
      this.dialog = true
      this.actorDetails = actor
    }
  }
}
</script>

<style lang="stylus" scoped>
.v-progress-circular {
  top: 5rem
}

.v-card {
  top: 3rem
}
</style>
