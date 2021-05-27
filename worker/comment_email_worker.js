const queue = require('../config/kue')

const commentMailer = require('../mailers/comment_mailer')

//Every worker has a process function

queue.process('emails', function(job, done){//emails same as emails in create queue
    console.log('Processing Worker', job.data)
    commentMailer.newComment(job.data)//this call comment controller Creating working for comment

    done();

});