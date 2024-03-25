from docx import Document
from docx.enum.text import WD_PARAGRAPH_ALIGNMENT #设置对象居中、对齐等。
from docx.enum.text import WD_TAB_ALIGNMENT,WD_TAB_LEADER #设置制表符等
from docx.shared import Inches #设置图像大小
from docx.shared import Pt #设置像素、缩进等
from docx.shared import RGBColor #设置字体颜色
from docx.shared import Length #设置宽度
import pymongo

# 对标注数据进行处理
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["soil_db"]
mycol = mydb["soil_news"]
x = mycol.delete_many({})
# -*- conding:utf-8 -*-
import os
import docx
input_path="./土壤修复/标注要点-数据/"
file_list=os.listdir("./土壤修复/标注要点-数据/")
content_list=[]
for file in file_list:
    file_path=os.path.join(input_path,file)
    with open(file_path,'r',encoding='utf-8')as f:
        content_list = f.read().split(' ')
    content_list=[x.strip() for x in content_list if x.strip() != '']
    title=file.replace(".txt","")
    author=""
    content="\n".join(content_list).replace("<X1>","").replace("</X1>","").replace("<X2>","").replace("</X2>","").replace("<X3>","").replace("</X3>","").replace("<X4>","").replace("</X4>","").replace("<X5>","").replace("</X5>","").replace("<X6>","").replace("</X6>","").replace("<X7>","").replace("</X7>","").replace("<X8>","").replace("</X8>","").replace("<X9>","").replace("</X9>","")
    if "专家视角" in title:
        type="专家视角"
    elif "行业观察" in title:
        type = "行业观察"
    elif "《" in title:
        type = "政策法规"
    else:
        type="行业动态"
    mydict = {"title": title, "author": author, "content": content,"flag":"normal","type":type}
    print(mydict)
    x = mycol.insert_one(mydict)
    print(content_list)
x = mycol.find_one()

print(x)

