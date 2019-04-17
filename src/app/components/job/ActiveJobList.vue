<template>
  <div id="activeJobs" class="box">
    <div class="active-jobs--header has-text-centered">
      <i class="fa fa-2x fa-cogs"></i>
      <span class="is-size-4 has-text-weight-bold"> Currently Active Jobs</span>
      <div class="has-text-left">
        <span class="has-text-weight-bold"># of active jobs: {{ activeJobItems.length }}</span>
      </div>
      <div class="is-pulled-right">
        <button class="button is-info" @click="updateActiveJobItems()">Refresh</button>
      </div>
    </div>
    <div class="active-job-list">
      <div
        v-for="activeJobItem in activeJobItems"
        :key="activeJobItem.id"
        class="active-job-list--item">
        <ActiveJobListItem :activeJobItem="activeJobItem" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
import ActiveJobListItem from './activeJobListItem';

export default {
  name: 'ActiveJobList',
  computed: {
    ...mapGetters([
      //map this.activeJobItems to this.$store.getters.activeJobItems  
      'activeJobItems'
    ])
  },
  created() {
      this.$store.dispatch('updateActiveJobItems')
  },
  components: {
    ActiveJobListItem
  },
  methods: {
    ...mapActions([
      'updateActiveJobItems'
    ])
  }
};
</script>

<style scoped>
.tag {
  cursor: pointer;
}

.active-jobs--header {
  border-bottom: 3px solid #E8E8E8;
  padding-bottom: 40px;
}

.active-job-list {
  padding-top: 10px;
}

.active-job-list--item {
  padding: 10px;
  border-bottom: 1px solid #E8E8E8;
}

</style>
