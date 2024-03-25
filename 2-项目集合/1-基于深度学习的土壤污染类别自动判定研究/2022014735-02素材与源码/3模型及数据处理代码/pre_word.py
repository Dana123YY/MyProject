from docx import Document
from docx.enum.text import WD_PARAGRAPH_ALIGNMENT #设置对象居中、对齐等。
from docx.enum.text import WD_TAB_ALIGNMENT,WD_TAB_LEADER #设置制表符等
from docx.shared import Inches #设置图像大小
from docx.shared import Pt #设置像素、缩进等
from docx.shared import RGBColor #设置字体颜色
from docx.shared import Length #设置宽度
import pymongo

# 将方案及土壤类型存入数据库
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["soil_db"]
mycol = mydb["soil_paper"]
x = mycol.delete_many({})
# -*- conding:utf-8 -*-
import os
import docx
input_path="./土壤修复__word/"
file_list=os.listdir("./土壤修复__word/")
content_list=[]
for file in file_list:
    file_path=os.path.join(input_path,file)
    content = docx.Document(file_path)
    for para in content.paragraphs:
        if para.text==" " or para.text=="" or para.text=="\n":
            continue
        content_list.append(para.text)
    title=" ".join(file.replace(".docx","").split("_")[:-1])
    author=file.replace(".docx","").split("_")[-1]
    content="\n".join(content_list)
    mydict = {"title": title, "author": author, "content": content,"flag":"normal","type":""}
    print(mydict)
    x = mycol.insert_one(mydict)
    # print(content_list)
x = mycol.find_one()

print(x)

