<template>
  <q-page class="q-pa-md bg-image">
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
                @mouseover="foodCat = true"
              >
                <q-icon class="q-pa-sm" size="25px" name="dinner_dining" />
                Foods
                <q-menu
                  fit
                  @mouseleave="foodCat = false"
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
                @mouseover="drinksCat = true"
              >
                <q-icon class="q-pa-sm" size="25px" name="local_drink" />
                Drinks
                <q-menu
                  fit
                  @mouseleave="drinksCat = false"
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
                @mouseover="addOnsCat = true"
              >
                <q-icon class="q-pa-sm" size="25px" name="add_box" />
                Add-ons
                <q-menu
                  fit
                  @mouseleave="addOnsCat = false"
                  v-model="addOnsCat"
                  transition-show="flip-right"
                  transition-hide="flip-left"
                >
                  <q-list dense class="text-grey-9 text-caption">
                    <div
                      v-for="addOnsCat in addOnsCategory"
                      v-bind:key="addOnsCat.name"
                    >
                      <q-item @click="model = addOnsCat.name" clickable>
                        <q-item-section>{{ addOnsCat.name }}</q-item-section>
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
                    (model === 'allProducts' && data.productSize === radioSizes)
                  "
                >
                  <q-card
                    class="my-card"
                    :class="class_val"
                    @click="
                      tempInput.orderName = data.productName;
                      tempInput.orderPrice = data.productPrice;
                      tempPrice = data.productPrice;
                      tempInput.orderCategory = data.productCategory;
                      tempInput.orderSubCategory = data.productSubCategory;
                    "
                  >
                    <div class="row">
                      <div class="col q-pt-md q-pl-md">
                        <q-img src="../../assets/Frappe.png" />
                      </div>
                      <div class="col">
                        <div class="q-py-xl text-subtitle7">
                          <q-item-label>
                            {{ data.productName }}
                          </q-item-label>
                          <q-item-label class="text-weight-bolder text-red-10">
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
                        @click="chooseSize = true"
                      />
                      <q-dialog v-model="chooseSize">
                        <q-card style="width: 400px">
                          <q-card-section>
                            <div class="text-h6 text-center">
                              {{ tempInput.orderName }}
                            </div>
                            <div class="text-h6">Choose Size and Quantity</div>
                          </q-card-section>

                          <q-card-section>
                            <q-form
                              @submit="
                                tempInput.orderSubTotal =
                                  tempInput.orderQuant * tempPrice;
                                grandTotal += tempInput.orderSubTotal;
                                onaddCart();
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
                                  v-model="tempInput.orderQuant"
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
                                    v-model="tempInput.orderSize"
                                    dense
                                    val="Small"
                                    label="Small"
                                  />
                                  <q-radio
                                    v-model="tempInput.orderSize"
                                    dense
                                    val="Medium"
                                    label="Medium"
                                  />
                                  <q-radio
                                    v-model="tempInput.orderSize"
                                    dense
                                    val="Large"
                                    label="Large"
                                  />
                                  <q-radio
                                    v-model="tempInput.orderSize"
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
                  row-key="order_id"
                  wrap-cells
                  hide-bottom
                  style="height: 400px; max-height: 400px"
                >
                  <template v-slot:body="props">
                    <q-tr :props="props">
                      <q-td key="orderName" :props="props">
                        {{ props.row.orderName }}
                      </q-td>
                      <q-td key="orderQuant" :props="props">
                        {{ props.row.orderQuant }}
                        <q-popup-edit
                          v-model="props.row.orderQuant"
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
                        {{ props.row.orderSize }}
                      </q-td>
                      <q-td key="price" :props="props">
                        {{ props.row.orderPrice }}
                      </q-td>
                      <q-td key="subTotal" :props="props">
                        {{ props.row.orderSubTotal }}
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
                            @click="onDeleteSpecificCart(props.row)"
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
                  @click="clearOrder"
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
                              :rows="allCart"
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
                                    {{ props.row.orderName }}
                                  </q-td>
                                  <q-td key="orderQuant" :props="props">
                                    {{ props.row.orderQuant }}
                                  </q-td>
                                  <q-td key="size" :props="props">
                                    {{ props.row.orderSize }}
                                  </q-td>
                                  <q-td key="price" :props="props">
                                    {{ props.row.orderPrice }}
                                  </q-td>
                                  <q-td key="subTotal" :props="props">
                                    {{ props.row.orderSubTotal }}
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
                                {{ grandTotal }}
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
                                print();
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
                        caption="Optional"
                        icon="Transanction Finish"
                        :done="StepConfirm > 2"
                      >
                        <q-card>
                          <q-card-section>
                            <q-input
                              label="Name"
                              outlined
                              v-model="inputCustomer.customerName"
                            />
                          </q-card-section>
                        </q-card>
                        <q-stepper-navigation align="center">
                          <q-btn
                            color="green"
                            @click="
                              onAddCustomer();
                              done2 = true;
                              StepConfirm = 3;
                            "
                            label="Save"
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
                            @click="
                              done2 = true;
                              clearOrder();
                            "
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
  </q-page>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { mapState, mapActions, mapGetters } from 'vuex';
import { CustomerDto, ManageProductDto } from 'src/services/rest-api';
import { ICartInfo } from 'src/store/cart/state';

type TimeZone = { name: string; offset: number; timezone: any };

@Options({
  computed: {
    ...mapState('cart', ['allCart']),
    ...mapGetters('manageProduct', ['availableProduct']),
    ...mapState('customer', ['allCustomer']),
    ...mapState('saleOrder', ['allSaleOrder']),
    ...mapState('saleRecord', ['allSaleRecord']),
  },

  methods: {
    ...mapActions('cart', ['addCart', 'editCart', 'deleteCart']),
    ...mapActions('manageProduct', ['getAllManageProduct']),
    ...mapActions('customer', ['addCustomer']),
    ...mapActions('saleOrder', ['addSaleOrder']),
    ...mapActions('saleRecord', ['allSaleRecord']),
  },
})
export default class POS extends Vue {
  availableProduct!: ManageProductDto[];

  addCart!: (payload: ICartInfo) => Promise<void>;
  editCart!: (payload: ICartInfo) => Promise<void>;
  deleteCart!: (payload: ICartInfo) => Promise<void>;
  allCart!: ICartInfo[];

  allCustomer!: CustomerDto[];
  addCustomer!: (payload: CustomerDto) => Promise<void>;

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
  radioBTN = 'regular';
  quantity = 0;
  tempPrice = 0;
  grandTotal = 0;
  payment = 0;
  change = 0;

  foodCat = false;
  drinksCat = false;
  addOnsCat = false;
  desertsCat = false;
  packagesCat = false;

  class_val = 'shadow-1 my-card';

  orderedProduct() {
    this.radioBTN;
  }

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
      name: 'orderName',
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
      align: 'center',
      label: 'Price',
      field: 'orderPrice',
    },
    {
      name: 'orderSubTotal',
      align: 'center',
      label: 'orderSubTotal',
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
    orderSize: this.radioBTN,
    orderPrice: 0,
    orderCategory: '',
    orderSubCategory: '',
    orderSubTotal: 0,
  };

  print() {
    window.print();
  }
  clearOrder() {
    window.location.reload();
  }

  resetOrder() {
    this.tempInput = {
      orderName: '',
      orderQuant: 0,
      orderSize: this.radioBTN,
      orderPrice: 0,
      orderCategory: '',
      orderSubCategory: '',
      orderSubTotal: 0,
    };
  }

  async onaddCart() {
    await this.addCart(this.tempInput);
    this.chooseSize = false;
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
        this.grandTotal -= val.orderPrice;
        this.$q.notify({
          type: 'warning',
          message: 'Successfully deleted',
        });
      });
  }

  inputCustomer: CustomerDto = {
    customerName: '',
    date_created: '',
  };

  async onAddCustomer() {
    await this.addCustomer(this.inputCustomer);
    this.resetCustomer();
  }

  resetCustomer() {
    this.inputCustomer = {
      customerName: '',
      date_created: '',
    };
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
