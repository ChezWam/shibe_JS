var express = require('express'),
http = require('http'),
path = require('path');
var app = module.exports = express();

/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// development only
if (app.get('env') === 'development') {
    app.use(express.errorHandler());
}

// production only
if (app.get('env') === 'production') {
    // TODO
};


app.get('/', function (req, res)
{
    res.render('doge.html');
});



app.post('/', function (req, res) {
    var resp = new Array();

    //

    if (typeof req.body.input == 'string' || req.body.input instanceof String)
    {

        var shibe_mem = Array();
        var shibe_max_mem = 256;
        var shibe_max_value = 255;
        var shibe_pointed_octet = 0;
        var input_pointed_octet = 0;
        var shibe_program = new Array();
        var shibe_targets = new Array();
        var input_mem = new Array();
        var shibe_output = '';
        for(var i=0; i<=shibe_max_mem; i++){
            shibe_mem[i] = 0;
        }

        if (typeof req.body.char == 'string' || req.body.char instanceof String && req.body.char != null  && req.body.char != '')
        {
           input_mem = req.body.char.split('');
        }
       // input.charAt(0);

        text =  sanitize_stuff(req.body.input);

        shibe_targets.length = 0;
        var temp_stack = new Array();
        for (var i = 0; i < text.length; i++){
            var op = shibe_program[i];
            if (text[i] == 'must'){
                temp_stack.push(i);
            }
            if (text[i] == 'shibe'){
                var target = temp_stack.pop();
                shibe_targets[i] = target;
                shibe_targets[target] = i;
            }
        }


        if (text != false)
        {
            for (var i = 0; i < text.length; i++) {


                switch(text[i]){
                    case 'wow':
                        shibe_mem[shibe_pointed_octet]++;
                        if (shibe_mem[shibe_pointed_octet] > shibe_max_value) shibe_mem[shibe_pointed_octet] = 0;
                        break;
                    case 'very':
                        shibe_mem[shibe_pointed_octet]--;
                        if (shibe_mem[shibe_pointed_octet] < 0) shibe_mem[shibe_pointed_octet] = shibe_max_value;
                        break;
                    case 'such':
                        shibe_pointed_octet++;
                        if (shibe_pointed_octet > shibe_max_mem) shibe_pointed_octet = 0;
                        break;
                    case 'much':
                        shibe_pointed_octet--;
                        if (shibe_pointed_octet < 0) shibe_pointed_octet = shibe_max_mem-1;
                        break;
                    case 'must':
                        if (shibe_mem[shibe_pointed_octet] == 0) i = shibe_targets[i];
                        break;
                    case 'shibe':
                        i = shibe_targets[i] - 1;
                        break;
                    case 'so':
                        shibe_output += (String.fromCharCode(shibe_mem[shibe_pointed_octet]));

                       // console.log(String.fromCharCode(shibe_mem[shibe_pointed_octet]));
                        break;
                    case 'bark':
                        shibe_mem[shibe_pointed_octet] = (input_pointed_octet >= input_mem.length)?0:input_mem[input_pointed_octet].charCodeAt(0);
                        input_pointed_octet++;
                        break;
                }


        }

            resp[0] = shibe_output;
       



        res.json(resp);
        }
        else
        {
            console.log(req.body.input);

            if( req.body.input.length == 0)
            {
                resp[0] = "Very empty, must write code.";

            }
            else
            {
                resp[0] = "Iz parsing error: must with no matching shibe. Very not working";

            }
            res.json(resp);

            //res.send("Iz parsing error: must with no matching shibe. Very not working")
        }
    }
    else
    {
        resp[0] = "such incorrect input. Very mean. Such sad. ";
        res.json(resp);
        //res.send("such incorrect input. Very mean. Such sad. ");
    }

});
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
//



Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};

function sanitize_stuff(input)
{
    var shibeCount = 0;
    var mustCount = 0;
    var text = input.replace(/(\r\n|\n|\r)/gm," "); //must remove lines
    text = text.replace(/[^a-z ]/gm,""); //such regex very few characters
    text = text.split(" "); //such intructions array

    for (var i = text.length -1 ; i >= 0 ; i--) {
        if(is_valid_operation(text[i])) //shibe very well trained,only listen to nice instructions
        {
            if(text[i] == "shibe")
            {
                shibeCount++;
            }
            else if (text[i] == "must")
            {
                mustCount++;
            }
        }
        else
        {
            text.remove(i);
        }
    }
    //console.log(text.join('\n'));

   // console.log("shibe"+shibeCount+" must "+mustCount);
    if (shibeCount != mustCount)
    {
        return false;
    }
    return text;
}

function is_valid_operation(op){
    if (op == 'wow') return 1;
    if (op == 'such') return 1;
    if (op == 'shibe') return 1;
    if (op == 'so') return 1;
    if (op == 'very') return 1;
    if (op == 'much') return 1;
    if (op == 'must') return 1;
    if (op == 'bark') return 1;
    return 0;
}


