<template>
    <div id="container">
        <table border="1px">
            <tr>
                <th colspan="2">Messages</th>
            </tr>
            <tr v-for="message of messages" :key="message.id">
                <td>{{ message.username }}</td>
                <td>{{ message.message }}</td>
            </tr>
        </table>

        <div id="new-message">
            <form @submit="sendMessage($event)">
                <input v-model="newMessage" type="text" name="message">
                <button @click="sendMessage($event)" type="submit">Send</button>
            </form>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import {environment} from "../enviroments/dev.env";
    import * as io from 'socket.io-client';

    export default {
        name: "Chat",
        data: () => ({
            messages: [],
            newMessage: null,
            socket: null,
        }),
        methods: {
            sendMessage(event) {
                event.preventDefault();

                if (this.newMessage.length === 0) {
                    return;
                }

                axios.post(environment.API_URL + 'messages', {message: this.newMessage}, {headers: {authorization: `Bearer ${localStorage.getItem('accessToken')}`}}).then(() => {
                    this.newMessage = null;
                });
            }
        },
        created() {
            axios.get(environment.API_URL + 'messages', {headers: {authorization: `Bearer ${localStorage.getItem('accessToken')}`}})
                .then(res => {
                    this.messages = res.data.list;
                });

            this.socket = io(environment.SOCKET_URL, {
                transportOptions: {
                    polling: {
                        extraHeaders: {
                            authorization: localStorage.getItem('accessToken')
                        }
                    }
                }
            });

            this.socket.on('new_message', (message) => {
                this.messages.unshift(message);
            })
        }
    }
</script>

<style scoped>
    #container {
        width: 50%;
        margin: 0 auto;
    }

    #new-message {
        margin-top: 0.25rem;
    }

    table {
        width: 100%;
    }

    td, th {
        padding: 0.25rem;
    }
</style>
