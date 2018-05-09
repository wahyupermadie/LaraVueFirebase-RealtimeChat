<template>
  <div>
    <div class="message" v-for="(message,index) in messages" :class="{own: message.userId == userId}">
        <!-- <div v-for="flag_user in message.flag" > -->
            <div v-if="message.flag.user1 == userId || message.flag.user2 == userId">
                
            </div>
            <div v-else>
                <!-- {{messages[index-1]}} -->
                <div class="username" v-if="index>0 && messages[index-1].userId != message.userId">{{message.user}}</div>
                <div class="username" v-if="index == 0">{{message.user}}</div>
                <div style="margin-top: 5px"></div>
                <div class="content">
                    <div v-html="message.content"></div>
                </div>
            </div>
        <!-- </div> -->
    </div>
  </div>
</template>
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
