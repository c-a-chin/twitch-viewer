// regular twitch streamers
var streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "Ninja"];
// streamerInfo is for info on streamer, streamInfo is for info on if they are streaming or not
var streamerInfo = [];
var streamInfo = [];

// function to get all streamer info for streamers and put into streamerInfo/streamInfo array
function getStreamerInfo(i = 0){
	if(i < streamers.length){
		var url = "https://wind-bow.glitch.me/twitch-api/users/" + streamers[i];
		fetch(url)
		.then((response) => {
			response.json().then(data => {
				streamerInfo.push(data);
				// get info on whether or not the user is streaming
				var url2 = "https://wind-bow.glitch.me/twitch-api/streams/" + streamerInfo[i].display_name;
				fetch(url2)
				.then(response2 => {
					response2.json().then(data2 => {
						streamInfo.push(data2);
						i++;
						getStreamerInfo(i);
					});
				});
			});
		});
	} else {
		displayStreamerInfo();
	};
};

// function to display all streamer info in the ALL column on page
function displayStreamerInfo(i = 0){
	if(i < streamerInfo.length){
		// if streamer bio is null, make it say "no bio found"
		if(streamerInfo[i].bio === null){
			streamerInfo[i].bio = "No description found for this streamer :(";
		};

		// if streaming -- append info to page with "online" class
		if(streamInfo[i].stream != null){
			var userUrl = "https://www.twitch.tv/" + streamerInfo[i].name;

			$(".body").append(`
				<div id="item-${i}" class="flex-item-body online">
					<img src="${streamerInfo[i].logo}">
					<a href="${userUrl}" target="_blank"><h2>${streamerInfo[i].display_name}</h2></a>
					<p>${streamerInfo[i].bio}</p>

					<p id="streamInfo">
					<em>Streaming: ${streamInfo[i].stream.game}</em><br>
					Viewers: ${streamInfo[i].stream.viewers}
					</p>
					<img class="preview" src="${streamInfo[i].stream.preview.large}">
				</div>
			`)
			// initially hide stream info, show it on mouseenter
			$(`#item-${i}`).find("#streamInfo").hide();
			$(`#item-${i}`).find(".preview").hide();

			// add on hover listener to display extra info
			$(`#item-${i}`).mouseenter(function(){
				$(this).find(".preview").css("width", "20%");
				$(this).find("p").toggle();
				$(this).find(".preview").show();
				$(this).find(".preview").css("width", "100%");
			})
			$(`#item-${i}`).mouseleave(function(){
				$(this).find("p").toggle();
				$(this).find(".preview").css("width", "0%");
			})

			// keep running until all streamers are displayed
			i++;
			displayStreamerInfo(i);

		} else {
		// if not streaming -- append info to page with "offline" class
			$(".body").append(`
				<div class="flex-item-body offline">
					<img src="${streamerInfo[i].logo}">
					<a href="${userUrl}" target="_blank"><h2>${streamerInfo[i].display_name}</h2></a>
					<p>${streamerInfo[i].bio}</p>
				</div>
			`)
			// keep running until all streamers are displayed
			i++;
			displayStreamerInfo(i);
		};
	// when all info has been displayed
	} else {
		console.log("DONE");
	};
};

getStreamerInfo();




// BUTTONS IN NAV BAR
$("#nav-all").on("click", function(){
	// hide first, so that they can fade in
	$(".online").hide();
	$(".offline").hide();

	$(".online").fadeIn(500);
	$(".offline").fadeIn(500);
});
$("#nav-online").on("click", function(){
	// hide first, so that they can fade in
	$(".online").hide();
	$(".offline").hide();

	$(".online").fadeIn(500);
});
$("#nav-offline").on("click", function(){
	// hide first, so that they can fade in
	$(".online").hide();
	$(".offline").hide();

	$(".offline").fadeIn(500);
});