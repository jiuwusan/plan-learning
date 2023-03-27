const { homeApi, shopcarApi, orderApi } = require('./api/home');

homeApi.getUserInfo();

shopcarApi.getShopCarList();

orderApi.getOrderList();