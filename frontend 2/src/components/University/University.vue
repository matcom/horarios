<template>
  <div id='university'>
    <div class='row'>
      <div class='col-12'>
        <div class='card mb-4 w-100 border-bottom-primary'>
          <div class='card-header py-3 bg-white'>
            <h5 class='m-0 font-weight-bold text-primary'>Universidad: {{ university.fullName }}</h5>

            <div class='form-inline justify-content-end'>
              <button class='btn sm-2'>
                <i role='button' class='fas fa-edit' style='padding-right: 10px' @click.prevent='edit()'></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class='container overflow-hidden'>
      <div class='row py-4'>
        <div class='col-sm-6'>
          <div class='card text-center'>
            <div class='card-body'>
              <h5 class='card-title text-black-50'><strong> Nombre Completo </strong></h5>
              <p class='card-text'>{{ university.fullName }}</p>
            </div>
          </div>
        </div>

        <div class='col-sm-6'>
          <div class='card text-center'>
            <div class='card-body'>
              <h5 class='card-title text-black-50'><strong> Nombre Reducido </strong></h5>
              <p class='card-text'>{{ university.shortName }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class='row py-4'>
        <div class='col-sm-6'>
          <div class='card text-center'>
            <div class='card-body'>
              <h5 class='card-title text-black-50'><strong> Prioridad </strong></h5>
              <p class='card-text'>{{ university.priority }}</p>
            </div>
          </div>
        </div>

        <div class='col-sm-6'>
          <div class='card text-center'>
            <div class='card-body'>
              <h5 class='card-title text-black-50'><strong> Descripcion </strong></h5>
              <p class='card-text'>{{ university.description }}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
    <!--    Modal for Edit-->

    <div class='modal fade' id='modalEdit' tabindex='-1' role='dialog' aria-labelledby='modalEdit'
         aria-hidden='true' ref='modalEdit'>
      <div class='modal-dialog' role='document'>
        <div class='modal-content'>
          <div class='modal-header'>
            <h5 class='modal-title' id='exampleModalLabel'>Editando {{ university.fullName }}</h5>
            <button type='button' class='close' data-dismiss='modal' aria-label='Close'>
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
          <div class='modal-body'>
            <form>
              <div class='form-group'>
                <label for='input-fullName' class='col-form-label'>Nombre completo:</label>
                <input type='text' class='form-control' id='input-fullName' v-model='university.fullName'>
              </div>
              <div class='form-group'>
                <label for='input-shortName' class='col-form-label'>Nombre:</label>
                <input type='text' class='form-control' id='input-shortName' v-model='university.shortName'>
              </div>
              <div class='form-group'>
                <label for='input-priority' class='col-form-label'>Prioridad:</label>
                <input type='number' class='form-control' id='input-priority'
                       v-model='university.priority' />
              </div>
              <div class='form-group'>
                <label for='input-description' class='col-form-label'>Descripcion:</label>
                <textarea class='form-control' id='input-description' v-model='university.description'></textarea>
              </div>
            </form>
          </div>
          <div class='modal-footer'>
            <button type='button' class='btn btn-secondary' data-dismiss='modal'>Cancelar</button>
            <button type='button' class='btn btn-primary' data-dismiss='modal' @click.prevent='saveEdited()'>
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
    <!--    <div class='row'>-->
    <!--      <div class='col-12'>-->
    <!--        <div class='card mb-1 bg-white border-bottom-primary'>-->
    <!--          <a href='#collapseCardLocalsEvents' class='d-block card-header py-3' data-toggle='collapse' role='button'-->
    <!--             aria-expanded='false' aria-controls='collapseCardLocalsEvents'>-->
    <!--            <h6 class='m-0 font-weight-bold text-primary'>Eventos del Local</h6>-->
    <!--          </a>-->
    <!--          <div class='collapse hide' id='collapseCardLocalsEvents' style=''>-->
    <!--            <div class='card-body p-2'>-->
    <!--              <div class='row justify-content-center'>-->
    <!--                <div class='col-10'>-->
    <!--                  <input type='text' v-model='local_events' class='form-control bg-light border-0 small'-->
    <!--                         placeholder='Buscar ...' aria-label='Search' aria-describedby='basic-addon2'>-->
    <!--                </div>-->
    <!--                <div class='col-lg-2'>-->
    <!--                  <button class='btn ml-4' @click.prevent='setVal()'>-->
    <!--                    <i class='fas fa-sort-alpha-down'></i>-->
    <!--                  </button>-->
    <!--                  <button class='btn ml-4' @click.prevent='unsetVal()'>-->
    <!--                    <i class='fas fa-sort-alpha-up'></i>-->
    <!--                  </button>-->
    <!--                </div>-->
    <!--              </div>-->
    <!--            </div>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--        <div class='card'>-->
    <!--          <div class='card-body p-0'>-->
    <!--            <div class='list-group'>-->
    <!--              &lt;!&ndash;              <button v-if='university.events.length === 0' type='button' class='list-group-item list-group-item-action'&ndash;&gt;-->
    <!--              &lt;!&ndash;                      disabled>La universidad no tiene ningún evento asignadoa&ndash;&gt;-->
    <!--              &lt;!&ndash;              </button>&ndash;&gt;-->
    <!--              &lt;!&ndash;              <button v-else-if="filterList(university.events, local_events, 'title').length === 0" type='button'&ndash;&gt;-->
    <!--              &lt;!&ndash;                      class='list-group-item list-group-item-action' disabled>No hay resultados para mostrar&ndash;&gt;-->
    <!--              &lt;!&ndash;              </button>&ndash;&gt;-->
    <!--              &lt;!&ndash;              <router-link v-for="event in filterList(university.events, local_events, 'title')" :key='event.id'&ndash;&gt;-->
    <!--              &lt;!&ndash;                           :to="{name: 'eventPage', params: {eventId: event.id}}"&ndash;&gt;-->
    <!--              &lt;!&ndash;                           class='list-group-item list-group-item-action'>{{ event.title }}&ndash;&gt;-->
    <!--              &lt;!&ndash;              </router-link>&ndash;&gt;-->
    <!--            </div>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<script>
export default {
  name: 'University',
  data() {
    return {
      university: {
        id: '',
        fullName: '',
        shortName: '',
        description: '',
        priority: '',
        events: [],
      },
      local_events: '',
      val: 1,
    };
  },
  methods: {
    loadData() {
      this.$store.state.profile.loadMinData();
      let token = this.$store.state.profile.data.token;
      this.$store.state.university.getData(token, this.university.id).then(result => {
        if (result === true) {
          this.university = this.$store.state.university.data;
        } else {
          this.$router.push({ name: 'notFoundPage' });
        }
      });
    },
    filterList(list, box, prop, val) {
      let tmp = list.slice().sort(this.comparer(prop, val));
      return tmp.filter(elem => {
        return elem[prop].toString().toLowerCase().includes(box.toLowerCase());
      });
    },
    edit() {
      $('#modalEdit').modal('show');
    },
    saveEdited() {
      this.$store.state.profile.loadMinData();
      let token = this.$store.state.profile.data.token;
      this.$store.state.university.edit(token, this.university)
        .then(result => {
          if (result === true) {
            this.university = this.$store.state.university.data;
          } else {
            this.$router.push({ name: 'notFoundPage' });
          }
        });
    },
    setVal(number) {
      if (number == 1) {
        this.user_val = 1;
      } else {
        this.event_val = 1;
      }
    },
    unsetVal(number) {
      if (number == 1) {
        this.user_val = -1;
      } else {
        this.event_val = -1;
      }
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
  },

  created() {
    this.university.id = this.$route.params.universityId;
    if (!this.university.id) {
      this.$router.push({ name: 'notFoundPage' });
    }
    this.loadData();
  },
};
</script>

<style scoped>

</style>