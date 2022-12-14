import Axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './InvitationDraft.css';

function InvitationDraftStaff() {
    const navigate = useNavigate();

    const location = useLocation();
    const {orderID} = location.state;

    const [fileData, setFileData] = useState(null);
    const [path, setPath] = useState('');
    const [text, setText] = useState('');
    // const [orderID, setOrderID] = useState('a7a40b63-dbe8-4bcc-bec0-5111b86588af');

    useEffect( () => {
        const showImage = async () => {
                await Axios.head(`http://localhost:5000/invite-draft/${orderID}.png`)
                    .then(res => {
                        console.log(res);
                        setPath(`http://localhost:5000/invite-draft/${orderID}.png`);
                        
                    })
                    .catch(err => {
                        setText('No Invite Draft Uploaded Yet');
                        console.log(err)
                    })
            }
            showImage();
    } ,[])

    const imageChangeHandler = (e) => {
        setFileData(e.target.files[0]);
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();

        const blob = fileData.slice(0, fileData.size, 'image/png');;
        const renamedFile = new File([blob], `${orderID}.png`, {type: 'image/png'});

        // Handle File Data from the state Before Sending
        const data = new FormData();

        data.append("invite_draft", renamedFile);

        Axios.post('http://localhost:5000/api/order/update-invite-draft',
            data
        ).then((res) => {
            console.log("success");
            console.log(res.data.path); //path of image: image\filename.jpg
            setPath(`http://localhost:5000/invite-draft/${orderID}.png?${Date.now()}`);
            setText('');
            //showImage();
        }).catch(err => {
            console.log(err)
        });
    };

    return (
        <div className='invitation-draft-frame'>
            <h1 className='invitation-draft-h1'>Invitation Draft for Order {orderID.slice(-4)}</h1>
            <div className='invitation-draft-inner-frame'>
                 {path && <img className='draft-img' src={path}/>}
                 {text && <p>{text}</p>}
            </div>

            {/* <div className='.order-being-confirmed-footer'> */}
                <form className='invitationdraft_form' onSubmit={onSubmitHandler}>
                    {/* Choose File button */}
                    <button className='button-Filechosen btn-info fw-bold nav-hover'><input type="file" onChange={imageChangeHandler} /></button>
                    <button className='button-updatepicture btn-info fw-bold nav-hover' type="submit">Update Picture</button>
                    <button className='button-backinvitation btn-info fw-bold nav-hover' onClick={() => navigate(-1)}>Back</button>

                </form>
                {/* <button className='button'>Update Picture</button> */}
            {/* </div> */}
        </div>
    );
}

export default InvitationDraftStaff;