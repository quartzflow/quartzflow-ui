<template>
    <div>
        <p><span class="has-text-weight-bold">Name: {{ jobItem.name }}</span></p>
        <span class="is-size-6"><p><span class="has-text-weight-semibold">Description: </span>{{ jobItem.description }}</p></span>
        <span class="is-size-6"><p><span class="has-text-weight-semibold">Next run at: </span>{{ jobItem.nextRunAt }} </p></span>  
        <span class="is-size-6"><p><span class="has-text-weight-semibold">Status: </span>{{ jobItem.status }} </p></span>      
        <span class="is-size-6"><p><span class="has-text-weight-semibold">Executable name: </span>{{ jobItem.properties.executableName }}</p></span>
        <span class="is-size-6"><p><span class="has-text-weight-semibold">Parameters: </span>{{ jobItem.properties.parameters }}</p></span>
        <span class="is-size-6"><p><span class="has-text-weight-semibold">Max retries: </span>{{ jobItem.properties.maxRetries }}</p></span>
        <span class="is-size-6"><p><span class="has-text-weight-semibold">Output file: </span>{{ jobItem.properties.outputFile }}</p></span>

        <div class="columns is-size-6">
            <div class="column">
                <span><p><span class="has-text-weight-semibold">Run at: </span>{{ jobItem.properties.runAt }}</p></span>
                <span><p><span class="has-text-weight-semibold">Timezone: </span>{{ jobItem.properties.timezone }}</p></span>    
                <span><p><span class="has-text-weight-semibold">Run calendar: </span>{{ jobItem.properties.runCalendar }}</p></span>
                <span><p><span class="has-text-weight-semibold">Exclusion calendar: </span>{{ jobItem.properties.exclusionCalendar }}</p></span>
                <span><p><span class="has-text-weight-semibold">Run days: </span>{{ jobItem.properties.runDays }}</p></span>
            </div>
            <div class="column">
                <span><p><span class="has-text-weight-semibold">Run on completion of: </span>{{ jobItem.properties.runOnCompletionOf }}</p></span>
                <span><p><span class="has-text-weight-semibold">Run on success of: </span>{{ jobItem.properties.runOnSuccessOf }}</p></span>
                <span><p><span class="has-text-weight-semibold">Run on failure of: </span>{{ jobItem.properties.runOnFailureOf }}</p></span>
                <span><p><span class="has-text-weight-semibold">Terminate after: </span>{{ jobItem.properties.terminateAfter }} min</p></span>
                <span><p><span class="has-text-weight-semibold">Warn after: </span>{{ jobItem.properties.warnAfter }} min</p></span>
            </div>
        </div>

        <div class="level-left">
            <a class="level-item">
                <i class="fa fa-2x fa-bolt" @click="startJobItem(jobItem)" title="Run job now"></i> 
            </a>
            <a class="level-item">
                <i class="fa fa-2x fa-pause-circle" @click="pauseJobItem(jobItem)" title="Put job on hold"></i>
            </a>
            <a class="level-item">
                <i class="fa fa-2x fa-play-circle" aria-hidden="true" @click="resumeJobItem(jobItem)" title="Take job off hold"></i> 
            </a>

        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'JobListItem',
    props: ['jobItem'],
    methods: {
    ...mapActions([
      'pauseJobItem',
      'resumeJobItem',
      'startJobItem'
    ])
  }
}
</script>

<style>
.tag {
    cursor: pointer;
}
</style>
