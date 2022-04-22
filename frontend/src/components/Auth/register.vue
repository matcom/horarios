<template>
  <main class="form-signin">
    <div class="card">
      <div class="card-body">
        <form>
          <h2 class="h3 mb-3 fw-normal text-center">Register</h2>

          <div class="form-group">
            <label>Email address</label>
            <input v-model="email" type="email" class="form-control form-control-lg" placeholder="Email address"/>
          </div>

          <div class="form-group">
            <label>Password</label>
            <input type="password" v-model="password" class="form-control form-control-lg" placeholder="Password"/>
          </div>

          <div class="form-group">
            <label>Username</label>
            <input type="text" v-model="username" class="form-control form-control-lg" placeholder="Username"/>
          </div>

          <div class="checkbox mb-3">
            <label><input type="checkbox" value="remember-me"> Remember me</label>
          </div>

          <button class="w-100 btn btn-lg btn-primary" @click="Register()">Register</button>

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

const apiClient = axios.create({
  baseURL: "http://localhost:3001/",
});
export default defineComponent({
  name: "register",
  data() {
    return {
      email: '',
      password: '',
      username:''
    }
  },
  methods: {
    async Register(): Promise<void> {
      console.log(this.email,this.password)

      console.log('send request')
      const response = await apiClient.post( 'auth/register',{
        password: this.password,
        email: this.email,
        username:this.username
      })
      console.log('end')
      if (response.status == 200) {
        console.log(response.data)
        //guardar el token
        //redirect
        await this.$router.push("/");
      }
      await this.$router.push("/about");
    }
  }
})
</script>

