URL = "http://10.0.2.2:3000";
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
}

function successHandler (result) {
    console.log(result);
}

function errorHandler (error) {
    alert('error = ' + error);
}

function onNotificationGCM(e) {
    $("#app-status-ul").append('<li>EVENT -> RECEIVED:' + e.event + '</li>');

    switch( e.event )
    {
    case 'registered':
        if ( e.regid.length > 0 )
        {
            $("#app-status-ul").append('<li>REGISTERED -> REGID:' + e.regid + "</li>");
            // Your GCM push server needs to know the regID before it can push to this device
            // here is where you might want to send it the regID for later use.
            console.log("regID = " + e.regid);
        }
    break;

    case 'message':
        // if this flag is set, this notification happened while we were in the foreground.
        // you might want to play a sound to get the user's attention, throw up a dialog, etc.
        if ( e.foreground )
        {
            $("#app-status-ul").append('<li>--INLINE NOTIFICATION--' + '</li>');

            // if the notification contains a soundname, play it.
            var my_media = new Media("/android_asset/www/sound/"+e.soundname);
            my_media.play();
        }
        else
        {  // otherwise we were launched because the user touched a notification in the notification tray.
            if ( e.coldstart )
            {
                $("#app-status-ul").append('<li>--COLDSTART NOTIFICATION--' + '</li>');
            }
            else
            {
                $("#app-status-ul").append('<li>--BACKGROUND NOTIFICATION--' + '</li>');
            }
        }

        $("#app-status-ul").append('<li>MESSAGE -> MSG: ' + e.payload.message + '</li>');
        $("#app-status-ul").append('<li>MESSAGE -> MSGCNT: ' + e.payload.msgcnt + '</li>');
    break;

    case 'error':
        $("#app-status-ul").append('<li>ERROR -> MSG:' + e.msg + '</li>');
    break;

    default:
        $("#app-status-ul").append('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');
    break;
  }
}

$(document).ready(function(){
  $('body').append('<div id="notice"></div>');
  $(document).foundation();

 $('a').on("click", function(e) {
    e.preventDefault();
    window.location = this.href;
  });

  $("a#backButton").on('tap touchend click',function(e){
      e.preventDefault();
      history.go(-1);
      navigator.app.backHistory();
  });

  $("a#close-alert").on('tap touchend click',function(e){
      e.preventDefault();
      alert('Close Button');
      closeAlert();
  });
});

$(document).on("ajaxStart",function(){
	NProgress.start();
});

$(document).on("ajaxStop",function(){
	NProgress.done();
});

function demoAlert(title,message,css,close){
  close_button = '<a href="#" onClick="closeAlert()" class="button small primary right">Fermer</a>'
  if (close != 'yes') {
    close_button = ""
  }

  str = '<div id="demo-notice" class="'+ css +'">'+
      close_button+
      '<div class="row">'+
          '<div class="small-12 columns">'+
              '<h3>'+ title +'</h3>'+
              '<p>'+ message +'</p>'+
          '</div>'+
      '</div>'+
  '</div>';
 $("#notice").html(str);
 $("#demo-notice").css('display', 'block');
 $("#demo-notice").addClass('animated bounceInUp');
 $("#demo-notice i").addClass('animated tada');

 if (close != 'yes') {
   setTimeout( function(){ closeAlert(); }, 5000 );
 }
}

function closeAlert(){
  $("#demo-notice").addClass('animated bounceOutDown');
}

function playBeep() {
  navigator.notification.beep(3);
}

// Vibrate for 2 seconds
function vibrate() {
    navigator.notification.vibrate(2000);
}

function getRootUrl() {
  return URL;
}
