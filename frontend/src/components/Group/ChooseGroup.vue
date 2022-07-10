<template>
  <div id='choose'>
    <div class='row'>
      <div class='col-12'>
        <div class='card mb-4 w-100 border-bottom-primary'>
          <div class='card-header py-3 bg-white'>
            <h5 class='m-0 font-weight-bold text-primary'>
              Elija la carrera
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
            <a v-for='u in this.universities' :key='u.id' class='dropdown-item'
               @click.prevent='chooseUniversity(u.fullName)'>{{ u.fullName }}</a>
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
            <a v-for='u in this.faculties' :key='u.id' class='dropdown-item'
               @click.prevent='chooseFaculty(u.fullName)'>{{ u.fullName }}</a>
          </div>
        </div>


        <div v-if='facultyName != ""' class='form-group col col-md-4'>
          <label class='col-form-label'> Elegir carrera:</label>
          <br>
          <button class='btn btn-secondary btn-lg dropdown-toggle' type='button' id='input-select-faculty'
                  data-toggle='dropdown'
                  aria-haspopup='true' aria-expanded='false'
                  style='width: 220px; height: 40px;'
                  :disabled='this.majors.length === 0'
          >
            {{ btnSelectedMajorText }}
          </button>

          <div class='dropdown-menu'>
            <a v-for='m in this.majors' :key='m.id' class='dropdown-item'
               @click.prevent='chooseMajor(m.fullName)'>{{ m.fullName }}</a>
          </div>
        </div>
      </div>
    </form>


    <div class='modal-footer'>
      <button type='button' class='btn btn-secondary' data-dismiss='modal' @click.prevent='cancel()'>
        Cancelar
      </button>
      <button type='button' :disabled='majorName === ""' class='btn btn-primary' data-dismiss='modal'
              @click.prevent='selectionOk()'>
        Siguiente
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChooseGroup',
  data() {
    return {
      faculties: [],
      universities: [],
      majors: [],
      facultyName: '',
      universityName: '',
      majorName: '',
      btnSelectFacultyText: 'Elegir facultad',
      btnSelectUniversityText: 'Elegir universidad',
      btnSelectedMajorText: 'Elegir carrera',
    };
  },
  methods: {
    selectionOk() {
      const major = this.majors.find(x => x.fullName === this.majorName);

      console.log(major.id);

      this.$router.push({ name: 'groupsPage', params: { majorId: major.id } });
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

      this.getAllMajors(faculty.id);

      this.majorName = '';
      this.btnSelectedMajorText = 'Elegir carrera';
    },
    chooseMajor(majorFullName) {
      this.btnSelectedMajorText = (this.majors.find(x => x.fullName === majorFullName)).shortName;

      this.majorName = majorFullName;
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
    getAllMajors(facultyId) {
      this.$store.state.profile.loadMinData();
      let token = this.$store.state.profile.data.token;

      this.$store.state.majors.getAll(token, { facultyId })
        .then(result => {
          if (result === true) {
            this.majors = this.$store.state.majors.data;
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