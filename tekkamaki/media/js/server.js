var html = require('fs').readFileSync(__dirname+'/../../templates/index.html');
var server = require('http').createServer(function(req,res) {
  res.end(html);
});
server.listen(8080);

var nowjs = require("now");
var everyone = nowjs.initialize(server);

var data = {
            'rooms':
                    {
                      'all': {
                              'up_votes': 0,
                              'down_votes': 0,
                              'pos': 0,
                              'users': []
                             }
                    }
            };

function get_room(room) {
  if (!data['rooms'][room]) {
    data['rooms'][room] = {
                            'up_votes': 0,
                            'down_votes': 0,
                            'pos': 0,
                            'users': []
    };
  }
  return data['rooms'][room]; 
}

everyone.now.init = function() {
  everyone.now.receive_next_post(get_room(this.now.room)['pos']);
  if (data['rooms'][this.now.room]['users'].indexOf(this.now.name) < 0) {
    data['rooms'][this.now.room]['users'].push(this.now.name); 
  }
}

function next_url(pos) {
  pos = pos + 1;
  everyone.now.receive_next_post(pos);
  return pos;
}


everyone.now.update_votes = function(vote){
  //0 is hasn't voted
  if (this.now.vote == 0)
  {
    if( vote == 1 )
    {
      data['rooms'][this.now.room]['up_votes'] += 1;
    }
    else
    {
      data['rooms'][this.now.room]['down_votes'] += 1;
    }
  }
  else if(this.now.vote != vote)
  {
    if( vote == 1 )
    {
      data['rooms'][this.now.room]['up_votes'] += 1;
      data['rooms'][this.now.room]['down_votes'] -= 1;
    }
    else
    {
      data['rooms'][this.now.room]['up_votes'] -= 1;
      data['rooms'][this.now.room]['down_votes'] += 1;
    }
  }
  everyone.now.post_votes(data['rooms'][this.now.room]['up_votes'],
    data['rooms'][this.now.room]['down_votes']);
  this.now.vote = vote;
  if ((get_room(this.now.room)['up_votes'] + get_room(this.now.room)['down_votes']) > 1) {
    data['rooms'][this.now.room]['pos'] = next_url(data['rooms'][this.now.room]['pos']);
  }
  console.log(data);
}

everyone.now.update = function() {
  everyone.now.post_votes(data['rooms'][this.now.room]['up_votes'],
   data['rooms'][this.now.room]['down_votes'],
   data['rooms'][this.now.room]['users']); 
}
