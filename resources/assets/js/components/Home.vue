<template>
<v-flex xs12 sm6 offset-sm3>
  <v-card>
    <v-list two-line>
      <template v-for="friend in friends">
        <v-list-tile :key="friend.id" @click="openChat(friend)">
          <v-list-tile-avatar>
            <img src="//vuetifyjs.com/static/doc-images/lists/1.jpg">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-html="friend.name"></v-list-tile-title>
            <v-list-tile-sub-title v-html="friend.email"></v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-card>
</v-flex>
</template>


<script>
 /* eslint-disable */
export default {
  name: 'Home',
  data() {
    return {
      items: [
        // { header: 'Today' },
        { avatar: 'https://vuetifyjs.com/static/doc-images/lists/1.jpg', title: 'Brunch this weekend?', subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?" },
        { divider: true, inset: true },
        { avatar: 'https://vuetifyjs.com/static/doc-images/lists/2.jpg', title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>', subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend." },
        { divider: true, inset: true },
        { avatar: 'https://vuetifyjs.com/static/doc-images/lists/3.jpg', title: 'Oui oui', subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?" }
      ],
      msg: ''
    }
  },
  computed: {
    friends(){
      console.log(this.$store.getters.friends)
      return this.$store.getters.friends
    },
    getUserId(){
      return this.$store.getters.getUserId
    }
  },
  created(){
      this.$store.dispatch('loadFriends')
  },
  methods: {
    openChat(friend){
      // console.log(friend)
      const dataChat = {
        user1:this.getUserId,
        user2:friend.id,
        friend:friend
      }
      this.$store.dispatch('createChat',dataChat)
      // this.$router.push('/chat/' + id)
    }
  }
}
</script>


<style>
.text {
  margin:auto
}
</style>
