<template>
  <q-page class="q-pa-lg">
    <div class="text-h4 text-bold">
      <q-icon
        name="account_circle"
        color="light-blue-6"
        style="font-size: 4rem"
      />
      Account Management
    </div>

    <br />
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
      title="Account List"
      :rows="allAccount"
      :columns="columns"
      row-key="name"
      :rows-per-page-options="[0]"
      :filter="filter"
    >
      <template v-slot:top-right>
        <div class="q-pa-md q-gutter-sm row">
          <q-input
            color="secondary"
            outlined
            rounded
            dense
            debounce="300"
            v-model="filter"
            placeholder="Search"
          >
            <template v-slot:append>
              <q-icon name="search" color="secondary" />
            </template>
          </q-input>
          <q-btn
            label="Add User"
            color="secondary"
            dense
            flat
            icon="add"
            @click="addNewAccount = true"
          />
          <q-dialog v-model="addNewAccount" persistent>
            <q-card style="width: 800px; max-width: 100vw" class="q-pa-sm">
              <q-card-section class="row">
                <div class="text-h6">Add User</div>
                <q-space />
                <q-btn
                  flat
                  round
                  dense
                  icon="close"
                  v-close-popup
                  @click="resetModel()"
                  color="red-5"
                />
              </q-card-section>

              <q-card-section>
                <q-form @submit="onaddAccount">
                  <div class="row q-gutter-md q-py-sm">
                    <div class="col">
                      <q-input
                        color="secondary"
                        autofocus
                        outlined
                        v-model="inputAccount.FName"
                        label="First Name"
                        :rules="[
                          (val) =>
                            (val && val.length > 0) ||
                            'You Must enter your first name',
                        ]"
                      />
                    </div>
                    <div class="col">
                      <q-input
                        color="secondary"
                        outlined
                        v-model="inputAccount.MName"
                        label="Middle Name"
                      />
                    </div>
                    <div class="col">
                      <q-input
                        color="secondary"
                        outlined
                        v-model="inputAccount.LName"
                        label="Last Name"
                        :rules="[
                          (val) =>
                            (val && val.length > 0) ||
                            'You Must enter your Last name',
                        ]"
                      />
                    </div>
                  </div>
                  <div class="row q-gutter-md q-py-sm">
                    <div class="col">
                      <q-input
                        color="secondary"
                        outlined
                        v-model="inputAccount.username"
                        label="Username"
                        :rules="[
                          (val) =>
                            (val && val.length > 0) ||
                            'You Must enter your username',
                        ]"
                      />
                    </div>
                    <div class="col">
                      <q-input
                        color="secondary"
                        outlined
                        v-model="inputAccount.password"
                        label="Password"
                        :rules="[
                          (val) =>
                            (val && val.length > 0) ||
                            'You Must enter your password',
                        ]"
                      />
                    </div>
                  </div>
                  <div class="row q-gutter-md q-py-sm">
                    <div class="col">
                      <q-input
                        color="secondary"
                        outlined
                        v-model="inputAccount.contact"
                        label="Contact Number"
                        mask="###########"
                        hint="Sample: 09631358292"
                      />
                    </div>
                    <div class="col">
                      <q-input
                        color="secondary"
                        outlined
                        v-model="inputAccount.email"
                        label="Email"
                        type="email"
                      />
                    </div>
                    <div class="col">
                      <q-select
                        color="secondary"
                        outlined
                        v-model="inputAccount.type"
                        :options="options"
                        label="Roles"
                      />
                    </div>
                  </div>
                  <div align="right">
                    <q-btn
                      flat
                      label="Cancel"
                      color="red-5"
                      v-close-popup
                      @click="resetModel()"
                    />
                    <q-btn flat label="Save" color="secondary" type="submit" />
                  </div>
                </q-form>
              </q-card-section>
            </q-card>
          </q-dialog>
        </div>
      </template>

      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <div class="q-gutter-sm">
            <q-btn
              round
              color="secondary"
              icon="edit"
              size="sm"
              flat
              dense
              @click="openEditDialog(props.row)"
            />
            <q-dialog v-model="updateAccount" persistent>
              <q-card style="width: 800px; max-width: 100vw" class="q-pa-sm">
                <q-card-section class="row">
                  <div class="text-h6">Edit User</div>
                  <q-space />
                  <q-btn
                    flat
                    color="red-5"
                    round
                    dense
                    icon="close"
                    v-close-popup
                    @click="resetModel()"
                  />
                </q-card-section>

                <q-card-section>
                  <q-form @submit="oneditAccount">
                    <div class="row q-gutter-md q-py-sm">
                      <div class="col">
                        <q-input
                          color="secondary"
                          autofocus
                          outlined
                          v-model="inputAccount.FName"
                          label="First Name"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          color="secondary"
                          outlined
                          v-model="inputAccount.MName"
                          label="Middle Initial"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          color="secondary"
                          outlined
                          v-model="inputAccount.LName"
                          label="Last Name"
                        />
                      </div>
                    </div>
                    <div class="row q-gutter-md q-py-sm">
                      <div class="col">
                        <q-input
                          color="secondary"
                          outlined
                          v-model="inputAccount.username"
                          label="Username"
                        />
                      </div>
                      <div class="col">
                        <q-select
                          color="secondary"
                          outlined
                          v-model="inputAccount.status"
                          label="Status"
                          :options="statusOptions"
                        />
                      </div>
                    </div>
                    <div class="row q-gutter-md q-py-sm">
                      <div class="col">
                        <q-input
                          color="secondary"
                          outlined
                          v-model="inputAccount.email"
                          label="Email"
                          type="email"
                        />
                      </div>
                      <div class="col">
                        <q-select
                          color="secondary"
                          outlined
                          v-model="inputAccount.type"
                          :options="options"
                          label="Roles"
                        />
                      </div>
                    </div>
                    <div align="right">
                      <q-btn
                        flat
                        label="Cancel"
                        color="red-5"
                        @click="resetModel()"
                        v-close-popup
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
          </div>
        </q-td>
      </template>
      <template #body-cell-status="props">
        <q-td :props="props">
          <q-btn
            flat
            color="white"
            :text-color="colorManipulation(props.row.status)"
            :label="labelManipulation(props.row.status)"
          >
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { mapActions, mapState } from 'vuex';
import { UserDto } from 'src/services/rest-api';
import { date, exportFile } from 'quasar';

const timeStamp = Date.now();
const formattedString = date.formatDate(timeStamp, 'YYYY-MM-DD:HH:mm');

@Options({
  computed: {
    ...mapState('account', ['allAccount']),
  },
  methods: {
    ...mapActions('account', [
      'addAccount',
      'editAccount',
      'deleteAccount',
      'getAllUser',
      'getUsername',
    ]),
  },
})
export default class ManageAccount extends Vue {
  addAccount!: (payload: UserDto) => Promise<void>;
  editAccount!: (payload: UserDto) => Promise<void>;
  deleteAccount!: (payload: UserDto) => Promise<void>;
  getAllUser!: () => Promise<void>;
  getUsername!: (payload: UserDto) => Promise<void>;
  allAccount!: UserDto[];

  async mounted() {
    await this.getAllUser();
  }
  columns = [
    {
      name: 'name',
      required: true,
      label: 'Name',
      align: 'left',
      field: (row: UserDto) => row.FName + ' ' + row.MName + '. ' + row.LName,
      format: (val: string) => `${val}`,
    },
    {
      name: 'userDateCreated',
      align: 'center',
      label: 'Date Created',
      field: 'userDateCreated',
    },
    {
      name: 'contact',
      align: 'center',
      label: 'Contact',
      field: 'contact',
    },
    {
      name: 'email',
      align: 'center',
      label: 'Email',
      field: 'email',
    },
    { name: 'role', align: 'center', label: 'Role', field: 'type' },
    {
      name: 'status',
      align: 'center',
      label: 'Status',
      field: 'status',
    },
    { name: 'action', align: 'center', label: 'Action', field: 'action' },
  ];
  addNewAccount = false;
  updateAccount = false;
  filter = '';
  options = ['Admin', 'Cashier'];
  statusOptions = ['Active', 'Inactive'];

  inputAccount: UserDto = {
    FName: '',
    MName: '',
    LName: '',
    username: '',
    password: '',
    email: '',
    type: '',
    status: 'Active',
    contact: '',
    userDateCreated: formattedString,
  };

  async onaddAccount() {
    try {
      const res = await this.addAccount(this.inputAccount);
      this.addNewAccount = false;
      this.resetModel();
      this.$q.notify({
        type: 'positive',
        message: 'Successfully Added.',
      });
    } catch (error: any) {
      this.$q.notify({
        type: 'negative',
        message: error.message,
      });
    }
  }

  async oneditAccount() {
    try {
      await this.editAccount(this.inputAccount);
      this.updateAccount = false;
      this.resetModel();
      this.$q.notify({
        type: 'positive',
        message: 'Successfully Edit.',
      });
    } catch (error: any) {
      this.$q.notify({
        type: 'negative',
        message: error.message,
      });
    }
  }

  deleteSpecificAccount(val: UserDto) {
    this.$q
      .dialog({
        message: 'Confirm to delete?',
        cancel: true,
        persistent: true,
      })
      .onOk(async () => {
        await this.deleteAccount(val.id as any);
        this.$q.notify({
          type: 'warning',
          message: 'Successfully deleted',
        });
      });
  }

  openEditDialog(val: UserDto) {
    this.updateAccount = true;
    this.inputAccount = { ...val };
  }

  resetModel() {
    this.inputAccount = {
      FName: '',
      MName: '',
      LName: '',
      username: '',
      password: '',
      email: '',
      type: '',
      status: '',
      userDateCreated: '',
    };
  }

  colorManipulation(status: string) {
    if (status == 'Active') {
      return 'teal';
    } else if (status == 'Inactive') {
      return 'red';
    }
  }
  labelManipulation(status: string) {
    if (status == 'Active') {
      return 'Active';
    } else if (status == 'Inactive') {
      return 'Inactive';
    }
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
      this.wrapCsvValue('First Name'),
      this.wrapCsvValue('Middle Name'),
      this.wrapCsvValue('Last Name'),
      this.wrapCsvValue('Date created'),
      this.wrapCsvValue('User Type'),
      this.wrapCsvValue('Status'),
    ];
    const rows = [header.join(',')].concat(
      this.allAccount.map((c) =>
        [
          this.wrapCsvValue(c.FName),
          this.wrapCsvValue(c.LName),
          this.wrapCsvValue(c.LName),
          this.wrapCsvValue(c.userDateCreated),
          this.wrapCsvValue(String(c.type)),
          this.wrapCsvValue(String(c.status)),
        ].join(',')
      )
    );

    const status = exportFile(
      'accountlist-export.csv',
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

<style>
.bg-image {
  background-image: url('../assets/green.jpg');
  background-size: cover;
  background-blend-mode: overlay;
}
</style>
