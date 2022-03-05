import pandas as pd
import pyperclip
import numpy 
import json
import pprint
pp = pprint.PrettyPrinter(indent=4)

## Initial Excel reading and dataframe creation
articleDF = pd.read_excel('C:/Users/Josep/OneDrive/Desktop/Coding/next.nutshell-news/public/NutshellSampleData.xlsx',engine='openpyxl')
#print(articleDF)
inputObj = articleDF.to_dict(orient='index')  ## Turns every row into an object
#print(inputObj)

##########
# Create a master list with objects for each unique section
##########
sectionList = []
sectionDupes = []
## Creates an object for each unique Section
for contentRowObj in inputObj.values():
    contentDict = {}
    contentDict.setdefault("Section",contentRowObj['Section'])  
    sectionDupes.append(contentDict)

## Removes duplicate Section objects for a final array of Section objects
sectionList = [i for n, i in enumerate(sectionDupes) if i not in sectionDupes[n + 1:]]
#* print(sectionList)


##########
# For each Section Object, add a list of Category objects: unique objects for each category, with CategoryName:"", CategoryPriority:"", and PostObjArray:[{}]
##########
categoryList = []
## Append the Category objects array to the original Section Object
for sectionObj in sectionList:  
    catDupes = []
    ## Filter the content down to the relevant section & Create a loop to make a list of unique Category objects
    for contentRowObj in inputObj.values():
        
        if contentRowObj['Section'] == sectionObj['Section']:    
            categoryDict = {}
            categoryDict.setdefault("CategoryName",contentRowObj['Category'])
            categoryDict.setdefault("CategoryPriority",contentRowObj['CategoryPriority'])
            catDupes.append(categoryDict)
        else:
            continue

    categoryList = [i for n, i in enumerate(catDupes) if i not in catDupes[n + 1:]]
    #print(categoryList)
    sectionObj.setdefault("CategoryArray",categoryList)
    #pp.pprint(sectionList)
    #* print(sectionList)


##########
# For each Category Object, add a list of Post objects; unique objects for each post, with PostName, PostDate, PostPriority, etc. and then a SubHeaderObjArray:[{}]
##########
for sectionObj in sectionList:
    
    for categoryObj in sectionObj['CategoryArray']:
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

        postList = [i for n, i in enumerate(postDupes) if i not in postList[n + 1:]]  
        categoryObj.setdefault("PostArray",postList)
        #pp.pprint(sectionList)
 

##########
# For each Post Object, add a list of Subheader objects; unique objects for each subheader, with SHName, SHPriority, etc. and then a BulletObjArray:[{}]
##########
for sectionObj in sectionList:
    
    for categoryObj in sectionObj['CategoryArray']:
        
        for postObj in categoryObj['PostArray']:
            shList = []
            shDupes = []
            shNames = []
        ## Iterate through the dataset rows for category match, then create the post objects to append to the post array
            for contentRowObj in inputObj.values():
                if contentRowObj['PostName'] == postObj['PostName']:
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
            postObj.setdefault("SubheaderArray",shList)
            #pp.pprint(sectionList)


##########
# For each Subheader Object, add a list of bullet objects; unique objects for each bullet, with all remaining bullet details
##########
for sectionObj in sectionList:
    
    for categoryObj in sectionObj['CategoryArray']:
        
        for postObj in categoryObj['PostArray']:

            for shObj in postObj['SubheaderArray']:
                bulletList = []
                bulletDupes = []
                bulletNames = []
            ## Iterate through the dataset rows for category match, then create the post objects to append to the post array
                for contentRowObj in inputObj.values():
                    if contentRowObj['SubheaderName'] == shObj['SubheaderName']:
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
                shObj.setdefault("BulletArray",bulletList)
                #pp.pprint(sectionList)


with open("contentOldFormat.json", "w") as write_file:
    json.dump(sectionList, write_file, indent=4)
    