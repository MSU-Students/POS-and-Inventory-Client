<template>
  <q-layout view="hHh lpR fFf" class="q-pa-md bg-image">
    <q-header reveal elevated class="bg-green text-white">
      <q-toolbar>
        <q-toolbar-title> Welcome to POS </q-toolbar-title>
        <q-btn
          class="q-py-sm"
          to="/Dashboard"
          icon="logout"
          label="Back"
          flat
          dense
        />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <div class="row q-gutter-md">
        <div class="col-7">
          <q-card style="max-height: 700px">
            <q-btn-toggle
              v-model="model"
              spread
              no-caps
              toggle-color="green"
              color="grey-4"
              text-color="black"
              :options="[
                { icon: 'dinner_dining', label: 'Foods', value: 'one' },
                { icon: 'local_drink', label: 'Drinks', value: 'two' },
                { icon: 'lunch_dining', label: 'Snacks', value: 'three' },
                { icon: 'icecream', label: 'Desserts', value: 'four' },
                { icon: 'fastfood', label: 'Packages', value: 'five' },
              ]"
            />
            <div class="q-pa-md">
              <q-input
                color="green"
                dense
                square
                outlined
                debounce="300"
                v-model="filter"
              >
                <template v-slot:append>
                  <q-icon name="search" color="green" />
                </template>
              </q-input>
            </div>

            <q-scroll-area style="height: 600px; max-height: 600px">
              <div class="row q-gutter-lg full-width">
                <div v-for="data in allProduct" v-bind:key="data.productID">
                  <q-card
                    class="my-card"
                    @click="
                      tempInput.prodName = data.prodName;
                      tempInput.price = data.price;
                      tempPrice = data.price;
                    "
                  >
                    <div class="row">
                      <div class="col q-pt-md q-pl-md">
                        <q-img src="../../assets/Frappe.png" />
                      </div>
                      <div class="col">
                        <div class="q-py-xl text-subtitle7">
                          <q-item-label>
                            {{ data.prodName }}
                          </q-item-label>
                          <q-item-label class="text-weight-bolder text-red-10">
                            Price:
                            {{ data.price }}
                          </q-item-label>
                        </div>
                      </div>
                    </div>
                    <div class="q-pa-sm">
                      <q-btn
                        unelevated
                        square
                        color="green"
                        label="Add Product"
                        class="full-width"
                        @click="chooseSize = true"
                      />
                      <q-dialog v-model="chooseSize">
                        <q-card style="width: 400px">
                          <q-card-section>
                            <div class="text-h6">Choose Size and Quantity</div>
                          </q-card-section>

                          <q-card-section>
                            <q-form
                              @submit="
                                tempInput.subTotal = quantity * tempPrice;
                                grandTotal += tempInput.subTotal;
                                onAddOrder();
                              "
                            >
                              <div>
                                <q-input
                                  autofocus
                                  placeholder="Enter quantity"
                                  filled
                                  mask="#"
                                  fill-mask="0"
                                  style="full-width"
                                  v-model="tempInput.prodQuant"
                                  type
                                  lazy-rules
                                  :rules="[
                                    (val) =>
                                      (val && val.length > 0) ||
                                      'Must input greater than or equal to one quantity',
                                  ]"
                                />
                              </div>
                              <div class="q-pa-md q-gutter-sm">
                                <div class="q-gutter-sm">
                                  <q-radio
                                    v-model="tempInput.size"
                                    dense
                                    val="small"
                                    label="Small"
                                  />
                                  <q-radio
                                    v-model="tempInput.size"
                                    dense
                                    val="medium"
                                    label="Medium"
                                  />
                                  <q-radio
                                    v-model="tempInput.size"
                                    dense
                                    val="large"
                                    label="Large"
                                  />
                                  <q-radio
                                    v-model="tempInput.size"
                                    dense
                                    val="regular"
                                    label="Regular"
                                  />
                                </div>
                              </div>
                              <div align="right">
                                <q-btn
                                  color="green"
                                  label="Add Order"
                                  type="submit"
                                />
                              </div>
                            </q-form>
                          </q-card-section>
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
              <q-card style="height: 700px">
                <q-card-section>
                  <q-table
                    :rows="allOrder"
                    :columns="selectedOrder"
                    title="Customer Order"
                    :rows-per-page-options="[0]"
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
                        <q-td key="size" :props="props">
                          {{ props.row.size }}
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
                              @click="onDeleteSpecificOrder(props.row)"
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
                  <div class="row q-py-sm">
                    <div class="col">Grand Total:</div>
                    <div class="q-px-sm text-red-5">₱ {{ grandTotal }}</div>
                  </div>
                  <div class="row q-py-sm">
                    <div class="q-py-sm col">Payment:</div>
                    <q-input
                      dense
                      square
                      outlined
                      v-model="payment"
                      type="number"
                      style="width: 300px"
                      prefix="₱"
                      @keyup.enter="change = payment - grandTotal"
                    >
                    </q-input>
                  </div>
                  <div class="row q-py-sm">
                    <div class="col">Change:</div>
                    <div class="q-px-sm text-red-5">₱ {{ change }}</div>
                  </div>

                  <div class="q-pt-lg">
                    <q-btn
                      class="full-width"
                      push
                      color="green"
                      label="Confirm Order"
                      @click="ConfirmOrder = true"
                    />
                    <q-dialog v-model="ConfirmOrder" persistent>
                      <q-stepper
                        v-model="StepConfirm"
                        header-nav
                        ref="stepper"
                        color="green"
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
                                    <q-td key="size" :props="props">
                                      {{ props.row.size }}
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
                              color="green"
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
                              color="green"
                              label="Continue"
                            />
                            <q-btn
                              flat
                              @click="StepConfirm = 1"
                              color="green"
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
                              color="green"
                              @click="done3 = true"
                              label="Finish"
                              v-close-popup
                            />
                            <q-btn
                              flat
                              @click="StepConfirm = 2"
                              color="green"
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
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { IOrderInfo } from '../../store/Order/state';
import { IProductInfo } from '../../store/product/state';
import { mapState, mapActions, mapGetters } from 'vuex';

@Options({
  computed: {
    ...mapState('Order', ['allOrder']),
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
  radioBTN = 'regular';
  quantity = 1;
  tempPrice = 0;
  grandTotal = 0;
  payment = 0;
  change = 0;
  orderedProduct() {
    this.radioBTN;
  }

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
      name: 'size',
      align: 'center',
      label: 'Size',
      field: 'size',
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

  tempInput: IOrderInfo = {
    orderID: 0,
    prodName: '',
    prodQuant: 0,
    size: this.radioBTN,
    price: 0,
    subTotal: 0,
    orderDate: '',
  };

  inputOrder: IOrderInfo = {
    orderID: 0,
    prodName: '',
    prodQuant: 0,
    size: '',
    price: 0,
    subTotal: 0,
    orderDate: '',
  };
  resetOrder() {
    this.tempInput = {
      orderID: 0,
      prodName: '',
      prodQuant: 0,
      size: '',
      price: 0,
      subTotal: 0,
      orderDate: '',
    };
  }

  async onAddOrder() {
    await this.addOrder(this.tempInput);
    this.chooseSize = false;
    this.resetOrder();
  }
  onDeleteSpecificOrder(val: IOrderInfo) {
    this.$q
      .dialog({
        message: 'Confirm to delete?',
        cancel: true,
        persistent: true,
      })
      .onOk(async () => {
        await this.deleteOrder(val);
        this.grandTotal -= val.price;
        this.$q.notify({
          type: 'warning',
          message: 'Successfully deleted',
        });
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
  height: 23vh;
  width: 17vw;
}
</style>
