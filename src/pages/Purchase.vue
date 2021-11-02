<template>
  <div class="q-pa-md">
    <div class="text-h4 text-bold">
      <q-icon name="shopping_bag" color="amber" style="font-size: 4rem" />
      Purchase
    </div>
    <div class="q-mt-lg">
      <div class="q-gutter-sm q-pa-sm row">
        <q-space />
        <q-btn
          color="purple"
          icon-right="archive"
          label="Export to csv"
          no-caps
        />
      </div>
    </div>
    <q-table
      title="Account List"
      :rows="rows"
      :columns="columns"
      row-key="name"
      :rows-per-page-options="[0]"
      :filter="filter"
    >
      <template v-slot:top-right>
        <div class="q-pa-md q-gutter-md row">
          <q-input
            outlined
            rounded
            dense
            debounce="300"
            v-model="filter"
            placeholder="Search"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>

          <q-btn
            size="13px"
            label="Add Purchase"
            color="primary"
            dense
            flat
            icon="add"
            @click="addUser = true"
          />
          <q-dialog v-model="addUser" persistent full-width>
            <q-card class="q-pa-md">
              <q-card-section class="row q-pa-md">
                <div class="text-h5">Add Purchase</div>
                <q-space />
                <q-btn flat round dense icon="close" v-close-popup />
              </q-card-section>

              <q-card-section>
                <div class="row q-gutter-md">
                  <div class="col-7">
                    <div class="text-h6">Select Product</div>
                    <q-input
                      outlined
                      placeholder="Pleas type the product"
                      dense
                    />
                  </div>
                  <div class="col">
                    <div class="text-h6">Select Supplier</div>
                    <q-input
                      outlined
                      placeholder="Pleas enter supplier"
                      dense
                    />
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
                      <q-td key="Orderproduct" :props="props"
                        >{{ props.row.Orderproduct }}
                      </q-td>
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

                      <q-td key="unitCost" :props="props"
                        >{{ props.row.unitCost }}
                        <q-popup-edit
                          v-model="props.row.unitCost"
                          title="Update Unit Cost"
                          buttons
                        >
                          <q-input
                            type="number"
                            v-model="props.row.unitCost"
                            dense
                            autofocus
                          />
                        </q-popup-edit>
                      </q-td>
                      <q-td key="tax" :props="props">{{ props.row.tax }} </q-td>
                      <q-td key="discount" :props="props"
                        >{{ props.row.discount }}
                      </q-td>
                      <q-td key="subtotal" :props="props"
                        >{{ props.row.subtotal }}
                      </q-td>
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
              <q-card-section class="q-gutter-md row">
                <div class="col">
                  <div class="text-subtitle1 text-bold">Purchase Status</div>
                  <q-input outlined dense />
                </div>
                <div class="col">
                  <div class="text-subtitle1 text-bold">Paid</div>
                  <q-input outlined dense />
                </div>
                <div class="col">
                  <div class="text-subtitle1 text-bold">Balance</div>
                  <q-input outlined dense />
                </div>
                <div class="col">
                  <div class="text-subtitle1 text-bold">Pay Status</div>
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
        </div>
      </template>

      <template v-slot:body-cell-Details="props">
        <q-td :props="props">
          <div class="q-gutter-sm">
            <q-btn
              round
              color="blue"
              icon="more_vert"
              size="md"
              flat
              dense
              @click="Details = true"
            />
            <q-dialog v-model="Details">
              <q-card style="width: 800px; max-width: 100vw" flat bordered>
                <q-card-section>
                  <div class="text-h6 text-center">
                    Purchase Details
                    <q-btn
                      round
                      flat
                      dense
                      icon="close"
                      class="float-right"
                      color="grey-8"
                      v-close-popup
                    ></q-btn>
                  </div>
                </q-card-section>
                <q-separator />
                <q-card-section>
                  <div>Date:</div>
                  <div>Refecence:</div>
                  <div>Purchase Status:</div>
                </q-card-section>
                <q-card-section>
                  <q-table
                    title="Detais Order"
                    :rows="Peekrows"
                    :columns="Peekcolumns"
                    row-key="peek"
                    :rows-per-page-options="[0]"
                    :filter="filter"
                  >
                  </q-table>
                </q-card-section>
              </q-card>
            </q-dialog>
          </div>
        </q-td>
      </template>

      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <div class="q-gutter-sm">
            <q-btn
              round
              color="blue"
              icon="edit"
              size="sm"
              flat
              dense
              @click="editRow = true"
            />
            <q-dialog v-model="editRow" full-width persistent>
              <q-card class="q-pa-md">
                <q-card-section class="row">
                  <div class="text-h6">Edit Order</div>
                  <q-space />
                  <q-btn flat round dense icon="close" v-close-popup />
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
                        <q-td key="Orderproduct" :props="props">
                          {{ props.row.Orderproduct }}
                        </q-td>
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

                        <q-td key="unitCost" :props="props"
                          >{{ props.row.unitCost }}
                          <q-popup-edit
                            v-model="props.row.unitCost"
                            title="Update Unit Cost"
                            buttons
                          >
                            <q-input
                              type="number"
                              v-model="props.row.unitCost"
                              dense
                              autofocus
                            />
                          </q-popup-edit>
                        </q-td>
                        <q-td key="tax" :props="props"
                          >{{ props.row.tax }}
                        </q-td>
                        <q-td key="discount" :props="props"
                          >{{ props.row.discount }}
                        </q-td>
                        <q-td key="subtotal" :props="props"
                          >{{ props.row.subtotal }}
                        </q-td>
                      </q-tr>
                    </template>
                  </q-table>
                </q-card-section>
                <q-card-section>
                  <div class="row q-gutter-md">
                    <div class="col">
                      <div class="text-h6">Select Supplier</div>
                      <q-input
                        outlined
                        placeholder="Pleas enter supplier"
                        dense
                      />
                    </div>
                  </div>
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
                <q-card-section class="q-gutter-md row">
                  <div class="col">
                    <div class="text-subtitle1 text-bold">Purchase Status</div>
                    <q-input outlined dense />
                  </div>
                  <div class="col">
                    <div class="text-subtitle1 text-bold">Paid</div>
                    <q-input outlined dense />
                  </div>
                  <div class="col">
                    <div class="text-subtitle1 text-bold">Balance</div>
                    <q-input outlined dense />
                  </div>
                  <div class="col">
                    <div class="text-subtitle1 text-bold">Pay Status</div>
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
            <q-btn
              color="red-10"
              icon="delete"
              size="sm"
              class="q-ml-sm"
              flat
              round
              dense
              @click="dialog = true"
            />
            <q-dialog v-model="dialog" persistent>
              <q-card style="width: 300px">
                <q-card-section class="row items-center">
                  <q-avatar
                    size="sm"
                    icon="warning"
                    color="red-10"
                    text-color="white"
                  />
                  <span class="q-ml-sm">Confirm Delete?</span>
                </q-card-section>
                <q-card-actions align="right">
                  <q-btn
                    flat
                    label="Cancel"
                    color="primary"
                    v-close-popup="cancelEnabled"
                    :disable="!cancelEnabled"
                  />
                  <q-btn flat label="Confirm" color="primary" v-close-popup />
                </q-card-actions>
              </q-card>
            </q-dialog>
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from 'vue-class-component';
interface IRow {
  product: string;
}
interface pdrow {
  Orderproduct: string;
}

interface peekrow {
  peek: string;
}

@Options({})
export default class ManageAccount extends Vue {
  Post;
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
      name: 'unitCost',
      align: 'center',
      label: 'Unit Cost',
      field: 'unitCost',
    },

    { name: 'tax', label: 'Tax', align: 'center', field: 'tax' },
    { name: 'discount', label: 'Discount', align: 'center', field: 'discount' },
    { name: 'subtotal', label: 'SubTotal', align: 'center', field: 'subtotal' },
  ];
  Prows = [
    {
      Orderproduct: 'Spoon',
      quantity: '2 packs',
      unitCost: '10.00',
      tax: '200',
      discount: '10%',
      subtotal: '500',
    },
    {
      Orderproduct: 'Spoon',
      quantity: '2 packs',
      unitCost: '10.00',
      tax: '200',
      discount: '10%',
      subtotal: '500',
    },
    {
      Orderproduct: 'Spoon',
      quantity: '2 packs',
      unitCost: '10.00',
      tax: '200',
      discount: '10%',
      subtotal: '500',
    },
    {
      Orderproduct: 'Spoon',
      quantity: '2 packs',
      unitCost: '10.00',
      tax: '200',
      discount: '10%',
      subtotal: '500',
    },
  ];
  columns = [
    {
      name: 'product',
      required: true,
      label: 'Order Reference',
      align: 'left',
      field: (row: IRow) => row.product,
      format: (val: string) => `${val}`,
    },
    {
      name: 'date',
      align: 'center',
      label: 'Date',
      field: 'date',
    },
    {
      name: 'supplier',
      align: 'center',
      label: 'Supplier',
      field: 'supplier',
    },
    {
      name: 'status',
      align: 'center',
      label: 'Purchase Status',
      field: 'status',
    },
    {
      name: 'total',
      align: 'center',
      label: 'Grand Total',
      field: 'total',
    },
    { name: 'paid', align: 'center', label: 'Paid', field: 'paid' },
    { name: 'balance', align: 'center', label: 'Balance', field: 'balance' },
    {
      name: 'paystatus',
      align: 'center',
      label: 'Pay Status',
      field: 'paystatus',
    },
    { name: 'Details', align: 'center', label: 'Details', field: 'Details' },
    { name: 'action', align: 'center', label: 'Action', field: 'action' },
  ];
  rows = [
    {
      product: 'Chocolate Powder',
      date: '9/24/2021',
      supplier: 'Milo Company',
      status: 'Pending',
      total: '200 packs',
      paid: 'Partial',
      balance: 'Paid',
      paystatus: 'Ongoing',
    },
  ];

  Peekcolumns = [
    {
      name: 'peek',
      required: true,
      label: 'Product Order',
      align: 'left',
      field: (row: peekrow) => row.peek,
      format: (val: string) => `${val}`,
    },
    {
      name: 'peekQuant',
      align: 'center',
      label: 'Quantity',
      field: 'peekQuant',
    },
    {
      name: 'peekCost',
      align: 'center',
      label: 'Unit Cost',
      field: 'peekCost',
    },
    {
      name: 'peeksubtotal',
      align: 'center',
      label: 'Sub Total',
      field: 'peeksubtotal',
    },
  ];
  Peekrows = [
    {
      peek: 'Spoon',
      peekQuant: '10',
      peekCost: '11',
      peeksubtotal: '100',
    },
  ];

  Details = false;
  dialog = false;
  cancelEnabled = true;
  addUser = false;
  editRow = false;
  filter = '';

  options = ['Admin', 'Cashier'];

  onItemClick() {
    console.log('Clicked!');
  }
}
</script>
