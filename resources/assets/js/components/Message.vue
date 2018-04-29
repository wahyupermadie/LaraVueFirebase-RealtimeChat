<template>
    <v-card>
        <v-list two-line>
            <template v-for="(message,index) in messages">
                <v-list-tile v-bind:key="index">
                <v-list-tile-avatar>
                    <img src="//vuetifyjs.com/static/doc-images/lists/1.jpg">
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title v-html="message.user"></v-list-tile-title>
                    <v-list-tile-sub-title v-html="message.content"></v-list-tile-sub-title>
                </v-list-tile-content>
                </v-list-tile>
            </template>
        </v-list>
    </v-card>
</template>
<script>
export default {
    name: 'Message',
    props: [
        'messages'
    ],
}
</script>
