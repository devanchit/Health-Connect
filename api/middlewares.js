const authPage = (permissions) => {

    return(req,res,next) =>{
        const {role } = req.body; 
        console.log(role);
        if(permissions.includes(role)){
            next()
        }
        else
        {
            res.status(403).send("Access forbidden. Only admin can access this page.");
        }
    }

};

module.exports = { authPage };
