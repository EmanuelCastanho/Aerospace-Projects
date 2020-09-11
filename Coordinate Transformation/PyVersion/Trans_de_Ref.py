# Este programa transforma coordenadas de um referencial para outro,
# sendo estas as opções:
# *Referencial Geodético --> Referencial Geocêntrico
# *Referencial Geocêntrico --> Referencial Geodético
from math import pi

print('|-------------------------------------|')
print('| Referenciais para a Navegação Aérea |')
print('|-------------------------------------|')

while True:
    print('\n')
    print('Menu: ')
    print('[1] Introduzir a, e')
    print('[2] Transformação de ref. geodético para ref. geocêntrico')
    print('[3] Transformação de ref. geocêntrico para ref. geodético')
    print('[4] Sair do programa')
    ans=input('Escolha uma opção: ')
    print('\n')

    if ans == '1':
        a = float(input('a - Raio equatorial [m] (Exemplo: 6378137): '))
        e = float(input('e - Excentricidade (Exemplo: 0.0818): '))
        
    elif ans == '2':
        from Geod2Geoc import Geod2Geoc
        GeodVector = [0,0,0]
        GeodVector[0] = (float(input('Longitude(lambda) [graus]: ')))*pi/180
        GeodVector[1] = (float(input('Latitude(fi) [graus]: ')))*pi/180
        GeodVector[2] = float(input('Altitude (h) [m]: '))
        V2 = Geod2Geoc(GeodVector, a, e)
        print('x, m: ', V2[0])
        print('y, m: ', V2[1])
        print('z, m: ', V2[2])
        
    elif ans == '3':
        from Geoc2Geod import Geoc2Geod
        GeocVector = [0,0,0]
        GeocVector[0] = float(input('x [m]: '))
        GeocVector[1] = float(input('y [m]: '))
        GeocVector[2] = float(input('z [m]: '))
        V3 = Geoc2Geod(GeocVector, a, e)
        print('Longitude(lambda) [graus]: ', V3[0]*180/pi)
        print('Latitude(fi) [graus]: ', V3[1]*180/pi)
        print('Altitude (h) [m]: ', V3[2])
    
    elif ans == '4':
        break
    
    else:
        print ('Comando desconhecido!')
