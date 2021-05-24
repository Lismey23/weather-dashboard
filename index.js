$(document).ready(function(){

    // Grab the current date from Dayjs and display it
    console.log(dayjs())

    var todayDate = dayjs().format('MM/DD/YYYY')
    var todayForDate = dayjs().format('MM-DD-YY')
    

    var cardRow = $(".card-row")
    var inputCity = $('#city-input')
    var searchBtn= $('#searchBtn')
    var searchHistory =[]
    // var searchedCity;
    // var apiCall;

    var apiKey = '59a7b43c10837f00876d456337f39c2c'

// Add event listener to the submit button

    searchBtn.on("click", function(){
        
        var searchedCity = inputCity.val();

        // API call

        var apiCall = "http://api.openweathermap.org/data/2.5/weather?q="+searchedCity+"&units=imperial"+"&appid="+apiKey;
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
                $('#temp').text('Current Temperature: ' + data.main.temp + ' [°F]');
                // Display Humidity
                $('#humidity').text('Humidity: '+ data.main.humidity+' %');
                // Display WindSpeed
                $('#windSpeed').text('WindSpeed: '+ data.wind.speed + " MPH")

                // Local Storage

                searchHistory.push(searchedCity);
                localStorage.setItem('search', JSON.stringify(searchHistory));
                console.log(searchHistory);
               
                
             
                var currentTempIcon = $('#currentTempIcon');
                // Display the Weather Icon
                currentTempIcon.attr("src", 'http://openweathermap.org/img/wn/'+ data.weather[0].icon+'.png')

                // Display the UV Index and display the color associated with a favorable, moderate o severe condition

               
                var lat = data.coord.lat
                var lon = data.coord.lon
                var UVQueryURL = "http://api.openweathermap.org/data/2.5/onecall?lat="+ lat + "&lon=" + lon + "&appid=" + apiKey + "&cnt=1";
                fetch(UVQueryURL)
                .then(function(UvResponse){
                    UvResponse.json().then(function(res){
                        console.log(res)

                        var uvValue = res.current.uvi
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

                    var fiveDaysForecastURL = "http://api.openweathermap.org/data/2.5/forecast?q="+ searchedCity+"&appid=" + apiKey
                    fetch(fiveDaysForecastURL)
                    .then(function(FiveDForec){
                        FiveDForec.json().then(function(answer){
                            console.log(answer);

                            // var fiveDayForecastHTML = `
                            // <h4>5 Day Forecast:</h4>
                            // <div id='fiveDayForecast' class='d-inline-flex flex-wrap'> `
                            
                            for (var i = 0; answer.list.length; i+=8 ) {
                                var cityObj = {
                                    date: answer.list[i].dt_txt,
                                    icon: answer.list[i].weather[0].icon,
                                    temp: answer.list[i].main.temp,
                                    humidity: answer.list[i].main.humidity
                                }
                                var dateFor = cityObj.date;
                                var updateDateFormat = dateFor.substring(0, 10);
                                var weatherIcon = `http:///openweathermap.org/img/w/${cityObj.icon}.png`;
                            
                                createCard(updateDateFormat, weatherIcon, cityObj.temp , cityObj.humidity)
                            }

                       
                        })
                    })

                    
                   
                })


                
               


            })}
            else {
                $('#currentCity').text('Please enter a valid City Name')

            }
        })




       
       
       


     function createCard (date, icon, temp, humidity) {

        let fiveDayCard = $("<div>").attr("class", "five-day-card");
        let cardDate = $("<h5>").attr("class", "card-text");
        let cardIcon = $("<img>").attr("class", "weatherIcon");
        let cardTemp = $("<p>").attr("class", "card-text");
        let cardHumidity = $("<p>").attr("class", "card-text");
        
    
        cardRow.append(fiveDayCard);

        cardDate.text(date);
        cardIcon.attr("src", icon);
        cardTemp.text(`Temp: ${temp} °F`);
        cardHumidity.text(`Humidity: ${humidity}%`);
        fiveDayCard.append(cardDate, cardIcon, cardTemp, cardHumidity);
    }






     })

    //  function updateSearchHistory () {
    //      var newCity = JSON.parse(localStorage.getItem("search"));
         
        
    //     // for (i=0; i<= newCity.length; i++){

    //     //     var listEl = $("<li>");
    //     //     $(listEl).attr('class','list-group-item');
    //     //     $(listEl).attr('data-value');
    //     //     $('.list-group').append(listEl)
           
            

    //     //  }
         
        
        
        
         
    //     //     var oldData= JSON.parse(localStorage.getItem("search"))
    //     //     var addCity = $("<li>")
    //     //     addCity.attr("value", );
    //     //     addCity.attr("type", "text");
    //     //     document.getElementsByClassName('history').innerHTML= JSON.parse(localStorage.getItem("search"))
    //     // // localStorage.getItem("search")
    //     // //  var addCity = $("<li>")
    //     // //  addCity.val('searchedCity')
    //     // //  addCity.appendTo('.history')

    //  }
   
    
        
        



   

})


