import {Control} from 'angular2/common'

export class EmailValidator {

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

    static isInvalidEmailAddress(control: Control) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(control.value)) {
            return { invalidEmailAddress: true };
        }
        return null;

    }
}