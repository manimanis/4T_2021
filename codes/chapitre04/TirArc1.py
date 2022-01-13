import numpy as np

def remplir(n):
    a = np.array([str]*n, dtype="U30")
    for i in range(n):
        a[i] = ""
        while not alpha(a[i]):
            a[i] = input("Donner le nom du joueur n°" + str(i+1) + " ? ")
    return a

def alpha(ch):
    v = 30 >= len(ch) > 0
    i = 0
    while v and i < len(ch):
        v = "A" <= ch[i].upper() <= "Z" or ch[i] == " "
        i += 1
    return v

def score_joueur(nom_joueur):
    print("Résultats des 3 essais de", nom_joueur)
    s = 0
    for i in range(3):
        st = -1
        while not (0 <= st <= 10):
            st = int(input("Résultat du tir n°" + str(i+1) + " ? "))
        s += st
    return s

def remplir_scores(a, n):
    sc = np.array([int()]*n)
    for i in range(n):
        sc[i] = score_joueur(a[i])
    return sc

def tri_scores(a, sc, n):
    for i in range(n-1):
        mx = i
        for j in range(i+1, n):
            if sc[j] > sc[mx]:
                mx = j
        if mx != i:
            sc[i], sc[mx] = sc[mx], sc[i]
            a[i], a[mx] = a[mx], a[i]
    return a, sc

def afficher_scores(a, sc, n):
    for i in range(n):
        print(a[i], "avec un score de", sc[i])

def score(a, n):
    sc = remplir_scores(a, n)
    a, sc = tri_scores(a, sc, n)
    afficher_scores(a, sc, n)

## PP
n = 0
while not (2 <= n <= 20):
    n = int(input("Donner le nombre de joueurs : "))
a = remplir(n)
score(a, n)