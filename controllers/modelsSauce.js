
  const mongoose = require('mongoose');
  const modelsSauce = require('../models/modelsSauce');
  const fs = require('fs');
  const { post } = require('../routes/user');
const { cpuUsage } = require('process');

  exports.modifySauce = (req, res, next) => {
    const thingObject = req.file ?
      {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body };
    modelsSauce.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  };

  exports.likeSauce = (req, res, next) => {
    console.log('POST LIKE ' + req.params.id + '- ' + req.body.userId +  ' - ' + req.body.like )
    modelsSauce.findById(req.params.id).then(sauce =>{ 
     
      if(req.body.like < 0){      

        if(sauce.usersDisliked.length != 0){ 

          console.log('USERD > 0 ACTIVATED ')
          sauce.usersDisliked.forEach(user => 
            { console.log('USER ICI  : ' + user.id); if(user.indexOf(req.body.userId) != -1) { 

              console.log('USER ALREADY DISLIKED')
                         
               } 
              console.log('NOT FOUND USER')            
          
            }
          ) 
          let arrayDisliked = sauce.usersDisliked;
          arrayDisliked.push(req.body.userId);
          let dislikeUp = ++sauce.dislikes;          
  
          modelsSauce.updateOne({_id: req.params.id},{

            dislikes: dislikeUp,          
            usersDisliked: arrayDisliked
      
        })
        .then(() => res.status(200).json({message: 'like modifié'}))
        .catch(err => res.status(418).json({message: err}))
     ;     

          console.log(sauce.usersDisliked , 'USERS +1 disliked'); 
          console.log(sauce.usersDisliked.length + 'DISLIKE', sauce.usersLiked.length + 'Liked ')

          return console.log('USER DISLIKED AND ADDED' + sauce); 


        }

        console.log('USERD = 0 ACTIVATED ')
        let arrayDisliked = sauce.usersDisliked;
        arrayDisliked.push(req.body.userId);
        let dislikeUp = ++sauce.dislikes;
        

        modelsSauce.updateOne({_id: req.params.id},{
          
          dislikes: dislikeUp,          
          usersDisliked: arrayDisliked
    
      }).then(() => res.status(200).json({message: 'like modifié'}))
      .catch(err => res.status(418).json({message: err}))
        ;
   

        console.log(sauce.usersDisliked);
        console.log(sauce.usersDisliked.length + 'DISLIKE', sauce.usersLiked.length + 'Liked ');    
        console.log(sauce)

    }
      if(req.body.like > 0){

        // if(sauce.usersDisliked.length != 0){ 
        //   sauce.usersDisliked.forEach(user => 
        //     { console.log('USER ICI  : ' + user.id); if(user.indexOf(req.body.userId) != -1) { 

        //       console.log('USER ALREADY DISLIKED');
        //       console.log('Before DELETE : ' +sauce.usersDisliked.length);
        //       delete user;
        //       console.log('USER DELETED : ' +sauce.usersDisliked.length);               
        //        } 

        //       console.log('NOT FOUND USER');         
            
        //     }
        //   ) 
        
          // console.log(sauce.usersLiked , 'USERS +1 Liked'); 
          // console.log(sauce.usersDisliked.length + 'DISLIKE', sauce.usersLiked.length + 'Liked ')


        // }

        if(sauce.usersLiked.length != 0){ 
          sauce.usersLiked.forEach(user =>  
            {console.log('USER ICI  : ' + user.id); if(user.indexOf(req.body.userId) != -1) { 

              console.log('USER ALREADY LIKED')                           
               } 
              console.log('NOT FOUND USER')            
            }
          ) 

          let likeUp = ++sauce.likes;
          let arraysLiked = sauce.usersLiked;
          arraysLiked.push(req.body.userId);

          modelsSauce.updateOne({_id: req.params.id},{
          
            likes: likeUp,          
            usersLiked: arraysLiked
      
        }).then(() => res.status(200).json({message: 'like modifié'}))
        .catch(err => res.status(418).json({message: err}))
          ;
     
          
          sauce.usersLiked.push(req.body.userId)
          
          
          return console.log('USER LIKED AND ADDED', sauce);
        }
        let likeUp = ++sauce.likes;
        let arraysLiked = sauce.usersLiked;
        arraysLiked.push(req.body.userId);

        modelsSauce.updateOne({_id: req.params.id},{
        
          likes: likeUp,          
          usersLiked: arraysLiked
    
        }).then(() => res.status(200).json({message: 'like modifié'}))
        .catch(err => res.status(418).json({message: err}))
          ;        

        console.log(sauce.usersDisliked);
        console.log(sauce.usersDisliked.length + 'DISLIKE', sauce.usersLiked.length + 'Liked ');        
        console.log(sauce)

      }

      if(req.body.like == 0) {

        sauce.usersLiked.forEach(user => 
          {if(user.indexOf(req.body.userId) != -1) {             
            console.log('USER ALREADY LIKED');
            console.log('REQ USER 0  : ' + user);
            let arrayLiked = sauce.usersLiked;
            arrayLiked.splice(req.body.userId,1);
            let likeUp = --sauce.likes;
            modelsSauce.updateOne({_id: req.params.id},{
          
              likes: likeUp,          
              usersLiked: arrayLiked
        
          }).then(() => res.status(200).json({message: 'like modifié'}))
          .catch(err => res.status(418).json({message: err}))
                       
             } 
            console.log('NOT FOUND USER')            
        
          }
        ) 

        sauce.usersDisliked.forEach(user => 
          {if(user.indexOf(req.body.userId) != -1) {             
            console.log('USER ALREADY DISLIKED');
            console.log('REQ USER 0  : ' + user);
            let arrayDisliked = sauce.usersDisliked;
            arrayDisliked.splice(req.body.userId,1);
            let dislikeUp = --sauce.dislikes;
            modelsSauce.updateOne({_id: req.params.id},{
          
              dislikes: dislikeUp,          
              usersDisliked: arrayDisliked
        
          }).then(() => res.status(200).json({message: 'like modifié'}))
          .catch(err => res.status(418).json({message: err}))
                       
             } 
            console.log('NOT FOUND USER')            
        
          }
        ) 
        

        console.log('REQ BODY 0 ', sauce);

      }
      console.log(sauce.usersDisliked.length + 'DISLIKE', sauce.usersLiked.length + 'Liked ');
        // console.log('Disliked INDEX' + JSON.stringify(sauce.usersDisliked).indexOf(req.body.userId));
        // console.log('Liked INDEX' + JSON.stringify(sauce.usersLiked).indexOf(req.body.userId));
        
    
    })
  
    
  
  }

  exports.getAllSauce = (req, res, next) => {
    modelsSauce.find().then(
      (things) => {
        res.status(200).json(things);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };

  exports.createSauce = (req, res, next) => {
    console.log('POST ');
    console.log(req.body.sauce);
    
    const thingObject = JSON.parse(req.body.sauce);
    
    const thing = new modelsSauce({
      ...thingObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,            
      dislikes:'0',
      likes:'0',
      usersLiked:[],
      usersDisliked:[]

    });
    console.log(thing); 
    console.log(req.file);   

    thing.save()
      .then(() => { res.status(201).json({ message: 'Objet enregistré !'})})
      .catch((err)=> {res.status(418).json({message: 'Impossible d ajouter la sauce!'})});;
  };
  
  exports.deleteSauce = (req, res, next) => {
    modelsSauce.findOne({ _id: req.params.id })
      .then(thing => {
        const filename = thing.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            modelsSauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
            .catch(error => res.status(400).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }));
  };

  exports.getOneSauce = (req, res, next) => {
    modelsSauce.findOne({
      _id: req.params.id
    }).then(
      (thing) => {
        res.status(200).json(thing);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  };