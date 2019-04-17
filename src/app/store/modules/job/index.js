import axios from 'axios';

const qs = require('qs');

const state = {
    jobItems: [],
    activeJobItems: []
};

const mutations = {
    UPDATE_JOB_ITEMS (state, payload) {
        state.jobItems = payload;
    },
    UPDATE_JOB_ITEM (state, payload) {
        var indexOfJobItemToUpdate = state.jobItems.findIndex(i => i.id == payload.id);
        state.jobItems.splice(indexOfJobItemToUpdate, 1, payload);
    },
    UPDATE_ACTIVE_JOB_ITEMS (state, payload) {
        state.activeJobItems = payload;
    }
};

const actions = {
    updateJobItems ({ commit }) {
        axios.get('/api/jobs').then((response) => {
            commit('UPDATE_JOB_ITEMS', response.data)
        });
    },
 /*   pauseAllJobItems({ commit }) {
        axios.put('/api/jobs', {         
            actionToTake: 'pause'
        }).then((response) => {
            axios.get('/api/jobs').then((response) => {
                commit('UPDATE_JOB_ITEMS', response.data)
            });
        })
    },
    resumeAllJobItems({ commit }) {
        axios.put('/api/jobs', {
            actionToTake: 'resume'
        }).then((response) => {
            axios.get('/api/jobs').then((response) => {
                commit('UPDATE_JOB_ITEMS', response.data)
            });
        })
    },*/
    pauseAllJobItems({ commit }) {
        axios.put('/api/jobs', qs.stringify({ 'actionToTake': 'pause'}))
            .then((response) => {
            axios.get('/api/jobs').then((response) => {
                commit('UPDATE_JOB_ITEMS', response.data)
            });
        })
    },
    resumeAllJobItems({ commit }) {
        axios.put('/api/jobs', qs.stringify({ 'actionToTake': 'resume'}))
            .then((response) => {
            axios.get('/api/jobs').then((response) => {
                commit('UPDATE_JOB_ITEMS', response.data)
            });
        })
    },
    startJobItem({ commit }, jobItem ) {
        axios.put('/api/jobs/' + jobItem.id, qs.stringify({ 'actionToTake': 'start'}))
            .then((response) => {
            //commit('UPDATE_JOB_ITEM', response.data)
            axios.get('/api/jobs/' + jobItem.id).then((response) => {
                commit('UPDATE_JOB_ITEM', response.data)
            });
        })
    },
    pauseJobItem({ commit }, jobItem ) {
        axios.put('/api/jobs/' + jobItem.id, qs.stringify({ 'actionToTake': 'pause'}))
            .then((response) => {
            //commit('UPDATE_JOB_ITEM', response.data)
            axios.get('/api/jobs/' + jobItem.id).then((response) => {
                commit('UPDATE_JOB_ITEM', response.data)
            });
        })
    },
    resumeJobItem({ commit }, jobItem ) {
        axios.put('/api/jobs/' + jobItem.id, qs.stringify({ 'actionToTake': 'resume'}))
            .then((response) => {
            //commit('UPDATE_JOB_ITEM', response.data)
            axios.get('/api/jobs/' + jobItem.id).then((response) => {
                commit('UPDATE_JOB_ITEM', response.data)
            });
        })
    },
    updateActiveJobItems ({ commit }) {
        axios.get('/api/jobs?criteria=executing')
        .then((response) => {
            commit('UPDATE_ACTIVE_JOB_ITEMS', response.data)
        })
    },
    killActiveJobItem({ commit }, jobItem ) {
        axios.put('/api/jobs/' + jobItem.id, qs.stringify({ 'actionToTake': 'kill'})
        ).then((response) => {
            //commit('UPDATE_ACTIVE_JOB_ITEMS', response.data)
            axios.get('/api/jobs?criteria=executing')
            .then((response) => {
                commit('UPDATE_ACTIVE_JOB_ITEMS', response.data)
            })
        })
    }
};

const getters = {
    jobItems: state => state.jobItems,
    activeJobItems: state => state.activeJobItems
};

const jobModule = {
    state,
    mutations,
    actions,
    getters
}

export default jobModule;