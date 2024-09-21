<script setup lang="ts">
import { router } from '@inertiajs/vue3';
import { reactive } from 'vue';


defineProps<{
    csrfToken: string
}>()


const form = reactive({
    email: null,
    password: null
})


const login = () => {
    try {
        router.post('api/login', form)
    } catch (error) {
        console.log(error)
    }
}
</script>

<template>

    <form @submit.prevent="login" novalidate action="/login" method="post">
        <input type="hidden" name="_csrf" :value="csrfToken" />
        <input type="email" name="email" id="email" v-model="form.email">
        <input type="password" name="password" id="password" v-model="form.password">
        <button type="submit">
            Se connecter
        </button>
    </form>

</template>