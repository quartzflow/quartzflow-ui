<template>
    <div>
        <p><span class="has-text-weight-bold">Name: {{ activeJobItem.name }}</span></p>
        <span class="is-size-6"><p><span class="has-text-weight-semibold">Description: </span>{{ activeJobItem.description }}</p></span>
        <span class="is-size-6"><p><span class="has-text-weight-semibold">Started at: </span>{{ activeJobItem.startedAt }}</p></span>
        <span class="is-size-6"><p><span class="has-text-weight-semibold">Minutes executing for: </span>{{ activeJobItem.minutesExecutingFor }}</p></span>
        <span class="is-size-6"><p><span class="has-text-weight-semibold">Retry count: </span>{{ activeJobItem.retryCount }}</p></span>

        <div class="level-left">
            <a class="level-item"> 
                <i class="fa fa-2x fa-bomb" @click="killActiveJobItem(activeJobItem)"></i>
            </a>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'ActiveJobListItem',
    props: ['activeJobItem'],
    methods: {
    ...mapActions([
      'killActiveJobItem'
    ])
  }
}
</script>

<style>
.tag {
    cursor: pointer;
}
</style>
