import { Inventory } from 'src/interfaces/inventory.interface';
import inventoryService from 'src/services/inventory.service';
import { InventoryDto } from 'src/services/rest-api';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { InventoryStateInterface } from './state';

const actions: ActionTree<InventoryStateInterface, StateInterface> = {
  async addInventory(context, payload: InventoryDto): Promise<void> {
    const result = await inventoryService.create(payload);
    context.commit('setNewInventory', result);
    await context.dispatch('getAllInventory');
  },

  async editInventory(context, payload: any): Promise<any> {
    const result = await inventoryService.update(payload.itemCode, payload);
    context.commit('updateInventory', result);
    await context.dispatch('getAllInventory');
  },

  async deleteInventory(context, itemCode: string): Promise<any> {
    const result = await inventoryService.delete(itemCode);
    context.commit('deleteInventory', result);
    await context.dispatch('getAllInventory');
  },

  async getAllInventory(context): Promise<any> {
    const res = await inventoryService.getAll();
    // const check = context.state.allInventory.map(async (invent) => {
    //   if (invent.itemQuantStatus === 0) {
    //     await context.dispatch('editInventory', {
    //       ...invent,
    //       itemStatus: 'Used',
    //     });
    //   }
    // });
    context.commit('getAllInventory', res);
  },

  async editItemQuant(context) {
    const check = context.state.allInventory.map(async (invent) => {
      if (invent.itemQuantStatus === 0) {
        await context.dispatch('editInventory', {
          ...invent,
          itemStatus: 'Used',
        });
      }
    });
    context.commit('getAllInventory', check);
  },

  async editInventoryStatus(context) {
    if (!context.state.allInventory || context.state.allInventory.length == 0) {
      await context.dispatch('getAllInventory');
    }

    const check = context.state.allInventory.map(async (stock) => {
      if (stock.itemQuantStatus === 0 && stock.itemStatus === 'Available') {
        await context.dispatch('editInventory', {
          ...stock,
          itemStatus: 'Used',
        });
      }
    });

    context.commit('editInventoryStatus', check);
    await context.dispatch('getAllInventory');
  },

  async getByItemName(context, itemName: string): Promise<any> {
    const res = await inventoryService.SearchByName(itemName);
    context.commit('getByItemName', res);
  },

  async getOneInventory(context, id: string): Promise<any> {
    const res = await inventoryService.getOne(id);
    context.commit('getOneInventory', res);
  },
};

export default actions;
