/* eslint-disable no-undef */
/* eslint-disable no-debugger */
import axios from 'axios';
import getCookie from '../utils/getCookie';
// 上传文件专用
const env = process.env.NODE_ENV === "development" ? 'http://localhost:3000' : ''
export const orderImport = (params)=>{
    const {
        file,
        config
    } = params || {};
    const  {token} = getCookie()
    return new Promise((resolve, reject) => {
        try {
            const reader = new FileReader();
            reader.onload = function () {
                console.log(reader);
                resolve(axios({
                    method: 'post',
                    url: env+`/img/upload?token=${token}`,
                    data: reader.result,
                    ...config,
                }));
            };
            // reader.readAsBinaryString(file);
            reader.readAsArrayBuffer(file);
        } catch (error) {
            reject();
        }
    });
}
export const imageUpdate = (params)=>{
    const {
        file,
        config
    } = params || {};
    const  {token} = getCookie()
    return new Promise((resolve, reject) => {
        try {
            const reader = new FileReader();
            reader.onload = function () {
                const type =file.type.slice(file.type.indexOf('/')+1,file.type.length);
                console.log(file.type,type)
                resolve(axios({
                    method: 'post',
                    url:  env+`/api/img/upload?token=${token}&type=${type}`,
                    data: reader.result,
                    ...config,
                }));
            };
            // reader.readAsBinaryString(file);
            reader.readAsArrayBuffer(file);
        } catch (error) {
            reject();
        }
    });
}