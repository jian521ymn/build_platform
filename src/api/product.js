import http from "./http";

const productApi={
    list:'/api/product/list',
    add:'/api/product/add',
    edit:'/api/product/edit',
    details:'/api/product/details',
    delete:'/api/product/delete',
    record:'/api/product/record',
    recordCreate:'/api/product/record_create',
};
export const productList=(params)=>{
    return http.get(productApi.list,{params})
}
export const productAdd=(params)=>{
    return http.post(productApi.add,params)
}
export const productEdit=(params)=>{
    return http.post(productApi.edit,params)
}
export const productDetails=(params)=>{
    return http.get(productApi.details,{params})
}
export const productDelete=(params)=>{
    return http.get(productApi.delete,{params})
}
export const recordCreate=(params)=>{
    return http.post(productApi.recordCreate,params)
}
export const productRecord=(params)=>{
    return http.get(productApi.record,{params})
}

