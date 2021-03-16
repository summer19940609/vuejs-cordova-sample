<template>
    <v-app toolbar>
        <myToolbar />
        <v-content>
            <v-slide-y-transition mode="out-in">
                <v-container class="main-container">
                    <router-view></router-view>
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
};
</script>

<style scoped>
.main-container {
    background-color: #f0f2f5;
    height: 100%;
    padding: 0;
}
</style>
