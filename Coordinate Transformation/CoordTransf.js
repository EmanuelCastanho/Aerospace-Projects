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
var GeodGeocInVector = []; 
var GeodVector = [];
var GeocVector = [];
var Result = [];

function Solve(){
    a = parseFloat(document.getElementById("aInput").value.replace(",","."));
    e = parseFloat(document.getElementById("eInput").value.replace(",","."));
    GeodGeocInVector[0] = parseFloat(document.getElementById("lambdaXInput").value.replace(",","."));
    GeodGeocInVector[1] = parseFloat(document.getElementById("phiYInput").value.replace(",","."));
    GeodGeocInVector[2] = parseFloat(document.getElementById("hZInput").value.replace(",","."));

    if ((isNaN(a) || isNaN(e)) == true) {
        alert("Insert valid equatorial radius and eccentricity values!\n\nExample: a = 6378137 and e = 0.08181919");
    } 

    if (document.getElementById("geodToGeoc").checked) {
        GeodVector[0] = GeodGeocInVector[0] * Math.PI/180;
        GeodVector[1] = GeodGeocInVector[1] * Math.PI/180;
        GeodVector[2] = GeodGeocInVector[2];
        Result = Geod2Geoc(GeodVector,a,e);

        document.getElementById("ResLambdaX").innerHTML = "X = " + Result[0].toPrecision(7) + " m";
        document.getElementById("ResPhiY").innerHTML = "Y = " + Result[1].toPrecision(7) + " m";
        document.getElementById("ReshZ").innerHTML = "Z = " + Result[2].toPrecision(7) + " m";
        
    } else {
        GeocVector[0] = GeodGeocInVector[0];
        GeocVector[1] = GeodGeocInVector[1];
        GeocVector[2] = GeodGeocInVector[2];
        Result = Geoc2Geod(GeocVector,a,e);

        document.getElementById("ResLambdaX").innerHTML = "𝜆 = " + Result[0].toPrecision(7) + " °";
        document.getElementById("ResPhiY").innerHTML = "&#966 = " + Result[1].toPrecision(7) + " °";
        document.getElementById("ReshZ").innerHTML = "h = " + Result[2].toPrecision(7) + " m";
    }

    

}

function Geod2Geoc(GeodVector,a,e){
    // Coordinate transformation from geodetic to geocentric
    // Input: GeodVector - geodetic vector [longitude (rad), latitude (rad), height (m)]
    //        a -          Equatorial radius (m)
    //        e -          Eccentricity
    // Output: GeocVector - geocentric vector [x, y, z] (m)
         
    let n;

    n = a/Math.sqrt(1-Math.pow(e,2)*Math.sin(Math.pow(GeodVector[1],2)));

    GeocVector[0] = (GeodVector[2]+n)*Math.cos(GeodVector[1])*Math.cos(GeodVector[0]);
    GeocVector[1] = (GeodVector[2]+n)*Math.cos(GeodVector[1])*Math.sin(GeodVector[0]);
    GeocVector[2] = (GeodVector[2]+n-Math.pow(e,2)*n)*Math.sin(GeodVector[1]);

    return GeocVector;
}

function Geoc2Geod(GeocVector,a,e){
    // Coordinate transformation from geocentric to geodetic
    // Input: GeocVector - geocentric vector [x, y, z] (m)
    //        a -          Equatorial radius (m)
    //        e -          Eccentricity
    // Output: GeodVector - geodetic vector [longitude (°), latitude (°), height (m)]

    let p, q, r, s, t, u, v, w, k, D;

    p = (Math.pow(GeocVector[0],2)+Math.pow(GeocVector[1],2))/Math.pow(a,2);
    q = (1-Math.pow(e,2))*Math.pow(GeocVector[2],2)/Math.pow(a,2);
    r = (p+q-Math.pow(e,4))/6;
    s = Math.pow(e,4)*p*q/(4*Math.pow(r,3));
    t = Math.pow((1+s+Math.sqrt(s*(2+s))),(1/3));
    u = r*(1+t+1/t);
    v = Math.sqrt(Math.pow(u,2)+Math.pow(e,4)*q);
    w = Math.pow(e,2)*(u+v-q)/(2*v);
    k = Math.sqrt(u+v+Math.pow(w,2))-w;
    D = (k*Math.sqrt(Math.pow(GeocVector[0],2)+Math.pow(GeocVector[1],2)))/(k+Math.pow(e,2));

    GeodVector[0] = 2*Math.atan(GeocVector[1]/(GeocVector[0]+Math.sqrt(Math.pow(GeocVector[0],2)+Math.pow(GeocVector[1],2)))) * 180/Math.PI;
    GeodVector[1] = 2*Math.atan(GeocVector[2]/(D+Math.sqrt(Math.pow(D,2)+Math.pow(GeocVector[2],2)))) * 180/Math.PI;
    GeodVector[2] = (k+Math.pow(e,2)-1)/k*Math.sqrt(Math.pow(D,2)+Math.pow(GeocVector[2],2));

    return GeodVector;
}
