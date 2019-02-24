import requests
import json
import random
import time

fields = ["age", "weight", "height", "width", "size"]

starttime=time.time()

while True:
    variables = []
    for field in fields:
        if random.randint(0, 3) != 0:
            variables.append({'variableName': field, 'variableValue': random.random()})

    request = {'parentModelId':'363d8648-4423-4dc3-9240-ffc677661eb2','variableList': variables}
    r = requests.post('http://95.179.163.167:8080/calculateModel', json=request)
    print(r.status_code, r.reason, r.text)
    time.sleep(1)

