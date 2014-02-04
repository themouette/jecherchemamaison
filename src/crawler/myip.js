//create casper object
var casper = require('casper').create();

casper.start('http://www.whatismyip.com/');

//to avoid 'Access Denied'  <!-- Error #1010 -->
//The owner of this website (www.whatismyip.com) has banned
//your access based on your browser's signature (42c0a6c6-cl-ua-50). (Ref. 1010)
casper.userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X)');

//Home Page
casper.then(function() {

    if(this.exists('div#greenip')){

        var element = this.evaluate(function() {
            //remove unnecessari nodes
            return jQuery('div#greenip').text().trim();
        });

        console.log(element);
    }else{
        console.log("ACCESS_DENIED");
    }

});

casper.run(function() {

    //finish execution script
    this.exit();
});
