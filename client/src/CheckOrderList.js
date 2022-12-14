import React from 'react'

export const CheckOrderList = ({ order, items_array, sumTotal }) => {
    return (
        <>
            <div className='check-order-list'>
                <div>
                    <h5>Order Info</h5>
                    {
                        <ul>
                            <li>Invitation Type: {order.invite_type}</li>
                            <li>Material: {order.material}</li>
                            <li>Event Date: {order.event_date}</li>
                            <li>Motif: {order.motif}</li>
                            <li>Invitation Title: {order.invite_title}</li>
                            <li>Font Style: {order.font_style}</li>
                            <li>Content Link: {order.content_link}</li>
                            <li>Number of Invites: {order.num_of_invites}</li>
                            <li>Peg Link: {order.peg_link}</li>
                        </ul>
                    }
                </div>
                <div>
                    <h5>Order Details</h5>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Item Name</th>
                                <th>Color</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items_array.map((val) => {
                                return (
                                    <tr key={val.item_name}>
                                        <td className='td'>{val.item_name}</td>
                                        <td className='td'>{val.color}</td>
                                        <td className='td'>{val.quantity}</td>
                                        <td className='td'>{val.price}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <h3 >Unit Cost: {sumTotal}</h3>
                </div>
            </div>
            
        </>
    )
}
