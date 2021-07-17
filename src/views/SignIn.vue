<template>
    <div class="container">
        <b-form @submit.prevent="submit">
            <div
              class="alert"
              :class="error==1 ? 'alert-danger':'alert-success'"
              v-if="show_message"
            >
              <span v-for="error in errors" :key="error">
                  {{ error }} <br>
              </span>
            </div>

            <b-form-group
                id="input-group-1"
                label="Username:"
                label-for="input-1"
                class="mt-3"
            >
                <b-form-input
                    type="text"
                    name="username"
                    id="feedback-user"
                    placeholder="Enter email"
                    v-model="form.username"
                >
                </b-form-input>
            </b-form-group>
            <b-form-group
                id="input-group-2"
                label="Password:"
                label-for="input-2"
                class="mt-3"
            >
                <b-form-input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter password"
                    v-model="form.password"
                >
                </b-form-input>
            </b-form-group>

            <div class="mt-3 pull-right">
                <b-button type="submit" variant="primary">Sign In</b-button>
            </div>
        </b-form>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'SignIn',
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      error: 0,
      show_message: false,
      errors: []
    }
  },
  methods: {
    ...mapActions({
      signIn: 'auth/signIn'
    }),
    submit () {
      this.show_message = false
      this.errors = []
      this.error = 0
      if (this.form.username === '' || this.form.username === null) {
        this.show_message = true
        this.error = 1
        this.errors.push('Username is required!')
      }

      if (this.form.password === '' || this.form.password === null) {
        this.show_message = true
        this.error = 1
        this.errors.push('Password is required!')
      }
      if (!this.show_message) {
        this.signIn(this.form).then(() => {
          this.show_message = false
          this.errors = []
          this.error = 0
          this.$router.replace({
            name: 'pokemonlist'
          })
        })
      }
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 1px solid steelblue;
  padding: 30px;
  border-radius: 5px;
}
</style>
