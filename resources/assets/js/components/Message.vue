<template>
  <div>
    <div class="message" v-for="(message,index) in messages" :class="{own: message.userId == userId}">
        <!-- {{messages[index]}} {{index}} -->
      <div class="username" v-if="index>0 && messages[index-1].userId != message.userId">{{message.user}}</div>
      <div class="username" v-if="index == 0">{{message.user}}</div>
      <div style="margin-top: 5px"></div>
      <div class="content">
        <div v-html="message.content"></div>
      </div>
    </div>
  </div>
</template>
    <!-- <v-card>
        <v-list two-line>
            <template v-for="(message,index) in messages">
                <v-list-tile v-bind:key="index">
                <v-list-tile-avatar>
                    <img src="//vuetifyjs.com/static/doc-images/lists/1.jpg">
                </v-list-tile-avatar>
                <v-list-tile-content v-if="message.userId === userId " style="background-color: gray !important">
                    <v-list-tile-title v-html="message.user"></v-list-tile-title>
                    <v-list-tile-sub-title v-html="message.content"></v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-content v-else style="background-color: green !important">
                    <v-list-tile-title v-html="message.user"></v-list-tile-title>
                    <v-list-tile-sub-title v-html="message.content"></v-list-tile-sub-title>
                </v-list-tile-content>
                </v-list-tile>
            </template>
        </v-list>
    </v-card> -->
<script>
export default {
    name: 'Message',
    props: [
        'messages'
    ],
    computed:{
        userId(){
            return this.$store.getters.getUserId
        }
    }
}
</script>
