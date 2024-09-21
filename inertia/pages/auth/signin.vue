<script setup lang="ts">
import { router } from '@inertiajs/vue3';
import { reactive } from 'vue';


defineProps<{
    csrfToken: string
}>()

const form = reactive({
    email: null,
    password: null,
    pseudo: null,
})

function submit() {
    try {
        router.post('/api/signin', form)
    } catch (error) {
        console.log(error)
    }
}
</script>

<template>
    <div class="container mx-auto">
        <form @submit.prevent="submit" novalidate method="post" action="/signin">
            <div class="mt-2">
                <input type="email" name="email" id="email" v-model="form.email" />
            </div>

            <input type="hidden" name="_csrf" :value="csrfToken" />

            <div class="mt-2">
                <input type="password" name="password" id="password" v-model="form.password" />
            </div>
            <div class="mt-2">
                <input type="text" name="pseudo" id="pseudo" v-model="form.pseudo" />
            </div>
            <button type="submit">Button text</button>
        </form>
    </div>
</template>