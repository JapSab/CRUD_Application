var Userdb = require('../model/model');

// create and save new user

exports.create = async (req, res) => {

    // checking if inputs are filled

   let user = await User.findOne({ email: req.body.email });
   if (user) return res.status(400).send('User already registered');

    // creating user and saving in db

    user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status,
    });



    await user.save()


    return res.send({message: 'User successfully saved!'})
   
    // .save(user)
    // .then(data => {
    //     res.send(data)
    // })
    // .catch( err => {
    //     res.status(500).send({
    //         message: err.message || 'Error occured while creating a user'
    //     });
    // });
}

// retrieve and return all users/ return a single user

exports.find = async (req, res) => {
    const user = await Userdb.find()

    if (user) {
        res.send(user);
    } else {
        res.status(500).send({ message: err.message || 'Error occured while getting user info'});
    }
    
    // .then(user => {
    //     res.send(user)
    // })
    // .catch( err => {
    //     res.status(500).send({ message: err.message || 'Error occured while getting user info'})
    // })
}

// Update user by user id

exports.update = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({message : 'You can not update empty data'});
    }

    const id = req.params.id;

    const user = await Userdb.findByIdAndUpdate(id, req.body, {useFindAndModify: false})

    if (!user){
        res.status(404).send({message: `Cannot update the user with the id: ${id}`})
    } else {
        res.send(user)
    }

    // .then(data => {
    //     if(!data){
    //         res.status(404).send({message: `Cannot update the user with the id: ${id}`})

    //     } else {
    //         res.send(data)
    //     }
    // })
    // .catch( err => {
    //     res.status(500).send({message: 'Error updating user information'})
    // })

}


// delete user by user id

exports.delete = async (req, res) => {
    const id = req.params.id

    const user = await Userdb.findByIdAndDelete(id)
  
    if (!user){
        res.status(404).send({message: `Cannot delete the user with the id: ${id}`});
    } else {
        res.send({ message: 'User successfully deleted.'});
    }

    // .then(data => {
    //     if(!data){
    //         res.status(404).send({ message: `Cannot delete user with id: ${id}`});
    //     } else {
    //         res.send({ message: 'User successfully deleted.'})
    //     }
    // })
    // .catch(err => {
    //     res.status(500).send( {message: `Could not delete user with id:${id}`})
    // });
}