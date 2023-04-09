
const { generarJWT } = require('../helpers/jwt');

const Usuarios = require('../models/usuarioModel');

const bcrypt = require('bcryptjs')

// get todos los usuarios

const getUsuarios = async (req, res) => {

    try {

        const usuarios = await Usuarios.find()

        return res.status(200).json({
            ok: true,
            msg: 'Usuarios',
            total_usuarios: usuarios.length,
            limit: 30,
            data: usuarios
        })

    } catch (error) {

        return res.status(404).json({
            ok: false,
            msg: 'Error Usuarios'
        })
    }
}

// get un usuario

const getUsuario = async (req, res) => {

    try {

        const id = req.params.id;
        const usuarios = await Usuarios.findById(id)

        if (!usuarios) {
            return res.status(404).json({
                ok: false,
                msg: 'Error 404'
            })

        } else {
            return res.status(200).json({
                ok: true,
                msg: 'Usuario',
                data: usuarios
            })
        }


    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: 'Error  usuarios'

        })
    }

}

// crear un usuario (post)

const crearUsuario = async (req, res) => {


    const newUsuario = new Usuarios(req.body);
    const { email } = req.body

    try {

        const usuario = await Usuarios.findOne({ email })

        if (usuario) {

            return res.status(401).json({
                ok: false,
                msg: 'ERROR'
            });

        } else {


            let salt = bcrypt.genSaltSync(10);
            newUsuario.password = bcrypt.hashSync(req.body.password, salt)

            const usuarios = await newUsuario.save()

            const token=await generarJWT(newUsuario.id, newUsuario.nombre)

            return res.status(201).json({

                ok: true,
                msg: 'Usuario creado',
                token: token,

            })
        }


    } catch (error) {

        console.log(error)

        return res.status(500).json({
            ok: false,
            msg: 'ERROR'
        });

    };

}


// actualizar un usuario (post)

const loginUsuario = async (req, res) => {

    const { email } = req.body;

    try {

        const usuario = await Usuarios.findOne({ email });
       

        if (!usuario) { 


            return res.status(401).json({

                ok: false,
                msg: 'Usuario o contraseña incorrecto',
            });

        }
        
        const passOk = bcrypt.compareSync(req.body.password, usuario.password);

        if (!passOk) {

            return res.status(400).json({
                ok: false,
                msg: 'Contraseña inválida',
            })

        } 

            
            const token = await generarJWT(usuario._id, usuario.nombre)
            
            const user = {

                nombre: usuario.nombre,
                email: usuario.email,
                uid: usuario._id,
            }
        
            return res.status(200).json({
                ok: true,
                data: user,
                token,
            });
       

    } catch (err) {


        console.error(err);


        return res.status(500).json({
            ok: false,
            msg: 'Error interno del servidor',

        });
    }
};


const eliminarUsuario = async (req, res) => {

    try {

        const id = req.params.id;


        const usuario = await Usuarios.findById(id)
        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'Error 404'
            })

        }
        else {
            await Usuarios.findByIdAndDelete({ _id: id });
            return res.status(200).json({
                ok: true,
                msg: 'Eliminado el usuario',
            })
        }

    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: 'Error al eliminar el usuario'
        })

    }
}


//renew 

const renew= async (req,res)=>{

    const{uid,nombre}=req;

    const token=await generarJWT(uid,nombre);

    return res.status(200).json({
        ok:true,
        user:{
            uid,
            nombre,
        },
        token
    })
}

module.exports = {

    getUsuarios,
    getUsuario,
    crearUsuario,
    loginUsuario,
    eliminarUsuario,
    renew,

}