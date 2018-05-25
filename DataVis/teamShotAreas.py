import json 
import nba_py 
import sys

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

