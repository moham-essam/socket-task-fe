<template>
    <div>
        <div>
            <p>{{ error }}</p>
        </div>
        <form @submit="login($event)">
            <div class="form-input">
                <label for="username">Username</label>
                <input v-model="username" type="text" name="username" id="username">
            </div>
            <div class="form-input">
                <label for="password">Password</label>
                <input v-model="password" id="password" type="password" name="password">
            </div>
            <button @click="login($event)" type="submit">Login</button>
            <router-link id="register-btn" to="/register">Register</router-link>
        </form>
    </div>
</template>

<script>
    import axios from 'axios';
    import {environment} from "../enviroments/dev.env";

    export default {
        name: "Login",
        data: () => ({
            username: null,
            password: null,
            error: null,
        }),
        methods: {
            login(e) {
                e.preventDefault();
                axios.post(environment.API_URL + 'users/login', {username: this.username, password: this.password})
                    .then(res => {
                        localStorage.setItem('accessToken', res.data.accessToken);
                        this.$router.push('chat')
                    })
                    .catch(e => {
                        this.error = e.response.data.message;
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

    #register-btn {
        margin-left: 0.25rem;
    }
</style>
