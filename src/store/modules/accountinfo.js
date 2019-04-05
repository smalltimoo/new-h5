import types from '../mutation-types'

export default{
    state:{
        refreshData:false,
    },
    getters:{
        getRefreshData:(state)=>{
            return state.refreshData;
        }
    },
    mutations:{
        [types.ACCOUNT_INFO_REFRESH_DATA](state,payload){
            state.refreshData = payload;
        },
    },
    actions:{
        [types.ACCOUNT_INFO_REFRESH_DATA]({commit},payload){
            commit(types.ACCOUNT_INFO_REFRESH_DATA,payload);
        },
    }
}