// main.js
var weatherMap = {
    "sunny": ["Clear", "Sunny", "Unknown Precipitation", "Unknown"],
    "partlyCloudy":["Partly Cloudy", "Patches of Fog", "Shallow Fog", "Partial Fog",
        "Light Fog", "Light Fog Patches", "Heavy Fog Patches"],
    "veryCloudy": ["Heavy Fog", "Scattered Clouds"],
    "overcast": ["Overcast", "Mostly Cloudy"],
    "cold":
        ["Snow",
            "Light Snow",
            "Light Snow Grains",
            "Light Ice Crystals",
            "Light Ice Pellets",
            "Light Hail",
            "Light Low Drifting Snow",
            "Light Blowing Snow",
            "Light Snow Showers",
            "Light Snow Blowing Snow Mist",
            "Light Ice Pellet Showers",
            "Light Hail Showers",
            "Light Small Hail Showers",
            "Light Thunderstorms and Snow",
            "Light Thunderstorms and Ice Pellets",
            "Light Thunderstorms with Hail",
            "Light Thunderstorms with Small Hail",
            "Light Freezing Drizzle",
            "Light Freezing Rain",
            "Light Freezing Fog",
            "Heavy Snow",
            "Heavy Snow Grains",
            "Heavy Ice Crystals",
            "Heavy Ice Pellets",
            "Heavy Hail",
            "Heavy Low Drifting Snow",
            "Heavy Blowing Snow",
            "Heavy Snow Showers",
            "Heavy Snow Blowing Snow Mist",
            "Heavy Ice Pellet Showers",
            "Heavy Hail Showers",
            "Heavy Small Hail Showers",
            "Heavy Thunderstorms and Snow",
            "Heavy Thunderstorms and Ice Pellets",
            "Heavy Thunderstorms with Hail",
            "Heavy Thunderstorms with Small Hail",
            "Heavy Freezing Drizzle",
            "Heavy Freezing Rain",
            "Heavy Freezing Fog",
            "Small Hail"],

    "rain":
        ["Rain",
            "Light Drizzle",
            "Light Rain",
            "Light Mist",
            "Light Haze",
            "Light Spray",
            "Light Rain Mist",
            "Light Rain Showers",
            "Light Thunderstorm",
            "Light Thunderstorms and Rain",
            "Heavy Drizzle",
            "Heavy Rain",
            "Heavy Mist",
            "Heavy Haze",
            "Heavy Spray",
            "Heavy Rain Mist",
            "Heavy Rain Showers",
            "Heavy Thunderstorm",
            "Heavy Thunderstorms and Rain",
            "Squalls"],

    "windy":
        ["Windy",
            "Heavy Smoke",
            "Heavy Volcanic Ash",
            "Heavy Widespread Dust",
            "Heavy Sand",
            "Heavy Dust Whirls",
            "Heavy Sandstorm",
            "Heavy Low Drifting Widespread Dust",
            "Heavy Low Drifting Sand",
            "Heavy Blowing Widespread Dust",
            "Heavy Blowing Sand",
            "Light Smoke",
            "Light Volcanic Ash",
            "Light Widespread Dust",
            "Light Sand",
            "Light Dust Whirls",
            "Light Sandstorm",
            "Light Low Drifting Widespread Dust",
            "Light Low Drifting Sand",
            "Light Blowing Widespread Dust",
            "Light Blowing Sand",
            "Funnel Cloud"]
}

var selectCity = document.querySelector(".js-select");
var container = document.querySelector(".js-container");

var city = document.querySelector(".js-city");
var country = document.querySelector(".js-country");
var condition = document.querySelector(".js-condition");
var tempF = document.querySelector(".js-tempF");
var tempC = document.querySelector(".js-tempC");
var windDir = document.querySelector(".js-wind-direction");
var windMPH = document.querySelector(".js-mph");
var windKPH = document.querySelector(".js-kph");
var visMi = document.querySelector(".js-vis-mi");
var visKm = document.querySelector(".js-vis-km");
var weatherIcon = document.querySelector(".js-weather-icon");
var backgroundImg = document.querySelector(".hero");

selectCity.addEventListener("change", function(e){
    container.classList.remove("is-selected");
});


function loadOfflineJSON(callback) {
    var chosenCity = (selectCity && selectCity.value) ? selectCity.value: '';
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    var cityJson = null;
    if (chosenCity === "Paris") cityJson = 'data/paris.json';
    else if (chosenCity === "Las Vegas") cityJson = 'data/nv.json';
    else if (chosenCity === "San Francisco") cityJson = 'data/sanfran.json';
    else if (chosenCity === "Miami") cityJson = 'data/miami.json';
    else if (chosenCity === "Cork") cityJson = 'data/cork.json';
    else if (chosenCity === "Barcelona") cityJson = 'data/barcelona.json';

    if (!xobj) { console.info('failed to create XMLHttpRequest object');}
    xobj.open("GET", cityJson, true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState === 4) {
            if (xobj.status >= 200 && xobj.status < 300) {
                var res = (xobj.responseType === 'json') ? xobj.response : JSON.parse(xobj.responseText);
                callback(res);
            } else {
                callback({error: 'failed'});
            }
            xobj.onreadystatechange = null;
        }
    }
    xobj.send(null);
}

function updateForecast(data){
    if(data && data.current_observation){
        switchImages();
        var direction = data.current_observation.wind_dir;
        var windDirection = direction.charAt(0);
        city.innerHTML = data.current_observation.display_location.city;
        country.innerHTML = data.current_observation.display_location.state_name;
        condition.innerHTML = data.current_observation.weather;
        tempF.innerHTML = data.current_observation.temp_f;
        tempC.innerHTML = data.current_observation.temp_c;
        windDir.innerHTML = windDirection;
        windMPH.innerHTML = data.current_observation.wind_mph;
        windKPH.innerHTML = data.current_observation.wind_kph;
        visMi.innerHTML = data.current_observation.visibility_mi;
        visKm.innerHTML = data.current_observation.visibility_km;
        container.classList.add("is-selected");
        switchWeatherImages(data);
    } else {
        switchImages();
        city.innerHTML = "ERROR";
        country.innerHTML = "ERROR";
        condition.innerHTML = "ERROR";
        tempF.innerHTML = "ERROR";
        tempC.innerHTML = "ERROR";
        windDir.innerHTML = "ERROR";
        windMPH.innerHTML = "ERROR";
        windKPH.innerHTML = "ERROR";
        visMi.innerHTML = "ERROR";
        visKm.innerHTML = "ERROR";
        container.classList.add("is-selected");
        switchWeatherImages(data);
    }
}


function switchWeatherImages(data){
    var condition = data.current_observation.weather;
    if (weatherMap.partlyCloudy.indexOf(condition) > -1) {
        weatherIcon.src = "images/partly-cloudy.svg";
    } else if (weatherMap.veryCloudy.indexOf(condition) > -1) {
        weatherIcon.src = "images/very-cloudy.svg";
    } else if (weatherMap.overcast.indexOf(condition) > -1) {
        weatherIcon.src = "images/overcast.svg";
    } else if (weatherMap.cold.indexOf(condition) > -1) {
        weatherIcon.src = "images/cold.svg";
    } else if (weatherMap.rain.indexOf(condition) > -1) {
        weatherIcon.src = "images/rain.svg";
    } else {
        weatherIcon.src = "images/sunny.svg";
    }
}

function switchImages(){
    var chosenCity = (selectCity && selectCity.value) ? selectCity.value: '';
    switch(chosenCity) {
        case "Paris":
            backgroundImg.style.backgroundImage = "url('./images/paris.jpeg')";
            break;
        case "Las Vegas":
            backgroundImg.style.backgroundImage = "url('./images/vegas.jpeg')";
            break;
        case "San Francisco":
            backgroundImg.style.backgroundImage = "url('./images/sanfran.jpeg')";
            break;
        case "Miami":
            backgroundImg.style.backgroundImage = "url('./images/miami.jpeg')";
            break;
        case "Cork":
            backgroundImg.style.backgroundImage = "url('./images/cork.jpeg')";
            break;
        case "Barcelona":
            backgroundImg.style.backgroundImage = "url('./images/barcelona.jpeg')";
            break;
        default:
            backgroundImg.style.backgroundImage = "url('./images/default.jpeg')";
    }
}

function callRESTAPI() {
    var chosenCity = (selectCity && selectCity.value) ? selectCity.value: '';
    if (chosenCity.length === 0) {
        backgroundImg.style.backgroundImage = "url('./images/default.jpeg')";
        return
    }
    var resturl = null;
    var getUrl = window.location;

    var request = new XMLHttpRequest();
    if (chosenCity === "Paris"){
        request.open('GET', getUrl.protocol+ "//" + getUrl.hostname + ":" + getUrl.port + "/resorts/weather?selectedCity=Paris", true);
    }
    else if (chosenCity === "Las Vegas"){
        request.open('GET', getUrl.protocol+ "//" + getUrl.hostname + ":" + getUrl.port + "/resorts/weather?selectedCity=Las_Vegas", true);
    }
    else if (chosenCity === "San Francisco"){
        request.open('GET', getUrl.protocol+ "//" + getUrl.hostname + ":" + getUrl.port + "/resorts/weather?selectedCity=San_Francisco", true);
    }
    else if (chosenCity === "Miami"){
        request.open('GET', getUrl.protocol+ "//" + getUrl.hostname + ":" + getUrl.port + "/resorts/weather?selectedCity=Miami", true);
    }
    else if (chosenCity === "Cork"){
        request.open('GET', getUrl.protocol+ "//" + getUrl.hostname + ":" + getUrl.port + "/resorts/weather?selectedCity=Cork", true);
    }
    else if (chosenCity === "Barcelona"){
        request.open('GET', getUrl.protocol+ "//" + getUrl.hostname + ":" + getUrl.port + "/resorts/weather?selectedCity=Barcelona", true);
    }

    request.onload = function() {
        // Begin accessing JSON data here
        try{
            if (request.status != 500){
                var data = JSON.parse(this.response);
                updateForecast(data);
            }
        }catch (e){	}

        if (request.status == 500){
            // Show errors on the UI if we didnt get the data instead of using cached data.
            // Note: server side should get cached data anyway if API is not available.
            loadOfflineJSON(function(result){
                if(result) updateForecast(null);
            });
        }

        // If the liberty server has this 500 error, use cached data
        // if (request.status == 500){
        //     loadOfflineJSON(function(result){
        //         if(result) updateForecast(result);
        //     });
        // }
    };
    request.send();
}

function callAvailabilityChecker(dateObj, elem) {
    
    var resturl = null;
    var getUrl = window.location;
    var request = new XMLHttpRequest();
    
    request.open('GET', getUrl.protocol+ "//" + getUrl.hostname + ":" + getUrl.port + "/resorts/availability", true);
   
    request.onload = function() {
        // Begin accessing JSON data here
        try{
            if (request.status == 200){
                var locale = "en-us";
                var month = dateObj.toLocaleString(locale, { month: "short" }); //months from 1-12
                var day = dateObj.getDate();
                var year = dateObj.getUTCFullYear();
                elem.innerHTML = day + ' ' + month + ' ' + year;
            }
        } catch (e){}

        if (request.status != 200){
            elem.innerHTML = 'ERROR'
        }
    };
    request.send();
}
window.callAvailabilityChecker = callAvailabilityChecker;

document.addEventListener("DOMContentLoaded", function() {
        // Get the profile button and profile details div
        var profileButton = document.getElementById("profileButton");
        var profileDetails = document.querySelector(".signup-form");

        // Add event listener for the profile button click
        profileButton.addEventListener("click", function () {
            // Toggle the visibility of the profile details div
            if (profileDetails.style.display === "none") {
                profileDetails.style.display = "block";
            } else {
                profileDetails.style.display = "none";
            }
        });


        // Initialize date pickers
        var checkinDateInput = document.getElementById("checkinDate");
        var checkOutDateInput = document.getElementById("checkoutDate");


        // Add date picker to check-in date field
        checkinDateInput.addEventListener("click", function () {
            const dateInput = document.createElement("input");
            dateInput.type = "date";
            dateInput.style.display = "none";

            // Add a change event listener to capture the selected date
            dateInput.addEventListener("change", function() {
                const selectedDate = this.value;
                selectedDateDiv.textContent = `Selected Date: ${selectedDate}`;
                // You can use the selectedDate for further processing (e.g., availability check)
            });

            // Append the input element and trigger a click to open the date picker
            document.body.appendChild(dateInput);
            dateInput.click();
            document.body.removeChild(dateInput);
        });

        // Add date picker to check-in date field
        checkOutDateInput.addEventListener("click", function () {
            const dateInput = document.createElement("input");
            dateInput.type = "date";
            dateInput.style.display = "none";

            // Add a change event listener to capture the selected date
            dateInput.addEventListener("change", function() {
                const selectedDate = this.value;
                selectedDateDiv.textContent = `Selected Date: ${selectedDate}`;
                // You can use the selectedDate for further processing (e.g., availability check)
            });

            // Append the input element and trigger a click to open the date picker
            document.body.appendChild(dateInput);
            dateInput.click();
            document.body.removeChild(dateInput);
        });



        // Get the submit button
        var submitButton = document.getElementById("submitButton");

        // Add event listener for the submit button click
        submitButton.addEventListener("click", function () {
            // Hide the profile details div
            alert("Profile creation was Successful, please proceed with bookings!");
            profileDetails.style.display = "none";
            setTimeout(function () {
                successMessage.hide();
            }, 2000);

        });

    });

    // Find hotels button click event
    function findHotelsList() {

        var checkinDateInput = document.getElementById("checkinDate");
        var checkoutDateInput = document.getElementById("checkoutDate");

        // Get check-in and check-out dates
        var checkinDate = new Date(checkinDateInput.value);
        var checkoutDate = new Date(checkoutDateInput.value);

        // Validate dates
        if (!checkinDateInput.value || !checkoutDateInput.value || checkinDate >= checkoutDate) {
            alert("Please select valid check-in and check-out dates.");
            return;
        }

        // Display hotel list
        displayHotelList();
    }


    // Function to display hypothetical hotel list
    function displayHotelList() {
        // Dummy hotel data (name, price, etc.)
        var hotels = [
            { name: "JW Marriot", price: "100/night", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/ee/2d/9d/jw-marriott-hotel-mumbai.jpg?w=700&h=-1&s=1" },
            { name: "Hilton", price: "120/night", image: "https://www.embassyindia.com/sites/default/files/styles/webp_style/public/hospitality/mobile-banner/2023-06/Hilton-Manyata-Mobile%20Version-Hilton%20%26%20HGI%20Manyata%20exterior%20evening%20shot-360X437%2004.jpg.webp?itok=KJKUcgBh"},
            { name: "hotel Taj", price: "150/night", image: "https://live.staticflickr.com/3755/9199139969_a1c200d718_c.jpg" }
        ];

        // 1. Input Validation (Optional but recommended)
        if (!hotels || !Array.isArray(hotels)) {
            console.error("Invalid hotel data provided. Please ensure it's an array of objects.");
            return;
        }

        // 2. Get Hotel List Element
        var hotelList = document.getElementById("hotels");

        // 3. Clear Previous Hotel List Items
        hotelList.innerHTML = "";

        // 4. Append Hotel List Items with Richer Formatting
        var hotelTableBody = document.createElement("hotelTableBody");
        hotelTableBody.innerHTML = ""; // Clear table body before populating

        hotels.forEach(function(hotel) {
            var tableRow = document.createElement("tr");
            // Create a table row

            // Create table cell for image
            var imageCell = document.createElement("td");
            var hotelImage = document.createElement("img");
            hotelImage.src = hotel.image; // Assuming `hotel.image` contains the image path
            hotelImage.style.height = '100px'; // Set image height (optional)
            hotelImage.style.width = '100px'; // Set image width (optional)
            imageCell.appendChild(hotelImage);
            tableRow.appendChild(imageCell);

            // Create table cell for hotel name
            var nameCell = document.createElement("td");
            nameCell.style.verticalAlign = 'top';
            nameCell.style.fontWeight = 'bold';
            nameCell.style.fontSize = '20px';
            nameCell.style.color = 'black';
            nameCell.style.paddingLeft = '20px';
            nameCell.textContent = hotel.name;
            nameCell.style.paddingLeft = '13px';
            nameCell.style.whiteSpace = 'nowrap'; // Prevent text wrapping
            tableRow.appendChild(nameCell);

            // Create table cell for rating (optional)
            var ratingCell = document.createElement("div");
            var image = document.createElement("img");
            ratingCell.style.verticalAlign = 'top';
            ratingCell.classList.add("hotel-rating"); // Add CSS class for styling
            image.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtO3KfeKh9Pr4Z-obXWe_Dm38UeIsj7o2h1SW295YT&s"; // Placeholder for dynamic rating
            image.style.height = '20px';
            ratingCell.appendChild(image);
            nameCell.appendChild(ratingCell);

            // Create table cell for "Book Now" button
            var priceCell = document.createElement("td");
            priceCell.style.verticalAlign = 'top';
            priceCell.style.paddingLeft = '100px';
            priceCell.style.paddingTop = '20px';
            priceCell.style.color = 'black';
            priceCell.textContent = hotel.price;
            priceCell.style.whiteSpace = 'nowrap'; // Prevent text wrapping
            tableRow.appendChild(priceCell);

            // Create table cell for "Book Now" button
            var bookNowCell = document.createElement("td");
            bookNowCell.style.verticalAlign = 'top';
            bookNowCell.style.paddingLeft = '100px';
            bookNowCell.style.paddingTop = '20px';
            var bookNowButton = document.createElement("button");
            bookNowButton.textContent = "Book Now";
            bookNowButton.style.whiteSpace = 'nowrap'; // Prevent text wrapping
            bookNowButton.classList.add("book-now-button"); // Add CSS class for styling
            bookNowButton.addEventListener("click", function() {
                alert("Booking initiated for " + hotel.name); // Placeholder
            });
            bookNowCell.appendChild(bookNowButton);
            tableRow.appendChild(bookNowCell);

            // Append the table row to the table body
            hotelTableBody.appendChild(tableRow);
            var hotelListContainer = document.getElementById("hotelListContainer");
            hotelListContainer.appendChild(hotelTableBody);
            hotelListContainer.style.display = "block";
            hotelListContainer.classList.add("fade-in");
        });

        // 5. Show Hotel List Container with Fade-in Effect (Optional)
        var hotelListContainer = document.getElementById("hotelListContainer");
        hotelListContainer.style.display = "block";
        hotelListContainer.classList.add("fade-in");
    }

    function formatPrice(price) {
        // Implement logic to format price based on your requirements (e.g., currency symbol, thousands separator)
        // This example assumes a simple "$" prefix
        return "$" + price;
    }
