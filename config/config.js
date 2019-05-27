module.exports = {
    host:process.env.HOST || 'localhost',
    port:process.env.PORT ||(process.env.NODE_ENV === 'production'?8080:3000),
    apiHost:process.env.APIHOST || '104.33.58.117',
    apiPort:process.env.APIPORT || '3030',
    dbHost:"localhost",
    dbPort:"27017",
    apiUrl:process.env.API_ENV === 'local'?'http://localhost:3030/':'https://job-api-server.herokuapp.com/',
    app:{
        title:"找工必胜客",
        description:'找工作管理后台',
        head:{
            titleTemplate:'job hunter',
            meta:[
                {
                    name:"description",
                    content:"react job hunter cms"
                },
                {charset:"utf-8"}
            ]
        }
    }
};