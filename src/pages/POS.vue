<template>
  <div class="q-pa-md bg-image" container style="height: 730px">
    <div class="text-h4 q-pb-lg text-bold row">
      <q-icon name="point_of_sale" color="orange" style="font-size: 4rem" />
      POS
      <q-space />
      <q-btn to="/Dashboard" icon="arrow_back" label="Back" flat dense />
    </div>
    <div class="row q-gutter-md">
      <div class="col-7">
        <q-card class="fit" style="max-height: 600px">
          <q-scroll-area style="height: 600px">
            <div class="q-pa-md row">

            <q-toolbar class="bg-green text-white shadow-2">
                <q-toolbar-title>Menu</q-toolbar-title>
            </q-toolbar>
            <div class="q-pa-md" v-for="data in allOrder">
              <q-card  clickable v-ripple class="my-card">
                  <q-popup-proxy context-menu>
                    <q-banner>
                      <template v-slot:avatar>
                        <q-icon name="tag" color="green" />
                      </template>
                      <q-input type="number"/>
                    </q-banner>
                  </q-popup-proxy>
                  <q-img
                   src="https://cdn.quasar.dev/img/parallax2.jpg"
                   style="max-width: 380px; height: 200px"
                  />
                  <div class="absolute-bottom text-subtitle1 text-center">
                          <q-item-label class="text-center text-white">
                            {{data.prodName}}
                          </q-item-label>
                          <q-item-label
                            caption
                            lines="1"
                            class="text-center text-white"
                            >{{data.price}}
                            
                            </q-item-label>
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
            <q-card flat bordered >
              <q-card-section>
                <q-table
                  :rows="allOrder"
                  :columns="selectedOrder"
                  title="Selected Order"
                  :rows-per-page-options="[]"
                  row-key="OrderID"
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
                            icon="cancel"
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

              <q-separator inset />

              <q-card-section>
                <div class="row">
                  <div class="col">Grand Total:</div>
                  <div class="col text-right q-px-sm">₱100000.000</div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </q-card>
        <div class="row justify-end q-pt-sm q-gutter-sm">
          <q-btn push color="red" label="Cancel Order" />
          <q-btn
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
                <q-card flat bordered class="my-card">
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
                      <div class="col text-right q-px-sm">₱100000.000</div>
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
                An ad group contains one or more ads which target a shared set
                of keywords.
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
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { IOrderInfo } from '../store/Order/state';
import { mapState, mapActions } from 'vuex';
interface IRow {
  name: string;
}
@Options({
  computed: {
    ...mapState('Order', ['allOrder']),
  },
  methods: {
    ...mapActions('Order', ['addOrder', 'editOrder', 'deleteOrder']),
  },
})
export default class POS extends Vue {
  addOrder!: (payload: IOrderInfo) => Promise<void>;
  editOrder!: (payload: IOrderInfo) => Promise<void>;
  deleteOrder!: (payload: IOrderInfo) => Promise<void>;
  allOrder!: IOrderInfo[];

  filter = '';
  ConfirmOrder = false;
  StepConfirm = 1;
  done1 = false;
  done2 = false;
  done3 = false;
  cancelOrder = true;

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

  tempInput( orderID: number, prodName: string, prodQuant: number,price: number,subTotal: number){
      this.inputOrder.orderID = orderID;
      this.inputOrder.prodName = prodName;
      this.inputOrder.prodQuant =  prodQuant;
      this.inputOrder.price = price;
      this.inputOrder.subTotal = subTotal;
      
  }

  inputOrder: IOrderInfo = {
    orderID:0,
    prodName:'',
    prodQuant:0,
    price:0,
    subTotal:0,

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
  background-image: url('../assets/green.jpg');
  background-size: cover;
}
.my-card{
  position: relative;
  margin: auto;
  height: 25vh;
  width: 16.4vw;
}
  

</style>
