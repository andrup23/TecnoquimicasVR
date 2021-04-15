AFRAME.registerComponent('handle-events', {
    init: function () {
      var el = this.el;  // <a-box>
      el.addEventListener('mouseenter', function () {// accion que se ejecuta una vez el punto de mira se pone en el objeto
        //el.setAttribute('color', '#24CAFF');
        el.setAttribute('scale', { x: 1.2, y: 1.2 });
      });
      el.addEventListener('mouseleave', function () {//funcion que se ejecuta cuando el cursor deja de tocar el objeto, en este caso es para volver al color original
        el.setAttribute('scale', { x: 1, y: 1 });
        //el.setAttribute('scale', { x: document.getElementById("bb").getAttribute("scale").x * 2, y: 1, z: 2 });
      });
    }
  });

  AFRAME.registerComponent('displaytext', {
    init: function () {
      var obj = this.el;
      var texto = obj.getAttribute("name");
      var camara = document.querySelector("#paneltext")

      obj.addEventListener('mouseenter', function () {
        
        camara.setAttribute('visible', "true");
        camara.setAttribute('text', "value: " + texto);
      });
      obj.addEventListener('mouseleave', function () {
        camara.setAttribute('visible', "false");

      });
    }
  });

  AFRAME.registerComponent('transportando', {//funcion que teletransporta a un cubo determinado
    init: function () {
      var el2 = this.el;
      var camara = document.querySelector("#control");// selecciono la camara

      var obj = document.querySelector("#controlPanel")

      el2.addEventListener('click', function () {// esta funcion va a ubicar la camara en uno de los dos cubos amarillos que hay en el escenario
        camara.setAttribute("position", {//para modificar el atributo position de camera
          x: el2.getAttribute("position").x,// extraigo la position x del cubo que estoy haciendo click y uso esa coordenada para teletransportarme
          y: el2.getAttribute("position").y+1.6,// extraigo la position y del cubo que estoy haciendo click y uso esa coordenada para teletransportarme
          z: el2.getAttribute("position").z,// extraigo la position z del cubo que estoy haciendo click y uso esa coordenada para teletransportarme

        })

        obj.setAttribute('scale','0 0 0')//ocultar panel
      })
    }
  })

  AFRAME.registerComponent('setinitial', {
    init: function () {
      var el2 = this.el;
      var camara = document.querySelector("#control");// selecciono la camara

      el2.addEventListener('click', function () {
        camara.setAttribute("position", {
          x: 0,
          y: 0,
          z: 1.8,

        })
      })
    }
  })

  AFRAME.registerComponent('windowanim', {
    init: function () {
      var view = this.el
      view.addEventListener('click', function () {

        var roty = view.getAttribute("rotation").y
        if (view.getAttribute("rotation").x == 0) {
          view.setAttribute('animation', 'property: rotation; to: -110 ' + roty + ' 0')
        } else if (view.getAttribute("rotation").x == -110) {
          view.setAttribute('animation', 'property: rotation; to: 0 ' + roty + ' 0')
        }

      });
    }
  });


  AFRAME.registerComponent('openpanel', {
    init: function () {
      
      var el =this.el
      var obj = document.querySelector("#controlPanel")

      el.addEventListener('click', function () {
        obj.setAttribute('scale', "1 1 1");
            
      });
      
    }
  });

  AFRAME.registerComponent('stopemergency', {
    init: function () {
      
      var el =this.el     
      var sonido = document.querySelector('#soundmachine')
      var emergencylight = document.querySelector('#emergencylight')
      var instructions = document.querySelector('#instructions')

      el.addEventListener('click', function () {

        instructions.setAttribute('value',"Digite el comando 'in' y luego presione la tecla 'submit', en caso de emergencia presione el botón rojo")
        emergencylight.setAttribute('light',{intensity:0.0})
        sonido.components.sound.stopSound();
        
      });
      
    }
  });

  function taskActive(command){
    var sonido = document.querySelector('#soundmachine')
    var emergencylight = document.querySelector('#emergencylight')
    var instructions = document.querySelector('#instructions')
        
    console.log(command)
    if(command=="in"){
      console.log("Activar máquina")
      emergencylight.setAttribute('light',{intensity:0.0})
      sonido.setAttribute('sound', "src:#machine; loop:true")
      sonido.components.sound.playSound();
      instructions.setAttribute('value','Tarea completada')
    }else{
      console.log("Emergencia")
      emergencylight.setAttribute('light',{intensity:1.0})
      sonido.setAttribute('sound', "src:#alarm; loop:true")
      sonido.components.sound.playSound();
    }
  }