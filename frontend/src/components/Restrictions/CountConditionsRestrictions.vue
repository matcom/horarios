<template>
  <div>
    <div style='text-align: justify'>

      <p>
        Este requerimiento se refiere a qué parte del conjunto de turnos que ha
        satisfecho las condiciones previas, cumple también un bloque de condiciones
        adicionales, y cuenta además con el operador de comparación O a aplicar y el
        valor V con el cual comparar. El requerimiento se cumple si la cantidad de
        turnos que satisfacen las condiciones iniciales y satisfacen simultáneamente
        otras que se han configurado, mantiene una relación O con V.

        Ejemplos de este requerimiento son:
      </p>

      <ul>
        <li>
          <strong>
            que de los que cumplen las condiciones, al menos un tercio sean en aulas frescas
          </strong>

          <ol>
            <li>
              Post – Condiciones: el aula debe ser fresca
            </li>
            <li>
              Valor: 1/3 de los que cumplen las condiciones iniciales
            </li>
            <li>
              Operador:
            </li>
          </ol>

        </li>

        <li>
          <strong>
            que todos los que cumplen las condiciones sean turnos de Matemática Numérica
          </strong>

          <ol>
            <li>
              Post – Condiciones: “la asignatura debe ser Matemática Numérica”
            </li>
            <li>
              Valor: todos los que cumplen las condiciones iniciales
            </li>
            <li>
              Operador: =
            </li>
          </ol>
        </li>
      </ul>

      <p>
        Esta clase cuenta con los siguientes atributos:
      </p>

      <ul>
        <li>
          subConditions, texto en lenguaje Ruby que representa el código
          correspondiente a las condiciones del requerimiento, o sea, a las
          condiciones que como requerimiento deben cumplir los turnos que
          cumplan con conditions.
        </li>
        <li>
          part, número fraccionario que representa qué parte del total de turnos
          deben cumplir los requerimientos
        </li>
        <li>
          operator, literal que representa el operador que se aplica entre la
          cantidad de turnos que cumplen las condiciones adicionales y el
          producto de part por la cardinalidad del conjunto de turnos que pasan
          las condiciones
        </li>
      </ul>


    </div>
    <div role='document'>
      <div class='modal-header'>
        <h5 class='modal-title' id='exampleModalLabel'>Nueva Restriccion de Requerimiento de Cuenta con
          Condiciones </h5>
        <!--        <button type='button' class='close' data-dismiss='modal' aria-label='Close'>-->
        <!--          <span aria-hidden='true'>&times;</span>-->
        <!--        </button>-->
      </div>
      <div class='modal-body'>
        <form>
          <div class='form-group'>
            <label for='input-part' class='col-form-label'>Parte:</label>
            <input type='number'
                   value='1'
                   :class="{'form-control': true, 'border-danger': errors & (1)}"
                   id='input-part'
                   :min='1'
                   v-model='newRestriction.part'>
          </div>

          <div class='form-group'>
            <label for='input-interval' class='col-form-label'>Intervalo:</label>
            <input type='number'
                   :class="{'form-control': true, 'border-danger': errors & (1 << 2)}"
                   id='input-interval'
                   value='7'
                   :min='1'
                   v-model='newRestriction.interval'>
          </div>
          <div class='form-group'>
            <label for='input-priority' class='col-form-label'>Prioridad:</label>
            <input type='number'
                   :class="{'form-control': true, 'border-danger': errors & (1 << 3)}"
                   id='input-priority'
                   v-model='newRestriction.priority'>
          </div>

          <div class='col col-md-6 form-group'>
            <label for='input-operator' class='col-form-label'>Operador:</label>

            <div style='margin-left: 5px; margin-top: 10px' class='form-group dropdown mb-0'>
              <button
                :class="{'btn': true, 'btn-light': true, 'dropdown-toggle': true, 'border-danger': errors & (1 << 1)}"
                type='button' id='teacher_drop_down'
                data-toggle='dropdown'
                aria-haspopup='true' aria-expanded='true'>
                {{ !newRestriction.operator ? 'Elegir Operador' : newRestriction.operator }}
              </button>
              <div class='dropdown-menu'>
                <a style='cursor:pointer;' v-for='u in this.operators' :key='u' class='dropdown-item'
                   @click='newRestriction.operator = u'>{{ u }}</a>
              </div>
            </div>
          </div>

          <div class='form-group'>
            <HandleConditions @show='false' v-model='query'></HandleConditions>
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
import HandleConditions from '@/components/Restrictions/HandleConditions';
import Restrictions_type from '@/controllers/Restrictions/condition_types';

export default {
  name: 'CountConditionsRestrictions',
  components: {
    HandleConditions,
  },
  data() {
    return {
      query: {},
      errors: 0,
      newRestriction: {
        part: 0,
        operator: '',
        interval: 0,
        priority: 0,
      },
      operators: [
        '>',
        '<',
        '>=',
        '<=',
        '!=',
        '==',
      ],
    };
  },
  methods: {
    checkErrors() {
      this.errors |= (this.newRestriction.part === 0) ? 1 : this.errors;
      // this.errors |= (this.newRestriction.operator === 0) ? (1 << 1) : this.errors;
      this.errors |= (this.newRestriction.interval === 0) ? (1 << 2) : this.errors;

      setTimeout(() => {
        this.errors = 0;
      }, 3000);

      return this.errors > 0;
    },
    saveRestriction() {
      if (this.checkErrors()) return;

      this.$store.state.restrictions.loadMinData();
      let conditions = this.$store.state.restrictions.data[Restrictions_type.BASE_CONDITION];

      this.$store.state.profile.loadMinData();
      let token = this.$store.state.profile.data.token;

      this.$store.state.countConditionsRestrictions.create(token, {
        conditions: JSON.stringify(conditions),
        subConditions: JSON.stringify(this.query),
        ...this.newRestriction,
      })
        .then(result => {
          if (result === true)
            this.$router.push({ name: 'restrictionsPage' });
          else
            alert(this.$store.state.countConditionsRestrictions.data.error);
        });
    },
  },
};
</script>

<style scoped>

</style>