<template>
  <v-dialog v-model="dialogIsActive" width="300">
    <v-card>
      <v-card-title primary-title>
        <div>
          <h2 class="headline mb-0">{{ errorText }}</h2>
        </div>
      </v-card-title>
      <v-card-actions>
        <v-btn @click="closeDialog()" color="primary" text>
          close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>

export default {
  data () {
    return {
      dialogIsActive: false,
      errorText: ''
    }
  },
  created () {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'error/setErrorFlag') {
        this.dialogIsActive = state.error.isError
      }
      if (mutation.type === 'error/setErrorText') {
        this.errorText = state.error.errText
      }
    })
  },
  methods: {
    closeDialog () {
      this.dialogIsActive = false
      this.errorText = ''
    }
  }
}
</script>
