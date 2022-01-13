import numpy as np

def alpha(ch):
    v = 200 >= len(ch) > 0
    i = 0
    while v and i < len(ch):
        v = "A" <= ch[i] <= "Z" or ch[i] == " "
        i += 1
    return v

def verif(ch):
    v = len(ch) > 2 and ch[-1] == "."
    if v:
        v = alpha(ch[:-1])
    return v

def supp_espaces(ch):
    ch1 = ""
    espace = False
    for i in range(len(ch)):
        if ch[i] == " ":
            if len(ch1) != 0 and ch1[-1] != " ":
                espace = True
        else:
            if espace:
                if ch[i] != '.':
                    ch1 += " "
                espace = False
            ch1 += ch[i]
    return ch1
    
def saisir(message):
    t = ""
    while not verif(t):
        t = supp_espaces(input(message))
    return t

def nb_mots(ch):
    nm = 1
    for i in range(len(ch)):
        if ch[i] == ' ':
            nm += 1
    return nm

def mots_texte(t):
    mots = np.array([str]*100, dtype="U200")
    deb = 0
    n = 0
    for i in range(len(t)):
        if t[i] == " ":
            mots[n] = t[deb:i]
            deb = i+1
            n += 1
        elif i == len(t)-1:
            mots[n] = t[deb:]
            deb = i+1
            n += 1
    return mots, n

def existe(mot, t, n):
    trouve = False
    i = 0
    while not trouve and i < n:
        trouve = t[i] == mot
        i += 1
    return trouve

def commun(t1, t2):
    mots1, n1 = mots_texte(t1[:-1])
    mots2, n2 = mots_texte(t2[:-1])
    nmc = 0
    for i in range(n1):
        if existe(mots1[i], mots2, n2):
            nmc += 1
    return nmc

## PP
t1 = "ABC DEF"
t2 = "ABC"
while nb_mots(t1) != nb_mots(t2):
    t1 = saisir("Donner le premier texte ? ")
    t2 = saisir("Donner le second texte ? ")
nbc = commun(t1, t2)
if nbc > nb_mots(t1)//2:
    print("Les textes sont plagiés", nbc, "mots identiques")
else:
    print("Les textes ne sont pas plagiés", nbc, "mots identiques")