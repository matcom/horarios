<template>
  <div id='university'>
    <div class='row'>
      <div class='col-12'>
        <div class='card mb-4 w-100 border-bottom-primary'>
          <div class='card-header py-3 bg-white'>
            <h5 class='m-0 font-weight-bold text-primary'>Universidad: {{ university.fullName }}</h5>
          </div>
        </div>
      </div>
    </div>
    <div class='row'>
      <div class='col-12'>
        <div class='card mb-1 bg-white border-bottom-primary'>
          <a href='#collapseCardLocalsEvents' class='d-block card-header py-3' data-toggle='collapse' role='button'
             aria-expanded='false' aria-controls='collapseCardLocalsEvents'>
            <h6 class='m-0 font-weight-bold text-primary'>Eventos del Local</h6>
          </a>
          <div class='collapse hide' id='collapseCardLocalsEvents' style=''>
            <div class='card-body p-2'>
              <div class='row justify-content-center'>
                <div class='col-10'>
                  <input type='text' v-model='local_events' class='form-control bg-light border-0 small'
                         placeholder='Buscar ...' aria-label='Search' aria-describedby='basic-addon2'>
                </div>
                <div class='col-lg-2'>
                  <button class='btn ml-4' @click.prevent='setVal()'>
                    <i class='fas fa-sort-alpha-down'></i>
                  </button>
                  <button class='btn ml-4' @click.prevent='unsetVal()'>
                    <i class='fas fa-sort-alpha-up'></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class='card'>
          <div class='card-body p-0'>
            <div class='list-group'>
              <!--              <button v-if='university.events.length === 0' type='button' class='list-group-item list-group-item-action'-->
              <!--                      disabled>La universidad no tiene ningún evento asignadoa-->
              <!--              </button>-->
              <!--              <button v-else-if="filterList(university.events, local_events, 'title').length === 0" type='button'-->
              <!--                      class='list-group-item list-group-item-action' disabled>No hay resultados para mostrar-->
              <!--              </button>-->
              <!--              <router-link v-for="event in filterList(university.events, local_events, 'title')" :key='event.id'-->
              <!--                           :to="{name: 'eventPage', params: {eventId: event.id}}"-->
              <!--                           class='list-group-item list-group-item-action'>{{ event.title }}-->
              <!--              </router-link>-->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'University',
  data() {
    return {
      university: {
        id: -1,
        fullName: '',
        shortName: '',
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