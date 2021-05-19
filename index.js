$(document).ready(function(){

    // Grab the current date from Dayjs and display it
    console.log(dayjs())

    const todayDate = dayjs().format('MM/DD/YYYY')
    const todayForDate = dayjs().format('MM-DD-YY')
    

    // console.log('todayDate')
    // // Display the date on the page
    // $("#currentDate").text(todayDate);

    
    const inputCity = $('#city-input')
    const searchBtn= $('#searchBtn')
    const searchHistory =[]
    // const searchedCity;
    // const apiCall;

    const apiKey = 'cb8354f1acd21f6fe1ac79701f78a219'

// Add event listener to the submit button

    searchBtn.on("click", function(){
        
        const searchedCity = inputCity.val();

        // API call

        const apiCall = "http://api.openweathermap.org/data/2.5/weather?q="+searchedCity+"&units=imperial"+"&appid="+apiKey;
        console.log(apiCall);
        fetch(apiCall)
        .then(function(response){
            if(response.ok){
            console.log(response);
            response.json().then(function(data){
                console.log(data);


                // Display The Searched City by User

                $('#currentCity').text(searchedCity);

                //  Display today's date
                $('#today').text("Weather Conditions ["+ todayForDate + "]")
                // Displau temperature
                $('#temp').text('Current Temperature: ' + data.main.temp + ' [F]');
                // Display Humidity
                $('#humidity').text('Humidity: '+ data.main.humidity+' %');
                // Display WindSpeed
                $('#windSpeed').text('WindSpeed: '+ data.wind.speed + " MPH")

                
                const currentTempIcon = $('#currentTempIcon');
                
                currentTempIcon.attr("src", 'http://openweathermap.org/img/wn/'+ data.weather[0].icon+'.png')




                // var weatherIcon = document.createElement("img")
                // weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
                // citySearchInputEl.appendChild(weatherIcon);


            })}
            else {
                $('#currentCity').text('Please enter a valid City Name');

            }
        })




        console.log(searchedCity)
        // getWeather(searchedCity);
        // searchHistory.push(searchedCity);
        // console.log(searchHistory);
        // localStorage.setItem('search',JSON.stringify(searchHistory))
     //    updateSearchedHistory();









     })
   
    // function getWeather(cityName){

    //     let queryURL= "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKEY;
    //     axios.get(queryURL)
    //     .then(function(response){
    //         console.log(response)
    //     })

        
        

    // }

    // searchBtn.on("click", function(){
        
    //     const searchedCity = inputCity.value;
    //     console.log(searchedCity)
    //     getWeather(searchedCity);
    //     searchHistory.push(searchedCity);
    //     console.log(searchHistory);
    //     localStorage.setItem('search',JSON.stringify(searchHistory))
    //  //    updateSearchedHistory();

    //  })

})


