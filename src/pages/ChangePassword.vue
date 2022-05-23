<template>
  <q-page class="bg-image q-pa-md flex flex-center">
    <q-card
      class="shadow-20"
      v-bind:style="$q.screen.lt.md ? { weight: '20%' } : { height: '100%' }"
    >
      <q-card-section>
        <q-avatar size="125px" class="absolute-center shadow-10">
          <img src="../assets/BesTea.jpg" />
        </q-avatar> </q-card-section
      ><br />
      <q-card-section>
        <div class="text-center q-pt-lg">
          <div class="col text-bold text-h4">Change Password</div>
        </div>
      </q-card-section>
      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <div class="q-pl-xl q-pr-xl">
            <q-input
              color="secondary"
              autofocus
              v-model="password.oldPassword"
              dense
              label="Current Password"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Input your  current password',
              ]"
            />

            <q-input
              color="secondary"
              v-model="password.newPassword"
              dense
              label="New Password"
              :type="isPwd1 ? 'password' : 'text'"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Input your new password',
              ]"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd1 ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd1 = !isPwd1"
                />
              </template>
            </q-input>

            <q-input
              color="secondary"
              v-model="confirmpassword"
              dense
              label="Confirm Password"
              :type="isPwd ? 'password' : 'text'"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Input your confirm password',
              ]"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>

            <div class="q-py-md flex justify-center">
              <div>
                <q-btn
                  clickable
                  v-ripple
                  label="save"
                  color="positive"
                  type="submit"
                />
                <q-btn
                  label="Cancel"
                  to="/Dashboard"
                  color="red-5"
                  class="q-ml-sm"
                />
                <q-btn
                  label="Clear"
                  type="reset"
                  color="secondary"
                  flat
                  class="q-ml-sm"
                  @click="onClear()"
                />
              </div>
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { mapActions } from 'vuex';
import { ChangePasswordDto } from 'src/services/rest-api';
import { posApiService } from 'src/services/pos-inventory-api.service';

Options({
  methods: {
    ...mapActions('auth', ['changePassword']),
  },
});

export default class LibrarianChangePass extends Vue {
  changePassword!: (changePassword: ChangePasswordDto) => Promise<void>;
  password: ChangePasswordDto = {
    oldPassword: '',
    newPassword: '',
  };
  confirmpassword = '';
  isPwd = true;
  isPwd1 = true;
  user = 'librarian';

  async onSubmit() {
    try {
      this.$q
        .dialog({
          message: 'Are you sure to change your password?',
          cancel: true,
          persistent: true,
        })
        .onOk(async () => {
          if (this.password.newPassword != this.confirmpassword) {
            this.$q.notify({
              type: 'negative',
              message: 'Passwords not match!',
            });
            return;
          } else {
            await posApiService.changeMyPass(this.password);
            this.$q.notify({
              type: 'positive',
              message: 'Change password successfully',
            });

            const result = await posApiService.logoutUser();
            if (result.status == 201) {
              await this.$router.replace('/');
            }
            this.$q.notify({
              type: 'warning',
              message: 'You have been logged out!',
            });
          }
        });
    } catch (error: any) {
      this.$q.notify({
        type: 'negative',
        message: error.message,
      });
    }
  }

  onClear() {
    this.confirmpassword = '';
    this.password = {
      oldPassword: '',
      newPassword: '',
    };
  }
}
</script>
<style>
.bg-image {
  background-image: url('../assets/green.jpg');
  background-size: cover;
}
</style>
