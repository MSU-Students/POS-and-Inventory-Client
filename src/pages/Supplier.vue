<template>
  <q-page class="q-pa-lg">
    <div>
      <div class="text-h4 text-bold">
        <q-icon
          name="local_shipping"
          color="deep-orange"
          style="font-size: 4rem"
        />
        Supplier
      </div>

      <br />

      <q-table
        title="List of suppliers"
        :rows="allSupplier"
        :columns="columns"
        row-key="name"
        :rows-per-page-options="[0]"
        :filter="filter"
      >
        <template v-slot:top-right>
          <div class="q-pa-md q-gutter-sm row">
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
              label="Add Supplier"
              color="primary"
              dense
              size="13px"
              flat
              icon="add"
              @click="addUser = true"
            />
            <q-dialog v-model="addUser" persistent>
              <q-card style="width: 900px">
                <q-card-section class="row">
                  <div class="text-h6">Add Supplier</div>
                  <q-space />
                  <q-btn flat round dense icon="close" v-close-popup />
                </q-card-section>

                <q-card-section class="q-gutter-md">
                  <div class="row">
                    <div class="col col-md-8">
                      <q-input
                        autofocus
                        class="q-py-md"
                        outlined
                        v-model="inputSupplier.supplierName"
                        label="Name"
                      />
                      <q-input
                        class="q-py-md"
                        outlined
                        v-model="inputSupplier.company"
                        label="Company Name"
                      />
                      <q-input
                        class="q-py-md"
                        outlined
                        v-model="inputSupplier.email"
                        label="Email"
                      />
                    </div>
                    <div class="col-md-4 q-pl-md">
                      <q-input
                        class="q-py-md"
                        outlined
                        v-model="inputSupplier.contact"
                        label="Contact Number"
                      />
                      <q-input
                        class="q-py-md"
                        outlined
                        v-model="inputSupplier.address"
                        label="Address"
                      />

                      <div class="q-py-md">
                        <q-file
                          v-model="files"
                          label="Pick profile picture"
                          filled
                          multiple
                          style="max-width: 300px"
                        >
                          <template v-slot:prepend>
                            <q-icon name="photo_camera" />
                          </template>
                        </q-file>
                      </div>
                    </div>
                  </div> </q-card-section
                >a

                <q-card-actions align="right">
                  <q-btn flat label="Cancel" color="red-10" v-close-popup />
                  <q-btn
                    flat
                    label="Add"
                    color="primary"
                    @click="onAddSupplier()"
                  />
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
                <q-card class="my-card" flat bordered>
                  <q-card-section>
                    <div class="text-h6">
                      Supplier Details
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
                  <q-card-section horizontal>
                    <q-card-section class="q-pt-xs col">
                      <div class="text-overline">
                        Padian Grocery,Marawi city
                      </div>
                      <div class="text-h5 q-mt-sm q-mb-xs">Basam C. Serad</div>
                      <div class="text-caption text-grey">
                        Padian Sales Manager/Cashier
                      </div>
                    </q-card-section>

                    <q-card-section class="col-5 flex flex-center">
                      <q-avatar
                        square
                        size="120px"
                        font-size="82px"
                        color="teal"
                        text-color="white"
                        icon="account_circle"
                      />
                    </q-card-section>
                  </q-card-section>

                  <q-separator />

                  <q-card-section>
                    Assessing clients needs and present suitable promoted
                    products. Liaising with and persuading targeted doctors to
                    prescribe our products utilizing effective sales skills.
                  </q-card-section>
                </q-card>
              </q-dialog>
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-Actions="props">
          <q-td :props="props">
            <div class="q-gutter-sm">
              <q-btn
                round
                color="blue"
                icon="edit"
                size="sm"
                flat
                dense
                @click="openEditDialog(props.row)"
              />
              <q-dialog v-model="editRow" persistent>
                <q-card style="width: 900px; max-width: 80vw">
                  <q-card-section class="row">
                    <div class="text-h6">Edit User</div>
                    <q-space />
                    <q-btn flat round dense icon="close" v-close-popup />
                  </q-card-section>

                  <q-card-section class="q-gutter-md">
                    <q-form @submit="onEditSupplier">
                      <div class="row">
                        <div class="col col-md-8">
                          <q-input
                            autofocus
                            class="q-py-md"
                            outlined
                            v-model="inputSupplier.supplierName"
                            label="Name"
                            lazy-rules
                            :rules="[
                              (val) =>
                                (val && val.length > 0) ||
                                'Does not accept empty input',
                            ]"
                          />
                          <q-input
                            class="q-py-md"
                            outlined
                            v-model="inputSupplier.company"
                            label="Company Name"
                          />
                          <q-input
                            class="q-py-md"
                            outlined
                            v-model="inputSupplier.email"
                            label="Email"
                          />
                        </div>
                        <div class="col-md-4 q-pl-md">
                          <q-input
                            class="q-py-md"
                            outlined
                            v-model="inputSupplier.contact"
                            label="Contact Number"
                          />
                          <q-input
                            class="q-py-md"
                            outlined
                            v-model="inputSupplier.address"
                            label="Address"
                          />

                          <div class="q-py-md">
                            <q-file
                              v-model="files"
                              label="Pick profile picture"
                              filled
                              multiple
                              style="max-width: 300px"
                            >
                              <template v-slot:prepend>
                                <q-icon name="photo_camera" />
                              </template>
                            </q-file>
                          </div>
                        </div>
                      </div>
                      <div align="right">
                        <q-btn
                          flat
                          label="Cancel"
                          color="red-10"
                          v-close-popup
                        />
                        <q-btn
                          flat
                          label="Save"
                          color="primary"
                          type="submit"
                        />
                      </div>
                    </q-form>
                  </q-card-section>
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
                @click="deleteSpecificSupplier(props.row)"
              />
            </div>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { ISupplierInfo } from 'src/store/supplier/state';
import { mapState, mapActions } from 'vuex';

@Options({
  computed: {
    ...mapState('supplier', ['allSupplier']),
  },
  methods: {
    ...mapActions('supplier', [
      'addSupplier',
      'editSupplier',
      'deleteSupplier',
    ]),
  },
})
export default class ManageAccount extends Vue {
  addSupplier!: (payload: ISupplierInfo) => Promise<void>;
  editSupplier!: (payload: ISupplierInfo) => Promise<void>;
  deleteSupplier!: (payload: ISupplierInfo) => Promise<void>;
  allSupplier!: ISupplierInfo[];

  columns = [
    {
      name: 'name',
      required: true,
      label: 'Name',
      align: 'left',
      field: (row: ISupplierInfo) => row.supplierName,
      format: (val: string) => `${val}`,
    },
    {
      name: 'company',
      align: 'center',
      label: 'Company Name',
      field: 'company',
    },
    {
      name: 'email',
      align: 'center',
      label: 'Email',
      field: 'email',
    },
    {
      name: 'Contact',
      align: 'center',
      label: 'Contact',
      field: 'contact',
    },
    { name: 'address', align: 'center', label: 'Address', field: 'address' },
    { name: 'Details', align: 'center', label: 'Details', field: 'Details' },
    { name: 'Actions', align: 'center', label: 'Actions', field: 'Actions' },
  ];
  dialog = false;
  cancelEnabled = true;
  addUser = false;
  editRow = false;
  Details = false;
  files = '';
  filter = '';

  inputSupplier: ISupplierInfo = {
    supplierName: '',
    company: '',
    email: '',
    contact: '',
    address: '',
  };

  options = ['Admin', 'Cashier'];

  async onAddSupplier() {
    await this.addSupplier(this.inputSupplier);
    this.addUser = false;
    this.resetModel();
  }

  async onEditSupplier() {
    await this.editSupplier(this.inputSupplier);
    this.editRow = false;
    this.resetModel();
    debugger;
  }

  deleteSpecificSupplier(val: ISupplierInfo) {
    this.$q
      .dialog({
        message: 'Confirm to delete?',
        cancel: true,
        persistent: true,
      })
      .onOk(async () => {
        await this.deleteSupplier(val);
        this.$q.notify({
          type: 'positive',
          message: 'Successfully deleted!',
        });
      });
  }

  openEditDialog(val: ISupplierInfo) {
    this.editRow = true;
    this.inputSupplier = { ...val };
  }

  resetModel() {
    this.inputSupplier = {
      supplierName: '',
      company: '',
      email: '',
      contact: '',
      address: '',
    };
  }
}
</script>
