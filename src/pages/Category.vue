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
            :rows="allProductCat"
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
                          label="Name"
                          v-model="inputSubCategory.subProdCat"
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
                            label="Name"
                            v-model="inputSubCategory.subProdCat"
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
            row-key="categoryName"
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
                        v-model="inputInventoryCat.categoryName"
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
                          v-model="inputInventoryCat.categoryName"
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
            :rows="allExpensesCategory"
            :columns="expensesCatColumns"
            row-key="expensesCategoryName"
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

                    <q-card-section>
                      <q-form @submit="onAddExpenseCat()">
                        <div class="q-gutter-md">
                          <q-input
                            outlined
                            label="Name"
                            v-model="inputExpenseCat.expensesCategoryName"
                          />
                        </div>
                        <div align="right">
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
                            type="submit"
                          />
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

                      <q-card-section>
                        <q-form @submit="onEditExpenseCat()">
                          <div class="q-gutter-md">
                            <q-input
                              outlined
                              label="Name"
                              v-model="inputExpenseCat.expensesCategoryName"
                            />
                          </div>
                          <div align="right">
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
import { Category } from '../store/category/state';
import { ISubProdCategoryInfo } from '../store/subCategory/state';
import { ExpensesCategoryDto } from 'src/services/rest-api';
import { mapState, mapActions, mapGetters } from 'vuex';
import { InventoryCategoryDto } from 'src/services/rest-api';
import { ProdCategoryDto } from 'src/services/rest-api';
import { ProductCategory } from 'src/store/productCategory/state';
@Options({
  computed: {
    ...mapState('category', ['allCategory']),
    ...mapState('subCategory', ['allSubProdCat']),
    ...mapState('expensesCategory', ['allExpensesCategory']),
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
      'getAllInventoryCategory',
    ]),
    ...mapActions('expensesCategory', [
      'addExpensesCat',
      'editExpensesCat',
      'deleteExpensesCat',
      'getallExpensesCategory',
    ]),
    ...mapActions('productCategory', [
      'addProductCat',
      'editProductCat',
      'deleteProductCat',
      'getAllProductCategory',
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
  allProductCat!: ProdCategoryDto[];
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
  allInventoryCat!: InventoryCategoryDto[];
  addInventoryCat!: (payload: InventoryCategoryDto) => Promise<void>;
  editInventoryCat!: (payload: InventoryCategoryDto) => Promise<void>;
  deleteInventoryCat!: (payload: InventoryCategoryDto) => Promise<void>;
  getAllInventoryCategory!: () => Promise<void>;
  addNewInventoryCat = false;
  editRowInventoryCat = false;

  // async mounted() {
  //   await this.getAllInventoryCategory();
  // }
  InvCatColumns = [
    {
      name: 'categoryName',
      required: true,
      label: 'Name',
      align: 'left',
      field: (row: InventoryCategoryDto) => row.categoryName,
      format: (val: string) => `${val}`,
    },
    {
      name: 'totalProd',
      align: 'center',
      label: 'Total Product',
      field: 'totalProd',
    },
    {
      name: 'stockQuantity',
      align: 'center',
      label: 'Total Stock Quantity',
      field: 'stockQuantity',
    },
    {
      name: 'action',
      align: 'center',
      label: 'Action',
      field: 'action',
    },
  ];

  inputInventoryCat: InventoryCategoryDto = {
    categoryName: '',
    totalProd: 0,
    stockQuantity: 0,
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

  deleteSpecificInvCat(val: InventoryCategoryDto) {
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

  openEditDialogInvCat(val: InventoryCategoryDto) {
    this.editRowInventoryCat = true;
    this.inputInventoryCat = { ...val };
  }
  resetModelInvCat() {
    this.inputInventoryCat = {
      categoryName: '',
      totalProd: 0,
      stockQuantity: 0,
    };
  }

  //---------------------------> Expenses Category <----------------------------------------------
  allExpensesCategory!: ExpensesCategoryDto;
  addExpensesCat!: (payload: ExpensesCategoryDto) => Promise<void>;
  editExpensesCat!: (payload: ExpensesCategoryDto) => Promise<void>;
  deleteExpensesCat!: (payload: ExpensesCategoryDto) => Promise<void>;
  addNewExpenseCat = false;
  editRowExpenseCat = false;

  expensesCatColumns = [
    {
      name: 'expensesCategoryName',
      required: true,
      label: 'Name',
      align: 'left',
      field: (row: ExpensesCategoryDto) => row.expensesCategoryName,
      format: (val: string) => `${val}`,
    },
    {
      name: 'action',
      align: 'center',
      label: 'Action',
      field: 'action',
    },
  ];
  inputExpenseCat: ExpensesCategoryDto = {
    expensesCategoryName: '',
  };
  async onAddExpenseCat() {
    await this.addExpensesCat(this.inputExpenseCat);
    this.addNewExpenseCat = false;
    this.resetModelExpenseCat();
    this.$q.notify({
      type: 'positive',
      message: 'Successfully Added.',
    });
  }

  async onEditExpenseCat() {
    await this.editExpensesCat(this.inputExpenseCat);
    this.editRowExpenseCat = false;
    this.resetModelExpenseCat();
    this.$q.notify({
      type: 'positive',
      message: 'Successfully Edit.',
    });
  }

  deleteSpecificExpenseCat(val: ExpensesCategoryDto) {
    this.$q
      .dialog({
        message: 'Confirm to delete?',
        cancel: true,
        persistent: true,
      })
      .onOk(async () => {
        await this.deleteExpensesCat(val);
        this.$q.notify({
          type: 'warning',
          message: 'Successfully deleted',
        });
      });
  }

  openEditDialogExpenseCat(val: ExpensesCategoryDto) {
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
