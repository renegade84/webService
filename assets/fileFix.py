"""
Originally I thought the data in 'chelsea_twitter.json' could be directly imported into the database.
It wasn't until I tried to write the date range api that I found the sneaky data problem!
The dates in the original file import as strings using mongoimport.  In order to make them import as dates, the
'created_at' field needed to be tweaked a bit.  I did a simple search and replace here.
Note that this was written using the latest version of python 3.  It should run in python 2, but you never know!
"""
file = open("chelsea_twitter.json", "r")
fh = open("fixed.json", "w")

for line in file:
    tmp = line.replace('"created_at": ', '"created_at": {$date:')
    tmp2 = tmp.replace('", "is_retweet"', 'Z"}, "is_retweet"')
    fh.write(tmp2)

fh.close()
