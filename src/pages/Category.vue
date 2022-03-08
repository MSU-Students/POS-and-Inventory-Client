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
            :rows="allCategory"
            :columns="columns"
            row-key="code"
            :rows-per-page-options="[0]"
            style="max-height: 300px"
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
                          label="Category ID"
                          v-model="inputCategory.categoryID"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          outlined
                          label="Name"
                          v-model="inputCategory.categoryName"
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
                            label="Category ID"
                            v-model="inputCategory.categoryID"
                            disable
                          />
                        </div>
                        <div class="col">
                          <q-input
                            outlined
                            label="Name"
                            v-model="inputCategory.categoryName"
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
            style="max-height: 300px"
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
                      <div class="text-h6">Add Category</div>
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
                          label="Category ID"
                          v-model="inputCategory.categoryID"
                          disable
                        />
                      </div>
                      <div class="col">
                        <q-input
                          outlined
                          label="Name"
                          v-model="inputCategory.categoryName"
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
                        <div class="text-h6">Add Category</div>
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
                            label="Category ID"
                            v-model="inputCategory.categoryID"
                            disable
                          />
                        </div>
                        <div class="col">
                          <q-input
                            outlined
                            label="Name"
                            v-model="inputCategory.categoryName"
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
      <div class="q-px-md q-pt-lg q-gutter-xl row">
        <div class="col">
          <q-table
            title="Inventory Category"
            :rows="allInventoryCat"
            :columns="InvCatColumns"
            row-key="invCategoryName"
            :rows-per-page-options="[0]"
            style="max-height: 300px"
          >
            <template v-slot:top-right>
              <div class="q-pa-md q-gutter-sm row">
                <q-input
                  outlined
                  rounded
                  dense
                  debounce="300"
                  v-model="invFilter"
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
                  @click="addNewInventoryCat = true"
                />
                <q-dialog v-model="addNewInventoryCat" persistent>
                  <q-card style="width: 300px" class="q-pa-md">
                    <q-card-section class="row">
                      <div class="text-h6">Add Category</div>
                      <q-space />
                      <q-btn
                        flat
                        round
                        dense
                        icon="close"
                        v-close-popup
                        @click="resetModelInvCat()"
                      />
                    </q-card-section>

                    <q-card-section class="q-gutter-md">
                      <q-input
                        outlined
                        label="Name"
                        v-model="inputInventoryCat.invCategoryName"
                      />
                    </q-card-section>

                    <q-card-actions align="right">
                      <q-btn
                        flat
                        label="Cancel"
                        color="red-10"
                        v-close-popup
                        @click="resetModelInvCat()"
                      />
                      <q-btn
                        flat
                        label="Add"
                        color="primary"
                        @click="onAddInvCat()"
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
                    @click="openEditDialogInvCat(props.row)"
                  />
                  <q-dialog v-model="editRowInventoryCat" persistent>
                    <q-card style="width: 700px" class="q-pa-md">
                      <q-card-section class="row">
                        <div class="text-h6">Add Category</div>
                        <q-space />
                        <q-btn
                          flat
                          round
                          dense
                          icon="close"
                          v-close-popup
                          @click="resetModelInvCat()"
                        />
                      </q-card-section>

                      <q-card-section class="q-gutter-md">
                        <q-input
                          outlined
                          label="Name"
                          v-model="inputInventoryCat.invCategoryName"
                        />
                      </q-card-section>

                      <q-card-actions align="right">
                        <q-btn
                          flat
                          label="Cancel"
                          color="red-10"
                          v-close-popup
                          @click="resetModelInvCat()"
                        />
                        <q-btn
                          flat
                          label="Save"
                          color="primary"
                          @click="onEditInvCat()"
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
                    @click="deleteSpecificInvCat(props.row)"
                  />
                </div>
              </q-td>
            </template>
          </q-table>
        </div>
        <div class="col">
          <q-table
            title="Expenses Category"
            :rows="allexpensesCategory"
            :columns="expensesCatColumns"
            row-key="expensesCategoryName"
            :rows-per-page-options="[0]"
            style="max-height: 300px"
          >
            <template v-slot:top-right>
              <div class="q-pa-md q-gutter-sm row">
                <q-input
                  outlined
                  rounded
                  dense
                  debounce="300"
                  v-model="expFilter"
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
                  @click="addNewExpenseCat = true"
                />
                <q-dialog v-model="addNewExpenseCat" persistent>
                  <q-card style="width: 300px" class="q-pa-md">
                    <q-card-section class="row">
                      <div class="text-h6">Add Category</div>
                      <q-space />
                      <q-btn
                        flat
                        round
                        dense
                        icon="close"
                        v-close-popup
                        @click="resetModelExpenseCat()"
                      />
                    </q-card-section>

                    <q-card-section class="q-gutter-md">
                      <q-input
                        outlined
                        label="Name"
                        v-model="inputExpenseCat.expensesCategoryName"
                      />
                    </q-card-section>

                    <q-card-actions align="right">
                      <q-btn
                        flat
                        label="Cancel"
                        color="red-10"
                        v-close-popup
                        @click="resetModelExpenseCat()"
                      />
                      <q-btn
                        flat
                        label="Add"
                        color="primary"
                        @click="onAddExpenseCat()"
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
                    @click="openEditDialogExpenseCat(props.row)"
                  />
                  <q-dialog v-model="editRowExpenseCat" persistent>
                    <q-card style="width: 700px" class="q-pa-md">
                      <q-card-section class="row">
                        <div class="text-h6">Add Category</div>
                        <q-space />
                        <q-btn
                          flat
                          round
                          dense
                          icon="close"
                          v-close-popup
                          @click="resetModelExpenseCat()"
                        />
                      </q-card-section>

                      <q-card-section class="q-gutter-md">
                        <q-input
                          outlined
                          label="Name"
                          v-model="inputExpenseCat.expensesCategoryName"
                        />
                      </q-card-section>

                      <q-card-actions align="right">
                        <q-btn
                          flat
                          label="Cancel"
                          color="red-10"
                          v-close-popup
                          @click="resetModelExpenseCat()"
                        />
                        <q-btn
                          flat
                          label="Save"
                          color="primary"
                          @click="onEditExpenseCat()"
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
                    @click="deleteSpecificExpenseCat(props.row)"
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
import { ICategoryInfo } from '../store/category/state';
import { ISubProdCategoryInfo } from '../store/subCategory/state';
import { IexpensesCategoryInfo } from '../store/expensesCategory/state';
import { IInventoryCatInfo } from '../store/inventoryCategory/state';
import { mapState, mapActions } from 'vuex';
@Options({
  computed: {
    ...mapState('category', ['allCategory']),
    ...mapState('subCategory', ['allSubProdCat']),
    ...mapState('expensesCategory', ['allexpensesCategory']),
    ...mapState('inventoryCategory', ['allInventoryCat']),
  },
  methods: {
    ...mapActions('category', [
      'addCategory',
      'editCategory',
      'deleteCategory',
    ]),
    ...mapActions('subCategory', [
      'addSubCategory',
      'editSubCategory',
      'deleteSubCategory',
    ]),
    ...mapActions('inventoryCategory', [
      'addInventoryCat',
      'editInventoryCat',
      'deleteInventoryCat',
    ]),
    ...mapActions('expensesCategory', [
      'addExpenseCat',
      'editexpenseCat',
      'deleteExpenseCat',
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
  addCategory!: (payload: ICategoryInfo) => Promise<void>;
  editCategory!: (payload: ICategoryInfo) => Promise<void>;
  deleteCategory!: (payload: ICategoryInfo) => Promise<void>;
  allCategory!: ICategoryInfo[];

  columns = [
    {
      name: 'categoryID',
      required: true,
      label: 'Category ID',
      align: 'left',
      field: (row: ICategoryInfo) => row.categoryID,
      format: (val: string) => `${val}`,
    },
    {
      name: 'categoryName',
      align: 'center',
      label: 'Name',
      field: 'categoryName',
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

  inputCategory: ICategoryInfo = {
    categoryID: '',
    categoryName: '',
  };

  async onAddCategory() {
    await this.addCategory(this.inputCategory);
    this.addNewCategory = false;
    this.resetModelProd();
    this.$q.notify({
      type: 'positive',
      message: 'Successfully Added.',
    });
  }

  async onEditCategory() {
    await this.editCategory(this.inputCategory);
    this.editRowCategory = false;
    this.resetModelProd();
    this.$q.notify({
      type: 'positive',
      message: 'Successfully Edit.',
    });
  }

  deleteSpecificCategory(val: ICategoryInfo) {
    this.$q
      .dialog({
        message: 'Confirm to delete?',
        cancel: true,
        persistent: true,
      })
      .onOk(async () => {
        await this.deleteCategory(val);
        this.$q.notify({
          type: 'warning',
          message: 'Successfully deleted',
        });
      });
  }

  openEditDialogProd(val: ICategoryInfo) {
    this.editRowCategory = true;
    this.inputCategory = { ...val };
  }
  resetModelProd() {
    this.inputCategory = {
      categoryID: '',
      categoryName: '',
      numProd: '',
      stockQuantity: '',
    };
  }
  //---------------------------> Sub-Product Category <----------------------------------------------

  addSubCategory!: (payload: ISubProdCategoryInfo) => Promise<void>;
  editSubCategory!: (payload: ISubProdCategoryInfo) => Promise<void>;
  deleteSubCategory!: (payload: ISubProdCategoryInfo) => Promise<void>;
  allSubProdCat!: ISubProdCategoryInfo[];

  subColumns = [
    {
      name: 'subProdCat',
      required: true,
      label: 'Name',
      align: 'left',
      field: (row: ISubProdCategoryInfo) => row.subProdCat,
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

  inputSubCategory: ISubProdCategoryInfo = {
    productCategory: '',
    subProdCat: '',
  };

  async onAddSubProdCat() {
    await this.addSubCategory(this.inputSubCategory);
    this.addNewSubProdCat = false;
    this.resetModelProd();
    this.$q.notify({
      type: 'positive',
      message: 'Successfully Added.',
    });
  }

  async onEditSubProdCat() {
    await this.editSubCategory(this.inputSubCategory);
    this.editRowSubProdCat = false;
    this.resetModelProd();
    this.$q.notify({
      type: 'positive',
      message: 'Successfully Edit.',
    });
  }

  deleteSpecificSubProdCat(val: ISubProdCategoryInfo) {
    this.$q
      .dialog({
        message: 'Confirm to delete?',
        cancel: true,
        persistent: true,
      })
      .onOk(async () => {
        await this.deleteSubCategory(val);
        this.$q.notify({
          type: 'warning',
          message: 'Successfully deleted',
        });
      });
  }

  openEditDialogSubProd(val: ISubProdCategoryInfo) {
    this.editRowSubProdCat = true;
    this.inputSubCategory = { ...val };
  }
  resetModelSubProd() {
    this.inputSubCategory = {
      productCategory: '',
      subProdCat: '',
    };
  }

  //---------------------------> Inventory Category <----------------------------------------------
  allInventoryCat!: IInventoryCatInfo[];
  addInventoryCat!: (payload: IInventoryCatInfo) => Promise<void>;
  editInventoryCat!: (payload: IInventoryCatInfo) => Promise<void>;
  deleteInventoryCat!: (payload: IInventoryCatInfo) => Promise<void>;
  addNewInventoryCat = false;
  editRowInventoryCat = false;

  InvCatColumns = [
    {
      name: 'invCategoryName',
      required: true,
      label: 'Name',
      align: 'left',
      field: (row: IInventoryCatInfo) => row.invCategoryName,
      format: (val: string) => `${val}`,
    },
    {
      name: 'action',
      align: 'center',
      label: 'Action',
      field: 'action',
    },
  ];

  inputInventoryCat: IInventoryCatInfo = {
    invCategoryName: '',
  };

  async onAddInvCat() {
    await this.addInventoryCat(this.inputInventoryCat);
    this.addNewInventoryCat = false;
    this.resetModelProd();
    this.$q.notify({
      type: 'positive',
      message: 'Successfully Added.',
    });
  }

  async onEditInvCat() {
    await this.editInventoryCat(this.inputInventoryCat);
    this.editRowInventoryCat = false;
    this.resetModelProd();
    this.$q.notify({
      type: 'positive',
      message: 'Successfully Edit.',
    });
  }

  deleteSpecificInvCat(val: IInventoryCatInfo) {
    this.$q
      .dialog({
        message: 'Confirm to delete?',
        cancel: true,
        persistent: true,
      })
      .onOk(async () => {
        await this.deleteInventoryCat(val);
        this.$q.notify({
          type: 'warning',
          message: 'Successfully deleted',
        });
      });
  }

  openEditDialogInvCat(val: IInventoryCatInfo) {
    this.editRowInventoryCat = true;
    this.inputInventoryCat = { ...val };
  }
  resetModelInvCat() {
    this.inputInventoryCat = {
      invCategoryName: '',
    };
  }

  //---------------------------> Expenses Category <----------------------------------------------
  allexpensesCategory!: IexpensesCategoryInfo;
  addExpenseCat!: (payload: IexpensesCategoryInfo) => Promise<void>;
  editExpenseCat!: (payload: IexpensesCategoryInfo) => Promise<void>;
  deleteExpenseCat!: (payload: IexpensesCategoryInfo) => Promise<void>;
  addNewExpenseCat = false;
  editRowExpenseCat = false;

  expensesCatColumns = [
    {
      name: 'expensesCategoryName',
      required: true,
      label: 'Name',
      align: 'left',
      field: (row: IexpensesCategoryInfo) => row.expensesCategoryName,
      format: (val: string) => `${val}`,
    },
    {
      name: 'action',
      align: 'center',
      label: 'Action',
      field: 'action',
    },
  ];
  inputExpenseCat: IexpensesCategoryInfo = {
    expensesCategoryName: '',
  };
  async onAddExpenseCat() {
    await this.addExpenseCat(this.inputExpenseCat);
    this.addNewExpenseCat = false;
    this.resetModelProd();
    this.$q.notify({
      type: 'positive',
      message: 'Successfully Added.',
    });
  }

  async onEditExpenseCat() {
    await this.editExpenseCat(this.inputExpenseCat);
    this.editRowExpenseCat = false;
    this.resetModelProd();
    this.$q.notify({
      type: 'positive',
      message: 'Successfully Edit.',
    });
  }

  deleteSpecificExpenseCat(val: IexpensesCategoryInfo) {
    this.$q
      .dialog({
        message: 'Confirm to delete?',
        cancel: true,
        persistent: true,
      })
      .onOk(async () => {
        await this.deleteExpenseCat(val);
        this.$q.notify({
          type: 'warning',
          message: 'Successfully deleted',
        });
      });
  }

  openEditDialogExpenseCat(val: IexpensesCategoryInfo) {
    this.editRowExpenseCat = true;
    this.inputExpenseCat = { ...val };
  }
  resetModelExpenseCat() {
    this.inputExpenseCat = {
      expensesCategoryName: '',
    };
  }
}
</script>
