<template>
    <section>
        <div class="buttons">
            <button class="button is-medium" @click="snackbar">
                Launch snackbar (default)
            </button>

            <button class="button is-medium is-warning" @click="warning">
                Launch snackbar (custom)
            </button>

            <button class="button is-medium is-danger" @click="danger">
                Launch snackbar (custom)
            </button>
        </div>
    </section>
</template>

<script>
export default {
  name: 'ErrorModal',
  methods: {
    danger () {
      this.$buefy.snackbar.open({
        duration: 5000,
        message: 'Snackbar with red action, positioned on bottom-left and a callback.<br>Note: <em>Message can include html</em>.',
        type: 'is-danger',
        position: 'is-bottom-left',
        actionText: 'is-top',
        queue: false,
        onAction: () => {
          this.$buefy.toast.open({
            message: 'Action pressed',
            queue: false
          })
        }
      })
    }
  }
}
</script>
