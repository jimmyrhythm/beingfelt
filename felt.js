// I said the code was art, I didn't say the code was good. 

AFRAME.registerComponent('stringy', {
 
  schema:{ lidMax:{type: 'number',default:190 } },

  init: function () {
    var el = this.el;
      var lid=this.data.lidMax;
      var name=  el.getAttribute('id');
      label=document.createElement('a-entity');
      label.setAttribute('text',"value: "+ name + ";font:monoid; color:white; width:1 ; ");
      
      label.setAttribute('position',"0.5 0.35 0");
      label.setAttribute('class',"nametag");
      el.appendChild(label);

    el.addEventListener('triggerchanged', function (evt) {
      var bh = el.querySelector('.head');
      
      bh.setAttribute('geometry', {phiLength: 330+(1-evt.detail.value)*29});
    });
    
    el.addEventListener('gripchanged', function (evt) {//eyelids
      var le = el.querySelector('.lsocket');
      var re = el.querySelector('.rsocket');

      le.setAttribute('geometry', {phiLength: lid+(evt.detail.value)*(360-lid)});
      re.setAttribute('geometry', {phiLength: lid+(evt.detail.value)*(360-lid)});

    });

    el.addEventListener('thumbstickmoved', function (evt) {
      var le = el.querySelector('.lsocket');
      var re = el.querySelector('.rsocket');
      
      le.setAttribute('rotation',  {  y: -evt.detail.y* 60,z: 180-evt.detail.x* 60}); 
      re.setAttribute('rotation',  { y: -evt.detail.y* 60, z: 180-evt.detail.x* 60});
   
      
    });
  }
});


AFRAME.registerComponent('camcontrol', {
  
  schema:{ pan:{type: 'number',default:180 },
          range:{type: 'number',default:-1 },  },

  init: function () {
    var el = this.el;
    el.addEventListener('triggerchanged', function (evt) {

    });
    
    el.addEventListener('gripchanged', function (evt) {//eyelids
   //   var le = el.querySelector('.lsocket');
  ////    var re = el.querySelector('.rsocket');

    //  le.setAttribute('geometry', {phiLength: lid+(evt.detail.value)*(360-170)});
     // re.setAttribute('geometry', {phiLength: lid+(evt.detail.value)*(360-lid)});

    });

    el.addEventListener('thumbstickmoved', function (evt) {
    //  var le = el.querySelector('.lsocket');
     // var re = el.querySelector('.rsocket');
     var mount = el.querySelector('.mount');
     var newpan=  el.getAttribute('camcontrol').pan + evt.detail.x*2;
     var newrange=  el.getAttribute('camcontrol').range + evt.detail.y/30;
    newrange=Math.min(0, newrange);
     //var text = document.querySelector('#words');
    //text.setAttribute('text',  {value: " " + newpan});
     el.setAttribute('camcontrol', {pan: newpan,range: newrange});
     mount.setAttribute('rotation', {y: newpan});

     mount.setAttribute('position', {z: newrange});
    //  le.setAttribute('rotation',  {  y: -evt.detail.y* 60,z: 180-evt.detail.x* 60}); 
  //    re.setAttribute('rotation',  { y: -evt.detail.y* 60, z: 180-evt.detail.x* 60});
   
      
    });
  }
}); 
var radcon= 180/3.14;




AFRAME.registerComponent('proxycontroller', {

  schema:{
        target :{type: 'string', default: ''},

         },
tick:function(){ 
  
  var el = this.el;
    //  var text = document.querySelector('#words');
  //    text.setAttribute('text',  {value: Math.floor(el.object3D.rotation._x*radcon)+" "+ 
  //    Math.floor(el.object3D.rotation._y*radcon)+" "+ Math.floor(el.object3D.rotation._z*radcon)});
if (this.data.target){

      var bh =  document.querySelector(this.data.target);
      
      bh.object3D.rotation.set( el.object3D.rotation._x, 
                                el.object3D.rotation._y, 
                                el.object3D.rotation._z);

      bh.object3D.position.set( el.object3D.position.x, 
      el.object3D.position.y, 
      el.object3D.position.z-0.1);

      hp =  document.querySelector(this.data.target+'torso');
      if(hp){
      body =  document.querySelector(this.data.target+'body');
      hp.object3D.position.set( el.object3D.position.x, 
      el.object3D.position.y, 
      el.object3D.position.z-0.1);

var r=el.object3D.rotation.clone();
r.reorder("XZY");



      body.object3D.lookAt(0,-1000,0);
      body.object3D.rotation.set( 0,
                            0, 
                           r.y);
      }//if torso seperate
    }//if something selected
    else{bh=null;}
//body.object3D.lookAt(0,-100,0);

}
,
   
  init: function () {
    var ob=this;
    var cont=0;
    var el = this.el;

    el.addEventListener('triggerdown', function (evt) {
      var text = document.querySelector('#words');
    text.setAttribute('text',  {value: " " });
      var t=evt.srcElement.components.proxycontroller.data["target"];
        if(!t){
          
        console.log(t);
          var sel= el.components.raycaster.intersectedEls[0].closest(".puppet").id;

        //  console.log(sel);
          el.setAttribute('proxycontroller', { target: "#"+sel });

          el.setAttribute('raycaster', { enabled: false ,showLine: false});
          el.setAttribute('visible',  false );

          var adrot=0;
          var hand=el.getAttribute('oculus-touch-controls').hand;
        //
        var g=document.querySelector("#"+sel+" .grip");
        console.log(g);cont--;
        
        var nametag = document.querySelector("#"+sel+" .nametag");
        nametag.setAttribute('visible', false);


          if (hand=="left"){
          g.object3D.rotation.set(0.5, 
                                    3.14, 
                                    0);
          }else{
            g.object3D.rotation.set(-0.5, 
                                    0, 
                                    0);
          }
    }});


    el.addEventListener('thumbstickdown', function (evt) {
    //var nametag = document.querySelector(evt.srcElement.components.proxycontroller.data.target+" .nametag");
    //    nametag.setAttribute('visible', true);
      el.setAttribute('proxycontroller', { target: null });
      el.setAttribute('raycaster', { enabled: true ,showLine: false});
      el.setAttribute('visible', true );
    });

   
    el.addEventListener('abuttondown', function (evt) {   
     // var pa = document.querySelector(evt.srcElement.components.proxycontroller.data.target);
     // var name=  pa.getAttribute('id');
        speechSynthesis.speak(new SpeechSynthesisUtterance("What kind of Game is this?"));
    });

   

    el.addEventListener('triggerchanged', function (evt){
  ///    console.log(evt);
     var pa = document.querySelector(evt.srcElement.components.proxycontroller.data.target);

      if (pa){
          pa.emit(evt.type, evt.detail);
      }

});
    el.addEventListener('gripchanged',function (evt){
 // console.log(evt);
      var pa = document.querySelector(evt.srcElement.components.proxycontroller.data.target);
    if (pa){
        pa.emit(evt.type, evt.detail);
    }

});
    el.addEventListener('thumbstickmoved', function (evt){ 
      
      if (evt.srcElement.components.proxycontroller.data.target){
           var pa = document.querySelector(evt.srcElement.components.proxycontroller.data.target);
          pa.emit(evt.type, evt.detail);
      }
} );
  }
  });



var xr=Math.random(1)*20;
var yr=Math.random(1)*20;

AFRAME.registerComponent('spectator',{
          'schema': {
               canvas: {
                    type: 'string',
                    default: ''
               },
               // desired FPS
               fps: {
                    type: 'number',
                    default: 72.0
               }
                  },
                  'init': function() {
                         var targetEl = document.querySelector(this.data.canvas);
                         this.counter = 0;
                         this.renderer = new THREE.WebGLRenderer( { antialias: true } );
                         this.renderer.setPixelRatio( window.devicePixelRatio );
                         this.renderer.setSize( targetEl.offsetWidth, targetEl.offsetHeight );
                         // creates spectator canvas
                           targetEl.appendChild(this.renderer.domElement);
                         this.renderer.domElement.id = "canvas";
                         this.renderer.domElement.crossorigin="anonymous"
                     //    this.renderer.domElement.height=300; 
                      //   this.renderer.domElement.width=400;
                           this.el.removeAttribute('look-controls');
                           this.el.removeAttribute('wasd-controls');
                           this.el.object3DMap.camera.aspect=1;
                           this.el.object3DMap.camera.updateProjectionMatrix();
                
                  },
                  'tick': function(time, timeDelta) {
                    
                       //  var loopFPS = 1000.0 / timeDelta;
                        // var hmdIsXFasterThanDesiredFPS = loopFPS / this.data.fps;
                        // var renderEveryNthFrame = Math.round(hmdIsXFasterThanDesiredFPS);
                         //if(this.counter % renderEveryNthFrame === 0){
                                this.render(timeDelta);
                               // var targetEl = document.querySelector(this.data.canvas);
                                
                       //  }
            //   this.counter += 1;  
                  },
                  'render': function(){
                         this.renderer.render( this.el.sceneEl.object3D , this.el.object3DMap.camera );
                  }
      });

AFRAME.registerComponent('feltbeing', {
  tick: function () {
    // `this.el` is the element.
    // `object3D` is the three.js object.
    var s= document.getElementById('feltbeing')

    // `rotation` is a three.js Euler using radians. `quaternion` also available.
    var rq= this.el.object3D.quaternion ;
    s.object3D.quaternion.set( rq.x,rq.y,rq.z,rq.w);
    s.object3D.position.set( this.el.object3D.position.x, this.el.object3D.position.y, this.el.object3D.position.z);
    
    // `position` is a three.js Vector3.
    //s.setAttribute('position', this.el.object3D.position);
  }
});


AFRAME.registerComponent('canvas-updater',{
  dependencies:['material'],
  tick:function(){var el=this.el;
  var material;
  material=el.getObject3D('mesh').material;
  if(!material.map){return;}
  material.map.needsUpdate=true;}
  });

