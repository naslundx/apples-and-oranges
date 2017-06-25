$(document).ready(function(){

  $('form.toserver').on('submit', function(){

      var result = {
        firstId: firstId,
        secondId: secondId,
        firstIndices: firstIndices,
        secondIndices: secondIndices
      };

      $.ajax({
        type: 'POST',
        url: '/',
        data: result,
        success: function(data){
          window.location.href = 'thanks';
        }
      });

      return false;
  });

});
