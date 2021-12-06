def saisie_fraction():
    p = int(input("Numérateur ? "))
    q = 0
    while not (q != 0):
        q = int(input("Dénominateur ≠ 0 ? "))
    return p, q


def pgcd(p, q):
    while q != 0:
        r = p % q
        p = q
        q = r
    return p


def simplifier_fraction(p, q):
    dc = pgcd(p, q)
    p = p // dc
    q = q // dc
    return p, q


def somme_fraction(p1, q1, p2, q2):
    p = p1 * q2 + p2 * q1
    q = q1 * q2
    return simplifier_fraction(p, q)


# PP
p1, q1 = saisie_fraction()
p2, q2 = saisie_fraction()

p1, q1 = simplifier_fraction(p1, q1)
p2, q2 = simplifier_fraction(p2, q2)
ps, qs = somme_fraction(p1, q1, p2, q2)

print(p1, "/", q1, "+", p2, "/", q2, "=", ps, "/", qs)

