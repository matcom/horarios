<template>
  <div>
    <div role='document'>
      <div class='modal-header'>
        <h5 class='modal-title' id='exampleModalLabel'>Seleccione el tipo de restricción</h5>
      </div>

      <div class='modal-body'>
        <div class='' v-for='(it, index) in restrictionType' :key='it.id'>
          <div>
            <input type='checkbox' data-toggle='collapse' :href='`#id${it.id}`' role='button' aria-expanded='false'
                   aria-controls='type_description' v-model='it.isSelected' @click='disableOthers(it.id)'>
            <span class='ml-2'>{{ it.name }}</span>
          </div>
          <div class='collapse' :id='`id${it.id}`'>
            <p class='ml-2 card-body' style='text-align: justify'>
              {{ it.description }}
            </p>
          </div>
        </div>
      </div>
      <div class='modal-footer'>
        <button type='button' style='cursor: pointer;' class='btn btn-primary' @click='restrictionOk()'>
          Siguiente
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChooseRestrictionType',
  data() {
    return {
      restrictionType: [
        {
          id: 1,
          name: 'Restricción de Cuenta Simple',
          isSelected: false,
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.Aliquam dolorum eos error excepturi facere, fuga harum illum ipsa laborum nam nesciunt nobis non nostrum odio possimus praesentium quas, quidem quo quos sequi, ut veritatis voluptatum.A aliquid deserunt eveniet excepturi illo illum maiores minima odio vero ? A aliquam amet aperiam architecto at blanditiis consectetur culpa dolore dolores dolorum eum fuga illo impedit iure laboriosam maiores modi necessitatibus nemo nisi officiis praesentium, quis quod recusandae rem repellendus reprehenderit repudiandae sequi soluta, unde vero vitae voluptates, voluptatibus voluptatum!Architecto deserunt, exercitationem ipsa nemo praesentium quia sapiente soluta suscipit unde velit.Harum, repellat!',
        },
        {
          id: 2,
          name: 'Restricción de Cuenta de Condiciones',
          isSelected: false,
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.Aliquam dolorum eos error excepturi facere, fuga harum illum ipsa laborum nam nesciunt nobis non nostrum odio possimus praesentium quas, quidem quo quos sequi, ut veritatis voluptatum.A aliquid deserunt eveniet excepturi illo illum maiores minima odio vero ? A aliquam amet aperiam architecto at blanditiis consectetur culpa dolore dolores dolorum eum fuga illo impedit iure laboriosam maiores modi necessitatibus nemo nisi officiis praesentium, quis quod recusandae rem repellendus reprehenderit repudiandae sequi soluta, unde vero vitae voluptates, voluptatibus voluptatum!Architecto deserunt, exercitationem ipsa nemo praesentium quia sapiente soluta suscipit unde velit.Harum, repellat!',
        },
      ],
    };
  },
  methods: {
    restrictionOk() {
      const obj = this.restrictionType.find(x => x.isSelected === true);

      switch (obj.id) {
        case 1:
          this.$router.push({ name: 'simpleCountRestrictionsPage' });
          break;
        case 2:
          this.$router.push({ name: 'countConditionsRestrictionsPage' });
          break;
        default:
          this.$router.push({ name: 'notFoundPage' });
      }

    },
    disableOthers(id) {
      this.restrictionType.forEach((it) => {
        if (it.id !== id) {
          it.isSelected = false;
        }
      });
    },
  },
};
</script>

<style scoped>

</style>