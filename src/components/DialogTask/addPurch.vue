<template>
  <q-dialog v-model="addUser" persistent full-width>
    <q-card class="q-pa-md">
      <q-card-section>
        <div class="text-h5">Add Purchase</div>
      </q-card-section>

      <q-card-section>
        <div class="row q-gutter-md">
          <div class="col-7">
            <div class="text-h6">Select Product</div>
            <q-input outlined placeholder="Pleas type the product" dense />
          </div>
          <div class="col-4">
            <div class="text-h6">Select Supplier</div>
            <q-input outlined placeholder="Pleas enter supplier" dense />
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <q-table
          title="Order Table"
          :rows="Prows"
          :columns="Pcolumns"
          row-key="Orderproduct"
          binary-state-sort
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="Orderproduct" :props="props">{{
                props.row.Orderproduct
              }}</q-td>
              <q-td key="quantity" :props="props">
                {{ props.row.quantity }}
                <q-popup-edit
                  v-model="props.row.quantity"
                  title="Update quantity"
                  buttons
                >
                  <q-input
                    type="number"
                    v-model="props.row.quantity"
                    dense
                    autofocus
                  />
                </q-popup-edit>
              </q-td>

              <q-td key="netcost" :props="props">{{ props.row.netcost }}</q-td>
              <q-td key="tax" :props="props">{{ props.row.tax }}</q-td>
              <q-td key="discount" :props="props">{{
                props.row.discount
              }}</q-td>
              <q-td key="subtotal" :props="props">{{
                props.row.subtotal
              }}</q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card-section>
      <q-card-section class="q-gutter-md row">
        <div class="col">
          <div class="text-subtitle1 text-bold">Order Tax</div>
          <q-input outlined dense />
        </div>
        <div class="col">
          <div class="text-subtitle1 text-bold">Discount</div>
          <q-input outlined dense />
        </div>
        <div class="col">
          <div class="text-subtitle1 text-bold">Shipping Cost</div>
          <q-input outlined dense />
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          label="Cancel"
          color="red"
          v-close-popup="cancelEnabled"
          :disable="!cancelEnabled"
        />
        <q-btn label="Submit" color="deep-purple" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';

interface pdrow {
  Orderproduct: string;
}

@Options({})
export default class addPurch extends Vue {
  Pcolumns = [
    {
      name: 'Orderproduct',
      required: true,
      label: 'Product',
      align: 'left',
      field: (Prows: pdrow) => Prows.Orderproduct,
      format: (val: string) => `${val}`,
      sortable: true,
    },
    { name: 'quantity', label: 'Quantity', align: 'center', field: 'quantity' },
    {
      name: 'netcost',
      align: 'center',
      label: 'Net Unit Cost',
      field: 'netcost',
    },

    { name: 'tax', label: 'Tax', align: 'center', field: 'tax' },
    { name: 'discount', label: 'Discount', align: 'center', field: 'discount' },
    { name: 'subtotal', label: 'SubTotal', align: 'center', field: 'subtotal' },
  ];
  Prows = [
    {
      Orderproduct: 'Spoon',
      quantity: '2 packs',
      netcost: '10.00',
      tax: '200',
      discount: '10%',
      subtotal: '500',
    },
  ];

  cancelEnabled = true;
}
</script>
