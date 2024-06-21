1 - cd to the backend folder

```bash
cd back-end
```

2 - make sure you have python installed

```bash
python --version
```

It must be python version **3.12.\*** or above

> sometimes you need to use _python3_ in the command if you have multiple versions of python installed. if this is the case, run all of your commands with python3 instead of python.

if not, update python by installing new version
Please visit: https://www.python.org/downloads/

3 - Create Virtual Environment

run the following command (in the backend folder):

```bash
python -m venv .venv
```

4 - Activate Virtual Environment

- on MacOS/Linux:

```bash
source .venv/bin/activate
```

- on Windows:

```bash
venv\Scripts\activate
```

5 - Install Project Dependencies

```bash
pip install -r requirements.txt
```

6 - Deactivate the Environment (optional)

run:

```
deactivate
```

7 - Run the server

> change the port number of necessary (default is 8000)

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

8 - Access the API docs on:
http://127.0.0.1:8000/docs
