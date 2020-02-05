<template>
  <v-app>
    <v-container>
      <v-row v-if="loading" justify="center" align="center">
        <Progress showWait="Prepare for AWESOME MOVIE!" />
      </v-row>
      <div v-else>
        <v-layout wrap>
          <v-flex xs12 mr-1 ml-1>
            <MovieDetails :movie="movie" :cast="cast" :openDialog="openDialog" />
          </v-flex>
        </v-layout>
        <v-layout row wrap v-if="cast.length > 0">
          <v-flex xs>
            <div class="text-xs-center">
              <CastDialog :dialog="dialog" :closeDialog="closeDialog" :details="actorDetails" />
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
import Progress from '~/components/progressComponents/Progress'
import CastDialog from '~/components/castComponents/CastDialog'
import MovieDetails from '~/components/movieComponents/MovieDetails'

// var VueLoadImage = require('vue-load-image').default

export default {
  components: {
    Progress,
    CastDialog,
    MovieDetails
  },
  data () {
    return {
      id: this.$route.params.id,
      movie: {},
      genres: '',
      cast: [],
      loading: true,
      dialog: false,
      actorDetails: {},
      showWait: 'Prepare for AWESOME!'
    }
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
    },
    closeDialog () {
      this.dialog = false
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
