$('#default-theme').click(function (){
	  $('link[href="dist/css/darkstyles.css"]').attr('href','dist/css/styles.css');
});
$('#dark-theme').click(function (){
   $('link[href="dist/css/styles.css"]').attr('href','dist/css/darkstyles.css');
});