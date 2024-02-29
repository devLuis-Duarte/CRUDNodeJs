function adminAuth(req, res, next){
    if(req.session.user != undefined){
        next();//se o usuario estiver logado, passa o middleware
    }else {
        res.redirect("/login"); //caso contrário, ele será redirecionado para a página de login
    }
}

module.exports = adminAuth;