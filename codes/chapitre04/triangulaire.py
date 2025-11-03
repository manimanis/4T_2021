from numpy import array

def saisie():
    n = int(input("Nombre d'invités ? "))
    while n < 4 or n > 49:
        n = int(input("Nombre d'invités ? "))
    return n

def remplir(np, n):
    for i in range(n):
        np[i] = input(f"Invité n°{i+1} ? ")
        while not alpha(np[i]):
            np[i] = input(f"Invité n°{i+1} ? ")
        print(f"Score de {np[i]} : {calc_score(np[i])}")

def alpha(nom):
    i = 0
    t = len(nom) != 0
    while t and i < len(nom):
        t = "A" <= nom[i].upper() <= "Z"
        i += 1
    return t

def calc_score(nom):
    s = 0
    for i in range(len(nom)):
        s += ord(nom[i].upper()) - 64
    return s

def transfert(np, n, nt, st):
    n2 = 0
    for i in range(n):
        score = calc_score(np[i])
        if est_triangulaire(score):
            nt[n2] = np[i]
            st[n2] = score
            n2 += 1
    return n2

def est_triangulaire(score):
    i = 1
    while score >= i:
        score -= i
        i += 1
    return score == 0

def trier(nt, st, n2):
    for i in range(n2-1):
        for j in range(1, n2):
            if st[j] > st[j-1] or (st[j] == st[j-1] and nt[i] < nt[i-1]):
                st[j], st[j-1] = st[j-1], st[j]
                nt[j], nt[j-1] = nt[j-1], nt[j]

# PP
np = array([str]*49)
nt = array([str]*49)
st = array([int()]*49)
n = saisie()
remplir(np, n)
n2 = transfert(np, n, nt, st)
trier(nt, st, n2)
print(np[:n])
print(nt[:n2])
print(st[:n2])

lst = [i for i in range(1, 20)]
lst = [sum(lst[:i]) for i in range(len(lst))]
print(lst)

"""
9
AliF
Saber
Samia
Karim
Anis
Sarrot
Ines
MariamaBH
ChediG
"""