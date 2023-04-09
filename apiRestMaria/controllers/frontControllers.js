

const Servicio = require('../models/servicioModel');
const Instalaciones = require('../models/instalacionesModel');

const getIndex = (req, res) => {
    res.render('index', {
        titulo: 'Pagina Principal',
        parrafo: 'Inicio',
    })
};

const getProductos = (req, res) => {
    res.render('productos', {
        titulo: 'Productos',
        parrafo: 'Productos',
    })
};

const getQuienesSomos = (req, res) => {
    res.render('quienesSomos', {
        titulo: 'Sobre Nosotros',
        parrafo: 'Sobre Nosotros',
    })
};

const getContacto = (req, res) => {
    res.render('contacto', {
        titulo: 'Contacto',
        parrafo: 'Contacto',
    })
};

const getServicios = async (req, res) => {

    try {
        const servicios = await Servicio.find()
            res.render('servicios', {
                titulo: 'Servicios',
                parrafo: 'Servicios',
                servicios,
                
            })
        

    } catch (error) {
        console.log(error)
    }
}

const getInstalaciones = async (req, res) => {

    try {
        const instalaciones = await Instalaciones.find()
                res.render('instalaciones', {
                titulo: 'Instalaciones',
                parrafo: 'Instalaciones',
                instalaciones,
            })
        

    } catch (error) {
        console.log(error)
    }


}

module.exports = {
    getIndex,
    getProductos,
    getQuienesSomos,
    getContacto,
    getServicios,
    getInstalaciones,
}