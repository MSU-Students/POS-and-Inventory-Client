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
            label="Add User"
            color="primary"
            e
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
                />
              </q-card-section>

              <q-card-section>
                <q-form @submit="onaddAccount">
                  <div class="row q-gutter-md q-py-sm">
                    <div class="col">
                      <q-input
                        autofocus
                        outlined
                        v-model="inputAccount.FName"
                        label="First Name"
                      />
                    </div>
                    <div class="col">
                      <q-input
                        outlined
                        v-model="inputAccount.MName"
                        label="Middle Initial"
                      />
                    </div>
                    <div class="col">
                      <q-input
                        outlined
                        v-model="inputAccount.LName"
                        label="Last Name"
                      />
                    </div>
                  </div>
                  <div class="row q-gutter-md q-py-sm">
                    <div class="col">
                      <q-input
                        outlined
                        v-model="inputAccount.username"
                        label="Username"
                      />
                    </div>
                    <div class="col">
                      <q-input
                        outlined
                        v-model="inputAccount.password"
                        label="Password"
                      />
                    </div>
                  </div>
                  <div class="row q-gutter-md q-py-sm">
                    <div class="col">
                      <q-input
                        outlined
                        v-model="inputAccount.contact"
                        label="Contact Number"
                        mask="###########"
                        hint="Sample: 09631358292"
                      />
                    </div>
                    <div class="col">
                      <q-input
                        outlined
                        v-model="inputAccount.email"
                        label="Email"
                        type="email"
                      />
                    </div>
                    <div class="col">
                      <q-select
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
                      color="red-10"
                      v-close-popup
                      @click="resetModel()"
                    />
                    <q-btn flat label="Save" color="primary" type="submit" />
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
              color="blue"
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
                          autofocus
                          outlined
                          v-model="inputAccount.FName"
                          label="First Name"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          outlined
                          v-model="inputAccount.MName"
                          label="Middle Initial"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          outlined
                          v-model="inputAccount.LName"
                          label="Last Name"
                        />
                      </div>
                    </div>
                    <div class="row q-gutter-md q-py-sm">
                      <div class="col">
                        <q-input
                          outlined
                          v-model="inputAccount.username"
                          label="Username"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          outlined
                          v-model="inputAccount.password"
                          label="Password"
                        />
                      </div>
                      <div class="col">
                        <q-select
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
                          outlined
                          v-model="inputAccount.email"
                          label="Email"
                          type="email"
                        />
                      </div>
                      <div class="col">
                        <q-select
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
                        color="red-10"
                        @click="resetModel()"
                        v-close-popup
                      />
                      <q-btn flat label="Save" color="primary" type="submit" />
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
              @click="deleteSpecificAccount(props.row)"
            />
          </div>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { mapActions, mapState } from 'vuex';
import { UserDto } from 'src/services/rest-api';
import { date } from 'quasar';

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
    ]),
  },
})
export default class ManageAccount extends Vue {
  addAccount!: (payload: UserDto) => Promise<void>;
  editAccount!: (payload: UserDto) => Promise<void>;
  deleteAccount!: (payload: UserDto) => Promise<void>;
  getAllUser!: () => Promise<void>;
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
      color: 'green',
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
    await this.addAccount(this.inputAccount);
    this.addNewAccount = false;
    this.resetModel();
    this.$q.notify({
      type: 'positive',
      message: 'Successfully Added.',
    });
  }

  async oneditAccount() {
    await this.editAccount(this.inputAccount);
    this.updateAccount = false;
    this.resetModel();
    this.$q.notify({
      type: 'positive',
      message: 'Successfully Edit.',
    });
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
}
</script>
