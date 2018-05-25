import nba_py
import json
import sys
import webbrowser

from nba_py import team as team
from nba_py import player as p
from nba_py import constants as constants


firstName = sys.argv[1]
lastName = sys.argv[2]

print(firstName + " " +  lastName + " " + "Stats")
pID = (p.get_player(firstName, lastName))


shootingSplits = p.PlayerShootingSplits(pID).shot_areas()
playerPhotoLink = "http://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/" +  str(pID) + ".png"
linkJSON = {}
linkJSON['link'] = playerPhotoLink

twoMade = 0
twoAttempted = 0

threeMade = 0
threeAttempted = 0


for val in shootingSplits:
    if(('3' in val["GROUP_VALUE"]) or (val["GROUP_VALUE"] == "Backcourt")):
        threeMade += val["FGM"]
        threeAttempted += val["FGA"]
    else:
        twoMade += val["FGM"]
        twoAttempted += val["FGA"]
    print(val["GROUP_VALUE"])
    print("FG%: " + str(val["FG_PCT"]) + " " + str(val["FGM"]) + "/" + str(val["FGA"]))

totalMade = twoMade + threeMade
totalAttempted = twoAttempted + threeAttempted

print("2's made: " + str(twoMade) + " 2's Attempted " + str(twoAttempted)) 
print("3's made: " + str(threeMade) + " 3's Attempted: " + str(threeAttempted))
print("Total shots made: " + str(totalMade) + " Total shots attempted: " + str(totalAttempted)) 

with open('shots.json', 'w') as f:
	f.write("shots='" + json.dumps(shootingSplits) + "'")

with open('profilePhotoLink.json', 'w') as f:
    f.write("link='" + json.dumps(linkJSON) + "'")

webbrowser.open("page.html")
