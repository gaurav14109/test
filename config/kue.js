const kue = require('kue')
const queue = kue.createQueue();
module.exports = queue;

//We can set the priority for the notification can the thing that matter should come first.
//Job which has be to immediate can be send to CPU and rest can set in queue for later process we will put email in queue.This queue is maintained 
//by a server i.e is the redis server.
//Intsall kue
//Redis server
//Kue keeps the job which are executed by the workers 
//In queue we can set the priority with kue worker worker is there for every kue
//Kues are maintained in json format in redis server which aintained data in ram
//Redis server maintains the queue thse queue are defined by worker (kue)//delayed jobs
//setup kue
//Worker setup kue is grup of similar job like email in one 