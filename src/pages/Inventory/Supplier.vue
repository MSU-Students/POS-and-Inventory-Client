<template>
  <q-page class="q-pa-lg bg-grey-1">
    <div>
      <div class="text-h4 text-teal q-pb-lg q-pt-md text-bold flex flex-center">
        <q-icon
          class="q-pr-sm"
          name="local_shipping"
          color="teal"
          style="font-size: 3rem"
        />
        Supplier List
      </div>
      <div class="q-mt-lg">
        <div class="q-gutter-sm q-pa-sm row">
          <q-space />
          <q-btn
            color="teal"
            icon-right="archive"
            label="Export to csv"
            @click="exportTable()"
          />
        </div>
      </div>
      <q-table
        title="List of suppliers"
        :rows="allSupplier"
        :columns="columns"
        row-key="supplierName"
        :filter="filter"
      >
        <template v-slot:top-right>
          <div class="q-pa-md q-gutter-sm row">
            <q-input
              outlined
              color="green"
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
              color="teal"
              dense
              size="13px"
              flat
              icon="add"
              @click="addNewSupplier = true"
            />
            <q-dialog v-model="addNewSupplier" persistent>
              <q-card style="width: 600px; max-width: 80vw">
                <q-card-section class="row">
                  <div class="text-h6">Add Supplier</div>
                  <q-space />
                  <q-btn
                    flat
                    round
                    dense
                    icon="close"
                    v-close-popup
                    @click="resetModel()"
                  />
                </q-card-section>

                <q-card-section>
                  <q-form @submit="onAddSupplier">
                    <div class="row q-gutter-md">
                      <div class="col">
                        <q-input
                          autofocus
                          color="green"
                          outlined
                          v-model="inputSupplier.supplierName"
                          label="Supplier Name"
                          lazy-rules
                          :rules="[
                            (val) =>
                              (val && val.length > 0) ||
                              'Does not accept empty input',
                          ]"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          color="green"
                          outlined
                          v-model="inputSupplier.company"
                          label="Company Name"
                          lazy-rules
                          :rules="[
                            (val) =>
                              (val && val.length > 0) ||
                              'You must put the product unit',
                          ]"
                        />
                      </div>
                    </div>
                    <div class="row q-gutter-md">
                      <div class="col">
                        <q-input
                          outlined
                          v-model="inputSupplier.email"
                          label="Email"
                          color="green"
                          type="email"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          outlined
                          v-model="inputSupplier.contact"
                          label="Contact Number"
                          mask="(####) ### - ####"
                          hint="Format: (0963) 135 - 8292"
                        />
                      </div>
                    </div>
                    <div class="q-py-md">
                      <q-input
                        outlined
                        v-model="inputSupplier.address"
                        label="Address"
                        color="green"
                      />
                    </div>

                    <div align="right">
                      <q-btn
                        flat
                        label="Cancel"
                        color="red-5"
                        v-close-popup
                        @click="resetModel()"
                      />
                      <q-btn flat label="Add" color="secondary" type="submit" />
                    </div>
                  </q-form>
                </q-card-section>
              </q-card>
            </q-dialog>
          </div>
        </template>
        <template v-slot:body-cell-Actions="props">
          <q-td :props="props">
            <div class="q-gutter-sm">
              <q-btn
                round
                color="teal"
                icon="edit"
                size="sm"
                flat
                dense
                @click="openEditDialog(props.row)"
              />
              <q-dialog v-model="editRowSupplier" persistent>
                <q-card style="width: 600px; max-width: 80vw">
                  <q-card-section class="row">
                    <div class="text-h6">Edit User</div>
                    <q-space />
                    <q-btn
                      flat
                      round
                      dense
                      icon="close"
                      v-close-popup
                      @click="resetModel()"
                    />
                  </q-card-section>

                  <q-card-section class="q-gutter-md">
                    <q-form @submit="onEditSupplier">
                      <div class="row q-gutter-md">
                        <div class="col">
                          <q-input
                            autofocus
                            color="green"
                            outlined
                            v-model="inputSupplier.supplierName"
                            label="Supplier Name"
                          />
                        </div>
                        <div class="col">
                          <q-input
                            color="green"
                            outlined
                            v-model="inputSupplier.company"
                            label="Company Name"
                          />
                        </div>
                      </div>
                      <div class="row q-gutter-md">
                        <div class="col">
                          <q-input
                            outlined
                            v-model="inputSupplier.email"
                            label="Email"
                            color="green"
                            type="email"
                          />
                        </div>
                        <div class="col">
                          <q-input
                            outlined
                            v-model="inputSupplier.contact"
                            label="Contact Number"
                            mask="(####) ### - ####"
                            hint="Format: (0963) 135 - 8292"
                          />
                        </div>
                      </div>
                      <div class="q-py-md">
                        <q-input
                          outlined
                          v-model="inputSupplier.address"
                          label="Address"
                          color="green"
                        />
                      </div>

                      <div align="right">
                        <q-btn
                          flat
                          label="Cancel"
                          color="red-5"
                          v-close-popup
                          @click="resetModel()"
                        />
                        <q-btn
                          flat
                          label="Save"
                          color="secondary"
                          type="submit"
                        />
                      </div>
                    </q-form>
                  </q-card-section>
                </q-card>
              </q-dialog>
              <q-btn
                color="red-5"
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
import { mapState, mapActions } from 'vuex';
import { SupplierDto } from 'src/services/rest-api';
import { exportFile } from 'quasar';

@Options({
  computed: {
    ...mapState('supplier', ['allSupplier']),
  },
  methods: {
    ...mapActions('supplier', [
      'addSupplier',
      'editSupplier',
      'deleteSupplier',
      'getAllSupplier',
    ]),
  },
})
export default class Supplier extends Vue {
  addSupplier!: (payload: SupplierDto) => Promise<void>;
  editSupplier!: (payload: SupplierDto) => Promise<void>;
  deleteSupplier!: (payload: SupplierDto) => Promise<void>;
  getAllSupplier!: () => Promise<void>;
  allSupplier!: SupplierDto[];

  async mounted() {
    await this.getAllSupplier();
  }

  columns = [
    {
      name: 'supplierName',
      required: true,
      label: 'Supplier Name',
      align: 'left',
      field: (row: SupplierDto) => row.supplierName || 'None',
    },
    {
      name: 'company',
      align: 'center',
      label: 'Company Name',

      field: (row: SupplierDto) => row.company || 'None',
    },
    {
      name: 'email',
      align: 'center',
      label: 'Email',
      field: (row: SupplierDto) => row.email || 'None',
    },
    {
      name: 'contact',
      align: 'center',
      label: 'Contact',
      field: (row: SupplierDto) => row.contact || 'None',
    },
    {
      name: 'address',
      align: 'center',
      label: 'Address',
      field: (row: SupplierDto) => row.address || 'None',
    },
    { name: 'Actions', align: 'center', label: 'Actions', field: 'Actions' },
  ];
  addNewSupplier = false;
  editRowSupplier = false;
  filter = '';

  inputSupplier: SupplierDto = {
    supplierName: '',
    company: '',
    email: '',
    contact: '',
    address: '',
  };

  async onAddSupplier() {
    await this.addSupplier(this.inputSupplier);
    this.addNewSupplier = false;
    this.resetModel();
    this.$q.notify({
      type: 'positive',
      message: 'Successfully Adeded.',
    });
  }

  async onEditSupplier() {
    await this.editSupplier(this.inputSupplier);
    this.editRowSupplier = false;
    this.resetModel();
    this.$q.notify({
      type: 'positive',
      message: 'Successfully Edit.',
    });
  }

  deleteSpecificSupplier(val: SupplierDto) {
    this.$q
      .dialog({
        message: 'Confirm to delete?',
        cancel: true,
        persistent: true,
      })
      .onOk(async () => {
        await this.deleteSupplier(val.supplierID as any);
        this.$q.notify({
          type: 'warning',
          message: 'Successfully deleted',
        });
      });
  }

  openEditDialog(val: SupplierDto) {
    this.editRowSupplier = true;
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
  wrapCsvValue(
    val: string,
    formatFn?: (v: string, r: any) => string,
    row?: any
  ) {
    let formatted = formatFn !== void 0 ? formatFn(val, row) : val;

    formatted =
      formatted === void 0 || formatted === null ? '' : String(formatted);

    formatted = formatted.split('"').join('""');
    /**
     * Excel accepts \n and \r in strings, but some other CSV parsers do not
     * Uncomment the next two lines to escape new lines
     */
    // .split('\n').join('\\n')
    // .split('\r').join('\\r')

    return `"${formatted}"`;
  }

  exportTable() {
    // naive encoding to csv format
    const header = [
      this.wrapCsvValue('Supplier Name'),
      this.wrapCsvValue('Company Name'),
      this.wrapCsvValue('Email'),
      this.wrapCsvValue('Contact'),
      this.wrapCsvValue('Address'),
    ];
    const rows = [header.join(',')].concat(
      this.allSupplier.map((c) =>
        [
          this.wrapCsvValue(String(c.supplierName)),
          this.wrapCsvValue(String(c.company) || 'None'),
          this.wrapCsvValue(String(c.email)),
          this.wrapCsvValue(String(c.contact)),
          this.wrapCsvValue(String(c.address) || 'None'),
        ].join(',')
      )
    );

    const status = exportFile(
      'category-export.csv',
      rows.join('\r\n'),
      'text/csv'
    );

    if (status !== true) {
      this.$q.notify({
        message: 'Browser denied file download...',
        color: 'negative',
        icon: 'warning',
      });
    }
  }
}
</script>
<style lang="sass"></style>
