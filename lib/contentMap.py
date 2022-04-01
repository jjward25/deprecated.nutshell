import pandas as pd
import json
import pprint
from operator import itemgetter
pp = pprint.PrettyPrinter(indent=4)

## Initial Excel reading and dataframe creation
articleDF = pd.read_excel('C:/Users/Josep/OneDrive/Desktop/Coding/nutshell/public/NutshellSampleData.xlsx',engine='openpyxl',sheet_name='Content',na_values="")
#print(articleDF)
inputObj = articleDF.to_dict(orient='index')  ## Turns every row into an object
#print(inputObj)

##########
# Create a master list with objects for each unique section
##########
sectionList = []
## Creates a key:value pair for each section, with an array for categories
for contentRowObj in inputObj.values():
        if contentRowObj['Section'] not in sectionList:
            sectionList.append(contentRowObj['Section'])           
print(sectionList)

########
# Create arrays of Category object for each section
########
contentArray=[]
sectionObj = {}
for section in sectionList:      
    categoryList = []
    catDupes = []
    for contentRowObj in inputObj.values():
        ## If the Section column in the excel file = the section name for this loop, create an object for that row's catgory
        if contentRowObj['Section'] == section:
            categoryDict = {}   
            categoryDict.setdefault("CategoryName",contentRowObj['Category'])
            categoryDict.setdefault("CategoryPriority",contentRowObj['CategoryPriority'])
            catDupes.append(categoryDict)            
        else:
            continue    
        ## Remove the duplicates from that category's list of objects
        categoryList = [i for n, i in enumerate(catDupes) if i not in catDupes[n + 1:]]
        categoryList = sorted(categoryList, key=itemgetter('CategoryPriority')) 
        ## Define a section object with that category's categoryList as the value (and section name as the key)
        sectionObj['Section']=contentRowObj['Section']
        sectionObj['Categories']=categoryList
    contentArray.append(sectionObj)
    sectionObj={}
#print(contentArray)


##########
# For each Category Object, add a list of Post objects; unique objects for each post, with PostName, PostDate, PostPriority, etc. and then a SubHeaderObjArray:[{}]
##########
for sectionObj in contentArray:
    #print(sectionObj)
    for categoryObj in sectionObj['Categories']:
        #print(categoryObj)
        #print(categoryObj)
        postList = []
        postDupes = []
        postNames = []
        ## Iterate through the dataset rows for category match, then create the post objects to append to the post array
        for contentRowObj in inputObj.values():
            if contentRowObj['Category'] == categoryObj['CategoryName']:
                postDict = {}
                postDict.setdefault("PostName",contentRowObj['PostName'])
                postDict.setdefault("PostPriority",contentRowObj['PostPriority'])
                postDict.setdefault("PostDate",contentRowObj['PostDate'])
                postDict.setdefault("PostUpDate",contentRowObj['PostUpDate'])
                
                if contentRowObj['PostName'] not in postNames:
                    postDupes.append(postDict)
                    postNames.append(contentRowObj['PostName']) ## Fill list w postNames so the next time the postName comes up it's in the list and no object will be created
                else:
                    continue
            else:
                continue
        ## Remove Dupes
        postList = [i for n, i in enumerate(postDupes) if i not in postList[n + 1:]]  
        ## If the Category is Current Events, sort by descending PostDate instead of PostPriority
        if  categoryObj['CategoryName'] == "Current Events":
            postList = sorted(postList, key=itemgetter('PostDate'),reverse=True) 
        else:
            postList = sorted(postList, key=itemgetter('PostPriority')) 
        categoryObj.setdefault("PostArray",postList)

#print(contentArray)

##########
# For each Post Object, add a list of Subheader objects; unique objects for each subheader, with SHName, SHPriority, etc. and then a BulletObjArray:[{}]
##########
for sectionObj in contentArray:
    #print(sectionObj)
    for categoryObj in sectionObj['Categories']:
        
        for postObj in categoryObj['PostArray']:
            shList = []
            shDupes = []
            shNames = []
        ## Iterate through the dataset rows for category match, then create the post objects to append to the post array
            for contentRowObj in inputObj.values():
                if contentRowObj['PostName']+categoryObj['CategoryName'] == postObj['PostName']+ contentRowObj['Category']:
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
            #pp.pprint(sectionList)


##########
# For each Subheader Object, add a list of bullet objects; unique objects for each bullet, with all remaining bullet details
##########
for sectionObj in contentArray:
    #print(sectionObj)
    for categoryObj in sectionObj['Categories']:
        
        for postObj in categoryObj['PostArray']:

            for shObj in postObj['SubheaderArray']:  ## For each subheader 
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
                #pp.pprint(sectionList)

##contentArray = []
##pp.pprint(contentArray)
with open("contentMap.json", "w") as write_file:
    json.dump(contentArray, write_file, indent=4)
    