import pandas as pd
import json
import pprint
from operator import itemgetter
pp = pprint.PrettyPrinter(indent=4)

## Initial Excel reading and dataframe creation
articleDF = pd.read_excel('C:/Users/Josep/OneDrive/Desktop/Coding/nutshell/public/NutshellSampleData.xlsx',engine='openpyxl',na_values="")
#print(articleDF)
inputObj = articleDF.to_dict(orient='index')  ## Turns every row into an object
#print(inputObj)

##########
# Create a master list with string values for each postname
##########
postList = []
for contentRowObj in inputObj.values():
        if contentRowObj['PostName'] not in postList:
            postList.append(contentRowObj['PostName'])           
print(postList)

########
# Create arrays of post objects 
########
contentObjList = []
for post in postList:
    postObjList = []
    postDupes = []
    postNames=[]
    for contentRowObj in inputObj.values():
        if contentRowObj['PostName'] == post:
            postDict = {}   
            postDict.setdefault("PostName",contentRowObj['PostName'])
            postDict.setdefault("PostPriority",contentRowObj['PostPriority'])
            postDict.setdefault("PostDate",contentRowObj['PostDate'])
            postDict.setdefault("PostUpDate",contentRowObj['PostUpDate'])
            postDict.setdefault("Category",contentRowObj['Category'])
            postDict.setdefault("Section",contentRowObj['Section'])
            postObjList = [i for n, i in enumerate(postDupes) if i not in postObjList[n + 1:]] 
            postObjList = sorted(postObjList, key=itemgetter('PostPriority'))  
            if contentRowObj['PostName'] in postNames:
               continue
            else:
                postDupes.append(postDict)
                postNames.append(contentRowObj['PostName']) ## Fill list w postNames so the next time the postName comes up it's in the list and no object will be created    
            contentObjList.append(postDict)
#print(contentObjList)

## Subheaders
for postObj in contentObjList:     
    shList = []
    shDupes = []
    shNames = []
## Iterate through the dataset rows for category match, then create the post objects to append to the post array
    for contentRowObj in inputObj.values():
        if contentRowObj['PostName'] == postObj['PostName'] and contentRowObj['Category'] == postObj['Category']:
            shDict = {}
            shDict.setdefault("SubheaderName",contentRowObj['SubheaderName'])
            shDict.setdefault("SubheaderPriority",contentRowObj['SubheaderPriority'])
            
            if contentRowObj['SubheaderName'] not in shNames:
                shDupes.append(shDict)
                shNames.append(contentRowObj['SubheaderName']) ## Fill list w postNames so the next time the postName comes up it's in the list and no object will be created
            else:
                continue
        else:
            continue
    shList = [i for n, i in enumerate(shDupes) if i not in shList[n + 1:]]  
    shList = sorted(shList, key=itemgetter('SubheaderPriority'))  
    postObj.setdefault("SubheaderArray",shList)
#print(postObjList)

## Bullets
for postObj in contentObjList:   
    for shObj in postObj['SubheaderArray']:
        bulletList = []
        bulletDupes = []
        bulletNames = []
        for contentRowObj in inputObj.values(): ## Iterate through the dataset rows for a subheader match, then create the post objects to append to the post array
            if contentRowObj['PostName']+contentRowObj['SubheaderName'] == postObj['PostName']+shObj['SubheaderName']:
                bulletDict = {}
                bulletDict.setdefault("BulletText",contentRowObj['BulletText'])
                bulletDict.setdefault("BulletPriority",contentRowObj['BulletPriority'])
                bulletDict.setdefault("BulletCite",contentRowObj['BulletCite'])
                bulletDict.setdefault("BulletLink",contentRowObj['BulletLink'])
                bulletDict.setdefault("BulletPostDate",contentRowObj['BulletPostDate'])
                bulletDict.setdefault("BulletUpDate",contentRowObj['BulletUpDate'])
                
                if contentRowObj['BulletText'] not in bulletNames:
                    bulletDupes.append(bulletDict)
                    bulletNames.append(contentRowObj['BulletText']) 
                else:
                    continue
            else:
                continue

        bulletList = [i for n, i in enumerate(bulletDupes) if i not in bulletList[n + 1:]]  
        bulletList = sorted(bulletList, key=itemgetter('BulletPriority'))  
        shObj.setdefault("BulletArray",bulletList)
#print(postObjList)

#pp.pprint(contentObjList)
with open("postObjList.json", "w") as write_file:
    json.dump(contentObjList, write_file, indent=4)
