<template>
  <listUsers :page="1"></listUsers>
</template>

<script>

import listUsers from '../components/Users/listUsers.vue'
export default {
  name: "Users",
  components: {listUsers}
}
</script>

<style scoped>

</style>