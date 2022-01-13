import numpy as np

def saisir():
    n = 0
    while not (5 <= n <= 30):
        n = int(input("Donner le nombre des adhérents ? "))
    return n

def diviser_num(num):
    cat = num[0]
    annee = int(num[1:5])
    mois = int(num[5:7])
    ade = int(num[7:])
    return cat, annee, mois, ade

def verif(num):
    v = len(num) == 10 and num[0] in ["A", "J", "E"]
    if v:
        i = 1
        while v and i < len(num):
            v = "0" <= num[i] <= "9"
            i += 1
    if v:
        cat, annee, mois, ade = diviser_num(num)
        v = (2000 <= annee <= 2018 and 1 <= mois <= 12) or (annee == 2019 and 1 <= mois <= 5) 
    return v

def remplir(n):
    ta = np.array([str]*n, dtype="U10")
    for i in range(n):
        ta[i] = ""
        while not verif(ta[i]):
            ta[i] = input("Entrer le numéro d'abonnement abonné n°" + str(i+1) + " ? ")
    return ta

def convertir_mois(a, m):
    return a * 12 + m

def bonus(ta, n):
    catc = ""
    while not (catc in ["A", "E", "J"]):
        catc = input("Saisir la catégorie de l'abonné  (A : Adulte, J : Junior, E : Enfant) ?")
    for i in range(n):
        cat, annee, mois, ade = diviser_num(ta[i])
        nbmois = convertir_mois(2019, 5) - convertir_mois(annee, mois)
        if cat == catc and nbmois > 60:
            print("Un bonus de", nbmois, "heures est accordé à",ta[i])

## PP
n = saisir()
ta = remplir(n)
bonus(ta, n)