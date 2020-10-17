var type

function getType() {
    type = value

}

function func1() {

    var username = document.getElementById("username").value
    if (username < 3) {
        alert("Username Must At Least 3 Characters")
        return
    }
    var email = document.getElementById("email").value
    var x = email.indexOf("@")
    if (x == -1) {
        alert("Email Must be a Valid Email ! (@)")
    }
    var pass = document.getElementById("pw").value
    if (pass < 8) {
        alert("Password is too Short, Must be At Least 8 Characters")
    }
    var cpass = document.getElementById("cpw").value
    if (!(pass.match(cpass))) {
        alert("Password and Confirm Password Don't Match")
    }
    var address = document.getElementById("address").value
        //validasi jumlah kata
    var count = 1 //jumlah kata
    var flag = 0 // kalo 0 berarti ga ada kata, kalo 1 ada
    for (var i = 0; i < address.length; i++) {
        if (address[i] == ' ' && flag == 1) {
            flag = 0
            count += 1
        } else if (address[i] != ' ' && flag == 0) {
            flag = 1
        }
    }
    if (count <= 4) {
        alert("Address Must At Least Consist of 5 Words")
    } else {
        alert("Registration Succesfull")
    }



}