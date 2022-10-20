<template>
  <div>
    <v-select
      :options='paginated'
      :filterable='false'
      @open='onOpen'
      @close='onClose'
      @search='(query) => (this.search = query)'
      v-model='selectedFromInfiniteScroll'
    >
      <template #list-footer>
        <li v-show='hasNextPage' ref='load' class='loader'>
          Loading more options...
        </li>
      </template>
    </v-select>
  </div>
</template>

<script>
export default {
  name: 'InfiniteScroll',
  props: ['values'],
  data: () => ({
    observer: null,
    limit: 10,
    search: '',
    selectedFromInfiniteScroll: '',
  }),
  computed: {
    filtered() {
      if (!this.values) return [];
      return (this.values.filter((v) => v.fullName.toLowerCase().includes(this.search.toLowerCase()))).map(v => v.fullName);
    },
    paginated() {
      return this.filtered.slice(0, this.limit);
    },
    hasNextPage() {
      return this.paginated.length < this.filtered.length;
    },
  },
  mounted() {
    this.observer = new IntersectionObserver(this.infiniteScroll);
  },
  methods: {
    async onOpen() {
      if (this.hasNextPage) {
        await this.$nextTick();
        this.observer.observe(this.$refs.load);
      }
    },
    onClose() {
      this.observer.disconnect();
    },
    async infiniteScroll([{ isIntersecting, target }]) {
      if (isIntersecting) {
        const ul = target.offsetParent;
        const scrollTop = target.offsetParent.scrollTop;
        this.limit += 10;
        await this.$nextTick();
        ul.scrollTop = scrollTop;
      }
    },
  },
  watch: {
    selectedFromInfiniteScroll: function(val) {
      const ans = !val ? '' : this.values.find(x => x.fullName === val).id;

      this.$emit('input', ans);
    },
  },
};
</script>

<style scoped>
.loader {
  text-align: center;
  color: #bbbbbb;
}
</style>