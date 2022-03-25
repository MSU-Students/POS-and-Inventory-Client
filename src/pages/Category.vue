<template>
  <q-page class="q-pa-lg">
    <div>
      <div class="text-h4 q-pb-lg text-bold">
        <q-icon name="category" color="amber" style="font-size: 4rem" />
        Category
      </div>
      <div class="q-px-md q-gutter-xl row">
        <div class="col">
          <q-table
            title="Product Category"
            :rows="allProdCategory"
            :columns="columns"
            row-key="code"
            :rows-per-page-options="[0]"
            style="height: 560px; max-height: 560px"
          >
            <template v-slot:top-right>
              <div class="q-pa-md q-gutter-sm row">
                <q-input
                  outlined
                  rounded
                  dense
                  debounce="300"
                  v-model="prodFilter"
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
                  @click="addNewCategory = true"
                />
                <q-dialog v-model="addNewCategory" persistent>
                  <q-card style="width: 700px" class="q-pa-md">
                    <q-card-section class="row">
                      <div class="text-h6">Add Category</div>
                      <q-space />
                      <q-btn flat round dense icon="close" v-close-popup />
                    </q-card-section>

                    <q-card-section class="q-gutter-md">
                      <div class="col">
                        <q-input
                          outlined
                          label="Name"
                          v-model="inputCategory.prodCategoryName"
                        />
                      </div>
                    </q-card-section>

                    <q-card-actions align="right">
                      <q-btn flat label="Cancel" color="red-10" v-close-popup />
                      <q-btn
                        flat
                        label="Add"
                        color="primary"
                        @click="onAddCategory()"
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
                    @click="openEditDialogProd(props.row)"
                  />
                  <q-dialog v-model="editRowCategory" persistent>
                    <q-card style="width: 700px" class="q-pa-md">
                      <q-card-section class="row">
                        <div class="text-h6">Add Category</div>
                        <q-space />
                        <q-btn flat round dense icon="close" v-close-popup />
                      </q-card-section>

                      <q-card-section class="q-gutter-md">
                        <div class="col">
                          <q-input
                            outlined
                            label="Name"
                            v-model="inputCategory.prodCategoryName"
                          />
                        </div>
                      </q-card-section>

                      <q-card-actions align="right">
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
                          @click="onEditCategory()"
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
                    @click="deleteSpecificCategory(props.row)"
                  />
                </div>
              </q-td>
            </template>
          </q-table>
        </div>

        <div class="col">
          <q-table
            title="Sub-Product Category"
            :rows="allSubProdCat"
            :columns="subColumns"
            row-key="subProdCat"
            :rows-per-page-options="[0]"
            style="height: 560px; max-height: 560px"
          >
            <template v-slot:top-right>
              <div class="q-pa-md q-gutter-sm row">
                <q-input
                  outlined
                  rounded
                  dense
                  debounce="300"
                  v-model="subFilter"
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
                  @click="addNewSubProdCat = true"
                />
                <q-dialog v-model="addNewSubProdCat" persistent>
                  <q-card style="width: 300px" class="q-pa-md">
                    <q-card-section class="row">
                      <div class="text-h6">Add Sub-Product Category</div>
                      <q-space />
                      <q-btn
                        flat
                        round
                        dense
                        icon="close"
                        v-close-popup
                        @click="resetModelSubProd()"
                      />
                    </q-card-section>

                    <q-card-section class="q-gutter-md">
                      <div>
                        <q-select outlined label="Product Category" />
                      </div>
                      <div>
                        <q-input
                          outlined
                          label="Sub-Product Category"
                          v-model="inputSubCategory.subProdName"
                        />
                      </div>
                    </q-card-section>

                    <q-card-actions align="right">
                      <q-btn
                        flat
                        label="Cancel"
                        color="red-10"
                        v-close-popup
                        @click="resetModelSubProd()"
                      />
                      <q-btn
                        flat
                        label="Add"
                        color="primary"
                        @click="onAddSubProdCat()"
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
                    @click="openEditDialogSubProd(props.row)"
                  />
                  <q-dialog v-model="editRowSubProdCat" persistent>
                    <q-card style="width: 700px" class="q-pa-md">
                      <q-card-section class="row">
                        <div class="text-h6">Add Sub-Product Category</div>
                        <q-space />
                        <q-btn
                          flat
                          round
                          dense
                          icon="close"
                          v-close-popup
                          @click="resetModelSubProd()"
                        />
                      </q-card-section>

                      <q-card-section class="q-gutter-md">
                        <div class="col">
                          <q-input
                            outlined
                            label="Name"
                            v-model="inputSubCategory.subProdName"
                          />
                        </div>
                      </q-card-section>

                      <q-card-actions align="right">
                        <q-btn
                          flat
                          label="Cancel"
                          color="red-10"
                          v-close-popup
                          @click="resetModelSubProd()"
                        />
                        <q-btn
                          flat
                          label="Save"
                          color="primary"
                          @click="onEditSubProdCat()"
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
                    @click="deleteSpecificSubProdCat(props.row)"
                  />
                </div>
              </q-td>
            </template>
          </q-table>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { mapState, mapActions } from 'vuex';
import { ProdCategoryDto, SubprodCategoryDto } from 'src/services/rest-api';
@Options({
  computed: {
    ...mapState('productCategory', ['allProdCategory']),
    ...mapState('subCategory', ['allSubProdCat']),
  },
  methods: {
    ...mapActions('productCategory', [
      'addProductCat',
      'editProductCat',
      'deleteProductCat',
      'getAllProductCategory',
    ]),
    ...mapActions('subCategory', [
      'addSubProductCat',
      'editSubProductCat',
      'deleteSubProductCat',
      'getAllSubProductCat',
    ]),
  },
})
export default class Expenses extends Vue {
  selected = [];
  addNewCategory = false;
  editRowCategory = false;
  showNoteCategory = false;
  addNewSubProdCat = false;
  editRowSubProdCat = false;
  prodFilter = '';
  subFilter = '';
  invFilter = '';
  expFilter = '';

  //---------------------------> Product Category <----------------------------------------------
  allProdCategory!: ProdCategoryDto[];
  addProductCat!: (payload: ProdCategoryDto) => Promise<void>;
  editProductCat!: (payload: ProdCategoryDto) => Promise<void>;
  deleteProductCat!: (payload: ProdCategoryDto) => Promise<void>;
  getAllProductCategory!: () => Promise<void>;
  addNewProductCat = false;
  editNewProductCat = false;

  async mounted() {
    await this.getAllProductCategory();
  }

  columns = [
    {
      name: 'prodCategoryName',
      align: 'center',
      label: 'Name',
      field: (row: ProdCategoryDto) => row.prodCategoryName,
      format: (val: string) => `${val}`,
    },

    {
      name: 'action',
      align: 'center',
      label: 'Action',
      field: 'action',
    },
  ];

  inputCategory: ProdCategoryDto = {
    prodCategoryName: '',
  };

  async onAddCategory() {
    await this.addProductCat(this.inputCategory);
    this.addNewCategory = false;
    this.resetModelProd();
    this.$q.notify({
      type: 'positive',
      message: 'Successfully Added.',
    });
  }

  async onEditCategory() {
    await this.editProductCat(this.inputCategory);
    this.editRowCategory = false;
    this.resetModelProd();
    this.$q.notify({
      type: 'positive',
      message: 'Successfully Edit.',
    });
  }

  deleteSpecificCategory(val: ProdCategoryDto) {
    this.$q
      .dialog({
        message: 'Confirm to delete?',
        cancel: true,
        persistent: true,
      })
      .onOk(async () => {
        await this.deleteProductCat(val);
        this.$q.notify({
          type: 'warning',
          message: 'Successfully deleted',
        });
      });
  }

  openEditDialogProd(val: ProdCategoryDto) {
    this.editRowCategory = true;
    this.inputCategory = { ...val };
  }
  resetModelProd() {
    this.inputCategory = {
      prodCategoryName: '',
    };
  }
  //---------------------------> Sub-Product Category <----------------------------------------------

  allSubProdCat!: SubprodCategoryDto[];
  addSubProductCat!: (payload: SubprodCategoryDto) => Promise<void>;
  editSubProductCat!: (payload: SubprodCategoryDto) => Promise<void>;
  deleteSubProductCat!: (payload: SubprodCategoryDto) => Promise<void>;
  getAllSubProductCat!: () => Promise<void>;

  async mount() {
    await this.getAllSubProductCat();
  }

  subColumns = [
    {
      name: 'subProdCat',
      required: true,
      label: 'Name',
      align: 'left',
      field: (row: SubprodCategoryDto) => row.subProdName,
      format: (val: string) => `${val}`,
    },
    {
      name: 'productCategory',
      align: 'center',
      label: 'Main Category',
      field: 'productCategory',
    },
    {
      name: 'action',
      align: 'center',
      label: 'Action',
      field: 'action',
    },
  ];

  inputSubCategory: SubprodCategoryDto = {
    subProdName: '',
    productId: 0,
  };

  async onAddSubProdCat() {
    await this.addSubProductCat(this.inputSubCategory);
    this.addNewSubProdCat = false;
    this.resetModelProd();
    this.$q.notify({
      type: 'positive',
      message: 'Successfully Added.',
    });
  }

  async onEditSubProdCat() {
    await this.editSubProductCat(this.inputSubCategory);
    this.editRowSubProdCat = false;
    this.resetModelProd();
    this.$q.notify({
      type: 'positive',
      message: 'Successfully Edit.',
    });
  }

  deleteSpecificSubProdCat(val: SubprodCategoryDto) {
    this.$q
      .dialog({
        message: 'Confirm to delete?',
        cancel: true,
        persistent: true,
      })
      .onOk(async () => {
        await this.deleteSubProductCat(val);
        this.$q.notify({
          type: 'warning',
          message: 'Successfully deleted',
        });
      });
  }

  openEditDialogSubProd(val: SubprodCategoryDto) {
    this.editRowSubProdCat = true;
    this.inputSubCategory = { ...val };
  }
  resetModelSubProd() {
    this.inputSubCategory = {
      subProdName: '',
      productId: 0,
    };
  }
}
</script>
