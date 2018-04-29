<template>
  <v-app>
    <v-navigation-drawer v-model="sidebar" app>
      <v-list>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app>
      <span class="hidden-sm-and-up">
        <v-toolbar-side-icon @click="sidebar = !sidebar">
        </v-toolbar-side-icon>
      </span>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          {{ appTitle }}
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          flat
          v-for="items in menuItems"
          :key="items.title"
          :to="items.path">
          <v-icon left dark>{{ items.icon }}</v-icon>
          {{ items.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    
    <v-content>
      <router-view></router-view>
    </v-content>
    
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        appTitle: 'Awesome App',
        sidebar: false,
      }
    },
    computed: {
      menuItems () {
        let items = [
          { title: 'Sign Up', path: '/signup', icon: 'face' },
          { title: 'Sign In', path: '/signin', icon: 'lock_open' }
        ]
        if (this.userIsAuthenticated) {
          items = [
            { title: 'Home', path: '/home', icon: 'home' },
          ]
        }
        return items
      },
      userIsAuthenticated () {
        // console.log(this.$store.getters.user)
        return localStorage.getItem('access_token');
      },
    }
  }
</script>