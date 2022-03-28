import http from "./http";

const projectApi={
    list:'/api/build_project/list',
    add:'/api/build_project/add',
    edit:'/api/build_project/edit',
    details:'/api/build_project/details',
    delete:'/api/build_project/delete'
};
export const projectList=(params)=>{
    return http.get(projectApi.list,{params})
}
export const projectAdd=(params)=>{
    return http.post(projectApi.add,params)
}
export const projectEdit=(params)=>{
    return http.post(projectApi.edit,params)
}
export const projectDetails=(params)=>{
    return http.get(projectApi.details,{params})
}
export const projectDelete=(params)=>{
    return http.get(projectApi.delete,{params})
}
