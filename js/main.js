  firebase.initializeApp({
    apiKey: 'AIzaSyDq-C7jiylt1x3q3ppuzJhcOldEFh6gvEM',
    authDomain: 'fir-alquiler.firebaseapp.com',
    projectId: 'fir-alquiler',
    databaseURL: "https://fir-alquiler.firebaseio.com",
    storageBucket: "fir-alquiler.appspot.com",
    messagingSenderId: "950750978319",
    appId: "1:950750978319:web:b782e93f8bfd57c4cd1e7a",
    measurementId: "G-GR2EJQBGVV"
  });

  // Initialize Firebase
var db = firebase.firestore();

var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        actualizarbtn:false,
        error: false,
        errorColor:'',
        errorMensaje :'',
        id:'',
        name: '',
        apellido: '',
        telefono: '',
        direccion: '',
        data : []
    },
    created() {
        this.getData();
    },
    methods: {
        crear(){
            if (this.validar()) {
                this.error = false;
                var self = this;

                db.collection("users").add({
                    name: this.name,
                    apellido: this.apellido,
                    telefono: this.telefono,
                    direccion: this.direccion
    
                })
                .then(function(docRef) {
                    // console.log("Document written with ID: ", docRef.id);
                    self.error = true;
                    self.errorColor = 'alert-success';
                    self.errorMensaje =  'Cliente agregado con exito';
                    
                    self.limpiar();
                    self.getData();
                });
            }          
            
        },
        editar(idData) {
            this.data.forEach(item => {
                if (item.id == idData) {
                    this.id = item.id;
                    this.name = item.name;
                    this.apellido = item.apellido;
                    this.telefono = item.telefono;
                    this.direccion = item.direccion;
                    this.actualizarbtn = true;
                    
                }
            });
        },
        actualizar(){
            if (this.validar()) {
                
                var self = this;
                var idRef = db.collection("users").doc(this.id);
    
                // Set the "capital" field of the city 'DC'
                return idRef.update({
                    name: this.name,
                    apellido: this.apellido,
                    telefono: this.telefono,
                    direccion: this.direccion
                })
                .then(function() {
                    self.error = true;
                    self.errorColor = 'alert-success';
                    self.errorMensaje =  'Cliente actualizado con exito';
    
                    self.limpiar();
                    self.actualizarbtn = false;
                    self.getData();
                });
            }
        },
        eliminar(id){
            self = this;
            db.collection("users").doc(id).delete().then(function() {
                    self.error = true;
                    self.errorColor = 'alert-success';
                    self.errorMensaje =  'Cliente eliminado con exito';

                    self.limpiar();
                    self.getData();
            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });
        },
        validar(){
            if (this.name === '') {
                this.error = true;
                this.errorColor = "alert-danger";
                this.errorMensaje = "Por favor escribir tu nombre en el formulario";
                return false;
            }
            if (this.apellido === '') {
                this.error = true;
                this.errorColor = "alert-danger";
                this.errorMensaje = "Por favor  escribir tu apellido en el formulario";
                return false;
            }
            if (this.telefono === '') {
                this.error = true;
                this.errorColor = "alert-danger";
                this.errorMensaje = "Por favor  escribir tu telefono en el formulario";
                return false;
            }
            if (this.direccion === '') {
                this.error = true;
                this.errorColor = "alert-danger";
                this.errorMensaje = "Por favor  escribir tu direccion en el formulario";
                return false;
            }
            
            return true;
        },
        closeAlert(){
            this.error = false;
        },
        getData(){
            db.collection("users").onSnapshot((querySnapshot) => {
                // console.log(querySnapshot)
                querySnapshot.forEach((doc) => {
                    
                    var data = {
                        id:doc.id,
                        name:doc.data().name,
                        apellido:doc.data().apellido,
                        telefono:doc.data().telefono,
                        direccion:doc.data().direccion,
                    };
                    this.data.push(data);
                   
                });
            });
        },
        limpiar(){
            this.id = '';
            this.name= '';
            this.apellido= '';
            this.telefono= '';
            this.direccion= '';
            this.data =[];

        }
    },
  });
