import http from '../utils/request'

/**
 * Common
 */
export const uploadImg = () =>{

}
export const downloadImg = () =>{

}
/**
 * Shop
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
//退出登录
export const shopLogout = () =>{
    return http.post('/shop/logout')
}
//新增商家
export const addShop = (data) =>{
    return http.post('/shop/add',data)
}
//删除商家
export const deleteShop = (params) =>{
    return http.delete('/shop',params)
}
//修改商家信息
export const updateShop = (data) =>{
    return http.put('/shop',data)
}
//通过shopId得到商家信息
export const getShop = (params) =>{
    return http.get('/shop',params)
}
//获取所有商家
export const getShopList = (params) =>{
    return http.get('/shop/list',params)
}
/**
 * Knight
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
//退出登录
export const knightLogout = () =>{
    return http.post('/knight/logout')
}
//新增骑手
export const addKnight = (data) =>{
    return http.post('/knight/add',data)
}
//删除骑手
export const deleteKnight = (params) =>{
    return http.delete('/knight',params)
}
//修改骑手信息
export const updateKnight = (data) =>{
    return http.put('/knight',data)
}
//通过knightId得到骑手信息
export const getKnight = (params) =>{
    return http.get('/knight',params)
}
//获取所有骑手
export const getKnightPage = (params) =>{
    return http.get('/knight/page',params)
}
/**
 * User
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
//退出登录
export const userLogout = () =>{
    return http.post('/user/logout')
}
//新增用户
export const addUser = (data) =>{
    return http.post('/user/add',data)
}
//修改用户信息
export const updateUser = (data) =>{
    return http.put('/user',data)
}
//通过userId得到用户信息
export const getUser = (params) =>{
    return http.get('/user',params)
}
//获取所有用户信息
export const getUserPage = (params) =>{
    return http.get('/user/page',params)
}
/**
 * Orders
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
//提交订单
export const submitOrder = (data) =>{
    return http.post('/orders/add',data)
}
export const updateOrder = (data) =>{
    return http.put('/orders',data)
}
//骑手接单
export const knightGetOrder = (params) =>{
    return http.put('/orders/getOrder',params)
}
//骑手查询现在需要派送的订单
export const knightSeeOrder = (params) =>{
    return http.get('/orders/knight/list',params)
}
//根据shopId获取对应订单信息
export const getOrderShopPage = (params) =>{
    return http.get('/orders/shopPage',params)
}
//根据userId获取对应订单信息
export const getOrderUserPage = (params) =>{
    return http.get('/orders/userPage',params)
}
//根据knightId获取对应订单信息
export const getOrderKnightPage = (params) =>{
    return http.get('/orders/knightPage',params)
}
//根据不同条件获取订单信息
export const getOrderPage = (params) =>{
    return http.get('/orders/page',params)
}
//获取订单详情信息
export const getOrderDetail = (params) =>{
    return http.get('/orders/orderDetail',params)
}
/**
 * ShopCar
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
//将商品添加到购物车
export const addShopCar = (data) =>{
    return http.post('/shoppingCart/add',data)
}
//从购物车删除商品
export const deleteShopCar = (params) =>{
    return http.delete('/shoppingCart',params)
}
//修改购物车商品
export const updateShopCar = (data) =>{
    return http.put('/shoppingCart',data)
}
//获取购物车所有数据
export const getShopCar = (params) =>{
    return http.get('/shoppingCart/list',params)
}
/**
 * Address
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
//新增地址
export const addAddress = (data) =>{
    return http.post('/address/add',data)
}
//删除地址
export const deleteAddress = (params) =>{
    return http.delete('/address',params)
}
//修改地址
export const updateAddress = (data) =>{
    return http.put('/address',data)
}
//设置默认地址
export const setAddressDefault = (data) =>{
    return http.put('/address/default',data)
}
//通过userId获取对应默认地址
export const getAddressDefault = (params) =>{
    return http.get('/address/default',params)
}
//通过userId获取所有地址信息
export const getAddressPage = (params) =>{
    return http.get('/address/page',params)
}
export const getAddressList = (params) =>{
    return http.get('/address/list',params)
}
/**
 * Category
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
//新增菜品分类
export const addCategory = (data) => {
    return http.post('/category/add',data)
}
//删除菜品分类
export const deleteCategory = (params) => {
    return http.delete('/category',params)
}
//修改菜品分类
export const updateCategory = (data) => {
    return http.put('/category',data)
}
//获取菜品信息
export const getCategoryPage = (params) => {
    return http.get('/category/page',params)
}
//获取所有菜品
export const getCategoryAll = (params) =>{
    return http.get('/category/list',params)
}
/**
 * Dish
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
//新增菜品
export const addDish = (data) => {
    return http.post('/dish/add',data)
}
//删除菜品
export const deleteDish = (params) => {
    return http.delete('/dish',params)
}
//修改菜品
export const updateDish = (data) => {
    return http.put('/dish',data)
}
//获取菜品
export const getDishPage = (params) => {
    return http.get('/dish/page',params)
}
//通过菜品分类id获取菜品
export const getDishList = (params) => {
    return http.get('/dish/list',params)
}
/**
 * Canteen
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
//新增食堂
export const addCanteen = (data) =>{
    return http.post('/canteen/add',data)
}
//删除食堂
export const deleteCanteen = (params) =>{
    return http.delete('/canteen',params)
}
//修改食堂
export const updateCanteen = (data) =>{
    return http.put('/canteen',data)
}
//获取所有食堂
export const getCanteenList = () =>{
    return http.get('/canteen/list')
}
/**
 * Role
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getRole = (params) =>{
    return http.get('/role',params)
}