t1 = int(input("Temps pour compléter un tour (joueur 1) ? "))
t2 = int(input("Temps pour compléter un tour (joueur 2) ? "))
# Nombre de tours effectués par le joueur 1
nt1 = 1
while nt1 * t1 % t2 != 0:
    nt1 += 1

# Temps de rencontre
tr = nt1 * t1
nt2 = tr // t2
print("Rencontre après", tr, "mn au point de départ")
print("Joueur 1 a fait", nt1, "tours")
print("Joueur 2 a fait", nt2, "tours")