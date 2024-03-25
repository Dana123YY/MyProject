import requests
import csv
import json
import random
import time


class video_data:
    def __init__(self):
        self.url = 'https://s.search.bilibili.com/cate/search?main_ver=v3&search_type=video&view_type=hot_rank&order=click&copy_right=-1&cate_id=138&page={}&pagesize=20&jsonp=jsonp&time_from=20200801&time_to=20200831'
        self.page = 11507
        self.alphabet = 'fZodR9XQDSUm21yCkr6zBqiveYah8bt4xsWpHnJE7jL5VG3guMTKNPAwcF'

    def dec(self, x):  # BV号转换成AV号
        r = 0
        for i, v in enumerate([11, 10, 3, 8, 4, 6]):
            r += self.alphabet.find(x[v]) * 58 ** i
        return (r - 0x2_0840_07c0) ^ 0x0a93_b324

    def random_headers(self, path): # 随机读取一个头信息
        with open(path, 'r') as f:
            data = f.readlines()
            f.close()

        reg = []
        for i in data:
            k = eval(i)  # 将字符串转化为字典形式
            reg.append(k)
        header = random.choice(reg)
        return header

    def get_ip(self): # 代理IP获取
        print('切换IP中.......')
        url = '代理IP的地址'
        ip = requests.get(url).text
        if ip in ['{"ERRORCODE":"10055","RESULT":"提取太频繁,请按规定频率提取!"}', '{"ERRORCODE":"10098","RESULT":"可用机器数量不足"}']: # 出现频繁或者机器不足，睡眠14秒
            time.sleep(14)
            ip = requests.get(url).text
            print(ip)
        else:
            print(ip)
        proxies = {
            'https': 'http://' + ip,
            'http': 'http://' + ip
        } # 设置https和http可以按需选择
        return proxies

    def get_requests(self, url, proxy): # 请求的函数
        headers = self.random_headers('headers.txt')
        # 将头信息和IP写入，用try来减少意外对程序的影响
        try:
            response = requests.get(url, timeout=3, headers=headers, proxies=proxy)
        except requests.exceptions.RequestException as e:
            print(e)
            proxy = self.get_ip()
            try:
                response = requests.get(url, timeout=3, headers=headers, proxies=proxy)
            except requests.exceptions.RequestException as e:
                print(e)
                print('原始IP')
                response = requests.get(url, timeout=3, headers=headers)
        return response, proxy

    def get_follower(self, mid, proxy): # 获取粉丝数
        url = 'https://api.bilibili.com/x/relation/stat?vmid=' + str(mid)
        r, proxy = self.get_requests(url, proxy)
        result = json.loads(r.text) # 用json来解析文本
        # 按照需求获取需要的数据，因为粉丝数是必定存在的，所以失败了需要多次尝试获取。
        try:
            follower = result['data']['follower']
        except:
            follower,proxy = self.get_follower(mid, proxy)
        return follower, proxy

    def get_view(self, BV, proxy): # 获取三连和播放
        aid = self.dec(BV)
        url = 'https://api.bilibili.com/x/web-interface/archive/stat?aid=' + str(aid)
        r, proxy = self.get_requests(url, proxy)
        result = json.loads(r.text)
        view = {}# 因为视频虽然在排行榜，但是很可能已经删除，所以没有数据为None
        try:
            view['view'] = result['data']['view']
            view['danmu'] = result['data']['danmaku']
            view['reply'] = result['data']['reply']
            view['like'] = result['data']['like']
            view['coin'] = result['data']['coin']
            view['favorite'] = result['data']['favorite']
            view['share'] = result['data']['share']
            view['rank'] = result['data']['his_rank']
        except:
            view['view'] = 'None'
            view['danmu'] = 'None'
            view['reply'] = 'None'
            view['like'] = 'None'
            view['coin'] = 'None'
            view['favorite'] = 'None'
            view['share'] = 'None'
            view['rank'] = 'None'
        return view, proxy

    def get_parse(self, result, proxy): # 整合数据
        content = []
        items = result['result']
        for item in items:
            pubdate = item['pubdate']
            title = item['title']
            author = item['author']
            bvid = item['bvid']
            mid = item['mid']
            follower, proxy = self.get_follower(mid, proxy)
            video_view, proxy = self.get_view(bvid, proxy)
            view = video_view['view']
            danmu = video_view['danmu']
            reply = video_view['reply']
            like = video_view['like']
            coin = video_view['coin']
            favorite = video_view['favorite']
            share = video_view['share']
            rank = video_view['rank']
            tag = item['tag']
            con = [pubdate, title, author, bvid, mid, follower,view,danmu,reply,like,coin,favorite,share,rank, tag]
            content.append(con)
            print(con)
        print(content)
        self.save(content)
        return proxy

    def write_header(self):
        header = ['日期', '标题', '作者', 'BV', 'mid', '粉丝', '播放', '弹幕', '评论', '点赞','硬币','收藏','转发','排名','标签']
        with open('fun_video.csv', 'a', encoding='gb18030', newline='')as f:
            write = csv.writer(f)
            write.writerow(header)

    def save(self,content):# 存入csv
        with open('fun_video.csv', 'a', encoding='gb18030', newline='')as file:
            write = csv.writer(file)
            write.writerows(content)

    def run(self):
        #self.write_header()
        proxy = self.get_ip()
        for i in range(168, self.page):
            url = self.url.format(i)
            response, proxy = self.get_requests(url, proxy)
            result = json.loads(response.text)
            proxy = self.get_parse(result, proxy)
            print('第{}页爬取完毕'.format(i))


if __name__ == '__main__':
    video = video_data()
    video.run()
