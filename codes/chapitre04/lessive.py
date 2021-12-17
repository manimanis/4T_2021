def saisie():
    n = 0
    while not (n > 0):
        n = int(input("Donner un entier > 0 ? "))
    return n

def ppcm(a, b):
    p = a
    while (p % b != 0):
        p += a
    return p

## Programme principal
a = saisie()
b = saisie()
c = saisie()
temps = ppcm(ppcm(a, b), c)
print("Les femmes referont leurs lessives dans", temps, "jours")
