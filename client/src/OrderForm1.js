import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './OrderForm1.css';

const OrderForm1 = ({ order, setOrder, items_array, setItems_array }) => {
    const [isIncomplete, setIsIncomplete] = useState(true)
    //set input fields for text
    useEffect(() => {
        setOrder((prevState) => {
            return {
                ...prevState,
                invite_type: localStorage.getItem("typeInput"),
                material: localStorage.getItem("materialInput"),
                motif: localStorage.getItem("motifInput"),
                event_date: localStorage.getItem("dateInput"),
                invite_title: localStorage.getItem("titleInput"),
                font_style: localStorage.getItem("fontInput"),
                content_link: localStorage.getItem("contentInput"),
                num_of_invites: localStorage.getItem("numberInput"),
                peg_link: localStorage.getItem("pegInput"),
            };
        });
    }, []);

    useEffect(() => {
        console.log(order)

        if (order.content_link === '' || order.event_date === '' || order.font_style === '' || order.invite_title === '' || order.invite_type === '' || order.material === '' || order.motif === '' || order.num_of_invites === 0 || order.peg_link === '') {
            setIsIncomplete(true);
        }
        else if (order.content_link !== '' && order.event_date !== '' && order.font_style !== '' && order.invite_title !== '' && order.invite_type !== '' && order.material !== '' && order.motif !== '' && order.num_of_invites !== 0 && order.peg_link !== '') {
            setIsIncomplete(false);
        }
        //console.log(isIncomplete)
    }, [order]);

    const handleIncompleteInfo = (e) => {
        if (isIncomplete === true) {
            window.alert('Incomplete form fields')
            e.preventDefault();
        }
    }

    const handleInviteType = (e) => {
        setOrder((prevState) => {
            return {
                ...prevState,
                invite_type: e.target.id
            };
        });
        localStorage.setItem("typeInput", e.target.id);
    }
    const handleMaterial = (e) => {
        //console.log(`array:${items_array}`);
        setOrder((prevState) => {
            return {
                ...prevState,
                material: e.target.id
            };
        });

        if (e.target.id === 'acrylic' && items_array.findIndex(object => object.item_id === 'm2') === -1) {
            setItems_array(prevState =>
                [...prevState, {
                    item_id: 'm2',
                    item_name: 'acrylic',
                    price: 180
                }],
                setItems_array(items_array.map(obj => {
                    if (obj.item_id === 'm1') {
                        return {
                            ...obj,
                            quantity: 3
                        };
                    }
                    return obj;
                })));
            console.log(items_array);
        }
        localStorage.setItem("materialInput", e.target.id);
    }

    return (
        <>
            <form className='main-order-frame1'>
                <h3 className='category-h3'>TYPE OF INVITE</h3>
                <div className='boxes'>
                    <div className='square-button-with-text'>
                        <label>
                            <input type='radio' checked={order.invite_type === 'wedding' ? true : false} id='wedding' name='invite-type' value='wedding' className='form1-radio' required onChange={handleInviteType} />
                            <img className='radio-img' src={process.env.PUBLIC_URL + '/images/wedding.jpg'} alt="wedding"></img>
                        </label>
                        <h5>Wedding</h5>
                    </div>
                    <div className='square-button-with-text'>
                        <label>
                            <input type='radio' checked={order.invite_type === 'birthday' ? true : false} id='birthday' name='invite-type' value='birthday' className='form1-radio' onChange={handleInviteType} />
                            <img className='radio-img' src={process.env.PUBLIC_URL + '/images/birthday.jpg'} alt="birthday"></img>
                        </label>
                        <h5>Birthday</h5>
                    </div>
                    <div className='square-button-with-text'>
                        <label>
                            <input type='radio' checked={order.invite_type === 'debut' ? true : false} id='debut' name='invite-type' value='debut' className='form1-radio' onChange={handleInviteType} />
                            <img className='radio-img' src={process.env.PUBLIC_URL + '/images/debut.jpg'} alt="debut"></img>
                        </label>
                        <h5>Debut</h5>
                    </div>
                    <div className='square-button-with-text'>
                        <label>
                            <input type='radio' checked={order.invite_type === 'other' ? true : false} id='other' name='invite-type' value='other' className='form1-radio' onChange={handleInviteType} />
                            <img className='radio-img' src={process.env.PUBLIC_URL + '/images/other.jpg'} alt="other"></img>
                        </label>
                        <h5>Other</h5>
                    </div>
                </div>
                <h3 className='category-h3'>MATERIAL</h3>
                <div className='boxes'>
                    <div className='square-button-with-text'>
                        <label>
                            <input type='radio' checked={order.material === 'paper' ? true : false} id='paper' name='material' value='30' className='form1-radio' required onChange={handleMaterial} />
                            <img className='radio-img' src={process.env.PUBLIC_URL + '/images/paper.jpg'} alt="paper"></img>
                        </label>
                        <h5>Paper</h5>
                    </div>
                    <div className='square-button-with-text'>
                        <label>
                            <input type='radio' checked={order.material === 'acrylic' ? true : false} id='acrylic' name='material' value='180' className='form1-radio' onChange={handleMaterial} />
                            <img className='radio-img' src={process.env.PUBLIC_URL + '/images/acrylic.jpg'} alt="acrylic"></img>
                        </label>
                        <h5>Acrylic</h5>
                    </div>
                </div>
                <div className="invite-details">
                    <div className='label-textfield'>
                        <h5>Date of Event</h5>
                        <input
                            required
                            value={order.event_date}
                            type='date'
                            id="event_date"
                            autoComplete="off"
                            onChange={(e) => {
                                setOrder((prevState) => {
                                    return {
                                        ...prevState,
                                        event_date: e.target.value
                                    };
                                });
                                localStorage.setItem("dateInput", e.target.value);
                            }}

                            className='profile-textfield' />
                    </div>
                    <div className='label-textfield'>
                        <h5>Motif</h5>
                        <input
                            required
                            value={order.motif}
                            type='text'
                            id="motif"
                            autoComplete="off"
                            onChange={(e) => {
                                setOrder((prevState) => {
                                    return {
                                        ...prevState,
                                        motif: e.target.value
                                    };
                                });
                                localStorage.setItem("motifInput", e.target.value);
                            }}

                            className='profile-textfield' />
                    </div>
                    <div className='label-textfield'>
                        <h5>Invitation Title</h5>
                        <input
                            required
                            value={order.invite_title}
                            type='text'
                            id="invitation_title"
                            autoComplete="off"
                            onChange={(e) => {
                                setOrder((prevState) => {
                                    return {
                                        ...prevState,
                                        invite_title: e.target.value
                                    };
                                });
                                localStorage.setItem("titleInput", e.target.value);
                            }}

                            className='profile-textfield' />
                    </div>
                    <div className='label-textfield'>
                        <h5>Font Style</h5>
                        <input
                            required
                            value={order.font_style}
                            type='text'
                            id="font"
                            autoComplete="off"
                            onChange={(e) => {
                                setOrder((prevState) => {
                                    return {
                                        ...prevState,
                                        font_style: e.target.value
                                    };
                                });
                                localStorage.setItem("fontInput", e.target.value);
                            }}

                            className='profile-textfield' />
                    </div>
                    <div className='label-textfield'>
                        <h5>Content Link</h5>
                        <input
                            required
                            value={order.content_link}
                            type='url'
                            id="content_link"
                            autoComplete="off"
                            onChange={(e) => {
                                setOrder((prevState) => {
                                    return {
                                        ...prevState,
                                        content_link: e.target.value
                                    };
                                });
                                localStorage.setItem("contentInput", e.target.value);
                            }}

                            className='profile-textfield' />
                    </div>
                    <div className='label-textfield'>
                        <h5>Number of Invites</h5>
                        <input
                            required
                            value={order.num_of_invites}
                            type='number'
                            min='1'
                            id="invite_number"
                            autoComplete="off"
                            onChange={(e) => {
                                setOrder((prevState) => {
                                    return {
                                        ...prevState,
                                        num_of_invites: parseInt(e.target.value)
                                    };
                                });
                                localStorage.setItem("numberInput", e.target.value);
                            }}

                            className='profile-textfield' />
                    </div>
                    <div className='label-textfield'>
                        <h5>Peg Link</h5>
                        <input
                            required
                            value={order.peg_link}
                            type='url'
                            id="peg_link"
                            autoComplete="off"
                            onChange={(e) => {
                                setOrder((prevState) => {
                                    return {
                                        ...prevState,
                                        peg_link: e.target.value
                                    };
                                });
                                localStorage.setItem("pegInput", e.target.value);
                            }}

                            className='profile-textfield' />
                    </div>
                </div>
                <div className='form1-footer'>
                    <Link to='/form/terms-and-conditions' className="rounded-pill btn btn-info fw-bold nav-hover">Back</Link>
                    <Link to='/form/order-form-2' onClick={handleIncompleteInfo} className="rounded-pill btn btn-info fw-bold nav-hover">Next</Link>
                </div>
            </form>
        </>
    );
}

export default OrderForm1;