import datetime
from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def hello_world():
    return render_template('home.html', 
		curr_time="{:%Y%m%d%H%M%S}".format(datetime.datetime.now()))

if __name__ == '__main__':
    app.run()
