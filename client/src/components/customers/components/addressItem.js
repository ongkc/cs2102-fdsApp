import React from 'react';

export default function AddressItem(props) {
    const {address} = props.address;
    
    return (
        <React.Fragment>
            <tr>
                <th scope="row">{address}</th>
                
                <a class = 'btn btn-outline-danger' onClick={e=>console.log('click')} >Edit</a>
            </tr>
        </React.Fragment>

    )
}