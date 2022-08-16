const express = require('express');
const router = express.Router();
const controller = require('../../controllers/controller');

router.get('/log-in', controller.get);

router.get('/terms-conditions', controller.get);

router.get('/order-form', controller.get);

router.get('/order-pick-up', controller.get);

router.get('/order-shipping', controller.get);

router.get('/confimation', controller.get);

router.get('/confimed-status', controller.get);


router.get('/order-details', controller.get);

router.get('/invite-draft', controller.get);

router.get('/my-orders', controller.get); //customer order list

router.get('/order-documentation', controller.get);




