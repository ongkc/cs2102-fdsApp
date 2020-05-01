import React, { useState, useEffect } from 'react'
import MyHeader from '../layouts/header';
import { Header, Tab, Pagination } from 'semantic-ui-react'

import axios from 'axios'
import runWithRid from './performWithRid'
import OrdersTable from '../components/utils/OrdersTable'

export default function ResOrder(props) {
    const tabs = ['Incomplete', 'Completed']
    const numOrdersPerPage = 5;

    function makePanes() {
        let panes = [{
            menuItem: tabs[0],
            render: () => 
                <Tab.Pane>
                  <OrdersTable orders={ordersToShow.map( 
                    addSetPreparedHandlerToOrder
                  )} />
                </Tab.Pane>
        }, {
            menuItem: tabs[1],
            render: () => 
                <Tab.Pane>
                  <OrdersTable orders={ordersToShow} />
                </Tab.Pane>
        }]
        return panes
    }

    const [rid, setRid] = useState(null)
    // note that by complete it means the meal is ready to be picked up.
    const [incompleteOrders, setIncompleteOrders] = useState([])
    const [completedOrders, setCompletedOrders] = useState([])
    
    const [pageNum, setPageNum] = useState(1);
    const [currentTabIdx, setTabIdx] = useState(tabs[0])
    const [currentTabItems, setCurrentTabItems] = useState([]);
    const [ordersToShow, setOrdersToShow] = useState([]);

    useEffect(() => {
        runWithRid( userInfo => {
            const rid = userInfo.rid;
            setRid(rid);
            axios.get('/api/restaurant/orders/current/' + rid)
                .then( res => {
                    if (res.status == 200) {
                        setIncompleteOrders(res.data)
                    }
                })
                .catch( err => {
                    console.log(err)
                });
            axios.get('/api/restaurant/orders/completed/' + rid)
                .then( res => {
                    if (res.status == 200) {
                        setCompletedOrders(res.data)
                    }
                })
                .catch( err => {
                    console.log(err)
                });
        })
    }, [props])

    useEffect(() => {
        const startIncl = (pageNum - 1) * numOrdersPerPage
        const endExcl = pageNum * numOrdersPerPage
        setOrdersToShow(currentTabItems.slice(startIncl, endExcl))
    }, [pageNum, currentTabItems])

    useEffect(() => {
        setPageNum(1)
        if (currentTabIdx == 0) {
            setCurrentTabItems(incompleteOrders)
        } else {
            setCurrentTabItems(completedOrders)
        }
    }, [currentTabIdx])

    function addSetPreparedHandlerToOrder(order) {
        order.setPreparedHandler = (e) => {
            console.log("TODO: write to orders table that i am done")
            //TODO: axios put
            //axios.put('/api/restaurant/
            //TODO: move order from incomplete to complete
            // should be let updated = incompleteOrders.filter( ... ); set
            // then __ = the added (idt can push cus same entity); set.
        }
        return order
    }

    return(
        <div className="ResOrder">
          <MyHeader/>
          <div className='container'>
            <Tab panes={makePanes()} onTabChange={ (e,tab) => setTabIdx(tab.activeIndex) } />
            <Pagination
              activePage={pageNum}
              totalPages={Math.ceil(currentTabItems.length / numOrdersPerPage)}
              onPageChange={ (e, pg) => setPageNum(pg.activePage) }
              ellipsisItem={null}
              />
          </div>
        </div>
    )
}

