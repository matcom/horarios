<template>
  <div id='home'>
    <div class='row'>

      <!-- Asignaturas -->
      <div class='col'>
        <div class='dropdown mb-0'>
          <button class='btn btn-light dropdown-toggle' type='button' id='asignaturas_drop_down' data-toggle='dropdown'
                  aria-haspopup='true' aria-expanded='true'>
            Asignaturas
          </button>
          <div class='dropdown-menu animated--fade-in ' aria-labelledby='dropdownMenuButton' x-placement='bottom-start'
               style='position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 38px, 0px);'>
            <div class='input-group m-2 ' v-for='it in lessons' :key='it.id'>
              <div class='input-group-text bg-white'>
                <input type='checkbox' aria-label='Checkbox for following text input' v-model='it.selected'>
                <span class='ml-2' id='basic-'>{{ it.shortName }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Grupos-->
      <div class='col'>

        <div class='dropdown mb-0'>
          <button class='btn btn-light dropdown-toggle' type='button' id='grupos_drop_down' data-toggle='dropdown'
                  aria-haspopup='true' aria-expanded='true'>
            Grupos
          </button>
          <div class='dropdown-menu animated--fade-in ' aria-labelledby='dropdownMenuButton' x-placement='bottom-start'
               style='position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 38px, 0px);'>
            <div class='input-group m-2 ' v-for='it in groups' :key='it.id'>
              <div class='input-group-text bg-white'>
                <input type='checkbox' aria-label='Checkbox for following text input' v-model='it.selected'>
                <span class='ml-2' :style='{color: it.color}' id='basi7-addon3'>{{ it.shortName }}</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Locales-->
      <div class='col'>
        <div class='dropdown mb-0'>
          <button class='btn btn-light dropdown-toggle' type='button' id='locales_drop_down' data-toggle='dropdown'
                  aria-haspopup='true' aria-expanded='true'>
            Locales
          </button>
          <div class='dropdown-menu animated--fade-in ' aria-labelledby='dropdownMenuButton' x-placement='bottom-start'
               style='position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 38px, 0px);'>
            <div class='input-group m-2 ' v-for='it in locals' :key='it.id'>
              <div class='input-group-text bg-white'>
                <input type='checkbox' aria-label='Checkbox for following text input' v-model='it.selected'>
                <span class='ml-2' id='basi3-addon3'>{{ it.shortName }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recursos-->

      <!--      <div class='col'>-->


      <!--        <div class='dropdown mb-0'>-->
      <!--          <button class='btn btn-light dropdown-toggle' type='button' id='resources_drop_down' data-toggle='dropdown'-->
      <!--                  aria-haspopup='true' aria-expanded='true'>-->
      <!--            Recursos-->
      <!--          </button>-->
      <!--          <div class='dropdown-menu animated&#45;&#45;fade-in ' aria-labelledby='dropdownMenuButton' x-placement='bottom-start'-->
      <!--               style='position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 38px, 0px);'>-->
      <!--            <div class='input-group m-2 ' v-for='it in resources' :key='it.id'>-->
      <!--              <div class='input-group-text bg-white'>-->
      <!--                <input type='checkbox' aria-label='Checkbox for following text input' v-model='it.isMarked'>-->
      <!--                <span class='ml-2' id='basi1-addon3'>{{ it.name }}</span>-->
      <!--              </div>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->

      <!--      </div>-->

      <!-- Tipos-->
      <div class='col'>
        <div class='dropdown mb-0'>
          <button class='btn btn-light dropdown-toggle' type='button' id='tipos_drop_down' data-toggle='dropdown'
                  aria-haspopup='true' aria-expanded='true'>
            Tipos
          </button>
          <div class='dropdown-menu animated--fade-in ' aria-labelledby='dropdownMenuButton' x-placement='bottom-start'
               style='position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 38px, 0px);'>
            <div class='input-group m-2 ' v-for='it in typeClasses' :key='it.id'>
              <div class='input-group-text bg-white'>
                <input type='checkbox' aria-label='Checkbox for following text input' v-model='it.selected'>
                <span class='ml-2' id='basi5-addon3'>{{ it.shortName }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class='col'>
        <button class='btn btn-block btn-outline-dark' @click='makeQuery'>
          Filtrar
        </button>
      </div>

      <div class='col'>
        <button class='btn btn-block btn-outline-dark' @click='download'>
          Descargar
        </button>
      </div>
    </div>

    <!--Fechas-->
    <div class='row'>
      <div class='card-body mt-0' @click.stop style='width: 200px'>
        <div class='row ml-5'>
          <div class='col-1'>
            <h1 class='h5 text-dark mt-1'>Desde:</h1>
          </div>
          <div class='col-5'>
            <datetime style='cursor: pointer' type='datetime' :phrases='phrases' v-model='datetimeStart'></datetime>
          </div>
          <div class='col-1'>
            <h1 class='h5 text-dark mt-1 '>Hasta:</h1>
          </div>
          <div class='col-5'>
            <datetime style='cursor: pointer' type='datetime' :phrases='phrases' v-model='datetimeEnd'></datetime>
          </div>
        </div>
      </div>
    </div>


    <FullCalendar
      :options='config'
    >
      <template v-slot:eventContent='arg'>
        <b> {{ arg.event.title }} ({{ arg.timeText }})</b>
      </template>
    </FullCalendar>

    <!-- Modal Create-->
    <div class='modal fade' id='modalCreate' tabindex='-1' role='dialog' aria-labelledby='modalCreate'
         aria-hidden='true' ref='modalCreate'>
      <div class='modal-dialog' role='document'>
        <div class='modal-content'>
          <div class='modal-header'>
            <h5 class='modal-title' id='exampleModalLabel'>Nuevo Turno de Clase</h5>
            <button type='button' class='close' data-dismiss='modal' aria-label='Close'>
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
          <div class='modal-body'>
            <form>

              <div class='form-group'>
                <label for='input-view' class='col-form-label'>Visualizar en el horario:</label>
                <input type='text'
                       :class="{'form-control': true, 'border-danger': errors & 1}"
                       id='input-view'
                       v-model='newClass.viewInCard' />
              </div>

              <div class='form-group'>
                <label for='input-description' class='col-form-label'>Descripcion:</label>
                <textarea class='form-control' id='input-description' v-model='newClass.description'></textarea>
              </div>

              <div class='row'>

                <div class='col-md-6'>
                  <label class='col-form-label'> Elegir Profesores:</label>
                </div>

                <div class='col-sm-6'>

                  <div class='form-group'>
                    <button
                      :class="{'btn': true, 'btn-secondary': true, 'btn-lg': true, 'dropdown-toggle': true, 'border-danger': errors & (1 << 1)}"
                      type='button'
                      id='input-select-university'
                      data-toggle='dropdown'
                      aria-haspopup='true' aria-expanded='false'
                      style='width: 220px; height: 40px;'
                      :disabled='teachers.length === 0'
                      :style='[this.teachers.some(x => x.selected) ? {"background-color": "green"}: {}]'
                    >
                      Elija de la lista
                    </button>

                    <div class='dropdown-menu animated--fade-in ' aria-labelledby='dropdownMenuButton'
                         x-placement='bottom-start'
                         style='position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 38px, 0px);'>
                      <div class='input-group m-2 ' v-for='it in this.teachers' :key='it.id'>
                        <div class='input-group-text bg-white'>
                          <input type='checkbox' aria-label='Checkbox for following text input' v-model='it.selected'>
                          <span class='ml-2' id='basic7-addon3'>{{ it.shortName }}</span>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>

              </div>

              <div class='row'>
                <div class='col-md-6'>
                  <label class='col-form-label'> Elegir asignatura:</label>
                </div>

                <div class='col-sm-6'>

                  <div class='form-group'>
                    <button
                      :class="{'btn': true, 'btn-secondary': true, 'btn-lg': true, 'dropdown-toggle': true, 'border-danger': errors & (1 << 2)}"
                      type='button'
                      id='input-select-faculty'
                      data-toggle='dropdown'
                      aria-haspopup='true' aria-expanded='false'
                      style='width: 220px; height: 40px;'
                      :disabled='this.lessons.length === 0'
                    >
                      {{
                        !(newClass.lessonId && newClass.lessonId.id)
                          ? 'Elija de la lista'
                          : lessons.find(x => x.id === newClass.lessonId.id).shortName
                      }}
                    </button>

                    <div class='dropdown-menu'>
                      <a style='cursor: pointer' v-for='l in this.lessons' :key='l.id' class='dropdown-item'
                         @click.prevent='newClass.lessonId = {id: l.id}'>{{ l.fullName }}</a>
                    </div>
                  </div>

                </div>
              </div>

              <div class='row'>
                <div class='col-md-6'>
                  <label class='col-form-label'> Elegir local:</label>
                </div>

                <div class='col-sm-6'>
                  <div class='form-group'>
                    <button
                      :class="{'btn': true, 'btn-secondary': true, 'btn-lg': true, 'dropdown-toggle': true, 'border-danger': errors & (1 << 3)}"
                      type='button'
                      id='input-select-faculty'
                      data-toggle='dropdown'
                      aria-haspopup='true' aria-expanded='false'
                      style='width: 220px; height: 40px;'
                      :disabled='this.locals.length === 0'
                    >
                      {{
                        !(newClass.localId && newClass.localId.id)
                          ? 'Elija de la lista'
                          : locals.find(x => x.id === newClass.localId.id).shortName
                      }}
                    </button>

                    <div class='dropdown-menu'>
                      <a style='cursor: pointer' v-for='l in this.locals' :key='l.id' class='dropdown-item'
                         @click.prevent='newClass.localId = {id: l.id}'>{{ l.fullName }}</a>
                    </div>
                  </div>
                </div>
              </div>

              <div class='row'>
                <div class='col-md-6'>
                  <label class='col-form-label'> Elegir tipo de clase:</label>
                </div>

                <div class='col-sm-6'>
                  <div class='form-group'>
                    <button
                      :class="{'btn': true, 'btn-secondary': true, 'btn-lg': true, 'dropdown-toggle': true, 'border-danger': errors & (1 << 4)}"
                      type='button'
                      id='input-select-faculty'
                      data-toggle='dropdown'
                      aria-haspopup='true' aria-expanded='false'
                      style='width: 220px; height: 40px;'
                      :disabled='this.typeClasses.length === 0'
                    >
                      {{
                        !(newClass.typeClassId && newClass.typeClassId.id)
                          ? 'Elija de la lista'
                          : typeClasses.find(x => x.id === newClass.typeClassId.id).shortName
                      }}
                    </button>

                    <div class='dropdown-menu'>
                      <a style='cursor: pointer' v-for='l in this.typeClasses' :key='l.id' class='dropdown-item'
                         @click.prevent='newClass.typeClassId = {id: l.id}'>{{ l.fullName }}</a>
                    </div>
                  </div>
                </div>
              </div>

              <div class='row'>
                <div class='col-md-6'>
                  <label class='col-form-label'> Elegir grupo:</label>
                </div>

                <div class='col-sm-6'>
                  <div class='form-group'>
                    <button
                      :class="{'btn': true, 'btn-secondary': true, 'btn-lg': true, 'dropdown-toggle': true, 'border-danger': errors & (1 << 5)}"
                      type='button'
                      id='input-select-faculty'
                      data-toggle='dropdown'
                      aria-haspopup='true' aria-expanded='false'
                      style='width: 220px; height: 40px;'
                      :disabled='this.groups.length === 0'
                    >
                      {{
                        !(newClass.groupId && newClass.groupId.id)
                          ? 'Elija de la lista'
                          : groups.find(x => x.id === newClass.groupId.id).shortName
                      }}
                    </button>

                    <div class='dropdown-menu'>
                      <a style='cursor: pointer' v-for='l in this.groups' :key='l.id' class='dropdown-item'
                         @click.prevent='newClass.groupId = {id: l.id}'>{{ l.fullName }}</a>
                    </div>
                  </div>
                </div>
              </div>

              <div class='row'>
                <div class='col col-md-6'>
                  <input type='checkbox'
                         v-model='newClass.inSerie' /> Crear en serie ?
                </div>

                <div class='col col-md-6'>

                  <div class='form-group'>
                    <input type='number'
                           class='form-control'
                           :class="{'form-control': true, 'border-danger': newClass.inSerie && errors & (1 << 6)}"
                           :disabled='!newClass.inSerie'
                           v-model='newClass.frequency' />
                  </div>

                </div>
              </div>

            </form>
          </div>
          <div class='modal-footer'>
            <button type='button' class='btn btn-secondary' data-dismiss='modal'>Cancelar</button>
            <button type='button' class='btn btn-primary' @click='saveClass()'>
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Details-->
    <div class='modal fade' id='modalDetails' tabindex='-1' role='dialog' aria-labelledby='modalDetails'
         aria-hidden='true' ref='modalDetails'>
      <div class='modal-dialog' role='document'>
        <div class='modal-content'>
          <div class='modal-header'>
            <h5 class='modal-title' id='modalDetailsTitle'>Detalles del Turno</h5>
            <button type='button' class='close' data-dismiss='modal' aria-label='Close'>
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
          <div class='modal-body'>
            <form>

              <div class='row'>
                <div class='col-sm-6'> Titulo:</div>

                <div class='col-sm-6'>
                  <p>
                    {{ this.detailsClickedEvent.lesson.fullName }}
                  </p>
                </div>

              </div>

              <div class='row'>
                <div class='col-sm-6'> Descripcion:</div>

                <div class='col-sm-6'>

                  <p>
                    {{ this.detailsClickedEvent.lesson.description }}
                  </p>
                </div>

              </div>

              <div class='row'>

                <div class='col-md-6'>
                  <label class='col-form-label'> Profesores:</label>
                </div>

                <div class='col-sm-6'>

                  <div class='form-group'>

                    <ul v-if='detailsClickedEvent.teachers.length > 0'>
                      <li v-for='it in this.detailsClickedEvent.teachers' :key='it.id'> {{ it.fullName }}</li>
                    </ul>

                  </div>

                </div>

              </div>

              <div class='row'>
                <div class='col-md-6'>
                  <label class='col-form-label'> Asignatura:</label>
                </div>

                <div class='col-sm-6'>

                  <div class='form-group'>

                    <p> {{ this.detailsClickedEvent.lesson.fullName }} </p>

                  </div>

                </div>
              </div>

              <div class='row'>
                <div class='col-md-6'>
                  <label class='col-form-label'> Local: </label>
                </div>

                <div class='col-sm-6'>

                  <div class='form-group'>

                    {{ this.detailsClickedEvent.local.fullName }}

                  </div>

                </div>
              </div>

              <div class='row'>
                <div class='col-md-6'>
                  <label class='col-form-label'> Tipo de Clase:</label>
                </div>

                <div class='col-sm-6'>
                  <div class='form-group'>

                    <p> {{ this.detailsClickedEvent.typeClass.fullName }} </p>

                  </div>
                </div>
              </div>


              <div class='row'>
                <div class='col-md-6'>
                  <label class='col-form-label'> Evento en serie:</label>
                </div>

                <div class='col-sm-6'>
                  <div class='form-group'>

                    <p v-if='detailsClickedEvent.frequency'> Cada {{ this.detailsClickedEvent.frequency }} dias durante
                      todo el semestre </p>

                  </div>
                </div>
              </div>

              <div class='row'>
                <div class='col-md-6'>
                  <label class='col-form-label'> Horario:</label>
                </div>

                <div class='col-md-6'>
                  <p> {{ formatDate(this.detailsClickedEvent.start) }}</p>
                  <p> {{ formatDate(this.detailsClickedEvent.end) }} </p>
                </div>

              </div>

              <div class='row'>
                <div class='col-md-6'>
                  <label class='col-form-label'> Grupo:</label>
                </div>

                <div class='col-md-6'>
                  <p> {{ this.detailsClickedEvent.group.fullName }}</p>
                </div>

              </div>

            </form>
          </div>
          <div class='modal-footer'>
            <button type='button' class='btn btn-secondary' data-dismiss='modal'>Cerrar</button>
            <button v-if='this.isLogued()' type='button' class='btn btn-primary' data-dismiss='modal'
                    @click='deleteAllEventsInSerie(detailsClickedEvent.serieId, detailsClickedEvent.info)'>
              Eliminar todos los eventos de la serie
            </button>
            <button v-if='this.isLogued()' type='button' class='btn btn-primary' data-dismiss='modal'
                    @click='deleteEvent(detailsClickedEvent.id, detailsClickedEvent.info)'>
              Eliminar solo este evento
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Accion sobre toda la serie -->
    <!--    <div class='modal fade' id='allInSerie' tabindex='-1' role='dialog' aria-labelledby='exampleModalLabel'-->
    <!--         aria-hidden='true'>-->
    <!--      <div class='modal-dialog' role='document'>-->
    <!--        <div class='modal-content'>-->
    <!--          <div class='modal-header'>-->
    <!--            <h5 class='modal-title' id='exampleModalLabel'>Desea realizar la acción sobre todos los eventos de la serie-->
    <!--              ?</h5>-->
    <!--            <button class='close' type='button' data-dismiss='modal' aria-label='Close'>-->
    <!--              <span aria-hidden='true'>x</span>-->
    <!--            </button>-->
    <!--          </div>-->
    <!--          <div class='modal-footer'>-->
    <!--            <button class='btn btn-secondary' type='button' data-dismiss='modal'>Solo este evento</button>-->
    <!--            <button class='btn btn-primary' data-dismiss='modal'>Sobre toda la serie</button>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->

  </div>
</template>

<script>
// import { FullCalendar } from 'vue-full-calendar';
// import 'fullcalendar/dist/locale/es';
import { Settings } from 'luxon';
import { Datetime } from 'vue-datetime';

import FullCalendar from '@fullcalendar/vue';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import moment from 'moment';
import Permission from '@/utils/permission';

Settings.defaultLocale = 'es';

export default {
  name: 'Home',
  components: {
    Datetime,
    FullCalendar,
  },
  data() {
    return {
      courses: [],
      resources: [],
      tags: [],
      groups: [],
      teachers: [],
      lessons: [],
      semesters: [],
      locals: [],
      events: [],
      classes: [],
      typeClasses: [],
      errors: 0,
      detailsClickedEvent: {
        id: '',
        description: '',
        viewInCard: '',
        localId: {},
        resourceId: '',
        lessonId: {},
        typeClassId: {},
        teacherIds: [],
        teachers: [],
        lesson: {},
        typeClass: {},
        group: {},
        local: {},
        start: '',
        end: '',
        fullName: '',
        shortName: '',
        priority: '',
        serieId: '',
        info: {},
        color: '',
        frequency: 0,
      },
      newClass: {
        serieId: '',
        description: '',
        viewInCard: '',
        localId: {},
        lessonId: {},
        typeClassId: {},
        teacherIds: [],
        start: '',
        end: '',
        fullName: '',
        shortName: '',
        priority: '',
        color: '',
        groupId: {},
        inSerie: false,
        frequency: 0,
        resourceId: '',
      },
      actualSelectInfo: {},
      config: {
        schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
        defaultView: 'agendaWeek',
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin, // needed for dateClick
          resourceTimelinePlugin,
        ],
        locale: 'es',
        editable: false, // for edit events
        selectable: false, // for select events [add too]
        navLinks: true,
        weekends: false, // poner fines de semana
        events: [],
        resources: [],
        views: {
          by_resources: {
            type: 'resourceTimeline',
            // duration: { days: 5 },
            buttonText: 'Recursos',
          },
          by_week: {
            type: 'timeGridWeek',
            buttonText: 'Semanal',
          },
          by_month: {
            type: 'dayGridMonth',
            buttonText: 'Mensual',
          },
          by_day: {
            type: 'timeGridDay',
            buttonText: 'Diario',
          },
        },
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'by_day,by_week,by_month,by_resources',
        },
        groupByResourceAndDates: true,
        initialView: 'timeGridWeek',
        slotDuration: '00:30:00', // tiempo que cubre una celda
        scrollTime: '08:00:00',
        businessHours: {
          startTime: '8:00',
          endTime: '17:00',
        },
        // minTime: '8:00',
        // maxTime: '17:00',
        allDaySlot: false, // poner un evento que dura todo el dia
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventSet: this.handleEvents,
        eventDrop: this.eventDrop,
        eventResize: this.eventResize,
        eventOverlap: this.eventOverlap,
      },
      datetimeStart: '',
      datetimeEnd: '',
      phrases: { ok: 'Aceptar', cancel: 'Cancelar' },
    };
  },

  methods: {
    loadAll() {
      this.loadFrom('typeClasses');
      this.loadFrom('groups');
      this.loadFrom('teachers');
      this.loadFrom('lessons');
      this.loadFrom('locals');
      this.loadFrom('semesters');
      // this.loadFrom('classes');

      setTimeout(() => {
        let isAuthored = this.isLogued();

        this.config.selectable = isAuthored;
        this.config.editable = isAuthored;

      }, 750);
    },

    fixHoursInClasses() {
      for (let i = 0; i < this.classes.length; ++i) {
        let element = this.classes[i];

        element.start = moment.utc(element.start).local().toDate();
        element.end = moment.utc(element.end).local().toDate();
      }
    },

    loadResources() {
      this.config.resources = this.locals.map(l => {
        return {
          id: l.id,
          title: l.fullName,
        };
      });
    },

    updateEventsInCalendar() {
      this.config.events = [];
      this.classes.forEach(c => {
        this.config.events.push({
          id: c.id,
          title: c.shortName,
          start: c.start,
          end: c.end,
          color: c.color,
          resourceId: c.resourceId,
        });
      });
    },

    loadFrom(arg) {
      this.$store.state.profile.loadMinData();
      let token = this.$store.state.profile.data.token;

      this.$store.state[arg].getAll(token)
        .then(result => {
          if (result === true) {
            this[arg] = this.$store.state[arg].data;

            if (arg === 'classes') {
              this.fixHoursInClasses();
              this.updateEventsInCalendar();
            }

            if (arg === 'locals') {
              this.loadResources();
            }
          }
        });
    },

    getMarkedData(to) {
      return (item => {
        if (item.hasOwnProperty('selected') && item.selected) {
          to.push(item.id);
        }
      });
    },

    makeQuery() {
      this.$store.state.profile.loadMinData();
      let token = this.$store.state.profile.data.token;

      let toSendTags = [];
      let toSendLessons = [];
      let toSendGroups = [];
      let toSendLocals = [];
      let toSendResources = [];
      let toSendUsers = [];
      let toSendTypes = [];
      let toSendStartDate = null;
      let toSendEndDate = null;

      this.courses.forEach(this.getMarkedData(toSendLessons));
      this.tags.forEach(this.getMarkedData(toSendTags));
      this.groups.forEach(this.getMarkedData(toSendGroups));
      this.locals.forEach(this.getMarkedData(toSendLocals));
      this.resources.forEach(this.getMarkedData(toSendResources));
      this.lessons.forEach(this.getMarkedData(toSendLessons));
      this.typeClasses.forEach(this.getMarkedData(toSendTypes));

      if (this.datetimeStart !== '') {
        toSendStartDate = this.datetimeStart;
      }

      if (this.datetimeEnd !== '') {
        toSendEndDate = this.datetimeEnd;
      }

      this.$store.state.query.makeQuery(
        token,
        toSendLessons,
        toSendLocals,
        toSendGroups,
        toSendTypes,
        toSendStartDate,
        toSendEndDate)
        .then(result => {
          if (result === true) {
            this.classes = this.$store.state.query.data;

            this.fixHoursInClasses();
            this.updateEventsInCalendar();
          }

          // this.loadAll();
        });
    },

    updateClass(data, id) {

    },

    /**
     * Event has already been dropped on a valid date-time.
     */
    eventDrop(info) {
      const updateAllEvents = confirm('Se modificará el horario de todos los eventos de la serie. Si cancela solo se actualizará el evento actual.');

      const originalEvent = this.classes.find(x => x.id === info.event.id);
      const newStartEvent = info.event.startStr;
      const newEndEvent = info.event.endStr;

      let toUpdate = Object.assign({}, originalEvent);
      toUpdate.start = newStartEvent;
      toUpdate.end = newEndEvent;

      this.$store.state.profile.loadMinData();
      let token = this.$store.state.profile.data.token;

      if (updateAllEvents) {
        this.$store.state.class.editMultiple(token, originalEvent.serieId, originalEvent, toUpdate)
          .then(result => {
            if (result === true) {

              const diffInStartHours =
                moment(toUpdate.start)
                  .diff(moment(originalEvent.start), 'second');

              const diffInEndHours =
                moment(toUpdate.end)
                  .diff(moment(originalEvent.end), 'second');

              this.classes
                .filter(x => x.serieId === originalEvent.serieId)
                .forEach(c => {
                  c.start = moment(c.start).add(diffInStartHours, 'second').toDate();
                  c.end = moment(c.end).add(diffInEndHours, 'second').toDate();
                });

              this.updateEventsInCalendar();


            } else {
              info.revert();
              alert(this.$store.state.class.data.error);
            }
          });
      } else {
        this.$store.state.class.edit(token, toUpdate)
          .then(result => {
            if (result === true) {
              originalEvent.start = toUpdate.start;
              originalEvent.end = toUpdate.end;

              this.updateEventsInCalendar();
            } else {
              info.revert();
              alert(this.$store.state.class.data.error);
            }
          });
      }
    },

    /**
     * Event has been resized.
     */
    eventResize(info) {
      this.eventDrop(info);
    },

    // eventSelected(event, jsEvent, view) {
    //   this.$router.push({ name: 'eventPage', params: { eventId: event.id } });
    // },

    handleWeekendsToggle() {
      this.calendarOptions.weekends = !this.calendarOptions.weekends; // update a property
    },

    addEvent(id, title, start, end, allDay, data, selectInfo) {

      this.classes.push(data);
      this.classes = this.classes.slice().sort((a, b) => b.shortName - a.shortName);

      let calendarApi = selectInfo.view.calendar;
      calendarApi.unselect(); // clear date selection
      if (title) {
        calendarApi.addEvent({
          id,
          title,
          start,
          end,
          allDay,
          resourceId: data.resourceId,
        });
      }

    },
    checkErrors() {
      this.errors |= (this.newClass.viewInCard === '') ? 1 : this.errors;
      this.errors |= (!this.teachers.some(x => x.selected === true)) ? (1 << 1) : this.errors;
      this.errors |= (Object.keys(this.newClass.lessonId).length === 0) ? (1 << 2) : this.errors;
      this.errors |= (Object.keys(this.newClass.localId).length === 0) ? (1 << 3) : this.errors;
      this.errors |= (Object.keys(this.newClass.typeClassId).length === 0) ? (1 << 4) : this.errors;
      this.errors |= (Object.keys(this.newClass.groupId).length === 0) ? (1 << 5) : this.errors;
      this.errors |= (this.newClass.inSerie && this.newClass.frequency === 0) ? (1 << 6) : this.errors;

      setTimeout(() => {
        this.errors = 0;
      }, 3000);

      return this.errors > 0;
    },
    saveClass() {
      if (this.checkErrors()) return;

      $('#modalCreate').modal('hide');

      const title = this.newClass.viewInCard;
      let selectInfo = this.actualSelectInfo;

      const startDate = selectInfo.startStr;
      const endDate = selectInfo.endStr;

      this.$store.state.profile.loadMinData();
      let token = this.$store.state.profile.data.token;

      this.newClass.fullName = this.newClass.viewInCard;
      this.newClass.shortName = this.newClass.fullName;
      this.newClass.priority = 1; // TODO: check this
      this.newClass.start = startDate;
      this.newClass.end = endDate;
      this.newClass.resourceId = this.newClass.localId.id;

      this.teachers.forEach(s => {
        if (s.selected)
          this.newClass.teacherIds.push({ id: s.id });
      });

      if (!this.newClass.inSerie) {

        this.$store.state.class.create(token, this.newClass)
          .then(result => {
            if (result === true) {
              this.addEvent(
                this.$store.state.class.data.id,
                title,
                startDate,
                endDate,
                selectInfo.allDay,
                this.$store.state.class.data,
                selectInfo);
            } else {
              alert(this.$store.state.class.data.error);
            }
          });

      } else {

        this.$store.state.classes.createInSerie(token, this.newClass)
          .then(result => {
            if (result === true) {

              let data = this.$store.state.classes.data;

              data.forEach(d => {

                this.newClass.id = d.id;
                this.newClass.start = d.start;
                this.newClass.end = d.end;

                this.addEvent(
                  d.id,
                  title,
                  d.start,
                  d.end,
                  selectInfo.allDay,
                  this.newClass,
                  selectInfo);
              });
            } else {
              alert(this.$store.state.classes.data.error);
            }
          });

      }
      this.restore();

    },

    restore() {

      this.teachers.forEach(t => {
        t.selected = false;
      });

      this.newClass = {
        description: '',
        viewInCard: '',
        localId: {},
        lessonId: {},
        typeClassId: {},
        teacherIds: [],
        start: [],
        end: [],
        fullName: '',
        shortName: '',
        priority: '',
        frequency: 0,
        inSerie: false,
      };
    },

    /**
     * Black Cell has been clicked.
     */
    handleDateSelect(selectInfo) {
      this.actualSelectInfo = selectInfo;

      $('#modalCreate').modal('show');
    },

    /**
     * Details of event from calendar.
     */
    handleEventClick(info) {
      this.$store.state.profile.loadMinData();
      let token = this.$store.state.profile.data.token;

      this.$store.state.class.getDetails(token, info.event.id)
        .then(result => {
          if (result === true) {
            this.detailsClickedEvent = this.$store.state.class.data;
            this.detailsClickedEvent.info = info;

            $('#modalDetails').modal('show');

          } else {
            alert('Refesque la pagina. El evento no fue encontrado');
          }
        });

      // if (confirm(`Are you sure you want to delete the event '${info.event.title}'`)) {
      //   info.event.remove();
      // }
    },

    deleteAllEventsInSerie(serieId, info) {

      let calendarApi = info.view.calendar;

      this.$store.state.profile.loadMinData();
      let token = this.$store.state.profile.data.token;

      this.$store.state.classes.deleteInSerie(token, serieId)
        .then(result => {
          if (result === true) {

            let toRemove = this.classes.filter(x => x.serieId === serieId);
            this.classes = this.classes.filter(x => x.serieId !== serieId);

            toRemove.forEach(e => {

              let event = calendarApi.getEventById(e.id);
              event.remove();

            });

          } else {
            alert(this.$store.state.classes.data.error);
          }
        });

    },

    deleteEvent(id, info) {
      this.$store.state.profile.loadMinData();
      let token = this.$store.state.profile.data.token;

      this.$store.state.classes.delete(token, id)
        .then(result => {
          if (result === true) {

            this.classes = this.classes.filter(x => x.id !== id);
            info.event.remove();

          } else {
            alert(this.$store.state.classes.data.error);
          }
        });

    },

    formatDate(date) {
      return moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a');
    },

    /**
     * Event overlap detected.
     */
    eventOverlap(stillEvent, movingEvent) {
      console.log('into event overlap');

      console.log(stillEvent);
      console.log(movingEvent);

      return true; // allow overlap
    },

    handleEvents(events) {

      console.log('into handle events');
      console.log(events);

      this.currentEvents = events;
    },

    download() {
      this.$store.state.profile.loadMinData();
      let token = this.$store.state.profile.data.token;

      this.$store.state.reports.generateExcelReport(token)
        .then(result => {
          if (result === true) {
            const response = this.$store.state.reports.data.data;

            const url = window
              .URL
              .createObjectURL(
                new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'report');
            document.body.appendChild(link);

            link.click();
            link.remove();
          }
        });
    },

    viewPanel() {
      return this.$store.state.profile.hasRole(Permission.VIEW_PANEL);
    },

    isLogued() {
      return this.$store.state.profile.isLogued();
    },
  },
  created() {
    this.makeQuery();
    this.loadAll();
  },
};
</script>

<style>
@import '~fullcalendar/dist/fullcalendar.min.css';
@import '~vue-datetime/dist/vue-datetime.css';

.fc-event {
  cursor: pointer;
}

.fc-list-item {
  cursor: pointer;
}
</style>
