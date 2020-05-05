import requests
import json

url = 'http://localhost:8000'
r = requests.get(url + '/uid')
uid = r.json()['user_id']
print(uid)

r = requests.post(url +  '/exp_design' + '/' + uid ,
    headers= {"content-type": "application/json"},
    data=json.dumps({"variable": 'hypothesis', "value": "hyp"}))
print(r.text)
