const service = require('../services/userServices');

//test
exports.get = (req,res) =>{
    res.send('wassup');
};

//CREATE NEW CUSTOMER
exports.createCust = async (req, res, next) => {
    try{
        //console.log(`req.body is: ${JSON.stringify(req.body)}`);
        const userData = req.body;
        const existingUser = await service.findUser(userData.email);

        if(existingUser){
            //console.log(existingUser);
            return res.status(400).send({ message:'This email already has an existing account' });
        }
        
        const user = await service.createUser(userData, 'customer');
        next();

    } catch (err){
        console.log(err);
        console.log('error at controller create cust');
        return res.status(400).send({ message:'Failed to create new customer account' });
    }
};

//CREATE NEW STAFF
exports.createStaff = async (req, res) => {
    try{
        //console.log(`req.body is: ${JSON.stringify(req.body)}`);
        const userData = req.body;
        const existingUser = await service.findUser(userData.email);

        if(existingUser){
            //console.log('existingUser');            
            return res.status(400).send({ message:'This email already has an existing account' });
        }

        //var user is not used hnrm should it be returned??? meron na sa req.body ang info tho
        const user = await service.createUser(userData, 'staff');
        return res.status(201).send({ message:'Successfully created new staff account', user_id: user });

    } catch (err){
        console.log(err);
        console.log('error at controller create staff');
        return res.status(400).send({ message:'Failed to create new staff account' });
    }
};

//VIEW USER ACC INFO
exports.viewUser = async (req, res) => {
    try {
        const userID=req.query.user_id;
        // if(req.user){ id=req.user.user_id;}
        // else if(req.query){id=req.query.user_id;}
        // else{id=req.body.user_id;}
        
        console.log(`ID: ${userID}`);
        const user = await service.findUserbyId(userID); //coordinate with fat on this
        console.log(`User: \n${user}`);
        if(!user){
            return res.status(400).send({ message:'This user does not exist'});
        }
        //console.log(user);
        return res.status(200).send({ message:'Successfully retrieved user account info' , user});

    } catch (err) {
        console.log(err);
        console.log('error at controller view user');
        return res.status(400).send({ message:'Failed to retrieve user account info' });
    }
}

//UPDATE USER ACC INFO
exports.updateUser = async (req, res) => {
    try {
        const userData = req.body; //how will customer send id??? also user var not used
        const user = await service.updateUser(userData); //coordinate with fat on this
        return res.status(200).send({ message:'Successfully updated user account info' , user});
        
    } catch (err) {
        console.log(err);
        console.log('error at controller update user');
        return res.status(400).send({ message:'Failed to update user account info' });
    }
}

//DELETE USER ACC INFO
exports.deleteUser = async (req, res) => {
    try {
        console.log(JSON.stringify(req.body));
        const user = await service.deleteUser(req.body.user_id);
        return res.status(200).send({ message:'Successfully deleted user account' , user});

    } catch (err) {
        console.log('error at controller delete user');
        console.log(err);
        return res.status(400).send({ message:'Failed to delete user account' });

    }
}

//VIEW STAFF LIST
exports.viewStaffList = async (req, res) => {
    try {
        const staffList = await service.viewStaffList();
        return res.status(200).send({ message:'Successfully retrieved staff list' , staff_list});
        
    } catch (err) {
        console.log('error at controller view staff list');
        return res.status(400).send({ message:'Failed to retrieve staff list' });
    }
}

