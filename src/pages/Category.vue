<template>
  <q-page class="q-pa-lg">
    <div>
      <div class="text-h4 q-pb-lg text-bold">
        <q-icon name="category" color="amber" style="font-size: 4rem" />
        Category
      </div>
      <div class="q-px-md row">
        <div class="q-pr-md col-6">
          <q-table
            title="Category List"
            :rows="allCategory"
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
                    @click="openEditDialog(props.row)"
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
                        <q-btn flat label="Cancel" color="red-10" v-close-popup />
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
        <div class="q-pl-md col-6">
          <q-table
            title="Sub-Category List"
            :rows="allSubCategory"
            :columns="subColumns"
            row-key="subCategoryID"
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
                    @click="openEditDialog(props.row)"
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
                        <q-btn flat label="Cancel" color="red-10" v-close-popup />
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
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { ICategoryInfo } from '../store/category/state';
import { ISubProdCategoryInfo } from '../store/subprodcategory/state';
import { mapState, mapActions } from 'vuex';
@Options({
  computed: {
    ...mapState('category', ['allCategory'],),
    ...mapState('subCategory', ['allSubCategory']), 
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
  },
})
export default class Expenses extends Vue {
  addCategory!: (payload: ICategoryInfo) => Promise<void>;
  editCategory!: (payload: ICategoryInfo) => Promise<void>;
  deleteCategory!: (payload: ICategoryInfo) => Promise<void>;
  allCategory!: ICategoryInfo[];
  addSubCategory!: (payload: ISubProdCategoryInfo) => Promise<void>;
  editSubCategory!: (payload: ISubProdCategoryInfo) => Promise<void>;
  deleteSubCategory!: (payload: ISubProdCategoryInfo) => Promise<void>;
  allSubCategory!: ISubProdCategoryInfo[];

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
   subColumns = [
    {
      name: 'Sub-categoryID',
      required: true,
      label: 'Category ID',
      align: 'left',
      field: (row: ISubProdCategoryInfo) => row.subCategoryID,
      format: (val: string) => `${val}`,
    },
    {
      name: 'MainCategoryName',
      align: 'center',
      label: 'Main Category',
      field: 'MainCategoryName',
    },
    {
      name: 'subCategoryName',
      align: 'center',
      label: 'Name',
      field: 'categoryName',
    },
     {
      name: 'action',
      align: 'center',
      label: 'Action',
      field: 'action',
    },
  ];

  selected = [];
  addNewCategory = false;
  editRowCategory = false;
  showNoteCategory = false;
  filter = '';

  inputCategory: ICategoryInfo = {
    categoryID: '',
    categoryName: '',
  };

  async onAddCategory() {
    await this.addCategory(this.inputCategory);
    this.addNewCategory = false;
    this.resetModel();
    this.$q.notify({
      type: 'positive',
      message: 'Successfully Added.',
    });
  }

  async onEditCategory() {
    await this.editCategory(this.inputCategory);
    this.editRowCategory = false;
    this.resetModel();
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

  openEditDialog(val: ICategoryInfo) {
    this.editRowCategory = true;
    this.inputCategory = { ...val };
  }
  resetModel() {
    this.inputCategory = {
      categoryID: '',
      categoryName: '',
      numProd: '',
      stockQuantity: '',
    };
  }
}
</script>
