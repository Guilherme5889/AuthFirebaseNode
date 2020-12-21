const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const firebase = require('firebase');

app.engine('handlebars' , handlebars({defaultlayout: 'main'}))
app.set('view engine','handlebars')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

var firebaseConfig = {
    apiKey: "AIzaSyDaXCwEwjc0hZ2CTVrpyvWgUGFXPMQCHPk",
    authDomain: "plataformadecursos-2888e.firebaseapp.com",
    projectId: "plataformadecursos-2888e",
    storageBucket: "plataformadecursos-2888e.appspot.com",
    messagingSenderId: "699372219845",
    appId: "1:699372219845:web:0d377ec63a4e02ad46afac",
    measurementId: "G-TYM5DWSZ3C"
};
firebase.initializeApp(firebaseConfig);

db = firebase.database();
auth = firebase.auth();

auth.onAuthStateChanged((user) => {
    if(user){
        userLogged = true;
    }else{
        userLogged = false;
    }
})

app.get('/', (req,res) => {
    res.render('home')
})
app.get('/login', (req,res) => {
    res.render('login')
})
app.get('/dashboard', (req,res) => {
    if(userLogged){
        res.render('dashboard')
    }else{
        res.redirect('/login');
    }
})


app.post('/login/authentication', (req,res) => {
    const email = req.body.email
    const senha = req.body.password
    if(!email || !senha){
        res.send('Todos os campos devem estar preenchidos')
    }else{
        auth.signInWithEmailAndPassword(email,senha).then((user) => {
            userLogged = true;
            res.redirect('/dashboard')
        }).catch((error) => {
            console.log(error)
            res.redirect('/login')
        })
    }
})

app.listen(3000, () => {
    console.log('Servidor iniciado com sucesso')
})