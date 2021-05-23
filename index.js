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

                $(".currentConditions").removeClass('currentConditions')
                $(".currentConditions").addClass("contentShow")
                

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
                // Display the Weather Icon
                currentTempIcon.attr("src", 'http://openweathermap.org/img/wn/'+ data.weather[0].icon+'.png')

                // Display the UV Index and display the color associated with a favorable, moderate o severe condition

               
                const lat = data.coord.lat
                const lon = data.coord.lon
                let UVQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat="+ lat + "&lon=" + lon + "&appid=" + apiKey + "&cnt=1";
                fetch(UVQueryURL)
                .then(function(UvResponse){
                    UvResponse.json().then(function(res){
                        console.log(res)

                        const uvValue = res.current.uvi
                        console.log(uvValue)
                        $("#uvIndex").text('UV Index: '+ uvValue)
                        

                        if( uvValue>=0 && uvValue<3){
                            $('#uvIndex').addClass('lowRisk');

                        }
                        else if(uvValue>=3 && uvValue<8){
                            $('#uvIndex').addClass('moderateRisk');


                        }
                        else if (uvValue >=8){
                            $('#uvIndex').addClass('severeRisk');

                        }
                       
                    })
                    
                    // Five days Forecast 

                    let fiveDaysForecastURL = "https://api.openweathermap.org/data/2.5/forecast?q="+ searchedCity+"&appid=" + apiKey
                    fetch(fiveDaysForecastURL)
                    .then(function(FiveDForec){
                        FiveDForec.json().then(function(answer){
                            console.log(answer);

                            

                            



                        })
                    })

                    
                   
                })


                
               


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


