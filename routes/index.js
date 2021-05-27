const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');


const user = require('../models/user')
const forgot_password = require('../models/forgot_password')
const crypto = require('crypto');
const nodeMailer = require('../config/nodemailer')

console.log('router loaded');


router.get('/', homeController.home);
router.use('/users', require('./users'));//getting by clicking the signup link and get to render the page
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));


router.use('/api', require('./api/v1/index'));
router.use('/likes',require('./toggle'))

// for any further routes, access from here
// router.use('/routerName', require('./routerfile));

router.get('/forgot',(req, res)=>{

    res.render('forgot',{
        title:'Forgor password'
    })

})

router.post('/forgot',async (req, res)=>{
    
    let token = crypto.randomBytes(20).toString('hex');

    let User = await user.findOne({email:req.body.email})

    if(!User){
        console.log('Invalid Email');
        return res.redirect('/forgot');
    }
    else{
    forgot_password.create({
        user:User._id,
        token:token,
        isValid:true
    },(err, token_created)=>{

        if(err){
            console.log('err',err)
        }
        console.log(token_created)
        req.flash('success','Link has been sent to your mail');
         nodeMailer.transporter.sendMail({
            from: 'gauravgusain48@gmail.com', // sender address
            to: User.email, // list of receivers
            subject: 'Reset Password', // Subject line
            text: 'http://' + req.headers.host + '/reset/' + token + '\n\n', // plain text body
        },(err,info)=>{
            if(err){console.log(err); return;}
        console.log(info);
        return res.redirect('/forgot');
        });
        
    });
}
})

router.get('/reset/:token',(req,res)=>{
    let token = req.params.token;
    console.log('Welcome to reset Page',token);
    forgot_password.findOne({token:token},(err,token_data)=>{//Afetr find token data is present in token_data
        if(err){console.log(err); return;}
        console.log(token_data);
        if(token_data.isValid){
            token_data.updateOne({isValid:false},(err,info)=>{

                console.log(token_data)
                return res.redirect('/changepassword/'+token_data.user)

           });
      
        
        }
        else{
            req.flash('error','Link has Experied')
            return res.redirect('/users/sign-in');
        }
    })
  
});

router.get('/changePassword/:user_id',(req,res)=>{

    let User = req.params.user_id
    console.log(User)
    return res.render('changePassword',{
        title:'Change Password',
        user:User
    })

})

router.post('/change_password/:id',(req,res)=>{

    let id = req.params.id;  
    console.log(id)

    user.findOne({_id:id},(err, user)=>{
        if(err){console.log(err);return;}
        
        if(req.body.password != req.body.r_password)
        {
            req.flash('error','Password mismatch')
            return res.redirect('/changePassword/'+id)
        
        }

        user.update({password:req.body.password},(err, info)=>{
            if(err){console.log(err);return;}
            req.flash('success','Password Updated Successfully')
            
            return res.redirect('/')

        })

    })


})
module.exports = router;