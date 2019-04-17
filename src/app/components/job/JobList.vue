<template>
  <div id="jobs" class="box">
    <div class="jobs--header has-text-centered">
      <i class="fa fa-2x fa-cog"></i>
      <span class="is-size-4 has-text-weight-bold"> All Jobs</span>
      <div class="has-text-left">
        <span class="has-text-weight-bold"># of jobs: {{ jobItems.length }}</span>
      </div>
      <div class="is-pulled-right">
        <button class="button is-info" @click="pauseAllJobItems()">Pause All Schedules</button>
        <button class="button is-info" @click="resumeAllJobItems()">Resume All Schedules</button>
      </div>
    </div>
    <div class="job-list">
      <div
        v-for="jobItem in jobItems"
        :key="jobItem.id"
        class="job-list--item">
        <JobListItem :jobItem="jobItem" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
import JobListItem from './jobListItem';

export default {
  name: 'JobList',
  computed: {
    ...mapGetters([
      //map this.jobItems to this.$store.getters.jobItems  
      'jobItems'
    ])
  },
  created() {
      this.$store.dispatch('updateJobItems')
  },
  components: {
    JobListItem
  },
  methods: {
    ...mapActions([
      'pauseAllJobItems',
      'resumeAllJobItems'
    ])
  }
};
</script>

<style scoped>
.tag {
  cursor: pointer;
}

.jobs--header {
  border-bottom: 3px solid #E8E8E8;
  padding-bottom: 40px;
}

.job-list {
  padding-top: 10px;
}

.job-list--item {
  padding: 10px;
  border-bottom: 1px solid #E8E8E8;
}

</style>
