(()=>{
    const backgrounds = ['url(https://static.pexels.com/photos/837265/pexels-photo-837265.jpeg)', 'url(https://static.pexels.com/photos/259280/pexels-photo-259280.jpeg)','url(https://static.pexels.com/photos/712392/pexels-photo-712392.jpeg)'];
    const body=document.body;
    const location=document.querySelector('#location');
    const degrees=document.querySelector('#degrees');
    const c=document.querySelector('#celcius');
    const f=document.querySelector('#fahrenheit');
    const jumbo=document.querySelector('#cont');
   const description=document.querySelector('#description');
   
  
    
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    }
    //Get the latitude and the longitude;
    function success(position) {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        
        fetch(`https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lng}`).then(resp => resp.json()).then(data =>{
            location.textContent=`${data.name} ${data.sys.country}`;
            degrees.textContent = `${data.main.temp} °C`;
            description.textContent=data.weather[0].description;
            c.addEventListener('click', cel);
            function cel() {
                degrees.textContent = `${data.main.temp} °C`;
            }
            f.addEventListener('click', fahr);
            function fahr() {
                degrees.textContent = `${(data.main.temp * 1.8 + 32.2).toFixed(2)} °F`
            }
            if(data.main.temp<=5){
                jumbo.classList.add('text-info');
                body.style.backgroundImage=backgrounds[0];
            }else if(data.main.temp<=35&&data.main.temp>5){
                jumbo.classList.add('text-warning');
                body.style.backgroundImage=backgrounds[1];
            }else if(data.main.temp>35){
                jumbo.classList.add('text-danger');
                body.style.backgroundImage=backgrounds[2];
            }
        });
    }

    function error() {
        alert("Geocoder failed");
    }

})()