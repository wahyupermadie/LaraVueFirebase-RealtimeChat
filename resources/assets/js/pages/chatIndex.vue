<template>
    <v-flex xs12 sm6 offset-sm3>
        <message :messages="messages"></message>
        <form>
            <v-text-field   
                label="Input Chat"
                v-model="content"
                required
            >
            </v-text-field>
            <v-btn @click="sendMessage">submit</v-btn>
        </form>
    </v-flex>
</template>
<script>
import axios from "axios"
import * as firebase from 'firebase'
import Message from '../components/Message'
export default {
    props: ['id'],
    components: {
        Message
    },
    data(){
        return {
            content: '',
            chatMessages: [],
            emojiPanel: false,
            currentRef: {}
        }
    },
    mounted () {
      this.loadChat()
    },
    watch: {
      '$route.params.id' (newId, oldId) {
        this.currentRef.off('child_added', this.onChildAdded)
        this.loadChat()
      }
    },
    computed:{
        messages () {
            return this.chatMessages
        },
        onChildAdded () {
            var vm = this
            var onChildAdded = function (snapshot) {
            let message = snapshot.val()
            /*eslint-disable */
            var urlPattern = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig
            /*eslint-enable */
            message.content = message.content
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#039;')
            message.content = message.content.replace(urlPattern, "<a href='$1'>$1</a>")
            vm.chatMessages.push(vm.processMessage(message))
            }
            return onChildAdded
        },
    },
    methods: {
        sendMessage () {
                const user_name = localStorage.getItem('user_name');
                const id_chat = this.$route.params.id
                const user_id = this.$store.getters.getUserId
                if (this.content !== '') {
                    const content_data = { 
                        username: user_name, 
                        userId: user_id,
                        content: this.content, 
                        date: new Date().toString(), 
                        chatID: id_chat 
                    }
                    this.$store.dispatch('sendMessage',content_data)
                    this.content = ''
            }
        },
        loadChat () {
            if (this.$route.params.id !== undefined) {
                this.chatMessages = []
                let chatID = this.$route.params.id
                this.currentRef = firebase.database().ref('messages').child(chatID).child('messages').limitToLast(20)
                this.currentRef.on('child_added', this.onChildAdded)
            }
        },
        processMessage (message) {
            /*eslint-disable */
            var imageRegex = /([^\s\']+).(?:jpg|jpeg|gif|png)/i
            /*eslint-enable */
            if (imageRegex.test(message.content)) {
            message.image = imageRegex.exec(message.content)[0]
            }
            return message
        },
    }
}
</script>
