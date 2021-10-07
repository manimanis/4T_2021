# Constantes
PI = 3.14159265
QPM2 = 6 # 6 m²/Kg

# Entrée des données
l = float(input('Largeur de la porte : '))
h = float(input('Hauteur de la porte : '))
n = int(input('Donner le nbre de portes : '))

# Traitements
sp = (l * (h - l/2)) + PI * l * l / 8
qp = (n * 2 * sp) / QPM2

# Affichage
print('Quantité de peinture requise :', qp, 'Kg')
