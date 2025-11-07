def somme_div(n):
    s = 1
    for i in range(2, int(1 + n ** 0.5)):
        if n % i == 0:
            s += i
            j = n // i
            if i != j:
                s += j
    return s

def nbre_div(n):
    nbd = 2
    for i in range(2, int(1 + n ** 0.5)):
        if n % i == 0:
            nbd += 1
            j = n // i
            if i != j:
                nbd += 1
    return nbd

def est_parfait(n):
    return somme_div(n) == n

def est_sublime(n):
    nbd = nbre_div(n)
    return n % 4 == 0 and n % 5 != 0 and est_parfait(nbd)

for i in range(1, 100):
    if est_sublime(i):
        print(i, 'est sublime', nbre_div(i))