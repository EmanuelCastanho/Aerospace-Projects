def Geod2Geoc(GeodVector, a, e):
    ''' Transformação de coordenadas do ref. geodético para o ref. geocêntrico
        INPUT: GeodVector - vetor geodético [longitude(rad),latitude(rad),altitude(m)]
               a - Raio equatorial [m]
               e - Excentricidade
        OUTPUT: GeocVector - vetor geocêntrico [x,y,z] [m]
    '''

    from math import sin, cos, sqrt

    n = a/sqrt(1-e**2*sin(GeodVector[1])**2)

    GeocVector = [0,0,0]
    GeocVector[0] = (GeodVector[2]+n)*cos(GeodVector[1])*cos(GeodVector[0])
    GeocVector[1] = (GeodVector[2]+n)*cos(GeodVector[1])*sin(GeodVector[0])
    GeocVector[2] = (GeodVector[2]+n-e**2*n)*sin(GeodVector[1])

    return(GeocVector)

