<template>
  <div id='choose'>
    <div class='row'>
      <div class='col-12'>
        <div class='card mb-4 w-100 border-bottom-primary'>
          <div class='card-header py-3 bg-white'>
            <h5 class='m-0 font-weight-bold text-primary'>
              Elija la facultad
            </h5>
            <h6 v-if="universityName != '' ">
              {{ universityName }} / {{ facultyName }}
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
        <div class='form-group col col-md-6'>
          <label class='col-form-label'> Elegir univerisidad:</label>
          <br>
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
               @click.prevent='chooseUniversity(u.fullName)'>{{ u.fullName }}</a>
          </div>
        </div>

        <div v-if='universityName != "" ' class='form-group col col-md-6'>
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
            <a style='cursor: pointer;' v-for='u in this.faculties' :key='u.id' class='dropdown-item'
               @click.prevent='chooseFaculty(u.fullName)'>{{ u.fullName }}</a>
          </div>
        </div>
      </div>
    </form>


    <div class='modal-footer'>
      <button type='button' class='btn btn-secondary' data-dismiss='modal' @click.prevent='cancel()'>
        Cancelar
      </button>
      <button type='button' :disabled='facultyName === ""' class='btn btn-primary' data-dismiss='modal'
              @click.prevent='selectionOk()'>
        Siguiente
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChooseDepartment',
  data() {
    return {
      faculties: [],
      universities: [],
      facultyName: '',
      universityName: '',
      btnSelectFacultyText: 'Elegir facultad',
      btnSelectUniversityText: 'Elegir universidad',
    };
  },
  methods: {
    selectionOk() {
      const faculty = this.faculties.find(x => x.fullName === this.facultyName);
      this.$router.push({ name: 'departmentsPage', params: { facultyId: faculty.id } });
    },
    cancel() {
      this.$router.push({ name: 'homePage' });
    },
    chooseUniversity(universityFullName) {
      const university = this.universities.find(x => x.fullName === universityFullName);

      this.btnSelectUniversityText = university.shortName;
      this.getAllFaculties(university.id);

      this.btnSelectFacultyText = 'Elegir facultad';
      this.universityName = universityFullName;
      this.facultyName = '';

    },
    chooseFaculty(facultyFullName) {
      const faculty = this.faculties.find(x => x.fullName === facultyFullName);

      this.btnSelectFacultyText = faculty.shortName;
      this.facultyName = facultyFullName;
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
  },
  created() {
    this.getAllUniversities();
  },
};
</script>

<style scoped>

</style>