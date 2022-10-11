import React, { useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import NavBarCustomerLoggedIn from './NavBarCustomerLoggedIn';
import './OrderForm1.css';

const OrderForm1 = ({ orderItems, setOrderItems }) => {
    useEffect(() => console.log(orderItems), [orderItems]);

    const navigate = useNavigate()

    const handleInviteType = (e) => {
        setOrderItems((prevState) => {
            return {
                ...prevState,
                order: {
                    ...prevState.order,
                    invite_type: e.target.value
                }
            };
        });
    }
    const handleMaterial = (e) => {
        setOrderItems((prevState) => {
            return {
                ...prevState,
                order: {
                    ...prevState.order,
                    material: e.target.id,
                    material_price: parseFloat(e.target.value)
                }
            };
        });
    }

    const handleCancel = (e) => {
        if (window.confirm("Are you sure you want to cancel the order?")) {
            navigate("/")
        }
    }

    return (
        <>
            <NavBarCustomerLoggedIn />
            <form className='main-order-frame1'>
                <h3 className='category-h3'>TYPE OF INVITE</h3>
                <div className='boxes'>
                    <div className='square-button-with-text'>
                        <label>
                            <input type='radio' id='wedding' name='invite-type' value='wedding' className='form1-radio' onClick={handleInviteType} />
                            <img className='radio-img' src={process.env.PUBLIC_URL + '/images/wedding.jpg'} alt="wedding"></img>
                        </label>
                        <h5>Wedding</h5>
                    </div>
                    <div className='square-button-with-text'>
                        <label>
                            <input type='radio' id='birthday' name='invite-type' value='birthday' className='form1-radio' onClick={handleInviteType} />
                            <img className='radio-img' src={process.env.PUBLIC_URL + '/images/birthday.jpg'} alt="birthday"></img>
                        </label>
                        <h5>Birthday</h5>
                    </div>
                    <div className='square-button-with-text'>
                        <label>
                            <input type='radio' id='debut' name='invite-type' value='debut' className='form1-radio' onClick={handleInviteType} />
                            <img className='radio-img' src={process.env.PUBLIC_URL + '/images/debut.jpg'} alt="debut"></img>
                        </label>
                        <h5>Debut</h5>
                    </div>
                    <div className='square-button-with-text'>
                        <label>
                            <input type='radio' id='other' name='invite-type' value='other' className='form1-radio' onClick={handleInviteType} />
                            <img className='radio-img' src={process.env.PUBLIC_URL + '/images/other.jpg'} alt="other"></img>
                        </label>
                        <h5>Other</h5>
                    </div>
                </div>
                <h3 className='category-h3'>MATERIAL</h3>
                <div className='boxes'>
                    <div className='square-button-with-text'>
                        <label>
                            <input type='radio' id='paper' name='material' value='30' className='form1-radio' onClick={handleMaterial} />
                            <img className='radio-img' src={process.env.PUBLIC_URL + '/images/paper.jpg'} alt="paper"></img>
                        </label>
                        <h5>Paper</h5>
                    </div>
                    <div className='square-button-with-text'>
                        <label>
                            <input type='radio' id='acrylic' name='material' value='180' className='form1-radio' onClick={handleMaterial} />
                            <img className='radio-img' src={process.env.PUBLIC_URL + '/images/acrylic.jpg'} alt="acrylic"></img>
                        </label>
                        <h5>Acrylic</h5>
                    </div>
                </div>
                <div className="invite-details">
                    <div className='label-textfield'>
                        <h5>Date of Event</h5>
                        <input
                            type='date'
                            id="event_date"
                            autoComplete="off"
                            onChange={(e) => {
                                setOrderItems((prevState) => {
                                    return {
                                        ...prevState,
                                        order: {
                                            ...prevState.order,
                                            event_date: e.target.value
                                        }
                                    };
                                });
                            }}
                            required
                            className='profile-textfield' />
                    </div>
                    <div className='label-textfield'>
                        <h5>Motif</h5>
                        <input
                            type='text'
                            id="motif"
                            autoComplete="off"
                            onChange={(e) => {
                                setOrderItems((prevState) => {
                                    return {
                                        ...prevState,
                                        order: {
                                            ...prevState.order,
                                            motif: e.target.value
                                        }
                                    };
                                });
                            }}
                            required
                            className='profile-textfield' />
                    </div>
                    <div className='label-textfield'>
                        <h5>Invitation Title</h5>
                        <input
                            type='text'
                            id="invitation_title"
                            autoComplete="off"
                            onChange={(e) => {
                                setOrderItems((prevState) => {
                                    return {
                                        ...prevState,
                                        order: {
                                            ...prevState.order,
                                            invite_title: e.target.value
                                        }
                                    };
                                });
                            }}
                            required
                            className='profile-textfield' />
                    </div>
                    <div className='label-textfield'>
                        <h5>Font Style</h5>
                        <input
                            type='text'
                            id="font"
                            autoComplete="off"
                            onChange={(e) => {
                                setOrderItems((prevState) => {
                                    return {
                                        ...prevState,
                                        order: {
                                            ...prevState.order,
                                            font_style: e.target.value
                                        }
                                    };
                                });
                            }}
                            required
                            className='profile-textfield' />
                    </div>
                    <div className='label-textfield'>
                        <h5>Content Link</h5>
                        <input
                            type='url'
                            id="content_link"
                            autoComplete="off"
                            onChange={(e) => {
                                setOrderItems((prevState) => {
                                    return {
                                        ...prevState,
                                        order: {
                                            ...prevState.order,
                                            content_link: e.target.value
                                        }
                                    };
                                });
                            }}
                            required
                            className='profile-textfield' />
                    </div>
                    <div className='label-textfield'>
                        <h5>Number of Invites</h5>
                        <input
                            type='number'
                            min='1'
                            id="invite_number"
                            autoComplete="off"
                            onChange={(e) => {
                                setOrderItems((prevState) => {
                                    return {
                                        ...prevState,
                                        order: {
                                            ...prevState.order,
                                            num_of_invites: e.target.value
                                        }
                                    };
                                });
                            }}
                            required
                            className='profile-textfield' />
                    </div>
                    <div className='label-textfield'>
                        <h5>Peg Link</h5>
                        <input
                            type='url'
                            id="peg_link"
                            autoComplete="off"
                            onChange={(e) => {
                                setOrderItems((prevState) => {
                                    return {
                                        ...prevState,
                                        order: {
                                            ...prevState.order,
                                            peg_link: e.target.value
                                        }
                                    };
                                });
                            }}
                            required
                            className='profile-textfield' />
                    </div>
                </div>
                <div className='form1-footer'>
                    <Link to='/terms-and-conditions' className="rounded-pill btn btn-info fw-bold nav-hover">Back</Link>
                    <button className="rounded-pill btn btn-danger fw-bold nav-hover" onClick={handleCancel}>Cancel Order</button>
                    <Link to='/order-form-2' className="rounded-pill btn btn-info fw-bold nav-hover">Next</Link>
                </div>
            </form>
        </>
    );
}

export default OrderForm1;