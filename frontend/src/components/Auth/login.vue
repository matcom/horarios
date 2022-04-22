<template>
  <main class="form-signin">
    <div class="card">
      <div class="card-body">
        <form>
          <h2 class="h3 mb-3 fw-normal text-center">Please sign in</h2>

          <div class="form-group">
            <label>Email address</label>
            <input v-model="email" type="email" class="form-control form-control-lg" placeholder="Email address"/>
          </div>

          <div class="form-group">
            <label>Password</label>
            <input type="password" v-model="password" class="form-control form-control-lg" placeholder="Password"/>
          </div>

          <div class="checkbox mb-3">
            <label><input type="checkbox" value="remember-me"> Remember me</label>
          </div>

          <button class="w-100 btn btn-lg btn-primary" @click="this.Login()">Login</button>

        </form>
      </div>
    </div>
    <p class="mt-3 mb-3 text-muted text-center">© 2020–2025</p>
  </main>
</template>


<style scoped lang="css">
body {
  display: flex;
  padding-top: 60px;
  padding-bottom: 60px;
  align-items: center;
  background-color: #f6f6f6;
}

.form-signin {
  width: 100%;
  max-width: 450px;
  margin: auto;
}

label {
  font-weight: 600;
}
</style>

<script lang="ts">
import {defineComponent} from "vue";
import axios from "axios";
import {useLoginStore} from "../../stores/counter"

const apiClient = axios.create({
  baseURL: "http://localhost:3001/",
});
export default defineComponent({
  name: "login",
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    Login(){
      this.TempLogin().then(()=>console.log('plll')).catch((err)=>console.log(err))
    },
    async TempLogin(): Promise<void> {
      const loginStore = useLoginStore()

      const data = {
        password: this.password,
        email: this.email
      }
      console.log('voy a hacer la peticion')
      const response = await apiClient.post('auth/login', data)
      console.log('termine la peticion')
      console.log(response)
      if (response.status == 200) {
        const token = response.data.acces_token
        console.log(token)
        loginStore.setToken(token)
        await this.$router.push("/");
      }
      await this.$router.push("/about");
    }
  }
})
</script>

