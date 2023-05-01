import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom';
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'
import UserSalesChart from './UserSalesChart';
import MonthlySalesChart from './MonthlySalesChart';
import ProductCountChart from './ProductCountChart';
import { useDispatch, useSelector } from 'react-redux'

import { getAdminProducts } from '../../actions/productActions'
import { allOrders } from '../../actions/orderActions'

import { allUsers, userSales } from '../../actions/userActions'
import { monthlySalesChart, productCountChart } from '../../actions/chartActions'

import '../../App.css'

const Dashboard = () => {
    const dispatch = useDispatch();
    const { products } = useSelector(state => state.products)
    const { users } = useSelector(state => state.allUsers)
    const { orders, totalAmount, loading } = useSelector(state => state.allOrders)
    const { customerSales, } = useSelector(state => state.customerSales)
    const { salesPerMonth, } = useSelector(state => state.salesPerMonth)
    const { productCount, } = useSelector(state => state.productCount)
    let outOfStock = 0;
    products.forEach(product => {
        if (product.stock === 0) {
            outOfStock += 1;
        }
    })

    useEffect(() => {
        dispatch(getAdminProducts())
        dispatch(allOrders())
        dispatch(allUsers())
        dispatch(userSales())
        dispatch(monthlySalesChart())
        dispatch(productCountChart())

    }, [dispatch])
    console.log(productCount)
    return (
        <Fragment>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <br/><br/><br/><br/>
                    {/* <h1 className="my-4">Dashboard</h1> */}
                    <img src="/images/dashboard-banner.gif" width="auto" /><br/>
                    {loading ? <Loader /> : (
                        <Fragment>
                            <br/>
                            <MetaData title={'Admin Dashboard'} />

                            <div className="row pr-4">
                                <div className="col-xl-12 col-sm-12 mb-3">
                                    <div className="card text-white o-hidden h-100" style={{ backgroundColor: "#BD83B8" }}>
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Total Amount<br /> <b>${totalAmount && totalAmount.toFixed(2)}</b>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row pr-4">
                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white o-hidden h-100" style={{ backgroundColor: "#854f6c" }}>
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Products<br /> <b>{products && products.length}</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/products">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>

                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white o-hidden h-100" style={{ backgroundColor: "#DFB6B2" }}>
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Orders<br /> <b>{orders && orders.length}</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/orders">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>

                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white o-hidden h-100" style={{ backgroundColor: "#451952" }}>
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Users<br /> <b>{users && users.length}</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/users">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>

                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white o-hidden h-100" style={{ backgroundColor: "#662549" }}>
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Out of Stock<br /> <b>{outOfStock}</b></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr
                                style={{
                                    color: "#67568C",
                                    backgroundColor: "#67568C",
                                    height: 5
                                }}
                            />

                            <Fragment>
                                <UserSalesChart data={customerSales} />
                            </Fragment>
                            <Fragment>
                                <hr
                                    style={{
                                        color: "#67568C",
                                        backgroundColor: "#67568C",
                                        height: 5
                                    }}
                                />
                                <MonthlySalesChart data={salesPerMonth} />
                            </Fragment>
                            <Fragment>
                                <hr
                                    style={{
                                        color: "#67568C",
                                        backgroundColor: "#67568C",
                                        height: 5
                                    }}
                                />
                                <ProductCountChart data={productCount} />
                            </Fragment>
                        </Fragment>
                    )}
                </div>
            </div>
        </Fragment >
    )
}

export default Dashboard