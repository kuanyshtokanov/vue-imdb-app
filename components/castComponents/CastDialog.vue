<template>
  <v-dialog v-model="dialogIsActive" width="500">
    <v-card>
      <v-img
        :src="actorDetails.person.image.original"
        max-height="300"
        aspect-ratio="1"
        contain
        lazy-src="Wait a bit more!"
      />
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
        <v-btn @click="closeDialog()" color="primary" text>
          back
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: ['details', 'dialog', 'closeDialog'],
  data () {
    return {
      dialogIsActive: this.dialog,
      actorDetails: this.details
    }
  },
  watch: {
    dialog (val) {
      this.dialogIsActive = val
    },
    details (val) {
      this.actorDetails = val
    },
    dialogIsActive (val) {
      if (!val) {
        this.closeDialog()
      }
    }
  }
}
</script>
