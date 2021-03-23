<template>
    <div>
        <v-navigation-drawer v-model="drawer" app>
            <myContentDrawer />
        </v-navigation-drawer>

        <v-app-bar class="indigo" clipped-left app>
            <v-app-bar-nav-icon dark @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title @click="goHome" class="white--text">{{ TITLE }}</v-toolbar-title>
        </v-app-bar>
    </div>
</template>

<script>
import myContentDrawer from '@/components/Drawer';
import { mapState } from 'vuex'

export default {
    name: 'myToolbar',
    components: { myContentDrawer },
    computed: {
        ...mapState(['TITLE'])
    },
    data: function () {
        return {
            drawer: false,
        };
    },
    mounted: function () {
        document.addEventListener('toggleDrawer', this.toggleDrawer);
    },
    beforeDestroy: function () {
        document.removeEventListener('toggleDrawer', this.toggleDrawer);
    },
    methods: {
        toggleDrawer() {
            this.drawer = !this.drawer;
        },
        goHome() {
            window.location.hash = '/';
        },
    },
};
</script>
