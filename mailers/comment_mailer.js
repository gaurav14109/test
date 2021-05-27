const nodeMailer = require('../config/nodemailer')

//Callback is to check if there is any error if no error then move forward and find the comment rendering with comment data passing 
//the commetn data. redering to the page
exports.newComment = (comment)=>{
    let htmlString = nodeMailer.renderedTemplate({comment:comment},'/comment/comments.ejs')

    console.log('Inside new comment')
    nodeMailer.transporter.sendMail({


        from:"Codeial@sys.in",
        to:comment.user.email,
        subject:"New comment added ",
        html:htmlString
    }, (err,info)=>{
        if(err){console.log(err); return;}
        console.log(info);
        return;
    });

}