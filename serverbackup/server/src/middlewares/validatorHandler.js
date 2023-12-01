
const validatorHandler = (req, res, next, schema) => {
    const { error } = schema.validate(req.body);

    if (error) {
        
        let data = '';
        type  = ''
        if(error.details && error.details[0] && error.details[0].message){
            let messge = error.details[0].message
            console.log("messge",messge)
            if(messge.includes('"firstname"')){
                data = messge.replace('"firstname"', "FirstName");
                type = 'firstname'
            }
            if(messge.includes('"phone"')){
                data = messge.replace('"phone"', "Phone");
                type = 'phone'
            }
            if(messge.includes('"lastname"')){
                data = messge.replace('"lastname"', "LastName");
                type = 'lastname'
            }
            if(messge.includes('"password"')){
                data = messge.replace('"password"', "Password");
                type = 'password'
            }
            if(messge.includes('"email"')){
                data = messge.replace('"email"', "Email");
                type = 'email'
            }
            
        }
        console.log("data",data)
       res.status(400).json({
            status: 'error',
            message: data.replace('/[^a-zA-Z0-9 ]/g', ''),
            type:type
        });
        return;
    }
    next();
};

module.exports = validatorHandler;