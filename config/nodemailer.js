const nodemailer = require('nodemailer');
const ejs = require('ejs')
const path = require('path')
//For nodemailer requires
//nodemailer,config,mailer and templates
let transporter = nodemailer.createTransport({

    service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:'gauravgusain48',
        pass:'deveshwari141097'
    }
});

//Defining Ejs rendering template that we will pass with email.
let renderedTemplate = (data, relativePath)=>{

    let mailHtml;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers',relativePath),
        data,
        function(err, template){

            if(err)
            {
                console.log(err);
                return;
            }
            mailHtml = template;
        }
    )

    return mailHtml;

}

module.exports= {
    transporter:transporter,
    renderedTemplate:renderedTemplate
}