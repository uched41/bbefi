// JavaScript code for the BLE Discovery example app.

// TODO: Add comments to functions, shorten long lines.

function mainPageViewModel(){
	self.userName		= ko.observable("");
	self.emailAddress 	= ko.observable("");
	self.vehicleType 	= ko.observable(null);
	self.vehiclePower 	= ko.observable(null);
	self.bodyType 		= ko.observable(null);
	self.transmission 	= ko.observable(null);
	self.tcmTune 		= ko.observable(null);
	self.turbo 			= ko.observable(null);
	self.injector 		= ko.observable(null);
	self.vin 			= ko.observable("");
	self.serialNumber 	= ko.observable("");
	self.engineSerial 	= ko.observable("");

	self.vehicleTypeOptions 	= ko.observableArray([
		null,
		"06-07 Cummins 5.9", 
		"07.5-09 Cummins 6.7",
		"10-12 Cummins 6.7",
		"13-17 Cummins 6.7",
		"2018 Cummins 6.7"
		]);

	self.bodyTypeOptions 		= ko.observableArray([
		null,
		"Pick up",
		"Cab and Chassis"
		]);

	self.transmissionOptions 		= ko.observableArray([
		null,
		"G56",
		"Aisin",
		"68RFE Automatic",
		"Manual"
		]);

	self.vehiclePowerOptions 	= ko.observableArray([
		null,
		"Stock File Only", 
		"0HP Single File",
		"50HP Single File",
		"75HP Single File",
		"100HP Single File",
		"150HP Single File",
		"200HP Single File",
		"230HP Single File",
		"SOTF CSP4 Switchable tune"
		]);

	self.tcmTuneOptions 		= ko.observableArray([
		null,
		"No Tcm Tune wanted",
		"170PSI",
		"225PSI"
		]);

	self.turboOptions 		= ko.observableArray([
		null,
		"Stock Turbo",
		"Modified Turbo"
		]);

	self.injectorOptions 		= ko.observableArray([
		null,
		"Stock Injectors",
		"Modified Injectors"
		]);


	self.checkUsername = function(){
		if(self.userName().length < 2){
			$("#InputName").css("border-color", "red");
			return false;
		}
		$("#InputName").css("border-color", "#E0E0E0");
		return true;
	};

	self.checkEmail = function(){
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    	ans = re.test(String(self.emailAddress()).toLowerCase());
    	if(!ans){
    		$("#emailAddress").css("border-color", "red");
			return false;
    	}
    	$("#emailAddress").css("border-color", "#E0E0E0");
		return true;
	};

	self.checkVehicleType = function(){
		if(!self.vehicleType()){
			$("#vehicle").css("border-color", "red");
			return false;
		}
		$("#vehicle").css("border-color", "#E0E0E0");
		return true;
	};

	self.checkVehiclePower = function(){
		 if(!self.vehiclePower()){
			$("#power").css("border-color", "red");
			return false;
		}
		$("#power").css("border-color", "#E0E0E0");
		return true;
	};

	self.checkBodyType = function(){
		 if(!self.bodyType()){
			$("#bodyType").css("border-color", "red");
			return false;
		}
		$("#bodyType").css("border-color", "#E0E0E0");
		return true;
	};

	self.checkTransmission = function(){
		 if(!self.transmission()){
			$("#transmission").css("border-color", "red");
			return false;
		}
		$("#transmission").css("border-color", "#E0E0E0");
		return true;
	};

	self.checkTcmTune = function(){
		 if(!self.tcmTune()){
			$("#tcmTune").css("border-color", "red");
			return false;
		}
		$("#tcmTune").css("border-color", "#E0E0E0");
		return true;
	};

	self.checkTurbo = function(){
		 if(!self.turbo()){
			$("#turbo").css("border-color", "red");
			return false;
		}
		$("#turbo").css("border-color", "#E0E0E0");
		return true;
	};

	self.checkInjector = function(){
		 if(!self.injector()){
			$("#injector").css("border-color", "red");
			return false;
		}
		$("#injector").css("border-color", "#E0E0E0");
		return true;
	};

	self.checkVin = function(){
		 if(self.vin().length != 17){
			$("#vin").css("border-color", "red");
			return false;
		}
		$("#vin").css("border-color", "#E0E0E0");
		return true;
	};

	self.checkSerialNumber = function(){
		if(self.serialNumber().length < 2){
			$("#serialNo").css("border-color", "red");
			return false;
		} 
		$("#serialNo").css("border-color", "#E0E0E0");
		return true;
	};

	self.checkEngineSerial = function(){
		if(self.engineSerial().length < 10){
			$("#engineSerial").css("border-color", "red");
			return false;
		} 
		$("#engineSerial").css("border-color", "#E0E0E0");
		return true;
	};

	self.onSubmit = function(){
		if( 
			!self.checkUsername() ||
			!self.checkEmail() ||
			!self.checkVehicleType() ||
			!self.checkVehiclePower() ||
			!self.checkBodyType() ||
			!self.checkTransmission() ||
			!self.checkTcmTune() ||
			!self.checkTurbo() ||
			!self.checkInjector() ||
			!self.checkVin() ||
			!self.checkSerialNumber() ||
			!self.checkEngineSerial() 
			){ return; }

		var mydata = {
			"name": self.userName(),
			"email": self.emailAddress(),
			"vehicleType": self.vehicleType(),
			"vehiclePower": self.vehiclePower(),
			"bodyType": self.bodyType(),
			"transmission": self.transmission(),
			"tcmTune": self.tcmTune(),
			"turbo": self.turbo(),
			"injector": self.injector(),
			"vin": self.vin(),
			"serialNumber": self.serialNumber(),
			"engineSerial": self.engineSerial(),
		};

		$.post("/efilive_submit", mydata).done(function(data) {
	      console.log("Submitted data");
	      console.log(data);
	    });
	}
}


$(document).ready(function() {
  var newmodel = new mainPageViewModel();
  ko.cleanNode(document.getElementById("mainBody"));
  ko.applyBindings(newmodel, document.getElementById("mainBody"));
});

