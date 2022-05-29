<template>
  <div id='faculties'>
    <div class='row'>
      <div class='col-12'>
        <div class='card w-100 border-bottom-primary mb-1'>
          <div class='card-header py-2 bg-white'>
            <div class='row align-items-center'>
              <div class='col'>
                <h5 class='m-0 font-weight-bold text-primary'> Profesores
                </h5>
              </div>
              <div class='col'>
                <form class='form-inline justify-content-end'>
                  <input type='text' v-model='text' class='form-control bg-light border-0 small'
                         placeholder='Buscar ...' aria-label='Search' aria-describedby='basic-addon2'>
                  <button class='btn ml-2' @click.prevent='setVal()'>
                    <i class='fas fa-sort-alpha-down'></i>
                  </button>
                  <button class='btn ml-2' @click.prevent='unsetVal()'>
                    <i class='fas fa-sort-alpha-up'></i>
                  </button>
                  <button class='btn ml-2' @click.prevent='addTeacher()'>
                    <i role='button' class='fas fa-plus'></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class='card'>
          <div class='card-body p-0'>
            <div class='list-group'>
              <button v-if="filterList(teachers, text, 'email').length === 0" type='button'
                      class='list-group-item list-group-item-action' disabled>No hay resultados para mostrar
              </button>
              <router-link v-for="teacher in filterList(teachers, text, 'email')" :key='teacher.email'
                           :to="{name: 'teacherPage', params: {teacherId: teacher.id}}"
                           class='list-group-item list-group-item-action'>{{ teacher.fullName }} ({{ teacher.email }})
                <div class='form-inline justify-content-end'>
                  <i class='fas fa-trash' @click.prevent='removeTeacher(teacher.id)'></i>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--    Modal Create-->
    <div class='modal fade' id='modalCreate' tabindex='-1' role='dialog' aria-labelledby='modalCreate'
         aria-hidden='true' ref='modalEdit'>
      <div class='modal-dialog' role='document'>
        <div class='modal-content'>
          <div class='modal-header'>
            <h5 class='modal-title' id='exampleModalLabel'>Nuevo Profesor</h5>
            <button type='button' class='close' data-dismiss='modal' aria-label='Close'>
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
          <div class='modal-body'>
            <form>
              <div class='row'>
                <div class='col-md-6'>
                  <div class='form-group'>
                    <label for='input-fullName' class='col-form-label'>Nombre completo:</label>
                    <input type='text' class='form-control' id='input-fullName' v-model='newTeacher.fullName'>
                  </div>
                  <div class='form-group'>
                    <label for='input-shortName' class='col-form-label'>Nombre:</label>
                    <input type='text' class='form-control' id='input-shortName' v-model='newTeacher.shortName'>
                  </div>
                  <div class='form-group'>
                    <label for='input-priority' class='col-form-label'>Prioridad:</label>
                    <input type='number' class='form-control' id='input-priority' v-model='newTeacher.priority' />
                  </div>
                </div>
                <div class='col-md-6'>
                  <div class='form-group'>
                    <label for='input-description' class='col-form-label'>Email:</label>
                    <input class='form-control' id='input-description' v-model='newTeacher.email'>
                  </div>

                  <div class='form-group'>
                    <label class='col-form-label'> Elegir univerisidad:</label>
                    <button class='btn btn-secondary btn-lg dropdown-toggle' type='button' id='input-select-university'
                            data-toggle='dropdown'
                            aria-haspopup='true' aria-expanded='false'
                            style='width: 220px; height: 40px;'
                    >
                      {{ btnSelectUniversityText }}
                    </button>

                    <div class='dropdown-menu'>
                      <a v-for='u in this.universities' :key='u.id' class='dropdown-item'
                         @click.prevent='chooseUniversity(u.fullName)'>{{ u.fullName }}</a>
                    </div>
                  </div>

                  <div class='form-group'>
                    <label class='col-form-label'> Elegir facultad:</label>
                    <button class='btn btn-secondary btn-lg dropdown-toggle' type='button' id='input-select-faculty'
                            data-toggle='dropdown'
                            aria-haspopup='true' aria-expanded='false'
                            style='width: 220px; height: 40px;'
                            :disabled='true'
                    >
                      {{ btnSelectFacultyText }}
                    </button>

                    <div class='dropdown-menu'>
                      <a v-for='u in this.faculties' :key='u.id' class='dropdown-item'
                         @click.prevent='chooseFaculty(u.fullName)'>{{ u.fullName }}</a>
                    </div>
                  </div>


                  <div class='form-group'>
                    <label for='input-description' class='col-form-label'>Descripcion:</label>
                    <textarea class='form-control' id='input-description' v-model='newTeacher.description'></textarea>
                  </div>

                </div>
              </div>
            </form>
          </div>
          <div class='modal-footer'>
            <button type='button' class='btn btn-secondary' data-dismiss='modal'>Cancelar</button>
            <button type='button' class='btn btn-primary' data-dismiss='modal' @click='saveTeacher()'>
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Teachers',
  data() {
    return {
      btnSelectUniversityText: 'Elegir universidad',
      btnSelectFacultyText: 'Elegir facultad',
      teachers: [],
      text: '',
      val: 1,
      universities: [],
      faculties: [], // indica la facultad de la universidad elegida
      newTeacher: {
        fullName: '',
        shortName: '',
        priority: '',
        description: '',
        email: '',
      },
    };
  },
  methods: {
    loadData() {
      this.$store.state.profile.loadMinData();
      let token = this.$store.state.profile.data.token;

      this.$store.state.teachers.getData(token)
        .then(result => {
          if (result === true) {
            this.teachers = this.$store.state.teachers.data;
          }
        });

      this.$store.state.universities.getAll(token)
        .then(result => {
          if (result === true)
            this.universities = this.$store.state.universities.data;
        });
    },
    filterList(list, box, prop) {
      let tmp = list.slice().sort(this.comparer(prop, this.val));
      return tmp.filter(elem => {
        return elem[prop].toString().toLowerCase().includes(box.toLowerCase());
      });
    },
    setVal() {
      this.val = 1;
    },
    unsetVal() {
      this.val = -1;
    },
    removeTeacher(teacherId) {
      this.$store.state.profile.loadMinData();
      let token = this.$store.state.profile.data.token;

      this.$store.state.teachers.delete(token, teacherId).then(result => {
        if (result === true) {
          this.teachers = this.teachers.slice().sort((a, b) => b.shortName - a.shortName);
        } else {
          this.$router.push({ name: 'notFoundPage' });
        }
      });
    },
    addTeacher() {
      $('#modalCreate').modal('show');
    },
    saveTeacher() {
      this.$store.state.profile.loadMinData();
      let token = this.$store.state.profile.data.token;

      this.$store.state.teachers.create(token, this.newTeacher).then(result => {
        if (result === true) {
          this.teachers.push(this.$store.state.teachers.data);
          this.teachers = this.teachers.slice().sort((a, b) => b.shortName - a.shortName);
        } else {
          this.$router.push({ name: 'notFoundPage' });
        }
      });
    },
    comparer(prop, val) {
      return function(a, b) {
        if (a[prop] > b[prop]) {
          return 1 * val;
        } else if (a[prop] < b[prop]) {
          return -1 * val;
        } else {
          return 0;
        }
      };
    },
    chooseUniversity(universityFullName) {
      this.btnSelectUniversityText = (this.universities.find(x => x.fullName === universityFullName)).shortName;

      // this.$store.state.profile.loadMinData();
      // let token = this.$store.state.profile.data.token;
      //
      // this.$store.state.faculties.getData(token)
      //   .then(result => {
      //     if (result === true) {
      //       this.teachers = this.$store.state.faculties.data;
      //     }
      //   });

    },
    chooseFaculty(facultyFullName) {
      this.btnSelectFacultyText = (this.faculties.find(x => x.fullName === facultyFullName)).shortName;
    },
  },
  created() {
    this.loadData();
  },
};
</script>

<style scoped>

</style>