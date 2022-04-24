<template>
  <main class="form-signin">
    <div class="card">
      <div class="card-body">
        <form>
          <h2 class="h3 mb-3 fw-normal text-center">Update</h2>

          <div class="form-group">
            <label>Email</label>
            <input v-model="email" type="email" class="form-control form-control-lg" placeholder="Email"/>
          </div>

          <div class="form-group">
            <label>Status</label>
            <input v-model="status" type="text" class="form-control form-control-lg" placeholder="Status"/>
          </div>

          <div class="form-group">
            <label>Roles</label>
            <input v-model="roles" type="text" class="form-control form-control-lg" placeholder="Roles"/>
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

          <button class="w-100 btn btn-lg btn-primary" @click="Create()">Update</button>

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

export default defineComponent({
  name: "create",
  data() {
    return {
      email: '',
      roles: '',
      status: '',
      password: '',
      username: ''
    }
  },
  methods: {
    async Create(): Promise<void> {
      const apiClient = axios.create({
        baseURL: "http://localhost:3001/",
        withCredentials: false,
        headers: {
          Accept: "applicacion/json",
          "Content-Type": "application/json; charset=utf-8",
          "Connection": "keep-alive",
          "keep-alive": "timeout=5"
        },
      });
      const response = await apiClient.post('Auth/register', {
        id: this.$route.params.id,
        data: {
          password: this.password,
          username: this.username,
          status: this.status,
          roles: this.roles
        }
      })
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

