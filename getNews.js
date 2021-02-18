const fetch = require("node-fetch");
const parser = require("node-html-parser");

const http = require('http');

const server = http.createServer(async (request, response) => {
    
    if(request.url=='/getNews')
    { 
        var arr = await showNews();
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.write(JSON.stringify(arr));
    }
    else{
        response.writeHead(200, {'Content-Type': 'Text/HTML'});
        response.write("Give proper route");
    }
    return response.end();
});

server.listen(8080);

const showNews = async function() {
    try{
        const res = await fetch('https://time.com');
        const data = await res.text();
        const root = parser.parse(data);
        const homepage = root.querySelectorAll('.homepage-module');
        var child;

        var fiveNews = [];
        homepage.forEach(module => {
            if(module.classNames[1] == 'latest')
            {
                childnode = module.childNodes;
                child = childnode[3].childNodes;
            }
        
        });
    
        for(var i = 1;i<=9;i+=2)
        {         
            var news={};
            news.title=child[i].childNodes[1].childNodes[1].childNodes[3].childNodes[1].rawText;
            news.link=child[i].childNodes[1].childNodes[1].childNodes[3].childNodes[0].rawAttrs;
            fiveNews.push(news);

        }
            //console.log(fiveNews);

    }catch(err){       
         console.log(err);

    }
    return fiveNews;
};
