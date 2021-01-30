import Cookies from 'js-cookie'

// 获取cookie里的token
export function getCookieToken() {
    return Cookies.get('token');
 }

 // 获取页面宽度
 export function getPageWidth() {
     return window.innerWidth + 'px'
 }
 
 // 根据key获取cookie里的值
 export function getCookieVal(key = "") {
     return Cookies.get(key)
 }

 // 根据key获取数组value
export function getArrayProps(arr, key) {
    let keys = `${key}`
    let res = []
    if(arr.length > 0) {
        arr.forEach(t => {
            res.push(t[keys])
        })
    }
    return res
}