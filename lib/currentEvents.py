import pandas as pd
import json
import pprint
from operator import itemgetter
pp = pprint.PrettyPrinter(indent=4)

## Initial Excel reading and dataframe creation
articleDF = pd.read_excel('C:/Users/Josep/OneDrive/Desktop/Coding/nutshell/public/NutshellSampleData.xlsx',engine='openpyxl')
#print(articleDF)
inputObj = articleDF.to_dict(orient='index')  ## Turns every row into an object
#print(inputObj)

########
# Create arrays of Category object for each section
########
contentObjList = []
postObjList = []
postDupes = []
postNames=[]
for contentRowObj in inputObj.values():
    if contentRowObj['Category'] == 'Current Events':
        bulletDict = {}   
        bulletDict.setdefault("Section",contentRowObj['Section'])
        bulletDict.setdefault("Category",contentRowObj['Category'])
        bulletDict.setdefault("CategoryPriority",contentRowObj['CategoryPriority']) 
        bulletDict.setdefault("PostName",contentRowObj['PostName'])
        bulletDict.setdefault("PostPriority",contentRowObj['PostPriority'])
        bulletDict.setdefault("PostDate",contentRowObj['PostDate'])
        bulletDict.setdefault("PostUpDate",contentRowObj['PostUpDate']) 
        bulletDict.setdefault("SubheaderName",contentRowObj['SubheaderName']) 
        bulletDict.setdefault("SubheaderPriority",contentRowObj['SubheaderPriority']) 
        bulletDict.setdefault("BulletText",contentRowObj['BulletText']) 
        bulletDict.setdefault("BulletPriority",contentRowObj['BulletPriority']) 
        bulletDict.setdefault("BulletCite",contentRowObj['BulletCite']) 
        bulletDict.setdefault("BulletLink",contentRowObj['BulletLink']) 
        bulletDict.setdefault("BulletPostDate",contentRowObj['BulletPostDate']) 
        bulletDict.setdefault("BulletUpDate",contentRowObj['BulletUpDate']) 
        
        
        postDupes.append(bulletDict)
        postNames.append(contentRowObj['PostName']) ## Fill list w postNames so the next time the postName comes up it's in the list and no object will be created    
        contentObjList.append(bulletDict)

contentObjList = [i for n, i in enumerate(postDupes) if i not in contentObjList[n + 1:]] 
contentObjList = sorted(contentObjList, key=lambda k: (-k['PostPriority'], k['SubheaderPriority'], k['BulletPriority']))


#pp.pprint(contentObjList)
with open("cePostList.json", "w") as write_file:
    json.dump(contentObjList, write_file, indent=4)
