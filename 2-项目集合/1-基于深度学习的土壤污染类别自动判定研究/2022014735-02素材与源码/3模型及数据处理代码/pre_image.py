import os
import shutil

# 对土壤图片进行锐化、增强处理
target_path="D:/document/desktop/temp/soil_image_spider/used_dataset/"
pos_path="D:/document/desktop/temp/soil_image_spider/pos/"
neg_path="D:/document/desktop/temp/soil_image_spider/neg/"
content=[]
file_list=os.listdir(pos_path)
for index in range(len(file_list)):
    file=file_list[index]
    #shutil.copy(os.path.join(pos_path,file),os.path.join(target_path,'pos%03d.jpg'%(index+1)))
    content.append('pos%03d.jpg'%(index+1)+',benign')


file_list=os.listdir(neg_path)
for index in range(len(file_list)):
    file=file_list[index]
    #shutil.copy(os.path.join(neg_path,file),os.path.join(target_path,'neg%03d.jpg'%(index+1)))
    content.append('neg%03d.jpg'%(index+1)+',malignant')

with open('small_dataset.txt','w',encoding='utf-8') as f:
    f.write("\n".join(content))