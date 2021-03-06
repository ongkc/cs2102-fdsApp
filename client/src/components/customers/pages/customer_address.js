import React, { useState, useEffect } from 'react'
import Header from '../layout/header'
import {Button} from 'react-bootstrap'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Axios from 'axios';
import AddressItem from '../components/addressItem';
import {Loader} from "semantic-ui-react";

export default function CAddress (props) {
    const [address, setAddress] = useState([]);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(true);

    function addAddress() {
        console.log("address");
        if (address.length<5) {
            props.history.push({pathname:"/customer/editAddress",
                state:{action: "add", oldAddress:null, oldPostal:null}})
        }else {

        
            props.history.push({pathname:"/customer/editAddress",
                state:{action: "add", oldAddress:address[4].address, oldPostal:address[4].postal}})
        }
    }


    function addBox() {
        confirmAlert({
            title:'Add address message',
            message: `You have five addresses recorded. By adding new address, "${address[4].address} "will be delete from the record. Do you wish to continue?`,
            buttons:[
                {label:'Yes',
                  onClick:()=> {addAddress();
                  }},
              {label: 'No',
          }
            ]
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            await Axios.get('/api/customer/address')
                    .then(res=> {
                        if(res.data.length>0) {
                            setAddress(res.data);
                            setShow(true);
                        }
                       
                        
                    })
        }
        fetchData();
        setLoading(false);
    }, [])

  
        return(
            <div>
            <Header/>
             <div class ="container" className="MyAddress">
            {loading? 
                <Loader active inline='centered'>Loading</Loader> 
             :
            <div> 
             {show?
             
                <div class="row">
             
                    <div class="col-2"></div>
                    <div class='col'>
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Address</th>
                                </tr>
                            </thead>
                            <tbody>
                                {address.map((cp, i)=> 
                        
                                     <AddressItem key={i} address={cp} props={props}/>
                        
                                )}
                    
                            </tbody>
                         </table>
                    </div>
                    <div class="col-2"></div>
                </div>
               
                :<div class ="mx-auto" style={{width:"350px"}}>
                    <p> </p>
                    <p> You have not added address....</p>
                  
                </div>
             }
            
            
            <div>
            <div className="well" style={wellStyles}>
                <Button block bsStyle="danger"  onClick ={address.length >= 5? addBox: addAddress}>
                    Add new Address
                </Button>
              </div>
            </div>
            </div>
            }
            </div>
            </div>
        )
    
}

const wellStyles = { maxWidth: 400, margin: '0 auto 10px' };