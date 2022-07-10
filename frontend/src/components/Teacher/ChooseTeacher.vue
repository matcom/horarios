<template>
  <div id='choose'>
    <div class='row'>
      <div class='col-12'>
        <div class='card mb-4 w-100 border-bottom-primary'>
          <div class='card-header py-3 bg-white'>
            <h5 class='m-0 font-weight-bold text-primary'>
              Elija el departamento al que pertenecera el profesor
            </h5>
            <h6 v-if="universityName != '' ">
              {{ universityName }} / {{ facultyName }} / {{ majorName }}
            </h6>

            <div class='form-inline justify-content-end'>
              <button class='btn sm-2'>
                <i role='button' class='fas fa-check' style='padding-right: 10px'></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <form>
      <div class=' row'>
        <div class='form-group col col-md-4'>
          <label class='col-form-label'> Elegir univerisidad:</label>
          <button class='btn btn-secondary btn-lg dropdown-toggle' type='button'
                  id='input-select-university'
                  data-toggle='dropdown'
                  aria-haspopup='true' aria-expanded='false'
                  style='width: 220px; height: 40px;'
          >
            {{ btnSelectUniversityText }}
          </button>

          <div class='dropdown-menu'>
            <a style='cursor: pointer' v-for='u in this.universities' :key='u.id' class='dropdown-item'
               @click.prevent='chooseUniversity(u.id)'>{{ u.fullName }}</a>
          </div>
        </div>

        <div v-if='universityName != "" ' class='form-group col col-md-4'>
          <label class='col-form-label'> Elegir facultad:</label>
          <br>
          <button class='btn btn-secondary btn-lg dropdown-toggle' type='button' id='input-select-faculty'
                  data-toggle='dropdown'
                  aria-haspopup='true' aria-expanded='false'
                  style='width: 220px; height: 40px;'
                  :disabled='this.faculties.length === 0'
          >
            {{ btnSelectFacultyText }}
          </button>

          <div class='dropdown-menu'>
            <a style='cursor: pointer' v-for='u in this.faculties' :key='u.id' class='dropdown-item'
               @click.prevent='chooseFaculty(u.id)'>{{ u.fullName }}</a>
          </div>
        </div>


        <div v-if='facultyName != ""' class='form-group col col-md-4'>
          <label class='col-form-label'> Elegir departamento:</label>
          <br>
          <button class='btn btn-secondary btn-lg dropdown-toggle' type='button' id='input-select-faculty'
                  data-toggle='dropdown'
                  aria-haspopup='true' aria-expanded='false'
                  style='width: 220px; height: 40px;'
                  :disabled='this.departments.length === 0'
          >
            {{ btnSelectedDepartmentText }}
          </button>

          <div class='dropdown-menu'>
            <a style='cursor: pointer;' v-for='m in this.departments' :key='m.id' class='dropdown-item'
               @click.prevent='chooseDepartment(m.id)'>{{ m.fullName }}</a>
          </div>
        </div>
      </div>
    </form>


    <div class='modal-footer'>
      <button type='button' class='btn btn-secondary' data-dismiss='modal' @click.prevent='cancel()'>
        Cancelar
      </button>
      <button type='button' class='btn btn-primary' :disabled='departmentName == ""' data-dismiss='modal'
              @click.prevent='selectionOk()'>
        Siguiente
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChooseTeacher',
  data() {
    return {
      faculties: [],
      universities: [],
      departments: [],
      facultyName: '',
      universityName: '',
      departmentName: '',
      btnSelectFacultyText: 'Elegir facultad',
      btnSelectUniversityText: 'Elegir universidad',
      btnSelectedDepartmentText: 'Elegir departamento',
    };
  },
  methods: {
    selectionOk() {
      const department = this.departments.find(x => x.fullName === this.departmentName);
      this.$router.push({ name: 'teachersPage', params: { departmentId: department.id } });
    },
    cancel() {
      this.$router.push({ name: 'homePage' });
    },
    chooseUniversity(universityId) {
      const university = this.universities.find(x => x.id == universityId);

      this.btnSelectUniversityText = university.shortName;
      this.getAllFaculties(university.id);

      this.btnSelectFacultyText = 'Elegir facultad';
      this.universityName = university.fullName;
      this.facultyName = '';

    },
    chooseFaculty(facultyId) {
      const faculty = this.faculties.find(x => x.id == facultyId);

      this.btnSelectFacultyText = faculty.shortName;
      this.facultyName = faculty.fullName;

      this.getAllDepartments(facultyId);

      this.departmentName = '';
      this.btnSelectedDepartmentText = 'Elegir departamento';
    },
    chooseDepartment(departmentId) {
      const department = (this.departments.find(x => x.id === departmentId));
      this.btnSelectedDepartmentText = department.shortName;

      this.departmentName = department.fullName;
    },
    getAllUniversities() {
      this.$store.state.profile.loadMinData();
      let token = this.$store.state.profile.data.token;

      this.$store.state.universities.getAll(token)
        .then(result => {
          if (result === true) {
            this.universities = this.$store.state.universities.data;
          }
        });

    },
    getAllFaculties(universityId) {
      this.$store.state.profile.loadMinData();
      let token = this.$store.state.profile.data.token;

      this.$store.state.faculties.getAll(token, { universityId: universityId })
        .then(result => {
          if (result === true) {
            this.faculties = this.$store.state.faculties.data;
          }
        });
    },
    getAllDepartments(facultyId) {
      this.$store.state.profile.loadMinData();
      let token = this.$store.state.profile.data.token;

      this.$store.state.departments.getAll(token, { facultyId })
        .then(result => {
          if (result === true) {
            this.departments = this.$store.state.departments.data;
          }
        });
    },
  },
  created() {
    this.getAllUniversities();
  },
};
</script>

<style scoped>

</style>