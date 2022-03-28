export const getQuery = function () {
    const query = window.location.href.split('?')[1] || '';
    const queryObjs = query.split('&').reduce((prev, curr) => {
        const p = curr.split('=');
        prev[decodeURIComponent(p[0])] = decodeURIComponent(p[1]);
        return prev;
    }, {});
    return queryObjs;
};