<template>
    <v-app toolbar>
        <myToolbar />
        <v-content class="content-all">
            <v-slide-y-transition mode="out-in">
                <v-container pa-0 fluid fill-height align-content-center align-center class="main-container">
                    <router-view></router-view>
                    <v-speed-dial
                        v-model="fab"
                        :top="top"
                        :bottom="bottom"
                        :right="right"
                        :left="left"
                        :direction="direction"
                        :open-on-hover="hover"
                        :transition="transition"
                    >
                        <template v-slot:activator>
                            <v-btn v-model="fab" color="blue darken-2" dark fab>
                                <v-icon v-if="fab">mdi-close</v-icon>
                                <v-icon v-else>mdi-wrench</v-icon>
                            </v-btn>
                        </template>
                        <!-- <v-btn fab dark big color="green">
                编辑
                        </v-btn>-->
                        <v-btn fab dark big color="red" @click="jumpToSync">同步</v-btn>
                    </v-speed-dial>
                </v-container>
            </v-slide-y-transition>
        </v-content>
    </v-app>
</template>

<script>
import myToolbar from '@/components/MyToolbar';
export default {
    name: 'app',
    components: { myToolbar },
    methods: {
        jumpToSync() {
            this.$router.push('/login')
        }
    }
};
</script>

<style scoped>
.v-speed-dial {
    position: fixed;
    right: 30px;
    bottom: 30px;
}
.main-container {
    background-color: #f0f2f5;
}
</style>
