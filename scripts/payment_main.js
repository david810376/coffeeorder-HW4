(function (window){
    'use strict';
    var PAYMEAT_THANK = '[data-payment-thank="thank"]';
    var PAYMENT_FORM = '[data-payment-order="form"]';
    var App = window.App;
    var PaymentHandler = App.PaymentHandler;

    var formHandler = new PaymentHandler(PAYMENT_FORM);
    formHandler.addSubmitHandler(PAYMEAT_THANK);

})(window);