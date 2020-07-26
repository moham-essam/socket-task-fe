<template>
    <div>
        <div>
            <ul>
                <li v-for="(error, index) of errors" :key="index">{{ error }}</li>
            </ul>
        </div>
        <form @submit="login($event)">
            <div class="form-input">
                <label for="username">Username</label>
                <input v-model="username" type="text" name="username" id="username" required>
            </div>
            <div class="form-input">
                <label for="password">Password</label>
                <input v-model="password" id="password" type="password" name="password" required>
            </div>
            <button @click="login($event)" type="submit">Register</button>
        </form>
    </div>
</template>

<script>
    import axios from 'axios';
    import {environment} from "../enviroments/dev.env";

    export default {
        name: "Register",
        data: () => ({
            username: null,
            password: null,
            errors: null,
        }),
        methods: {
            login(e) {
                e.preventDefault();
                axios.post(environment.API_URL + 'users/register', {username: this.username, password: this.password})
                    .then(res => {
                        localStorage.setItem('accessToken', res.data.accessToken);
                        this.$router.push('chat')
                    })
                    .catch(e => {
                        this.errors = e.response.data.message;
                    });
            }
        }
    }
</script>

<style scoped>
    .form-input {
        margin-bottom: 0.5rem;
    }

    label {
        margin-right: 0.2rem;
    }
</style>
