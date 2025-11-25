
def saisie_n():
    global n
    n = int(input("Donner la taille du tableau (entre 5 et 20) : "))
    while n < 5 or n > 20:
        n = int(input("Donner la taille du tableau (entre 5 et 20) : "))

def remplir_t(n, t):
    for i in range(n):
        t[i] = int(input("T[" + str(i) + "] = "))

def tri_bul(n, t):
    """A implémenter"""
    pass

def afficher(n, t):
    print("Tableau trié :")
    for i in range(n):
        print(t[i], end=", ")
    print()

# Programme principal
from numpy import array
t = array([int()]*20)
saisie_n()
remplir_t(n, t)
tri_bul(n, t)
afficher(n, t)
