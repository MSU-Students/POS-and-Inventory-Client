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
                        v-model="inputAccount.email"
                        label="Email"
                        type="email"
                      />
                    </div>
                    <div class="col">
                      <q-select
                        outlined
                        v-model="inputAccount.role"
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
                          v-model="inputAccount.role"
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
import { IAccountInfo } from '../store/account/state';
import { mapActions, mapState } from 'vuex';

@Options({
  computed: {
    ...mapState('account', ['allAccount']),
  },
  methods: {
    ...mapActions('account', ['addAccount', 'editAccount', 'deleteAccount']),
  },
})
export default class ManageAccount extends Vue {
  addAccount!: (payload: IAccountInfo) => Promise<void>;
  editAccount!: (payload: IAccountInfo) => Promise<void>;
  deleteAccount!: (payload: IAccountInfo) => Promise<void>;
  allAccount!: IAccountInfo[];

  columns = [
    {
      name: 'name',
      required: true,
      label: 'Name',
      align: 'left',
      field: (row: IAccountInfo) =>
        row.FName + ' ' + row.MName + '. ' + row.LName,
      format: (val: string) => `${val}`,
    },
    {
      name: 'email',
      align: 'center',
      label: 'Email',
      field: 'email',
    },
    {
      name: 'dateCreated',
      align: 'center',
      label: 'Date Created',
      field: 'dateCreated',
    },
    { name: 'role', align: 'center', label: 'Role', field: 'role' },
    { name: 'status', align: 'center', label: 'Status', field: 'status' },
    { name: 'action', align: 'center', label: 'Action', field: 'action' },
  ];

  deleting = false;
  cancelEnabled = true;
  addNewAccount = false;
  updateAccount = false;

  inputAccount: IAccountInfo = {
    FName: '',
    MName: '',
    LName: '',
    username: '',
    password: '',
    email: '',
    role: '',
    dateCreated: '',
    status: 'Active',
  };
  filter = '';
  options = ['Admin', 'Cashier'];

  async onaddAccount() {
    await this.addAccount(this.inputAccount);
    this.addNewAccount = false;
    this.resetModel();
    this.$q.notify({
      type: 'positive',
      message: 'Successfully Adeded.',
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

  deleteSpecificAccount(val: IAccountInfo) {
    this.$q
      .dialog({
        message: 'Confirm to delete?',
        cancel: true,
        persistent: true,
      })
      .onOk(async () => {
        await this.deleteAccount(val);
        this.$q.notify({
          type: 'warning',
          message: 'Successfully deleted',
        });
      });
  }

  openEditDialog(val: IAccountInfo) {
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
      role: '',
      dateCreated: '',
      status: 'Active',
    };
  }
}
</script>
