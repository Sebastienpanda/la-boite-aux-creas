<script setup lang="ts">
import { UserSchema } from '../../types/users_schema.js';

defineProps<{
  user?: UserSchema
}>()

</script>

<template>
  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
  {{ user?.email }}
</template>