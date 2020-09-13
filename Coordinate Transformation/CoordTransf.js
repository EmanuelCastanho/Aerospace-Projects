/**
 * Coordinate Transformation
 * @author Emanuel Castanho
*/

document.getElementById("geodToGeoc").checked = "checked"; // Bug: In Mozilla when updating the page the radiobutton does not return to its default position.
document.addEventListener("change", function(){
    if (document.getElementById("geodToGeoc").checked) {
        document.getElementById("lambdaORx").innerHTML = "𝜆 :";
        document.getElementById("1degORm").innerHTML = "°";
        document.getElementById("phiORy").innerHTML = "&#966 :";
        document.getElementById("2degORm").innerHTML = "°";
        document.getElementById("hORz").innerHTML = "h :";
    } else {
        document.getElementById("lambdaORx").innerHTML = "X :";
        document.getElementById("1degORm").innerHTML = "m";
        document.getElementById("phiORy").innerHTML = "Y :";
        document.getElementById("2degORm").innerHTML = "m";
        document.getElementById("hORz").innerHTML = "Z :";
    }
}); 

var a, e;

function Solve(){
    a = parseFloat(document.getElementById("aInput").value.replace(",","."));
    e = parseFloat(document.getElementById("eInput").value.replace(",","."));

    if ((isNaN(a) || isNaN(e)) == true) {
        alert("Insert valid equatorial radius and eccentricity values!\n\nExample: a = 6378137 and e = 0.08181919");
    } 

    

}
