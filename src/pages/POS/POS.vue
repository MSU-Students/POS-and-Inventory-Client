<template>
  <div class="q-pa-md bg-image" container style="height: 745px">
    <div class="text-h4 text-bold row">
      <q-space />
      <q-btn
        class="q-py-sm"
        to="/Dashboard"
        icon="arrow_back"
        label="Back"
        flat
        dense
      />
    </div>
    <div class="row q-gutter-md">
      <div class="col-7">
        <q-card class="fit" style="max-height: 670px">
          <q-scroll-area style="height: 670px; max-height: 670px">
            <div class="q-pa-md row">
              <q-toolbar class="bg-green text-white shadow-2">
                <q-btn-toggle
                  v-model="model"
                  spread
                  no-caps
                  toggle-color="green"
                  color="white"
                  text-color="black"
                  class="full-width"
                  :options="[
                    { icon: 'dinner_dining', label: 'Foods', value: 'one' },
                    { icon: 'local_drink', label: 'Drinks', value: 'two' },
                    { icon: 'lunch_dining', label: 'Snacks', value: 'three' },
                    { icon: 'icecream', label: 'Desserts', value: 'four' },
                    { icon: 'fastfood', label: 'Packages', value: 'five' },
                  ]"
                />
                <div class="q-pa-md q-gutter-sm row">
                  <q-input
                    dark
                    dense
                    standout
                    debounce="300"
                    v-model="filter"
                    placeholder="Search"
                  >
                    <template v-slot:append>
                      <q-icon name="search" />
                    </template>
                  </q-input>
                </div>
              </q-toolbar>
              <div
                class="q-pa-md"
                v-for="data in allProduct"
                v-bind:key="data.productID"
              >
                <q-card class="my-card">
                  <div class="row">
                    <q-popup-proxy context-menu>
                      <q-banner>
                        <template v-slot:avatar>
                          <q-icon name="tag" color="green" />
                        </template>
                        <q-input type="number" />
                      </q-banner>
                    </q-popup-proxy>
                    <div class="col">
                      <q-img
                        src="https://cdn.quasar.dev/img/parallax2.jpg"
                        style="width: 130px; height: 200px"
                      />
                    </div>
                    <div class="col">
                      <div class="q-py-xl text-subtitle7 text-center">
                        <q-item-label>
                          {{ data.prodName }}
                        </q-item-label>
                        <q-item-label class="text-weight-bolder text-red-10">
                          price:
                          {{ data.price }}
                        </q-item-label>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <q-btn
                      unelevated
                      square
                      color="primary"
                      label="Add Product"
                      class="full-width"
                      @click="chooseSize = true"
                    />
                    <q-dialog v-model="chooseSize">
                      <q-card style="width: 400px">
                        <q-card-section>
                          <div class="text-h6">Choose size and quantity</div>
                        </q-card-section>

                        <q-card-section class="q-pt-none">
                          <q-input
                            placeholder="Enter quantity"
                            type="number"
                            filled
                            style="full-width"
                          />
                        </q-card-section>

                        <q-card-actions>
                          <div class="q-pa-md q-gutter-sm">
                            <div class="q-gutter-sm">
                              <q-radio
                                v-model="radioBTN"
                                dense
                                val="small"
                                label="small"
                              />
                              <q-radio
                                v-model="radioBTN"
                                dense
                                val="Medium"
                                label="Medium"
                              />
                              <q-radio
                                v-model="radioBTN"
                                dense
                                val="Large"
                                label="Large"
                              />
                              <q-radio
                                v-model="radioBTN"
                                dense
                                val="regular"
                                label="Regular"
                              />
                            </div>
                            <div class="q-px-sm q-pt-sm">
                              Your selection is:
                              <strong>{{ radioBTN }}</strong>
                            </div>
                          </div>
                        </q-card-actions>

                        <q-card-actions
                          align="right"
                          class="bg-white text-teal"
                        >
                          <q-btn flat label="OK" v-close-popup />
                        </q-card-actions>
                      </q-card>
                    </q-dialog>
                  </div>
                </q-card>
              </div>
            </div>
          </q-scroll-area>
        </q-card>
      </div>
      <div class="col">
        <q-card>
          <div>
            <q-card style="height: 670px">
              <q-card-section>
                <q-table
                  :rows="allOrder"
                  :columns="selectedOrder"
                  title="Customer Order"
                  :rows-per-page-options="[]"
                  row-key="OrderID"
                  wrap-cells
                  hide-bottom
                  style="height: 400px; max-height: 400px"
                >
                  <template v-slot:body="props">
                    <q-tr :props="props">
                      <q-td key="productName" :props="props">
                        {{ props.row.prodName }}
                      </q-td>
                      <q-td key="prodQuant" :props="props">
                        {{ props.row.prodQuant }}
                        <q-popup-edit
                          v-model="props.row.prodQuant"
                          title="Update quantity"
                          buttons
                          v-slot="editQuant"
                        >
                          <q-input
                            type="number"
                            v-model="editQuant.value"
                            dense
                            autofocus
                            counter
                            @keyup.enter="editQuant.set"
                          />
                        </q-popup-edit>
                      </q-td>
                      <q-td key="price" :props="props">
                        {{ props.row.price }}
                      </q-td>
                      <q-td key="subTotal" :props="props">
                        {{ props.row.subTotal }}
                      </q-td>
                      <q-td key="action" :props="props">
                        {{ props.row.action }}
                        <div>
                          <q-btn
                            color="red-10"
                            icon="delete"
                            size="sm"
                            class="q-ml-sm"
                            flat
                            round
                            dense
                          />
                        </div>
                      </q-td>
                    </q-tr>
                  </template>

                  <template v-slot:body-cell-action="props">
                    <q-td :props="props"> </q-td>
                  </template>
                </q-table>
              </q-card-section>
              <div class="q-px-sm q-pb-sm">
                <q-btn
                  class="full-width"
                  push
                  color="red"
                  label="Clear Order"
                />
              </div>
              <q-separator inset />

              <q-card-section>
                <div class="row">
                  <div class="col">Grand Total:</div>
                  <div class="q-px-sm text-red-5">₱100000.000</div>
                </div>
                <div class="q-py-md row">
                  <div class="q-py-sm col">
                    Payment:
                    <div class="q-py-sm row">
                      Change:
                      <div class="q-px-md text-red-7">100.00</div>
                    </div>
                  </div>
                  <div>
                    <q-input square outlined type="number" style="width: 200px">
                      <template v-slot:before>
                        <q-btn dense flat icon="calculate" />
                      </template>
                    </q-input>
                  </div>
                </div>
                <div class="row justify-end">
                  <q-btn
                    class="full-width"
                    push
                    color="primary"
                    label="Confirm Order"
                    @click="ConfirmOrder = true"
                  />
                  <q-dialog v-model="ConfirmOrder" persistent>
                    <q-stepper
                      v-model="StepConfirm"
                      header-nav
                      ref="stepper"
                      color="primary"
                      animated
                      style="width: 800px; max-width: 100vw"
                    >
                      <q-step
                        :name="1"
                        title="Confirming Order"
                        icon="settings"
                        :done="done1"
                      >
                        <q-card flat bordered>
                          <q-card-section>
                            <q-table
                              :rows="allOrder"
                              :columns="selectedOrder"
                              title="Selected Order"
                              :rows-per-page-options="[]"
                              row-key="SelProd"
                              wrap-cells
                              hide-bottom
                            >
                              <template v-slot:body="props">
                                <q-tr :props="props">
                                  <q-td key="productName" :props="props">
                                    {{ props.row.prodName }}
                                  </q-td>
                                  <q-td key="prodQuant" :props="props">
                                    {{ props.row.prodQuant }}
                                  </q-td>
                                  <q-td key="price" :props="props">
                                    {{ props.row.price }}
                                  </q-td>
                                  <q-td key="subTotal" :props="props">
                                    {{ props.row.subTotal }}
                                  </q-td>
                                </q-tr>
                              </template>

                              <template v-slot:body-cell-action="props">
                                <q-td :props="props"> </q-td>
                              </template>
                            </q-table>
                          </q-card-section>

                          <q-separator inset />

                          <q-card-section>
                            <div class="row">
                              <div class="col">Grand Total:</div>
                              <div class="col text-right q-px-sm">
                                ₱100000.000
                              </div>
                            </div>
                          </q-card-section>
                        </q-card>
                        <q-stepper-navigation class="q-gutter-md">
                          <q-btn
                            @click="
                              () => {
                                done1 = true;
                                StepConfirm = 2;
                              }
                            "
                            color="primary"
                            label="Continue"
                          />
                          <q-btn
                            label="Cancel"
                            color="red"
                            v-close-popup="cancelOrder"
                            :disable="!cancelOrder"
                          />
                        </q-stepper-navigation>
                      </q-step>
                      <q-step
                        :name="2"
                        title="Printing Invoice"
                        caption="Optional"
                        icon="create_new_folder"
                        :done="StepConfirm > 2"
                      >
                        An ad group contains one or more ads which target a
                        shared set of keywords.
                        <q-stepper-navigation>
                          <q-btn
                            @click="
                              () => {
                                done2 = true;
                                StepConfirm = 3;
                              }
                            "
                            color="primary"
                            label="Continue"
                          />
                          <q-btn
                            flat
                            @click="StepConfirm = 1"
                            color="primary"
                            label="Back"
                            class="q-ml-sm"
                          />
                        </q-stepper-navigation>
                      </q-step>
                      <q-step
                        :name="3"
                        title="Transanction Complete"
                        caption="Optional"
                        icon="Transanction Finish"
                        :done="StepConfirm > 3"
                      >
                        <div class="text-h6 flex flex-center">
                          <q-avatar
                            size="sm"
                            icon="task_alt"
                            color="green-5"
                            style="font-size: 3rem"
                          />
                          Transanction Finish
                        </div>
                        <q-stepper-navigation>
                          <q-btn
                            color="primary"
                            @click="done3 = true"
                            label="Finish"
                            v-close-popup
                          />
                          <q-btn
                            flat
                            @click="StepConfirm = 2"
                            color="primary"
                            label="Back"
                            class="q-ml-sm"
                          />
                        </q-stepper-navigation>
                      </q-step>
                    </q-stepper>
                  </q-dialog>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { IOrderInfo } from '../../store/Order/state';
import { IProductInfo } from '../../store/product/state';
import { mapState, mapActions, mapGetters } from 'vuex';
interface IRow {
  name: string;
}
@Options({
  computed: {
    ...mapState('Order', ['allOrder']),
    //...mapState('Product', ['allProduct']),
    ...mapGetters('product', ['allProduct']),
  },
  methods: {
    ...mapActions('Order', ['addOrder', 'editOrder', 'deleteOrder']),
    ...mapActions('Product', ['addProduct', 'editProduct', 'deleteProduct']),
  },
})
export default class POS extends Vue {
  addOrder!: (payload: IOrderInfo) => Promise<void>;
  editOrder!: (payload: IOrderInfo) => Promise<void>;
  deleteOrder!: (payload: IOrderInfo) => Promise<void>;
  allOrder!: IOrderInfo[];
  addProduct!: (payload: IOrderInfo) => Promise<void>;
  editProduct!: (payload: IOrderInfo) => Promise<void>;
  deleteProduct!: (payload: IOrderInfo) => Promise<void>;
  allProduct!: IProductInfo[];
  model = 'one';
  filter = '';
  ConfirmOrder = false;
  StepConfirm = 1;
  done1 = false;
  done2 = false;
  done3 = false;
  cancelOrder = true;
  chooseSize = false;
  radioBTN = '';

  columns = [
    {
      name: 'name',
      required: true,
      label: 'Dessert (100g serving)',
      align: 'left',
      field: (row: IRow) => row.name,
      format: (val: string) => `${val}`,
      sortable: true,
    },

    {
      name: 'price',
      align: 'price',
      label: 'price',
      field: 'price',
    },
    {
      name: 'img',
      label: 'img',
      field: 'img',
      sortable: true,
      style: 'width: 10px',
    },
  ];

  rows = [
    {
      id: 1,
      name: 'Frozen Yogurt',
      price: '₱10',
    },
    {
      id: 2,
      name: 'Ice cream sandwich',
      price: '₱10',
    },
    {
      id: 3,
      name: 'Eclair',
      price: '₱10',
    },
    {
      id: 4,
      name: 'Cupcake',
      price: '₱10',
    },
    {
      id: 5,
      name: 'Gingerbread',
      price: '₱10',
    },
    {
      id: 6,
      name: 'Jelly bean',
      price: '₱10',
    },
    {
      id: 7,
      name: 'Lollipop',
      price: '₱10',
    },
    {
      id: 8,
      name: 'Honeycomb',
      price: '₱10',
    },
    {
      id: 8,
      name: 'Donut',
      price: '₱10',
    },
    {
      id: 9,
      name: 'KitKat',
      price: '₱10',
    },
  ];

  selectedOrder = [
    {
      name: 'productName',
      required: true,
      label: 'Product Name',
      align: 'left',
      field: (row: IOrderInfo) => row.prodName,
      format: (val: string) => `${val}`,
      sortable: true,
    },

    {
      name: 'prodQuant',
      align: 'center',
      label: 'Quantity',
      field: 'prodQuant',
      sortable: true,
    },
    {
      name: 'price',
      align: 'center',
      label: 'Price',
      field: 'price',
    },
    {
      name: 'subTotal',
      align: 'center',
      label: 'SubTotal',
      field: 'subTotal',
    },
    {
      name: 'action',
      align: 'center',
      field: 'action',
    },
  ];

  tempInput(
    orderID: number,
    prodName: string,
    prodQuant: number,
    price: number,
    subTotal: number
  ) {
    this.inputOrder.orderID = orderID;
    this.inputOrder.prodName = prodName;
    this.inputOrder.prodQuant = prodQuant;
    this.inputOrder.price = price;
    this.inputOrder.subTotal = subTotal;
  }

  inputOrder: IOrderInfo = {
    orderID: 0,
    prodName: '',
    prodQuant: 0,
    price: 0,
    subTotal: 0,
    orderDate: '',
  };
  async onAddOrder() {
    await this.addOrder(this.inputOrder);
    this.$q.notify({
      type: 'positive',
      message: 'Successfully Added.',
    });
  }
}
</script>
<style>
.bg-image {
  background-image: url('../../assets/green.jpg');
  background-size: cover;
}
.my-card {
  position: relative;
  margin: auto;
  height: 31vh;
  width: 16vw;
}
</style>
