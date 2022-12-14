const db = require('../database/db');
const uuid = require('uuid');

//my orders for customers
exports.custOrders = async (custId) => {
    await db.transaction( async (trx) => {
        orders = await trx("order")
                        .select("order_id","order_status")
                        .where({user_id: custId});
    });

    return orders;
}

//orders list for staff
exports.currentOrders = async () => {
    await db.transaction( async (trx) => {
        orders = await trx("order AS o")
                    .join("users AS u","o.user_id","=","u.user_id")
                    .select("o.order_id","u.full_name","o.date_ordered","o.order_deadline","o.invite_type","o.motif","o.num_of_invites","o.order_status")
                    .whereNotIn("o.order_status",["Completed","Canceled"]);

    });

    return orders;
}

//compute price of order
exports.computePrice = async (itemsArray) => {

    let unitPrice=0;

    await db.transaction( async (trx) => {
        for( let x in itemsArray){

            price = await trx("items")
            .select('price')
            .where({ item_id: itemsArray[x].item_id});

            if('quantity' in itemsArray[x] && itemsArray[x].quantity != null){
                console.log(`quantity obj \n${JSON.stringify(itemsArray[x])}`);
                unitPrice += price[0].price*itemsArray[x].quantity;
            }else{
                console.log(`no quantity obj \n${JSON.stringify(itemsArray[x])}`);
                unitPrice += price[0].price;}

        }}); 
    console.log(unitPrice);
    return unitPrice;
};

const isRush = (date) => {
    const today = new Date();
    const deadline = new Date(date.slice(0,10));

    let time_diff = deadline.getTime() - today.getTime();
    let days = time_diff / (1000 * 3600 * 24);

    //subtract one weekend day for every week
    let weeks = Math.floor(days / 7);
    days = days - weeks;

    // Handle special cases
    let startDay = today.getDay();
    let endDay = deadline.getDay();

    // Remove weekend not previously removed.   
    if (startDay - endDay > 1){ days = days--; }

    // Remove start day if span starts on Sunday but ends before Saturday
    if (startDay == 0 && endDay != 6){ days = days--; }

    // Remove end day if span ends on Saturday but starts after Sunday
    //if (endDay == 6 && startDay != 0){ days = days-- }

    if(days<15){ return true }else{ return false }

}

//create new order
exports.createOrder = async (order, itemsArray, paymentMethod) => {
    if ('material_price' in order) {
        delete order.material_price;
    }
    await db.transaction(async (trx) => {
        order.order_id = uuid.v4();
        await trx("order").insert(order);
    });

    itemsArray.forEach((item) => {
        item.order_id = order.order_id;
        delete item.price;
        delete item.item_name;
    });

    await db.transaction(async (trx) => {
        await trx("order_details").insert(itemsArray);
    })

    //compute price and/or additional fees

    //unit price
    const unitPrice = await this.computePrice(itemsArray);

    
    //is number of order less than 30
    let lessMin=0,rush = 0;
    if(order.num_of_invites<30){ lessMin =1500; }

    const partialTotal = unitPrice*order.num_of_invites+lessMin;

    //is order a rush
    if(isRush(order.order_deadline)){ rush = partialTotal*0.4; }

    await db.transaction(async (trx) => {
        await trx("billing_info").insert(
            {OP_id: uuid.v4(), user_id: order.user_id, order_id: order.order_id, less_min_fee:lessMin, rush_fee:rush, unit_cost: unitPrice, sub_total: partialTotal+rush, payment_method: paymentMethod}
        );
    });

    return order.order_id;

};

//find if order exists
exports.findOrder = async (orderId) => {
    await db.transaction(async (trx) => {
        order = await trx("order")
                    .select('*')
                    .where({ order_id: orderId});

    });

    return order[0];
};

//view order details
exports.viewOrder = async (order) => {

    await db.transaction(async (trx) => {
        orderDetails = await trx("order_details AS od")
        .join("items AS i", "od.item_id","=","i.item_id")
        .select('*')
        .where({ order_id: order.order_id});

        billingInfo = await trx("billing_info")
                        .select('*')
                        .where({ order_id: order.order_id});
        userInfo = await trx("users")
                        .select('*')
                        .where({ user_id: order.user_id});
    
    });

    //add query for order purchase details

    return {order:order, order_details: orderDetails, billing_info: billingInfo[0], user_info:userInfo[0]};

}

//update order details, general func for order details, additional details, order, and purchase
exports.updateOrder = async (OrderId,orderData) => {
    //delete orderData.order_id;
    //console.log(`data: ${JSON.stringify(id)}`);

    await db.transaction( async(trx) => {
        await trx("order")
                    .update(orderData)
                    .where(OrderId);
        
    })
};

exports.updateOrderDetails = async (orderId,itemsArray) => {
    //delete orderData.order_id;
    //console.log(`data: ${JSON.stringify(id)}`);
    //console.log(orderId);
    itemsArray.forEach((item) => {
        item.order_id = orderId.order_id;
        delete item.selected;
        delete item.price;
        delete item.item_name;
    });

    await db.transaction(async (trx) => {
        await trx("order_details").where(orderId).del();
        await trx("order_details").insert(itemsArray);
    })

    const newUnitCost = await this.computePrice(itemsArray);


    await db.transaction(async (trx) => {
        amountInfo = await trx("billing_info")
                    .select("unit_cost","rush_fee","sub_total")
                    .where(orderId);
        //console.log(`new unit cost ${newUnitCost}`);
        let prevUnitCost = amountInfo[0].unit_cost; 
        let prevSubTotal = amountInfo[0].sub_total;
        let prevRushFee = amountInfo[0].rush_fee;

        let partialTotal = (prevSubTotal-prevRushFee)-prevUnitCost+newUnitCost;
        prevRushFee = partialTotal*0.4;

        await trx("billing_info")
            .update({unit_cost:newUnitCost, sub_total:partialTotal+prevRushFee, rush_fee:prevRushFee})
            .where(orderId);
    });

    // await db.transaction(async (trx) => {

    // });
};


exports.orderHistory = async () => {
    await db.transaction( async (trx) => {
        order = await trx("order AS o")
                    .join("users AS u","o.user_id","=","u.user_id")
                    .select("u.user_id","u.full_name","o.order_id","o.date_ordered", "o.order_status")
                    .whereIn("o.order_status",["Completed","Canceled"]);

    });
    return order;
};

exports.logEntry = async (entryData) => {
    await db.transaction( async(trx) => {
        entryData.log_id = uuid.v4();
        await trx("order_log")
                    .insert(entryData);
        entry = await trx("order_log")
                    .select('*')
                    .where({log_id: entryData.log_id});
        logs = await trx("order_log")
                .select('*')
                .where({ order_id: entryData.order_id});
    });

    if(logs.length>1){
        revFee = (logs.length-1)*1500;
        await db.transaction( async(trx) => {
            const amountInfo = await trx("billing_info")
                        .select("total_revision_fee","rush_fee","sub_total")
                        .where({ order_id: entryData.order_id});

            let prevRevFee = amountInfo[0].total_revision_fee; 
            let prevSubTotal = amountInfo[0].sub_total;
            let prevRushFee = amountInfo[0].rush_fee;
            if(prevRushFee==0){
                await trx("billing_info")
                .update({total_revision_fee:(prevRevFee ? prevRevFee+1500 : 1500), sub_total:prevSubTotal+1500})
                .where({ order_id: entryData.order_id});
            }else{
                let partialTotal = (prevSubTotal-prevRushFee)+1500;
                prevRushFee = partialTotal*0.4;
                await trx("billing_info")
                .update({total_revision_fee:(prevRevFee ? prevRevFee+1500 : 1500), sub_total:partialTotal*1.4, rush_fee:prevRushFee})
                .where({ order_id: entryData.order_id});
            }
            
        });
    }


    return entry;
};

//view list of entry documentation
exports.logEntryList = async (orderId) => {

    await db.transaction(async (trx) => {
        entries = await trx("order_log")
        .select('*')
        .where({ order_id: orderId});
    });

    return entries;

}

