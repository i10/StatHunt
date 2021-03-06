from fastapi import FastAPI, File, UploadFile
import uuid
import json
import csv
import pandas as pd
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from diffprivlib.mechanisms import Laplace


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

# User Validation

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

# Misc
@app.post("/setview/{user_id}")
async def set_view(user_id: str, view: int):
    print("New view for: " + user_id + ' is ' + str(view))
    data[user_id]['view'] = view

@app.get("/getview/{user_id}")
async def get_view(user_id: str):
    try:
        return data[user_id]['view']
    except:
        return  0

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

## Value Obfuscation
@app.post("/dataset/obfuscate/{user_id}")
async def obf_data(user_id: str, column: str):
    df = data[user_id]['dataframe']
    print(df[column])
    if(column not in df.columns):
        return 'Not a valid column'
    laplace = Laplace()
    if df[column].dtype == 'int64':
        laplace.set_epsilon(1)
        laplace.set_sensitivity(df[column].mean()*0.1)
        df[column] = df[column].apply(laplace.randomise).round(0).astype(int)
    elif df[column].dtype == 'float64':
        laplace.set_epsilon(1)
        laplace.set_sensitivity(df[column].mean()*0.1)
        df[column] = df[column].apply(laplace.randomise)
    print(df[column])
    return 'Column has been obfuscated'

## Variable Obfuscation
@app.get("/dataset/column/{user_id}")
async def get_column(user_id: str, column: str):
    if column in data[user_id]['dataframe'].columns:
        return {'values': data[user_id]['dataframe'][column].unique().tolist()}
    return {'error': "Not a valid column"}

class ObDat(BaseModel):
    column: str
    ncolumn: str
    values: List[str]

@app.post("/dataset/rcolumn/{user_id}")
async def obf_column(user_id: str, info: ObDat):
    old_values = data[user_id]['dataframe'][info.column].unique()
    mapping = {}
    for i in range(len(info.values)):
        mapping[old_values[i]] = info.values[i]
    
    data[user_id]['dataframe'][info.column] = data[user_id]['dataframe'][info.column].map(mapping)
    data[user_id]['dataframe'] = data[user_id]['dataframe'].rename(columns={info.column: info.ncolumn})
    print(data[user_id]['dataframe'][info.ncolumn])


@app.get("/update/{user_id}")
async def updated(user_id: str):
    id_validation(user_id)

    if(user_id in update.keys() and update[user_id]):
        update[user_id] = False
        return True
    return False



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
