<template>
<q-page>
<div class="q-pa-md">
    <div class="row">
        <div class="text-h4 q-pb-lg text-bold ">
            <q-icon name="payments" color="indigo" style="font-size: 4rem" />
            Sales report
        </div>
        
    </div>
   <chart/>
</div>
</q-page>      
</template>
<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import Chart from 'components/chart.component.vue';

@Options({

    components: { Chart }

})

export default class ChartComponent extends Vue {
}
</script>
