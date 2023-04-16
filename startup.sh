cd ./backend
python3.10 -m venv env
python3.10 -m pip install django
python3.10 -m pip install -r requirements.txt
python3.10 manage.py migrate
cd ../easy_chef
npm install