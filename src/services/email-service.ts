import { Injectable } from "@angular/core";

@Injectable()
export class GMailService {

    // const sgMail = require("@sendgrid/mail");
    // sgMail.setApiKey("YOUR_API_KEY");
    
    // templates = {
    //     password_reset_confirm: "d-a02ad738dfc8404c8da016b46a754805",
    //     password_reset: "d-e779dcfad7fb47e7be8d79bdfe75fb0c",
    //     confirm_account: "d-68c570dd120044d894e07566bf951964",
    // };

    // sendMail(data) {
    //     return new Promise(function (fulfill, reject) {
    //         const msg = {
    //             //extract the email details
    //             to: data.receiver,
    //             from: data.sender,
    //             templateId: templates[data.templateName],
    //             //extract the custom fields 
    //             dynamic_template_data: {
    //                 name: data.name,
    //                 confirm_account_url: data.confirm_account__url,
    //                 reset_password_url: data.reset_password_url
    //             }
    //         };
    //         //send the email
    //         sgMail.send(msg, (error, result) => {
    //             if (error) {
    //                 console.log(error);
    //             } else {
    //                 console.log("That's wassup!");
    //             }
    //         });

    //     });
    // }
}