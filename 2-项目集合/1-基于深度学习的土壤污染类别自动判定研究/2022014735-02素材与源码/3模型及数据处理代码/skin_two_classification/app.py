from flask import request, Flask, jsonify
from main import use
import pymongo

app = Flask(__name__)

# 建立数据库
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["soil_db"]
mycol = mydb["soil_news"]

@app.route('/', methods=['GET'])
def dddd():
    return '首页'

# 上传接口
@app.route('/soil/uploader', methods=['GET','POST'])
def uploader():
    dict = {}
    if request.method == 'POST':
        img = request.files['file']
        file_path = 'images/' + img.filename
        print(file_path)
        img.save(file_path)
        pred=use(file_path)
        dict={"pred":int(pred),"file_path":file_path}
    return jsonify(dict)

# 新闻接口
@app.route('/soil/get_news', methods=['POST'])
def get_news():
    type = request.form["type"]
    if type=="":
        mycol = mydb["soil_paper"]
    else:
        mycol = mydb["soil_news"]
    myresult = mycol.find({ "type": type})
    res_list=[]
    for x in myresult:
        res_list.append({"title":x['title'],"author":x['author'],"url":x['title']})

    res_dict={"articleList":res_list}
    print(res_list)
    return res_dict

# 新闻详细页面接口
@app.route('/soil/get_news_detail', methods=['POST'])
def get_news_detail():
    title = request.form["url"]
    type = request.form["type"]
    if type=="paper":
        mycol = mydb["soil_paper"]
    else:
        mycol = mydb["soil_news"]
    myresult = mycol.find_one({ "title": title})
    res_html=[{'name': 'h2','attrs': {'class': 'h2','style': 'line-height: 40px;padding:0 0 10px 0'},'children':[{'type': 'text','text': title}]}]
    content_list=myresult['content'].split('\n')
    for para in content_list:
        if para[:3]=="###":
            para={'name': 'h3','attrs': {'class': 'h3','style': 'line-height: 30px;padding:10px 0'},'children':[{'type': 'text','text': para[3:]}]}
        else:
            para={'name': 'p','attrs': {'class': 'p','style': 'line-height: 30px;padding:10px 0;text-align:justify;'},'children':[{'type': 'text','text': para}]}
        res_html.append(para)
    return {"nodes":res_html}

if __name__ == '__main__':
    app.run(host='0.0.0.0',port='469')