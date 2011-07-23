now.post_votes = function(up, down, users) {
  $("#num_yay").html('<p>'+ up +'</p>');
  $("#num_nay").html('<p>'+ down +'</p>');
  list = "";
  for (var i = 0; i < users.length; i++) {
    //list += '<li class="user"> ' + users[i] + '</li>'; 
  } 
  $('#users').html(list);
}

function load() {
  now.name = session_name;
  now.room = room;
  now.init();
  now.update();
}

function update_iframe(url) {
  $(document).ready(function() {
    $('#iframe_content').attr('src', url); 
  });
}

now.receive_next_post = function display_post(pos) {
  $(document).ready(function() {
    now.vote = 0;
    console.log(reddit_posts[pos]);
    var post = reddit_posts[pos];  
    $('#url').html('<a href="' + post.url + '">' + post.url + '</a>');
    update_iframe(post.url);
    $('#title').html(post.title);
    $('#upvotes').html("Upvotes: " + post.ups);
    $('#downvotes').html("Downvotes: " + post.downs);
    $("#num_yay").html('<p>'+ 0 +'</p>');
    $("#num_nay").html('<p>'+ 0 +'</p>');
    $("#room_name").html("Room: " + now.room);
    $('#yay').click(function(e){
      now.update_votes(1);
    });
    $('#nay').click(function(e){
      now.update_votes(-1);
    });
  });
}
