// pages/product/product.js
import { Product } from 'product-model.js'
import { Cart } from '../cart/cart-model.js'

var product = new Product
var cart = new Cart

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    countsArray: [1,2,3,4,5,6,7,8,9,10],
    productTabs: ['商品详情', '产品参数', '售货保障'],
    productCounts: 1,
    currentTabsIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.id = options.id
    this._loadData()
  },

  _loadData(){
    product.getDetailInfo(this.data.id,(data)=>{
      this.setData({
        cartTotalCounts: cart.getCartTotalCounts(),
        product:data
      })
    })
  },
  bindPickerChange(event){
    var index = event.detail.value
    var selectedCount = this.data.countsArray[index]
    this.setData({
      productCounts:selectedCount
    })
  },
  onTabsItemTap(event){
    var index = product.getDataSet(event,'index')
    this.setData({
      currentTabsIndex: index
    })
  },
  onAddingToCartTap: function(event){
    this.addToCart()
    var counts = this.data.cartTotalCounts + this.data.productCounts
    this.setData({
      cartTotalCounts: counts
    })
  },
  addToCart: function(){
    var tempObj = {}
    var keys = ['id','name','main_img_url','price']
    for(var key in this.data.product){
      if(keys.indexOf(key) >=0){
        tempObj[key] = this.data.product[key]
      }
    }
    cart.add(tempObj,this.data.productCounts)

    // var product = this.data.product
    // tempObj = {
    //   'id' : product.id,
    //   'name': product.name,
    //   'main_img_url': product.main_img_url,
    //   'price': product.price
    // }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})