<script setup lang="ts">
import { router } from '@inertiajs/vue3';
import { UserSchema } from '../../../types/users_schema.js';


defineProps<{
    user: UserSchema
}>()



const logout = () => {
    try {
        router.post('api/logout')
    } catch (error) {
        console.log(error)
    }
}



</script>


<template>
    {{ user.email }}
    <button @click="logout">
        Se déconnecter
    </button>
</template>