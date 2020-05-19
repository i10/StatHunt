from fastapi import FastAPI, File, UploadFile
import uuid
import json
import csv
import pandas as pd
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import List

# Initialisation
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

data = {}
chat_overwrite = True
update = {}

def id_validation(user_id):
    if user_id not in data.keys():
        data[user_id] = {}
        data[user_id]['design'] = {
            'hypothesis': "",
            'goal_of_analysis': "",
            'procedure': "",
            'sample_size': "",
            'exp_design': "",
            'iv': [],
            'dv': [],
        }

# Dataset
@app.post("/uploadfile/{user_id}")
async def create_upload_file(user_id: str, file: UploadFile = File(...)):
    data[user_id]['dataset'] = file.file
    data[user_id]['dataframe'] = pd.read_csv(file.file)
    print(data[user_id]['dataframe'])
    return {"filename": file.filename}

@app.get('/dataset/{user_id}')
async def get_dataframe(user_id: str):
    id_validation(user_id)
    try:
        data[user_id]['dataframe']
        return data[user_id]['dataframe'].to_json()
    except:
        return ''


@app.get("/update/{user_id}")
async def updated(user_id: str):
    id_validation(user_id)

    if(user_id in update.keys() and update[user_id]):
        update[user_id] = False
        return True
    return False


@app.get("/uid")
async def new_id():
    user_id = str(uuid.uuid1())
    data[user_id] = {}
    update[user_id] = True
    data[user_id]['design'] = {
        'hypothesis': "",
        'goal_of_analysis': "",
        'procedure': "",
        'sample_size': "",
        'exp_design': "",
        'iv': [],
        'dv': [],
    }
    print("New user_id " + (user_id) + " generated")
    return {"user_id": (user_id)}


# Experimental Design

@app.get("/exp_design/{user_id}")
async def get_design(user_id: str):
    id_validation(user_id)
    print(data[user_id]['design'])
    update[user_id] = False
    return data[user_id]['design']


class Dv(BaseModel):
    name: str
    measurement: str


class Iv(BaseModel):
    name: str
    levels: List[str]


class DesignData(BaseModel):
    hypothesis: str
    goal_of_analysis: str
    procedure: str
    sample_size: int
    exp_design: str
    dv: List[Dv]
    iv: List[Iv]


@app.post("/post_design/{user_id}")
async def post_designs(user_id: str, info: DesignData):
    id_validation(user_id)

    data[user_id]['design']['hypothesis'] = info.hypothesis
    data[user_id]['design']['goal_of_analysis'] = info.goal_of_analysis
    data[user_id]['design']['procedure'] = info.procedure
    data[user_id]['design']['sample_size'] = info.sample_size
    data[user_id]['design']['dv'] = info.dv
    data[user_id]['design']['iv'] = info.iv

    print("Design data updated for user ", user_id)
    print("To: ", data[user_id]['design'])
    return data[user_id]['design']


class DependentVariable(BaseModel):
    user_id: str
    name: str
    measurement: str
    add_info: str


@app.post("/exp_design/dv")
async def update_dv(info: DependentVariable):
    id_validation(info.user_id)

    data[info.user_id]['design']['dv'].append(
        {'name': info.name, 'measurement': info.measurement, 'add_info': info.add_info})
    print(data[info.user_id]['design'])
    update[info.user_id] = True

    return data[info.user_id]


class IndependentVariable(BaseModel):
    user_id: str
    name: str
    levels: List[str]


@app.post("/exp_design/iv")
async def add_iv(info: IndependentVariable):
    id_validation(info.user_id)

    data[info.user_id]['design']['iv'].append(
        {'name': info.name, 'levels': info.levels})
    print(data[info.user_id]['design'])
    update[info.user_id] = True

    return data[info.user_id]


class DesignObj(BaseModel):
    user_id: str
    variable: str
    value: str


@app.post("/exp_design/")
async def update_design(info: DesignObj):
    id_validation(info.user_id)

    if info.variable not in data[info.user_id]['design'].keys():
        return "Variable name not valid information key"

    data[info.user_id]['design'][info.variable] = info.value
    update[info.user_id] = True

    print("Experiment design updated for " + info.user_id)
    print(data[info.user_id]['design'])
    return data[info.user_id]


@app.post("/test")
async def testinput(info: DesignObj):
    return info
