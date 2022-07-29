// 获取cookie集合对象
const getCookie = () => {
    if(!document.cookie){
        return {};
    }
    return document.cookie.split('; ').reduce((all, next) => {
        const ary = next.split("=");
        all[ary[0]] = ary[1]
        return all
    }, {})
};
export default getCookie;