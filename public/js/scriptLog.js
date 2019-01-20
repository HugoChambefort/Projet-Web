function getUserInfoC()
{
    var userC = [];
    userC[0] = document.getElementById("nameC").value;
    userC[1] = document.getElementById("firstNameC").value;
    userC[2] = document.getElementById("passwordC").value;
    for (var x=0; x<3;x++){
        alert(userC[x]);
    }
}

function getUserInfoI()
{
    var userI = [];
    userI[0] = document.getElementById("nameI").value;
    userI[1] = document.getElementById("firstNameI").value;
    userI[2] = document.getElementById("emailI").value;
    userI[3] = document.getElementById("localisationI").value;
    userI[4] = document.getElementById("passwordI").value;
    for (var x=0; x<5;x++){
        alert(userI[x]);
    }
}
