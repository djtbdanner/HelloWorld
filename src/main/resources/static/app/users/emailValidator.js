System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var EmailValidator;
    return {
        setters:[],
        execute: function() {
            EmailValidator = (function () {
                function EmailValidator() {
                }
                // static shouldBeUnique(control:Control){
                //     return new Promise((resolve, reject) =>{
                //         setTimeout(function(){
                //             if (control.value == "mosh"){
                //                 resolve({ shouldBeUnique:true });
                //             }
                //             resolve( null );
                //         }, 1000);
                //      });
                // }
                EmailValidator.isInvalidEmailAddress = function (control) {
                    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if (!re.test(control.value)) {
                        return { invalidEmailAddress: true };
                    }
                    return null;
                };
                return EmailValidator;
            }());
            exports_1("EmailValidator", EmailValidator);
        }
    }
});
//# sourceMappingURL=emailValidator.js.map