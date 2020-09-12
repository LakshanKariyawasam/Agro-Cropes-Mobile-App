import { Injectable } from "@angular/core";

@Injectable()
export class GMailService {

    sendMail(to, subject, content) {
        return new Promise(function (fulfill, reject) {

            // const nodeMailer = require('nodemailer');

            // const transporter = nodeMailer.createTransport({
            //     // host: 'smtp.gmail.com',
            //     // port: 465,
            //     // secure: true,
            //     // auth: {
            //     //     user: 'abc@gmail.com',
            //     //     pass: '12346788'
            //     // }
            //     service: 'gmail',
            //     auth: {
            //         user: 'krasikalakshan@gmail.com',
            //         pass: 'Rlk@1415KA4722'
            //     }
            // });

            // const mailOptions = {
            //     from: 'krasikalakshan@gmail.com',
            //     to: to,
            //     subject: subject,
            //     text: content
            //     // ,
            //     // attachments: [{
            //     //     'path': 'Test_Report/htmlReport.html',
            //     // }]
            // };

            // transporter.sendMail(mailOptions, function (error, info) {
            //     if (error) {
            //         reject(error);
            //         return console.log(error);
            //     }
            //     console.log('Mail sent: ' + info.response);
            //     fulfill(info);
            // });
        });
    }
}