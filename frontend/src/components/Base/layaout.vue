<template>
  <navbar></navbar>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import axios from "axios";
import {useLoginStore} from "../../stores/counter"
import Navbar from "@/components/Base/navbar.vue";

export default defineComponent({
  name: "layaout",
  components: {Navbar},
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    async Login(): Promise<void> {
      const loginStore = useLoginStore()
      const apiClient = axios.create({
        baseURL: "http://localhost:3001/",
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = {
        password: this.password,
        email: this.email
      }
      const response = await apiClient.post('Auth/login', data)
      if (response.status == 200) {
        const token = response.data.acces_token
        loginStore.setToken(token)
        await this.$router.push("/");
      }
      await this.$router.push("/about");
    }
  }
})
</script>


<style scoped>

</style>