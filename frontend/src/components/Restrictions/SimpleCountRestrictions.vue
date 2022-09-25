<template>
  <div>
    <p style='text-align: justify'> Restriccion de cuenta simple: Lorem ipsum dolor sit amet, consectetur adipisicing
      elit. Aliquam, amet animi asperiores at dignissimos iste libero maiores modi nam nemo numquam quam qui quis
      reprehenderit unde velit veritatis! Accusamus accusantium alias architecto at autem corporis dicta dolore dolores
      doloribus enim eos ex, exercitationem illo inventore ipsam iusto laborum minus mollitia natus non officiis placeat
      possimus quidem quis quisquam quos repudiandae rerum saepe sequi ullam vel veritatis vero voluptatem. Aliquid
      ducimus enim, id itaque laudantium minima sit totam. Commodi expedita id laudantium officia optio ratione
      repudiandae saepe similique ullam voluptatem. Blanditiis eius incidunt maiores necessitatibus provident quae
      repellendus sint tenetur voluptatum. </p>
    <div role='document'>
      <div class='modal-header'>
        <h5 class='modal-title' id='exampleModalLabel'>Nueva Restricción Simple</h5>
        <!--        <button type='button' class='close' data-dismiss='modal' aria-label='Close'>-->
        <!--          <span aria-hidden='true'>&times;</span>-->
        <!--        </button>-->
      </div>
      <div class='modal-body'>
        <form>
          <div class='form-group'>
            <label for='input-min' class='col-form-label'>Mínimo:</label>
            <input type='number'
                   :class="{'form-control': true, 'border-danger': errors & 1}"
                   id='input-min'
                   v-model='newRestriction.min'>
          </div>
          <div class='form-group'>
            <label for='input-part' class='col-form-label'>Parte:</label>
            <input type='number'
                   :class="{'form-control': true, 'border-danger': errors & (1 << 1)}"
                   id='input-part'
                   v-model='newRestriction.part'>
          </div>
          <div class='form-group'>
            <label for='input-operator' class='col-form-label'>Operador:</label>
            <input type='text'
                   :class="{'form-control': true, 'border-danger': errors & (1 << 2)}"
                   id='input-operator' v-model='newRestriction.operator' />
          </div>
          <div class='form-group'>
            <label for='input-interval' class='col-form-label'>Intervalo:</label>
            <input type='number'
                   :class="{'form-control': true, 'border-danger': errors & (1 << 3)}"
                   id='input-interval'
                   v-model='newRestriction.interval'>
          </div>
          <div class='form-group'>
            <label for='input-priority' class='col-form-label'>Prioridad:</label>
            <input type='number'
                   :class="{'form-control': true, 'border-danger': errors & (1 << 4)}"
                   id='input-priority'
                   v-model='newRestriction.priority'>
          </div>
        </form>
      </div>
      <div class='modal-footer'>
        <button type='button' style='cursor: pointer;' class='btn btn-primary' @click='saveRestriction()'>
          Guardar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HandleRestrictionsSimpleCount',
  data() {
    return {
      errors: 0,
      newRestriction: {
        min: 0,
        part: 0,
        operator: '',
        interval: 0,
        priority: 0,
      },
    };
  },
  methods: {
    saveRestriction() {
      this.$store.state.restrictions.loadMinData();
      let conditions = this.$store.state.restrictions.data;

      this.$store.state.profile.loadMinData();
      let token = this.$store.state.profile.data.token;

      this.$store.state.simpleCountRestrictions.create(token, {
        conditions: JSON.stringify(conditions),
        ...this.newRestriction,
      });
    },
  },
};
</script>

<style scoped>

</style>