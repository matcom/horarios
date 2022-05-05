<script setup lang="ts">
import {RouterView} from 'vue-router'
import layaout from "@/components/Base/layaout.vue";

</script>

<template>
 <header>
   <layaout></layaout>
 </header>


  <RouterView/>
</template>

<style>
@import '@/assets/base.css';

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}


</style>
