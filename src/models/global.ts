import { Model } from 'dva';
import HttpRequest from '@/utils/request';

const model: Model = {
  namespace: 'global',
  state: {
    roleList: [],
    userList: [],
    menuList: [],
    houseList: [],
    rentalList: [],
    resourceList: [],
  },
  reducers: {
    updateUserList(state, params: any) {
      return { ...state, userList: params.playload.data };
    },

    updateMenuList(state, params: any) {
      return { ...state, menuList: params.playload.data };
    },

    updateHouseList(state, params: any) {
      return { ...state, houseList: params.playload.data };
    },

    updateRentalList(state, params: any) {
      return { ...state, rentalList: params.playload.data };
    },

    updateRoleList(state, params: any) {
      return { ...state, roleList: params.playload.data };
    },

    updateResourceList(state, params: any) {
      return { ...state, resourceList: params.playload.data };
    },
  },
  effects: {
    *getUserList(action, { call, put }) {
      const getData = () => {
        return new Promise((resolve) => {
          HttpRequest({ method: 'get', url: 'user/all/list' }).then((res: any) => {
            resolve(res);
          });
        });
      };
      const data = yield call(getData, 'global');
      yield put({ type: 'updateUserList', playload: { data } });
    },

    *getMenuList(action, { call, put }) {
      const getData = () => {
        return new Promise((resolve) => {
          HttpRequest({ method: 'get', url: 'admin/menus' }).then((res: any) => {
            resolve(res.recordList);
          });
        });
      };
      const data = yield call(getData, 'global');
      yield put({ type: 'updateMenuList', playload: { data } });
    },

    *getHouseList(action, { call, put }) {
      const getData = () => {
        return new Promise((resolve) => {
          HttpRequest({ method: 'get', url: 'house/all/list' }).then((res: any) => {
            resolve(res.recordList);
          });
        });
      };
      const data = yield call(getData, 'global');
      yield put({ type: 'updateHouseList', playload: { data } });
    },

    *getRentalList(action, { call, put }) {
      const getData = () => {
        return new Promise((resolve) => {
          HttpRequest({ method: 'get', url: 'rental/record/all/list' }).then((res: any) => {
            resolve(res);
          });
        });
      };
      const data = yield call(getData, 'global');
      console.log(data);
      yield put({ type: 'updateRentalList', playload: { data } });
    },

    *getRoleList(action, { call, put }) {
      const getData = () => {
        return new Promise((resolve) => {
          HttpRequest({ method: 'get', url: 'admin/all/role' }).then((res: any) => {
            resolve(res);
          });
        });
      };
      const data = yield call(getData, 'global');
      yield put({ type: 'updateRoleList', playload: { data } });
    },

    *getResourceList(action, { call, put }) {
      const getData = () => {
        return new Promise((resolve) => {
          HttpRequest({ method: 'get', url: 'admin/resources' }).then((res: any) => {
            resolve(res.recordList);
          });
        });
      };
      const data = yield call(getData, 'global');
      yield put({ type: 'updateResourceList', playload: { data } });
    },
  },
};
export default model;
