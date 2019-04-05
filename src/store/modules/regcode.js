import types from '../mutation-types'

export default{
    state:{
        regcode:'',
    },
    getters:{
        getRegcode:(state)=>{
            return state.regcode;
        }
    },
    mutations:{
        [types.REGISTER_CODE](state,val){
            state.regcode = val;
        },
    },
    actions:{
        [types.REGISTER_CODE]({commit},val){
            commit(types.REGISTER_CODE,val);
        },
    }
}