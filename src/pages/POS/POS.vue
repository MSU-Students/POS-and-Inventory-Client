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
            <div class="bg-green text-white shadow-transition">
              <div
                class="row text-center flex flex-center"
                :style="$q.platform.is.desktop ? 'height: 38px' : ''"
              >
                <q-space />
                <div
                  class="col-lg-2 col-md-2 col-sm-12 col-xs-12 cursor-pointer hover-blue"
                  @click="model = 'allProducts'"
                  clickable
                >
                  <q-icon class="q-pa-sm" size="25px" name="add_box" />
                  All products
                </div>

                <q-space />
                <div
                  class="col-lg-2 col-md-2 col-sm-12 col-xs-12 cursor-pointer hover-blue"
                >
                  <q-icon class="q-pa-sm" size="25px" name="dinner_dining" />
                  Foods
                  <q-menu
                    fit
                    @click="foodCat = true"
                    v-model="foodCat"
                    transition-show="flip-right"
                    transition-hide="flip-left"
                  >
                    <q-list dense class="text-grey-9 text-caption">
                      <div
                        v-for="foodCat in foodCategory"
                        v-bind:key="foodCat.name"
                      >
                        <q-item @click="model = foodCat.name" clickable>
                          <q-item-section>{{ foodCat.name }}</q-item-section>
                        </q-item>
                      </div>
                    </q-list>
                  </q-menu>
                  <q-icon
                    size="sm"
                    class="q-ml-xs text-grey-5"
                    name="keyboard_arrow_down"
                  ></q-icon>
                </div>
                <q-space />
                <!-- ------------------ -->
                <div
                  class="col-lg-2 col-md-2 col-sm-12 col-xs-12 cursor-pointer hover-blue"
                >
                  <q-icon class="q-pa-sm" size="25px" name="local_drink" />
                  Drinks
                  <q-menu
                    fit
                    @click="drinksCat = true"
                    v-model="drinksCat"
                    transition-show="flip-right"
                    transition-hide="flip-left"
                  >
                    <q-list dense class="text-grey-9 text-caption">
                      <div
                        v-for="drinksCat in drinkCategory"
                        v-bind:key="drinksCat.name"
                      >
                        <q-item @click="model = drinksCat.name" clickable>
                          <q-item-section>{{ drinksCat.name }}</q-item-section>
                        </q-item>
                      </div>
                    </q-list>
                  </q-menu>
                  <q-icon
                    size="sm"
                    class="q-ml-xs text-grey-5"
                    name="keyboard_arrow_down"
                  ></q-icon>
                </div>
                <q-space />
                <!-- ------------------ -->

                <div
                  class="col-lg-2 col-md-2 col-sm-12 col-xs-12 cursor-pointer hover-blue"
                  @click="model = 'None'"
                  clickable
                >
                  <q-icon class="q-pa-sm" size="25px" name="add_box" />
                  Add-ons
                </div>

                <!-- ----------------- -->
                <q-space />
              </div>
            </div>
            <div class="row">
              <div class="q-pa-md col-5">
                <q-radio v-model="radioSizes" val="Regular" label="Regular" />
                <q-radio v-model="radioSizes" val="Small" label="Small" />
                <q-radio v-model="radioSizes" val="Medium" label="Medium" />
                <q-radio v-model="radioSizes" val="Large" label="Large" />
              </div>
              <div class="q-pa-md col-7">
                <q-form @submit="model = filter">
                  <q-input
                    color="green"
                    dense
                    square
                    outlined
                    debounce="300"
                    v-model="filter"
                  >
                    <template v-slot:append>
                      <q-btn flat @click="model = filter">
                        <q-icon name="search" color="green" />
                      </q-btn>
                    </template>
                  </q-input>
                </q-form>
              </div>
            </div>

            <q-scroll-area style="height: 600px; max-height: 600px">
              <div class="row">
                <div
                  v-for="data in availableProduct"
                  v-bind:key="data.product_ID"
                >
                  <div
                    class="q-pa-sm"
                    v-if="
                      (data.productSubCategory === model &&
                        data.productSize === radioSizes) ||
                      (data.productName === model &&
                        data.productSize === radioSizes) ||
                      (model === 'allProducts' &&
                        data.productSize === radioSizes)
                    "
                  >
                    <q-card class="my-card" :class="class_val">
                      <div class="row">
                        <div class="col q-pt-md q-px-md">
                          <q-img
                            :src="`http://localhost:3000/media/${data.url}`"
                          />
                        </div>
                        <div class="col">
                          <div class="q-py-xl text-subtitle7">
                            <q-item-label>
                              {{ data.productName }}
                            </q-item-label>
                            <q-item-label
                              class="text-weight-bolder text-red-10"
                            >
                              Price:
                              {{ data.productPrice }}
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
                          class="full-width absolute-bottom"
                          @click="
                            tempInput.orderPrice = data.productPrice;
                            tempInput.orderSize = data.productSize;
                            tempInput.orderName = data.productName;
                            tempInput.orderCategory = data.productCategory;
                            tempInput.orderSubCategory =
                              data.productSubCategory;
                            StepConfirm = 1;
                            onaddCart();
                          "
                        />
                      </div>
                    </q-card>
                  </div>
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
                    :rows="allCart"
                    :columns="selectedOrder"
                    title="Customer Order"
                    :rows-per-page-options="[0]"
                    row-key="cart_ID"
                    wrap-cells
                    hide-bottom
                    style="height: 400px; max-height: 400px"
                  >
                    <template #body-cell-orderQuant="props">
                      <q-td :props="props">
                        <div class="q-gutter-md">
                          <q-btn
                            round
                            @click="openEditDialog(props.row)"
                            text-color="white"
                            color="green-6"
                          >
                            {{ props.row.orderQuant }}
                            <q-dialog v-model="editOrderQuant">
                              <q-card style="width: 300px">
                                <q-card-section>
                                  <q-form @submit="onEditCart()">
                                    <div class="q-pb-lg">
                                      <q-input
                                        v-model="tempInput.orderQuant"
                                        label="Edit Quantity"
                                        autofocus
                                        :rules="[
                                          (val) =>
                                            (val < 5000 && val > 0) ||
                                            'You can only input greater than 0 and less than 5000',
                                        ]"
                                      />
                                    </div>
                                    <div class="q-gutter-md" align="right">
                                      <q-btn
                                        label="Save"
                                        type="submit"
                                        color="green"
                                        flat
                                      />
                                      <q-btn
                                        label="Cancel"
                                        color="red"
                                        v-close-popup
                                        flat
                                      />
                                    </div>
                                  </q-form>
                                </q-card-section>
                              </q-card>
                            </q-dialog>
                          </q-btn>
                        </div>
                      </q-td>
                    </template>

                    <template v-slot:body-cell-action="props">
                      <q-td :props="props">
                        <div>
                          <q-btn
                            color="red-10"
                            icon="delete"
                            size="sm"
                            class="q-ml-xs"
                            flat
                            round
                            dense
                            @click="onDeleteSpecificCart(props.row)"
                          /></div
                      ></q-td>
                    </template>
                  </q-table>
                </q-card-section>
                <div class="q-px-sm q-pb-sm">
                  <q-btn
                    class="full-width"
                    push
                    color="red"
                    label="Clear Order"
                    @click="clearOrder"
                  />
                </div>
                <q-separator inset />

                <q-card-section>
                  <q-form @submit="ConfirmOrder = true">
                    <div class="row q-py-sm">
                      <div class="col">Grand Total:</div>
                      <div class="q-px-sm text-red-5">₱ {{ grandTotal() }}</div>
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
                        :rules="[
                          (val) =>
                            (val != 0 &&
                              val >= grandTotal() &&
                              grandTotal() != 0) ||
                            'You must input the right amount',
                        ]"
                      >
                      </q-input>
                    </div>
                    <div class="row q-py-sm">
                      <div class="col">Change:</div>
                      <div class="q-px-sm text-red-5">₱ {{ change }}</div>
                    </div>
                    <q-btn
                      class="full-width"
                      push
                      color="green"
                      label="Confirm Order"
                      type="submit"
                    />
                  </q-form>

                  <div class="q-pt-lg">
                    <q-dialog v-model="ConfirmOrder" persistent>
                      <q-stepper
                        v-model="StepConfirm"
                        ref="stepper"
                        color="green"
                        animated
                        style="width: 800px; max-width: 100vw"
                      >
                        <q-step
                          :name="1"
                          title="Confirming Order"
                          icon="settings"
                          color="green"
                          :done="done1"
                        >
                          <q-card flat bordered>
                            <q-card-section>
                              <q-table
                                :rows="allCart"
                                :columns="selectedOrder"
                                title="Selected Order"
                                :rows-per-page-options="[]"
                                wrap-cells
                                hide-bottom
                              >
                              </q-table>
                            </q-card-section>

                            <q-separator inset />

                            <q-card-section>
                              <div class="row">
                                <div class="col">Change:</div>
                                <div class="col text-right q-px-sm">
                                  {{ change }}
                                </div>
                              </div>
                            </q-card-section>

                            <q-separator inset />

                            <q-card-section>
                              <div class="row">
                                <div class="col">Grand Total:</div>
                                <div class="col text-right q-px-sm">
                                  {{ grandTotal() }}
                                </div>
                              </div>
                            </q-card-section>
                          </q-card>

                          <q-stepper-navigation
                            align="center"
                            class="q-gutter-md"
                          >
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
                          title="Customer Name"
                          color="green"
                          caption="Optional"
                          icon="Transanction Finish"
                          :done="StepConfirm > 2"
                        >
                          <q-card flat class="q-pa-sm">
                            <q-card-header class="flex flex-center text-h6">
                              Customer Name
                            </q-card-header>

                            <q-card-section class="flex flex-center">
                              <q-form
                                @submit="
                                  onPunchOrder();
                                  StepConfirm = 3;
                                  done2 = true;
                                "
                              >
                                <div class="q-pb-md">
                                  <q-input
                                    autofocus
                                    color="teal"
                                    outlined
                                    v-model="inputCustomer.customerName"
                                  />
                                </div>
                                <div class="q-gutter-md" align="center">
                                  <q-btn
                                    color="green"
                                    type="submit"
                                    label="Save"
                                  />

                                  <q-btn
                                    @click="StepConfirm = 1"
                                    color="red-5"
                                    label="Back"
                                    class="q-ml-sm"
                                  />
                                </div>
                              </q-form>
                            </q-card-section>
                          </q-card>
                        </q-step>

                        <q-step
                          :name="3"
                          title="Transanction Complete"
                          color="green"
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
                          <q-stepper-navigation
                            class="q-gutter-md"
                            align="center"
                          >
                            <q-btn
                              color="green"
                              @click="
                                done2 = true;
                                clearOrder();
                                printPreview = false;
                              "
                              label="Finish"
                              v-close-popup
                            />
                            <q-btn
                              color="green"
                              @click="printPreview = true"
                              label="Print"
                            />
                            <q-dialog v-model="printPreview">
                              <q-card
                                style="width: 800px; height: 600px"
                                class="q-px-sm q-pb-md"
                                @click="print()"
                              >
                                <div class="row">
                                  <div class="col-9">
                                    <q-card-section>
                                      <q-avatar size="125px">
                                        <img class="logo" />
                                      </q-avatar>
                                    </q-card-section>
                                  </div>
                                  <div class="col-3">
                                    <p>Date: {{ today }}</p>
                                  </div>
                                </div>
                                <q-card-section>
                                  <div class="row">
                                    <p>
                                      <strong
                                        >Bill to:
                                        {{ inputCustomer.customerName }}</strong
                                      >
                                    </p>
                                  </div>
                                  <div class="flex flex-center row">
                                    <q-table
                                      :rows="allCart"
                                      :columns="selectedOrder"
                                      :rows-per-page-options="[]"
                                      row-key="SelProd"
                                      wrap-cells
                                      hide-bottom
                                      flat
                                      style="height: 200px; max-height: 500px"
                                    >
                                      <template v-slot:body="props">
                                        <q-tr :props="props">
                                          <q-td
                                            key="productName"
                                            :props="props"
                                          >
                                            {{ props.row.orderName }}
                                          </q-td>
                                          <q-td key="orderQuant" :props="props">
                                            {{ props.row.orderQuant }}
                                          </q-td>
                                          <q-td key="orderSize" :props="props">
                                            {{ props.row.orderSize }}
                                          </q-td>
                                          <q-td key="orderPrice" :props="props">
                                            {{ props.row.orderPrice }}
                                          </q-td>
                                          <q-td
                                            key="orderSubTotal"
                                            :props="props"
                                          >
                                            {{ props.row.orderSubTotal }}
                                          </q-td>
                                        </q-tr>
                                      </template>

                                      <template v-slot:body-cell-action="props">
                                        <q-td :props="props"> </q-td>
                                      </template>
                                    </q-table>
                                  </div>
                                  <q-card-section>
                                    <p>Payment: {{ payment }}</p>
                                    <p>Change: {{ change }}</p>
                                    <p>Grand Total: {{ grandTotal() }}</p>
                                  </q-card-section>
                                </q-card-section>
                              </q-card>
                            </q-dialog>
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
import { mapState, mapActions, mapGetters, Payload } from 'vuex';
import {
  CustomerDto,
  ManageProductDto,
  SaleOrderDto,
  SaleRecordDto,
} from 'src/services/rest-api';
import { ICartInfo } from 'src/store/cart/state';
import { date } from 'quasar';
const timeStamp = Date.now();
const currentDate = date.formatDate(timeStamp, 'YYYY-MM-DD:HH:mm');
@Options({
  computed: {
    ...mapState('cart', ['allCart']),
    ...mapGetters('manageProduct', ['availableProduct']),
    ...mapState('customer', ['allCustomer']),
    ...mapState('saleOrder', ['allSaleOrder']),
    ...mapState('saleRecord', ['allSaleRecord']),
  },
  methods: {
    ...mapActions('cart', ['addCart', 'editCart', 'deleteCart', 'clear']),
    ...mapActions('manageProduct', ['getAllManageProduct']),
    ...mapActions('customer', ['addCustomer']),
    ...mapActions('saleOrder', ['addSaleOrder']),
    ...mapActions('saleRecord', ['addSaleRecord']),
    ...mapActions('account', ['getProfile']),
  },
})
export default class POS extends Vue {
  availableProduct!: ManageProductDto[];
  addCart!: (payload: ICartInfo) => Promise<void>;
  editCart!: (payload: ICartInfo) => Promise<void>;
  deleteCart!: (payload: ICartInfo) => Promise<void>;
  clear!: () => Promise<void>;
  allCart!: ICartInfo[];
  addCustomer!: (payload: CustomerDto) => Promise<void>;
  addSaleRecord!: (payload: SaleRecordDto) => Promise<void>;
  addSaleOrder!: (payload: SaleOrderDto) => Promise<void>;
  getProfile!: () => Promise<void>;
  getAllManageProduct!: () => Promise<void>;
  async mounted() {
    await this.getAllManageProduct();
  }
  radioSizes = 'Regular';
  model = 'allProducts';
  filter = '';
  ConfirmOrder = false;
  StepConfirm = 1;
  done1 = false;
  done2 = false;
  done3 = false;
  cancelOrder = true;
  chooseSize = false;
  editOrderQuant = false;
  quantity = 0;
  tempPrice = 0;
  payment = 0;
  change = 0;
  printPreview = false;
  today = new Date().toLocaleString();
  foodCat = false;
  drinksCat = false;
  addOnsCat = false;
  class_val = 'shadow-1 my-card';
  foodCategory = [
    {
      name: 'Meals',
    },
    {
      name: 'Platters',
    },
    {
      name: 'Rice Toppings',
    },
    {
      name: 'Chicken Wings',
    },
    {
      name: 'Sandwiches and Burgers',
    },
    {
      name: 'All-Time Favorites',
    },
    {
      name: 'Pasta and Noodles',
    },
    {
      name: 'Something Sweet',
    },
    {
      name: 'Pizza',
    },
    {
      name: 'French Fries and Nachos',
    },
    {
      name: 'Party Trays',
    },
    {
      name: 'Healthy Option',
    },
    {
      name: 'Smoothie Bowls',
    },
    {
      name: 'Frozen Spoon Ice Cream',
    },
  ];
  drinkCategory = [
    {
      name: 'Milk Teas',
    },
    {
      name: 'Fruit Teas',
    },
    {
      name: 'Yogurt Teas',
    },
    {
      name: 'Ice Blended Drinks',
    },
    {
      name: 'Salted Cream Series',
    },
    {
      name: 'Iced Coffees',
    },
    {
      name: 'Creamcheese Series',
    },
    {
      name: 'Ice Blended Coffees',
    },
    {
      name: 'Other Drinks',
    },
  ];
  addOnsCategory = [
    {
      name: 'None',
    },
  ];
  selectedOrder = [
    {
      name: 'productName',
      required: true,
      label: 'Product Name',
      align: 'left',
      field: (row: ICartInfo) => row.orderName,
      format: (val: string) => `${val}`,
      sortable: true,
    },
    {
      name: 'orderQuant',
      align: 'center',
      label: 'Quantity',
      field: 'orderQuant',
      sortable: true,
    },
    {
      name: 'orderSize',
      align: 'center',
      label: 'Size',
      field: 'orderSize',
    },
    {
      name: 'orderPrice',
      align: 'right',
      label: 'Price',
      field: 'orderPrice',
    },
    {
      name: 'orderSubTotal',
      align: 'right',
      label: 'SubTotal',
      field: 'orderSubTotal',
    },
    {
      name: 'action',
      align: 'center',
      field: 'action',
    },
  ];
  tempInput: ICartInfo = {
    orderName: '',
    orderQuant: 0,
    orderSize: '',
    orderPrice: 0,
    orderCategory: '',
    orderSubCategory: '',
    orderSubTotal: 0,
  };
  OrderConfimition() {
    if ((this.payment = 0 && this.allCart.length > 0 && this.change < -1)) {
      return 'You must input payment';
    }
  }
  print() {
    window.print();
  }
  grandTotal() {
    const result = this.allCart.reduce<number>((accumulator, current) => {
      return accumulator + current.orderSubTotal;
    }, 0);

    this.change = this.payment - result;
    return result;
  }
  resetOrder() {
    this.tempInput = {
      orderName: '',
      orderQuant: 0,
      orderSize: this.radioSizes,
      orderPrice: 0,
      orderCategory: '',
      orderSubCategory: '',
      orderSubTotal: 0,
    };
  }
  async onaddCart() {
    await this.addCart(this.tempInput);
    this.resetOrder();
  }
  async onEditCart() {
    await this.editCart(this.tempInput);
    this.editOrderQuant = false;
    this.resetOrder();
  }
  onDeleteSpecificCart(val: ICartInfo) {
    this.$q
      .dialog({
        message: 'Confirm to delete?',
        cancel: true,
        persistent: true,
      })
      .onOk(async () => {
        await this.deleteCart(val);
        this.$q.notify({
          type: 'warning',
          message: 'Successfully deleted',
        });
      });
  }
  openEditDialog(val: ICartInfo) {
    this.editOrderQuant = true;
    this.tempInput = { ...val };
  }
  async onPunchOrder() {
    const name: any = await this.addCustomer(this.inputCustomer);
    const getUser: any = await this.getProfile();
    const invoice = await this.addSaleRecord({
      ...this.inputSaleRecord,
      customer: name.customerID,
      user: getUser.id,
      totalAmount: this.grandTotal(),
      payment: this.payment,
    });
  }
  inputSaleRecord: SaleRecordDto = {
    sales_order_created: currentDate,
    totalAmount: 0,
    payment: 0,
  };
  inputCustomer: CustomerDto = {
    customerName: '',
    date_created: '',
  };
  async clearOrder() {
    await this.clear();
    this.change = 0;
    this.payment = 0;
  }
}
</script>
<style>
.bg-image {
  background-image: url('../../assets/green.jpg');
  background-size: cover;
}
.logo {
  background-image: url('../../assets/BesTea.jpg');
  background-size: cover;
}
.my-card {
  position: relative;
  left: 20px;
  height: 25vh;
  width: 17vw;
  max-width: 17vw;
}
.printme {
  display: none;
}
@media print {
  .no-printme {
    display: none;
  }
  .printme {
    display: block;
  }
}
</style>
