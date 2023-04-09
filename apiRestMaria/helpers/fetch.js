const urlBase = 'http://localhost:3000/api/v1';

const consulta = async (url, method, body={}) => { 
    try {
        let options = {}; 

        if (method === 'post' || method === 'put') {
            const data = {...body};
            options = {
                method: method,
                body: JSON.stringify(data), 
                headers:{
                    'Content-Type': 'application/json'    
                }
            };
        } else if (method === 'delete') {
            options = {
                method,
            };
        }

        const response = await fetch(`${urlBase}/${url}`, options);
        return response;
    } catch (error) {
        console.error(error);
    }
};

module.exports = {consulta};




