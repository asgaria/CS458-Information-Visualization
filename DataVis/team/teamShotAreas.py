import json 
import nba_py 
import sys
import webbrowser
import os
from nba_py import team as team 
from nba_py import constants as constants

teams = constants.TEAMS

teamAbbrev = sys.argv[1]

singleTeam = teams[teamAbbrev]

teamID = singleTeam["id"]

teamShootingSplits = team.TeamShootingSplits(teamID).shot_areas()

print json.dumps(singleTeam, indent=4)
print (teamID)
print json.dumps(teamShootingSplits, indent=4)

teamInfo = team.TeamSummary(teamID).info();
print json.dumps(teamInfo, indent=4)

with open('teamShots.json', 'w') as f:
	f.write("teamShots='" + json.dumps(teamShootingSplits) + "'")

with open('teamInfo.json', 'w') as f:
	f.write("teamInfo='" + json.dumps(teamInfo) + "'")

webbrowser.open("file://" + os.path.realpath("team.html"))
