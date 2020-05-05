from fastapi import FastAPI
import uuid
import json
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

# Helper Functions


def id_validation(user_id):
    if user_id not in data.keys():
        data[user_id] = {}
        data[user_id]['design'] = {
            'hypothesis': None,
            'analysis_goal': None,
            'procedure': None,
            'sample_size': None,
            'exp_design': None,
            'iv': {},
            'dv': [],
        }


@app.get("/uid")
async def new_id():
    user_id = str(uuid.uuid1())
    data[user_id] = {}
    data[user_id]['design'] = {
        'hypothesis': None,
        'goal_of_analysis': None,
        'procedure': None,
        'sample_size': None,
        'exp_design': None,
        'iv': {},
        'dv': [],
    }
    print("New user_id " + (user_id) + " generated")
    return {"user_id": (user_id)}

class DependentVariable(BaseModel):
    user_id: str
    name: str
    measurement: str
    add_info: str 


@app.post("/exp_design/dv")
async def update_dv(info: DependentVariable):
    id_validation(info.user_id)

    data[info.user_id]['design']['dv'].append({'name': info.name, 'measurement': info.measurement, 'add_info': info.add_info})
    print(data[info.user_id]['design'])
    return data[info.user_id]

class IndependentVariable(BaseModel):
    user_id: str
    name: str
    levels: List[str]

@app.post("/exp_design/iv")
async def add_iv(info: IndependentVariable):
    id_validation(info.user_id)

    data[info.user_id]['design']['iv'][info.name] = info.levels
    print(data[info.user_id]['design'])
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
    print("Experiment design updated for " + info.user_id)
    print(data[info.user_id]['design'])
    return data[info.user_id]


@app.post("/test")
async def testinput(info: DesignObj):
    return info
