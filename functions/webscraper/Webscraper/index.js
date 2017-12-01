const Crawler = require("crawler");

module.exports = function (context, req) {
  const webcrawler = new Crawler({
    maxConnections : 10,
    callback : function (error, res, done) {
      if (error) {
        console.log("ERROR\n\n")
        console.log(error);
      } else {
        const $ = res.$
        console.log($('title').text());
        //console.log($('article').text());
        //console.log($('input[type="text"]').val());
        /*var html = res.body;
        var div = document.createElement("div");
        div.innerHTML = html;
        let txt = div.textContent || div.innerText || "";
        console.log(txt);*/
        console.log(res.request.uri.href);
        //console.log(res.body);
        console.log($('p').text());
        console.log($('a').text());
      }
      done();
    }
  });

  //webcrawler.queue(['http://www.washingtonpost.com/', 'http://www.nytimes.com'])
  //webcrawler.queue('http://www.nytimes.com');
  //webcrawler.queue('http://www.washingtonpost.com/');
  webcrawler.queue('http://www.amazon.com/s/ref=s9_acss_bw_ct_TVCat_ct1_a1_w?rh=i:electronics,n:172282,n:!493964,n:1266092011,n:172659,p_n_size_browse-bin:1232879011,n:!493964&bbn=172659&pf_rd_m=ATVPDKIKX0DER&pf_rd_s=merchandised-search-11&pf_rd_r=SCS1QAVS9J97D2JAY7M8&pf_rd_t=101&pf_rd_p=5ce0b5a6-28fa-5d5a-85aa-3d497635e736&pf_rd_i=1266092011')
  context.log('JavaScript HTTP trigger function processed a request.');

  if (req.query.name || (req.body && req.body.name)) {
    context.res = {
      // status: 200, Defaults to 200
      body: "Hello " + (req.query.name || req.body.name)
    };
  }
  else {
    context.res = {
      status: 400,
      body: "Please pass a name on the query string or in the request body"
    };
  }
  context.done();
};