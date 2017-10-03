/*! jquery.finger - v0.1.2 - 2014-10-01
* https://github.com/ngryman/jquery.finger
* Copyright (c) 2014 Nicolas Gryman; Licensed MIT */
(function(e,t){var b=/chrome/i.exec(t),x=/android/i.exec(t),w="ontouchstart" in window&&!(b&&!x),q=w?"touchstart":"mousedown",u=w?"touchend touchcancel":"mouseup mouseleave",c=w?"touchmove":"mousemove",m="finger",j=e("html")[0],f={},r={},p,d,v,k,o,h,a=e.Finger={pressDuration:300,doubleTapInterval:300,flickDuration:150,motionThreshold:5};function i(z){z.preventDefault();e.event.remove(j,"click",i)}function g(A,z){return(w?z.originalEvent.touches[0]:z)["page"+A.toUpperCase()]}function n(B,C,z){var A=e.Event(C,r);e.event.trigger(A,{originalEvent:B},B.target);if(A.isDefaultPrevented()){if(~C.indexOf("tap")&&!w){e.event.add(j,"click",i)}else{B.preventDefault()}}if(z){e.event.remove(j,c+"."+m,s);e.event.remove(j,u+"."+m,l)}}function y(A){var z=A.timeStamp||+new Date();if(v==z){return}v=z;f.x=r.x=g("x",A);f.y=r.y=g("y",A);f.time=z;f.target=A.target;r.orientation=null;r.end=false;p=false;d=false;k=setTimeout(function(){d=true;n(A,"press")},e.Finger.pressDuration);e.event.add(j,c+"."+m,s);e.event.add(j,u+"."+m,l);if(a.preventDefault){A.preventDefault();e.event.add(j,"click",i)}}function s(z){r.x=g("x",z);r.y=g("y",z);r.dx=r.x-f.x;r.dy=r.y-f.y;r.adx=Math.abs(r.dx);r.ady=Math.abs(r.dy);p=r.adx>a.motionThreshold||r.ady>a.motionThreshold;if(!p){return}clearTimeout(k);if(!r.orientation){if(r.adx>r.ady){r.orientation="horizontal";r.direction=r.dx>0?+1:-1}else{r.orientation="vertical";r.direction=r.dy>0?+1:-1}}while(z.target&&z.target!==f.target){z.target=z.target.parentNode}if(z.target!==f.target){z.target=f.target;l.call(this,e.Event(u+"."+m,z));return}n(z,"drag")}function l(C){var z=C.timeStamp||+new Date(),B=z-f.time,D;clearTimeout(k);if(!p&&!d&&C.target===f.target){var A=o===C.target&&z-h<a.doubleTapInterval;D=A?"doubletap":"tap";o=A?null:f.target;h=z}else{C.target=f.target;if(B<a.flickDuration){n(C,"flick")}r.end=true;D="drag"}n(C,D,true)}e.event.add(j,q+"."+m,y);e.each(["tap","doubletap","press","drag","flick"],function(A,z){e.fn[z]=function(B){return B?this.on(z,B):this.trigger(z)}})})(jQuery,navigator.userAgent);