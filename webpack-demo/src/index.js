import { homeApi, shopcarApi, orderApi } from './api'
import './assest/css/common.css'
import './assest/readme.md'

const runTest = () => {

    homeApi.getUserInfo();

    shopcarApi.getShopCarList();

    orderApi.getOrderList();
}

runTest()