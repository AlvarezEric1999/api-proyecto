import swaggerJSDoc from "swagger-jsdoc";

const options = {
    definition :{
        openapi:'3.0.0',
        info:{
            title:'medical api',
            version:'1.0.0',
            description:"api para gestion de citas medicas",
            contact:{
                name:'developer'
            },
            servers:[
                {
                    url:'http://localhost:3000',
                    description:'local server'
                }
            ]
        }
    },
    apis:['./routes/routes.js']
}

const specs = swaggerJSDoc(options);

export default specs;