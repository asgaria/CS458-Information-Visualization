const jitterAmount = 15.0;
var c = document.getElementById("visualization");
var ctx = c.getContext("2d");

function lerp(v0, v1, t) {
	if(t > 1.0) {
		return v1;
	}
	if(t < 0) {
		return v0;
	}
	return (1 - t) * v0 + t * v1;
}

function decToColorChannel(num) { 
  var hex = Number(num).toString(16);
  if (hex.length < 2) {
       hex = "0" + hex;
  }
  return hex;
}

function drawShot(xPos, yPos, color) {
	ctx.fillStyle= color;
	ctx.globalAlpha = 0.1;
	ctx.beginPath();
	ctx.arc(xPos, yPos, 50, 0, 2*Math.PI);
	ctx.fill();
	ctx.globalAlpha = 1.0;
}

function drawCourt() {
	var courtImg = document.getElementById('court');
	ctx.drawImage(courtImg, 0, 0);
}

function drawLabel(xPos, yPos, label, attempted, made, average) {
	ctx.font = "15px Arial";
	ctx.fillStyle = "black";
	var percentage = (made/attempted) * 100;
	var roundedPercentage = Math.round(percentage*10) / 10;

	var width = ctx.measureText(label).width;
	ctx.fillText(label, xPos - width/2, yPos - 22);
	ctx.fillText((roundedPercentage) + "%", xPos - width/2, yPos - 7);
	ctx.fillText(made + " of " + attempted, xPos - width/2, yPos + 8);
	ctx.fillText("LA: " + Math.round((average * 100) * 10) / 10 + "%", xPos - width/2, yPos + 23);
}

function calcColor(fgPercent, leagueAvg) {
	var color;
	
	if(fgPercent < leagueAvg) {
		var t = (0.5 / leagueAvg) * fgPercent;
		var red = Math.floor(lerp(255, 128, t));
		var green = Math.floor(lerp(0, 128, t));
		var blue = Math.floor(lerp(0, 0, t));
		color = "#" + decToColorChannel(red) + decToColorChannel(green) + decToColorChannel(blue);
	}
	else {
		var t = (0.5 / leagueAvg) * fgPercent;
		var red = Math.floor(lerp(128, 0, t));
		var green = Math.floor(lerp(128, 255, t));
		var blue = Math.floor(lerp(0, 0, t));
		color = "#" + decToColorChannel(red) + decToColorChannel(green) + decToColorChannel(blue);
	}
	
	return color;
}

function fillPlayerInfo(generalData, headlineData)
{
	var photoElement = document.getElementById("playerPhoto");
	var nameElement = document.getElementById("name");
	var positionElement = document.getElementById("position");
	var teamElement = document.getElementById("team");
	var heightElement = document.getElementById("height");
	var weightElement = document.getElementById("weight");

	var ptsElement = document.getElementById("pts");
	var rebElement = document.getElementById("reb");
	var astElement = document.getElementById("ast");

	photoElement.src = generalData["link"];
	positionElement.textContent = generalData["POSITION"];
	nameElement.textContent = generalData["DISPLAY_FIRST_LAST"];
	heightElement.textContent = generalData["HEIGHT"];
	weightElement.textContent = generalData["WEIGHT"];
	teamElement.textContent = generalData["TEAM_CITY"] + " " + generalData["TEAM_NAME"];

	ptsElement.textContent = headlineData["PTS"];
	rebElement.textContent = headlineData["REB"];
	astElement.textContent = headlineData["AST"];

}

function main() {

	var leagueAvgs = JSON.parse(averages);
	var shotData =  JSON.parse(shots);
	var generalData = JSON.parse(generalInfo);
	var headlineData = JSON.parse(headlineInfo);

	fillPlayerInfo(generalData[0], headlineData[0]);
	
	drawCourt();
	
	for(var i=0; i<shotData.length; i++) {
		if(shotData[i].GROUP_VALUE == "Restricted Area") {
			var color = calcColor(shotData[i].FG_PCT, leagueAvgs.RESTRICTED_AREA);
			for(var j=0; j<Math.ceil(shotData[i].FGA/10); j++) {
				drawShot(300 + ((Math.random() * 2) - 1) * jitterAmount, 100 + ((Math.random() * 2) - 1) * jitterAmount, color);//yPos originally 140
			}
			drawLabel(300, 100, "Restricted Area", shotData[i].FGA, shotData[i].FGM, leagueAvgs.RESTRICTED_AREA); //yPos originally 140
		}
		else if(shotData[i].GROUP_VALUE == "In The Paint (Non-RA)") {
			var color = calcColor(shotData[i].FG_PCT, leagueAvgs.IN_THE_PAINT_NON_RA);
			for(var j=0; j<Math.ceil(shotData[i].FGA/10); j++) {
				drawShot(300 + ((Math.random() * 2) - 1) * jitterAmount, 250 + ((Math.random() * 2) - 1) * jitterAmount, color);
			}
			drawLabel(300, 250, "In the Paint (Non-RA)", shotData[i].FGA, shotData[i].FGM, leagueAvgs.IN_THE_PAINT_NON_RA);
		}
		else if(shotData[i].GROUP_VALUE == "Right Corner 3") {
			var color = calcColor(shotData[i].FG_PCT, leagueAvgs.RIGHT_CORNER_3);
			for(var j=0; j<Math.ceil(shotData[i].FGA/10); j++) {
				drawShot(590 + ((Math.random() * 2) - 1) * jitterAmount, 75 + ((Math.random() * 2) - 1) * jitterAmount, color);
			}
			drawLabel(550, 75, "Right Corner 3", shotData[i].FGA, shotData[i].FGM, leagueAvgs.RIGHT_CORNER_3);
		}
		else if(shotData[i].GROUP_VALUE == "Left Corner 3") {
			var color = calcColor(shotData[i].FG_PCT, leagueAvgs.LEFT_CORNER_3);
			for(var j=0; j<Math.ceil(shotData[i].FGA/10); j++) {
				drawShot(10 + ((Math.random() * 2) - 1) * jitterAmount, 75 + ((Math.random() * 2) - 1) * jitterAmount, color);
			}
			drawLabel(50, 75, "Left Corner 3", shotData[i].FGA, shotData[i].FGM, leagueAvgs.LEFT_CORNER_3);
		}
		else if(shotData[i].GROUP_VALUE == "Mid-Range") {
			var color = calcColor(shotData[i].FG_PCT, leagueAvgs.MID_RANGE);
			for(var j=0; j<Math.ceil(shotData[i].FGA/10); j++) {
				drawShot(460 + ((Math.random() * 2) - 1) * jitterAmount, 190 + ((Math.random() * 2) - 1) * jitterAmount, color);
			}
			drawLabel(460, 190, "Mid-Range", shotData[i].FGA, shotData[i].FGM, leagueAvgs.MID_RANGE);
		}
		else if(shotData[i].GROUP_VALUE == "Above the Break 3") {
			var color = calcColor(shotData[i].FG_PCT, leagueAvgs.ABOVE_THE_BREAK_3);
			for(var j=0; j<Math.ceil(shotData[i].FGA/10); j++) {
				drawShot(300 + ((Math.random() * 2) - 1) * jitterAmount, 420 + ((Math.random() * 2) - 1) * jitterAmount, color);
			}
			drawLabel(300, 420, "Above the Break 3", shotData[i].FGA, shotData[i].FGM, leagueAvgs.ABOVE_THE_BREAK_3);
		}
	}
}