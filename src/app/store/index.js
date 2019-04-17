import Vue from 'vue';
import Vuex from 'vuex';
import job from  './modules/job';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        job
    }
});