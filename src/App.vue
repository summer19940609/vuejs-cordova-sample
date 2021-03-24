<template>
    <v-app toolbar>
        <myToolbar />
        <v-content>
            <v-slide-y-transition mode="out-in">
                <v-container class="main-container">
                    <Loading v-show="LOADING"></Loading>
                    <router-view></router-view>
                </v-container>
            </v-slide-y-transition>
        </v-content>
    </v-app>
</template>

<script>
import myToolbar from '@/components/MyToolbar';
import { mapState } from 'vuex'
import Loading from '@/components/Loading'
export default {
    name: 'app',
    computed: {
        ...mapState(['LOADING'])
    },
    components: { myToolbar, Loading },
};
</script>

<style scoped>
.main-container {
    background-color: #f0f2f5;
    height: 100%;
    padding: 0;
}
</style>
