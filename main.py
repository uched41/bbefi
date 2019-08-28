from flask import Flask, render_template, request
app = Flask(__name__)


@app.route('/efilive')
def hello_world():
    return render_template('main.html')

@app.route('/efilive_submit', methods=['POST'])
def submit_data():
    data = request.form
    print(data["vin"])
    return("thanks")

if __name__ == '__main__':
    app.run()