<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Sign Up</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <form @submit.prevent="onSignup">
          <v-layout column>
            <v-flex>
              <v-text-field
                v-model="name"
                name="name"
                label="Nama"
                id="name"
                type="text"
                required></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                v-model="email"
                name="email"
                label="Email"
                id="email"
                type="email"
                required></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                v-model="password"
                name="password"
                label="Password"
                id="password"
                type="password"
                required></v-text-field>
            </v-flex>
            <v-flex class="text-xs-center" mt-5>
              <v-btn color="primary" type="submit">Sign Up</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
    data(){
        return {
            name: '',
            email: '',
            password: ''
        }
    },
    methods: {
        onSignup () {
            const user = {
                name: this.name,
                email: this.email,
                password: this.password
            }
            this.$store.dispatch('register', user)
        },
    }
}
</script>