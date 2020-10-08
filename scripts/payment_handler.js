
(function (window){
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function FormHandler(selector){
        if(!selector){
        throw new Error('No selector provided');
        }

        this.$formElement = $(selector);
    if (this.$formElement.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
    }

    FormHandler.prototype.addSubmitHandler = function(PAYMEAT_THANK){
        console.log('Setting submit handler for form');
        this.$formElement.on('submit', function(event) {
            event.preventDefault();

            var data = {};
            $(this).serializeArray().forEach(function(item) {
                data[item.name] = item.value;
                console.log(item.name + ' is ' + item.value);
              });

              var $div = $('<div></div>', {
                'id': 'div',
                'class': 'modal',
                'modal': 'open'
              });

              var paymentdetail = 'Thank you for your payment, ' + data['title'] + ' ' + data['username'];
              $div.append(paymentdetail);
            

            });
    };



    App.PaymentHandler = FormHandler;
    window.App = App;

})(window);
