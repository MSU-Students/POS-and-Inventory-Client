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
        <q-card class="fit">
          <div class="q-pa-md">
            <q-table
              title="Menu"
              :rows="rows"
              :columns="columns"
              row-key="name"
              :filter="filter"
              grid
              hide-header
              hide-bottom
            >
              <template v-slot:top-right>
                <q-input
                  borderless
                  dense
                  debounce="300"
                  v-model="filter"
                  placeholder="Search"
                >
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </template>
              <template v-slot:body-cell-action="props">
                <q-td :props="props">
                  <q-badge :label="props.value"></q-badge>
                </q-td>
              </template>
            </q-table>
          </div>
        </q-card>
      </div>
      <div class="col">
        <q-card>
          <div>
            <q-card flat bordered class="my-card">
              <q-card-section>
                <q-table
                  :rows="rows2"
                  :columns="columns2"
                  title="Selected Order"
                  :rows-per-page-options="[]"
                  row-key="SelProd"
                  wrap-cells
                  hide-bottom
                >
                  <template v-slot:body="props">
                    <q-tr :props="props">
                      <q-td key="SelProd" :props="props">
                        {{ props.row.SelProd }}
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
                      <q-td key="subtotal" :props="props">
                        {{ props.row.subtotal }}
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
                      :rows="rows2"
                      :columns="columns2"
                      title="Selected Order"
                      :rows-per-page-options="[]"
                      row-key="SelProd"
                      wrap-cells
                      hide-bottom
                    >
                      <template v-slot:body="props">
                        <q-tr :props="props">
                          <q-td key="SelProd" :props="props">
                            {{ props.row.SelProd }}
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
                          <q-td key="subtotal" :props="props">
                            {{ props.row.subtotal }}
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

interface IRow {
  name: string;
}
interface SelRow {
  SelProd: string;
}

@Options({})
export default class POS extends Vue {
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
      name: 'Frozen Yogurt',
      price: 10,
    },
    {
      name: 'Ice cream sandwich',
      price: 10,
    },
    {
      name: 'Eclair',
      price: 10,
    },
    {
      name: 'Cupcake',
      price: 10,
    },
    {
      name: 'Gingerbread',
      price: 10,
    },
    {
      name: 'Jelly bean',
      price: 10,
    },
    {
      name: 'Lollipop',
      price: 10,
    },
    {
      name: 'Honeycomb',
      price: 10,
    },
    {
      name: 'Donut',
      price: 10,
    },
    {
      name: 'KitKat',
      price: 10,
    },
  ];

  columns2 = [
    {
      name: 'SelProd',
      required: true,
      label: 'Product',
      align: 'left',
      field: (row: SelRow) => row.SelProd,
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
      name: 'subtotal',
      align: 'center',
      label: 'SubTotal',
      field: 'subtotal',
    },
    {
      name: 'action',
      align: 'center',
      field: 'action',
    },
  ];

  rows2 = [
    {
      SelProd: 'Frozen Yogurt',
      prodQuant: 125,
      price: 10,
      subtotal: 300,
    },
    {
      SelProd: 'Ice cream sandwich',
      prodQuant: 300,
      price: 10,
      subtotal: 300,
    },
    {
      SelProd: 'Eclair',
      prodQuant: 1,
      price: 10,
      subtotal: 300,
    },
    {
      SelProd: 'Cupcake',
      prodQuant: 40,
      price: 10,
      subtotal: 300,
    },
    {
      SelProd: 'Gingerbread',
      prodQuant: 5,
      price: 10,
      subtotal: 300,
    },
  ];
}
</script>
<style>
.bg-image {
  background-image: url('../assets/green.jpg');
  background-size: cover;
}
</style>
