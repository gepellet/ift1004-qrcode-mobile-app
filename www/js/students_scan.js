var studentRegistrationNumber;
document.addEventListener('deviseready',onDeviseReady,false);

function onDeviseReady() {
  console.log("Devise Initialized");
}

function scanRegistrationNumber() {
  Scandit.License.setAppKey("LICENSE_KEY");
  var settings = new Scandit.ScanSettings();
  settings.setSymbologyEnabled(Scandit.Barcode.Symbology.EAN13, true);
  settings.setSymbologyEnabled(Scandit.Barcode.Symbology.UPC12, true);
  settings.setSymbologyEnabled(Scandit.Barcode.Symbology.EAN8, true);
  settings.setSymbologyEnabled(Scandit.Barcode.Symbology.QR, true);
  var picker = new Scandit.BarcodePicker(settings);
  picker.show(success_scan, null, failed_scan);
  picker.startScanning();
}

function success_scan(session) {
  studentRegistrationNumber = "";
  studentRegistrationNumber = session.newlyRecognizedCodes[0].data;
  session.stopScanning();
  processEvent();
}

function failed_scan(error) {
  if (error != "Canceled") {
    alert("Scanning Failed: " + error);
  };
}

// get student details from API
function processEvent(){
  var apiUrl = getRootUrl() + "/api/v1/students";
  var params = { registration_number: studentRegistrationNumber };
  var jqxhr = $.get(apiUrl,params, function(data) {
    if(data !== "Student Not Found") {
      demoAlert('<i class="fa fa-thumbs-up"></i>Hi ' + data + '!', "Étudiant(e) ULAVAL","demo-green","no");
    } else {
      demoAlert('<i class="fa fa-exclamation-triangle"></i>Étudiant(e) non trouvé(e)', "Impossible de trouver un(e) étudiant(e) avec le matricule " + (studentRegistrationNumber || "indiqué" ) + ". Veuillez réessayer.","demo-red","yes");
    }
  });
  jqxhr.fail(function(e) {
    demoAlert('<i class="fa fa-exclamation-triangle"></i>Problème de connexion', "Veuillez SVP vérifier que votre connexion Internet est activée.","demo-red","no");
  });
}

function onPrompt(results) {
  if (results.buttonIndex == 1) {
    studentRegistrationNumber = results.input1;
    processEvent();
  };
  history.back();
}

// Show a custom prompt dialog
function showPrompt() {
    navigator.notification.prompt(
        "Entrer le matricule de l'étudiant(e)",
        onPrompt,
        "Numéro Matricule",
        ['Rechercher','Annuler'],
        null
    );
}

$(document).ready(function(){
  onDeviseReady();
  $("#scanRegistrationNumber").hammer().on("tap",function(){
      scanRegistrationNumber();
  });

 $("#closeNotice").hammer().on("click",function(){
      closeAlert();
  });

   $("#enterRegistrationNumber").hammer().on("tap",function(){
      showPrompt();
  });
});
