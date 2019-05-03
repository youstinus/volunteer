const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});
admin.initializeApp();

/**
* Here we're using Gmail to send 
*/
let transporter = nodemailer.createTransport( // ''
    {
    service: 'gmail',
    auth: {
        user: functions.config().gmail.email,
        pass: functions.config().gmail.password
    }
});

exports.sendMail = functions.https.onRequest((req: any, res: any) => {

    cors(req, res, () => {
        if (req.method != "POST") {
            res.status(400).send("Why?");
            return;
        }

        // getting dest email by query string
        let dest = req.body.to;
        if(dest == null){
            dest = functions.config().gmail.email;
        }
        let subject = req.body.subject;
        if(subject == null){
            subject = 'No subject';
        }
        let content = req.body.content;
        if(content == null){
            content = 'No content';
        }

        const mailOptions = {
            from: 'Volunteering <' + functions.config().gmail.email + '>', // Something like: Jane Doe <janedoe@gmail.com>
            to: dest,
            subject: subject, // email subject
            //html: `<p style="font-size: 16px;">Tomato test</p><br />` // email content in HTML
            html: content,
            //text: content
        };
  
        // returning result
        return transporter.sendMail(mailOptions, (erro: any, info: any) => {
            if(erro){
                return res.send(erro.toString());
            }
            return res.send(res.body);
        });
    });    
});
