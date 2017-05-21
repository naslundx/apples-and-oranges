$(document).ready(function(){

  $('form').on('submit', function(){

      //var item = $('form input');
      var result = {
        // TODO save correct values
        first: 0,
        second: 1,
        value: "132231"
      };

      $.ajax({
        type: 'POST',
        url: '/main',
        data: result,
        success: function(data){
          // TODO how to get the new-rendered thanks page?
          window.location.href = 'thanks';
        }
      });

      return false;

  });

/*
// TODO can be removed?
  $('li').on('click', function(){
      var item = $(this).text().replace(/ /g, "-");
      $.ajax({
        type: 'DELETE',
        url: '/main/' + item,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });
  });
*/

});
