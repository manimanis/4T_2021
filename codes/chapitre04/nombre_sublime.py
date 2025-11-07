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

from random import randint, seed

# mx = -1
# mi = -1
# tmx = None
# for i in range(10000):
#     seed(i)
#     n = 15
#     t = [randint(100, 9999) for _ in range(n)]
#     ts1 = [v for v in t if est_sublime(v)]
#     ts2 = [v for v in reversed(t) if not est_sublime(v)]
#     if len(ts1) > 0:
#         if len(ts1) > mx:
#             mi = i

seed(7030)
n = 15
t = [randint(100, 9999) for _ in range(n)]
ts1 = [v for v in t if est_sublime(v)]
ts2 = [v for v in reversed(t) if not est_sublime(v)]

print(t)
print(ts1, ts2)