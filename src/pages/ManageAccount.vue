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
      :rows="account"
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
            @click="onAddAccount()"
          />
          <q-dialog v-model="addUser" persistent>
            <q-card style="width: 800px; max-width: 100vw" class="q-pa-sm">
              <q-card-section class="row">
                <div class="text-h6">Add User</div>
                <q-space />
                <q-btn flat round dense icon="close" v-close-popup />
              </q-card-section>

              <q-card-section class="q-gutter-md row">
                <div class="col">
                  <q-input
                    outlined
                    v-model="presentAccount.FName"
                    label="First Name"
                  />
                </div>
                <div class="col">
                  <q-input
                    outlined
                    v-model="presentAccount.MName"
                    label="Middle Initial"
                  />
                </div>
                <div class="col">
                  <q-input
                    outlined
                    v-model="presentAccount.LName"
                    label="Last Name"
                  />
                </div>
              </q-card-section>
              <q-card-section class="q-gutter-md row">
                <div class="col">
                  <q-input
                    outlined
                    v-model="presentAccount.username"
                    label="Username"
                  />
                </div>
                <div class="col">
                  <q-input
                    outlined
                    v-model="presentAccount.password"
                    label="Password"
                  />
                </div>
              </q-card-section>

              <q-card-section class="q-gutter-md row">
                <div class="col">
                  <q-input
                    outlined
                    v-model="presentAccount.email"
                    label="Email"
                    type="email"
                  />
                </div>
                <div class="col">
                  <q-select
                    outlined
                    v-model="presentAccount.role"
                    :options="options"
                    label="Roles"
                  />
                </div>
              </q-card-section>

              <q-card-actions align="right">
                <q-btn flat label="Cancel" color="red-10" v-close-popup />
                <q-btn
                  flat
                  label="Add"
                  color="primary"
                  @click="onSaveAccount"
                  v-close-popup
                />
              </q-card-actions>
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
              @click="onEditAccount(props.row)"
            />
            <q-dialog v-model="editRow" persistent>
              <q-card style="width: 800px; max-width: 100vw" class="q-pa-sm">
                <q-card-section class="row">
                  <div class="text-h6">Add User</div>
                  <q-space />
                  <q-btn flat round dense icon="close" v-close-popup />
                </q-card-section>

                <q-card-section class="q-gutter-md row">
                  <div class="col">
                    <q-input
                      outlined
                      v-model="presentAccount.FName"
                      label="First Name"
                    />
                  </div>
                  <div class="col">
                    <q-input
                      outlined
                      v-model="presentAccount.MName"
                      label="Middle Initial"
                    />
                  </div>
                  <div class="col">
                    <q-input
                      outlined
                      v-model="presentAccount.LName"
                      label="Last Name"
                    />
                  </div>
                </q-card-section>
                <q-card-section class="q-gutter-md row">
                  <div class="col">
                    <q-input
                      outlined
                      v-model="presentAccount.username"
                      label="Username"
                    />
                  </div>
                  <div class="col">
                    <q-input
                      outlined
                      v-model="presentAccount.password"
                      label="Password"
                    />
                  </div>
                </q-card-section>

                <q-card-section class="q-gutter-md row">
                  <div class="col">
                    <q-input
                      outlined
                      v-model="presentAccount.email"
                      label="Email"
                      type="email"
                    />
                  </div>
                  <div class="col">
                    <q-select
                      outlined
                      v-model="presentAccount.role"
                      :options="options"
                      label="Roles"
                    />
                  </div>
                </q-card-section>

                <q-card-actions align="right">
                  <q-btn flat label="Cancel" color="red-10" v-close-popup />
                  <q-btn
                    flat
                    label="Save"
                    @click="onEditAccount"
                    color="primary"
                    v-close-popup
                  />
                </q-card-actions>
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
              @click="onDeleteAccount(props.row)"
            />
            <q-dialog v-model="deleting" persistent>
              <q-card style="width: 300px">
                <q-card-section class="row items-center">
                  <q-avatar
                    size="sm"
                    icon="warning"
                    color="red-10"
                    text-color="white"
                  />
                  <span class="q-ml-sm">Confirm Delete?</span>
                </q-card-section>
                <q-card-actions align="right">
                  <q-btn
                    flat
                    label="Cancel"
                    color="primary"
                    v-close-popup="cancelEnabled"
                    :disable="!cancelEnabled"
                  />
                  <q-btn
                    flat
                    label="Confirm"
                    color="primary"
                    @click="onConfirmDeleteAccount"
                    v-close-popup
                  />
                </q-card-actions>
              </q-card>
            </q-dialog>
          </div>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { AccountInfo } from 'src/store/account/state';
import { mapActions, mapState } from 'vuex';

@Options({
  computed: {
    ...mapState('account', ['account', 'activeAccount']),
  },
  method: {
    ...mapActions('account', ['newAccount', 'editAccount', 'deleteAccount']),
  },
})
export default class ManageAccount extends Vue {
  account!: AccountInfo[];
  newAccount!: (account: AccountInfo) => Promise<void>;
  editAccount!: (account: AccountInfo) => Promise<void>;
  deleteAccount!: (account: AccountInfo) => Promise<void>;

  columns = [
    {
      name: 'name',
      required: true,
      label: 'Name',
      align: 'left',
      field: (row: AccountInfo) =>
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
  addUser = false;
  editRow = false;

  defaultAccount: AccountInfo = {
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
  presentAccount = { ...this.defaultAccount };
  filter = '';
  options = ['Admin', 'Cashier'];

  onAddAccount() {
    this.presentAccount = { ...this.defaultAccount };
    this.editRow = false;
    this.addUser = true;
  }

  onEditAccount(account: AccountInfo) {
    this.presentAccount = { ...account };
    this.editRow = true;
    this.addUser = false;
  }

  onDeleteAccount(account: AccountInfo) {
    this.presentAccount = { ...account };
    this.deleting = true;
  }

  async onSaveAccount() {
    if (!this.editRow) {
      await this.newAccount(this.presentAccount);
    } else {
      await this.editAccount(this.presentAccount);
    }
  }

  async onConfirmDeleteAccount() {
    await this.deleteAccount(this.presentAccount);
    this.deleting = true;
  }
}
</script>
