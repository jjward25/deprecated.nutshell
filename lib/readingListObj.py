import pandas as pd
import json
import pprint
from operator import itemgetter
pp = pprint.PrettyPrinter(indent=4)
import operator

## Initial Excel reading and dataframe creation
articleDF = pd.read_excel('C:/Users/Josep/OneDrive/Desktop/Coding/nutshell/public/NutshellSampleData.xlsx',engine='openpyxl')
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
# Create arrays of Post objects
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

print(contentObjList)

## Subheaders
for postObj in contentObjList:     
    shList = []
    shDupes = []
    shNames = []
## Iterate through the dataset rows for category match, then create the post objects to append to the post array
    for contentRowObj in inputObj.values():
        if contentRowObj['PostName'] == postObj['PostName']:
            shDict = {}
            shDict.setdefault("SubheaderName",contentRowObj['SubheaderName'])
            shDict.setdefault("SubheaderPriority",contentRowObj['SubheaderPriority'])
            shDict.setdefault("BulletText",contentRowObj['BulletText'])
            shDict.setdefault("BulletPriority",contentRowObj['BulletPriority'])
            shDict.setdefault("BulletCite",contentRowObj['BulletCite'])
            shDict.setdefault("BulletLink",contentRowObj['BulletLink'])
            shDict.setdefault("BulletPostDate",contentRowObj['BulletPostDate'])
            shDict.setdefault("BulletUpDate",contentRowObj['BulletUpDate'])
            
            if contentRowObj['BulletText'] not in shNames:
                shDupes.append(shDict)
                shNames.append(contentRowObj['BulletText']) ## Fill list w postNames so the next time the postName comes up it's in the list and no object will be created
            else:
                continue
        else:
            continue
    shList = [i for n, i in enumerate(shDupes) if i not in shList[n + 1:]]  
    ## Sort into tuples to order by subheader then bullet priorities
    shList.sort(key = operator.itemgetter('SubheaderPriority', 'BulletPriority'))
    print(shList)
    postObj.setdefault("SubheaderArray",shList)
#print(postObjList)


#pp.pprint(contentObjList)
with open("readingListObjs.json", "w") as write_file:
    json.dump(contentObjList, write_file, indent=4)
