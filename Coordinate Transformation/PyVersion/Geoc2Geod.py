def Geoc2Geod(GeocVector, a, e):
    ''' Transformação de coordenadas do ref. geocêntrico para o ref. geodético
        INPUT: GeocVector - vetor geocêntrico [x,y,z] [m]
               a - Raio equatorial [m]
               e - Excentricidade
        OUTPUT: GeodVector - vetor geodético [longitude(rad),latitude(rad),altitude(m)]
    '''

    from math import sin, cos, sqrt
    from numpy import arctan

    p = (GeocVector[0]**2+GeocVector[1]**2)/a**2
    q = (1-e**2)*GeocVector[2]**2/a**2
    r = (p+q-e**4)/6
    s = e**4*p*q/(4*r**3)
    t = (1+s+sqrt(s*(2+s)))**(1/3)
    u = r*(1+t+1/t)
    v = sqrt(u**2+e**4*q)
    w = e**2*(u+v-q)/(2*v)
    k = sqrt(u+v+w**2)-w
    D = (k*sqrt(GeocVector[0]**2+GeocVector[1]**2))/(k+e**2)

    GeodVector = [0,0,0]
    GeodVector[0] = 2*arctan(GeocVector[1]/(GeocVector[0]+sqrt(GeocVector[0]**2+GeocVector[1]**2)))
    GeodVector[1] = 2*arctan(GeocVector[2]/(D+sqrt(D**2+GeocVector[2]**2)))
    GeodVector[2] = (k+e**2-1)/k*sqrt(D**2+GeocVector[2]**2)

    return(GeodVector)


