import { Model } from 'dva';
import HttpRequest from '@/utils/request';

const model: Model = {
  namespace: 'global',
  state: {
    roleList: [],
    userList: [],
    menuList: [],
    houseList: []
  },
  reducers: {
    updateUserList(state, params: any) {
      return {...state, userList: params.playload.data}
    },

    updateMenuList(state, params: any) {
      return {...state, menuList: params.playload.data}
    },

    updateHouseList(state, params: any) {
      return {...state, houseList: params.playload.data}
    },

    updateRoleList(state, params: any) {
      return {...state, roleList: params.playload.data}
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
      yield put({ type: 'updateUserList', playload: {data}});
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
      yield put({ type: 'updateMenuList', playload: {data}});
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
      yield put({ type: 'updateHouseList', playload: {data}});
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
      yield put({ type: 'updateRoleList', playload: {data}});
    },
  },
};
export default model;
