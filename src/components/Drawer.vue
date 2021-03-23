<template>
    <div>
        <v-toolbar class="indigo" flat />

        <v-list-item v-for="(item, i) in items" :key="`item_${i}`" :to="item.action">
            <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
        </v-list-item>
    </div>
</template>


<script>
export default {
    name: 'drawer',
    data: function () {
        return {
            items: [
                { icon: 'home', text: '基金', action: 'fund' },
                { icon: 'home', text: 'v2ex热帖', action: 'v2ex' },
                { icon: 'home', text: 'NGA', action: 'nga' },
            ],
        };
    },
};
</script>
