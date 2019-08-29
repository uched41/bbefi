from flask import Flask, render_template, request
app = Flask(__name__)

def process(data):
	name 			= data["name"]
	email 			= data["email"]
	vehicleType 	= data["vehicleType"]
	vehiclePower 	= data["vehiclePower"]
	bodyType 		= data["bodyType"]
	transmission 	= data["transmission"]
	tcmTune 		= data["tcmTune"]
	turbo 			= data["turbo"]
	injector 		= data["injector"]
	vin 			= data["vin"]
	serialNumber 	= data["serialNumber"]
	engineSerial 	= data["engineSerial"]

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