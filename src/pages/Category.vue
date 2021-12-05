<template>
  <q-page class="q-pa-lg">
    <div>
      <div class="text-h4 q-pb-lg text-bold">
        <q-icon name="category" color="amber" style="font-size: 4rem" />
        Category
      </div>
      <q-table
        title="Category List"
        :rows="category"
        :columns="columns"
        row-key="code"
        :rows-per-page-options="[0]"
        :filter="filter"
        selection="multiple"
        v-model:selected="selected"
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
              label="Add Category"
              color="primary"
              dense
              flat
              icon="add"
              @click="addCat = true"
            />
            <q-dialog v-model="addCat" persistent>
              <q-card style="width: 700px" class="q-pa-md">
                <q-card-section class="row">
                  <div class="text-h6">Add Category</div>
                  <q-space />
                  <q-btn flat round dense icon="close" v-close-popup />
                </q-card-section>

                <q-card-section class="q-gutter-md">
                  <div class="col">
                    <q-input outlined label="Code" />
                  </div>
                  <div class="col">
                    <q-input outlined label="Name" />
                  </div>
                </q-card-section>

                <q-card-actions align="right">
                  <q-btn flat label="Cancel" color="red-10" v-close-popup />
                  <q-btn flat label="Add" color="primary" v-close-popup />
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
                @click="editRow = true"
              />
              <q-dialog v-model="editRow" persistent>
                <q-card style="width: 700px" class="q-pa-md">
                  <q-card-section class="row">
                    <div class="text-h6">Add Category</div>
                    <q-space />
                    <q-btn flat round dense icon="close" v-close-popup />
                  </q-card-section>

                  <q-card-section class="q-gutter-md">
                    <div class="col">
                      <q-input outlined label="Code" />
                    </div>
                    <div class="col">
                      <q-input outlined label="Name" />
                    </div>
                  </q-card-section>

                  <q-card-actions align="right">
                    <q-btn flat label="Cancel" color="red-10" v-close-popup />
                    <q-btn flat label="Save" color="primary" v-close-popup />
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
                @click="del = true"
              />
              <q-dialog v-model="del" persistent>
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
                    <q-btn flat label="Confirm" color="primary" v-close-popup />
                  </q-card-actions>
                </q-card>
              </q-dialog>
            </div>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { CategoryInfo } from 'src/store/category/state';
import { mapState } from 'vuex';

interface IRow {
  code: string;
}
@Options({
  computed: {
    ...mapState('category', ['category', 'activeCategory']),
  },
})
export default class Expenses extends Vue {
  category!: CategoryInfo[];

  columns = [
    {
      name: 'code',
      required: true,
      label: 'Code',
      align: 'left',
      field: (row: CategoryInfo) => row.code,
      format: (val: string) => `${val}`,
    },
    {
      name: 'name',
      align: 'center',
      label: 'Name',
      field: 'name',
    },
    {
      name: 'numProd',
      align: 'center',
      label: 'Number of products',
      field: 'numProd',
    },
    {
      name: 'stockQuantity',
      align: 'center',
      label: 'Stock quantity',
      field: 'stockQuantity',
    },
    {
      name: 'action',
      align: 'center',
      label: 'Action',
      field: 'action',
    },
  ];

  selected = [];
  del = false;
  cancelEnabled = true;
  addCat = false;
  editRow = false;
  showNote = false;
  filter = '';

  defaultCategory: CategoryInfo = {
    code: '',
    name: '',
    numProd: 0,
    stockQuantity: 0,
  };
  presentCategory = { ...this.defaultCategory };
}
</script>
