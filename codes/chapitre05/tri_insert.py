from random import randint


def TriInsertion(n, t):
    for i in range(1, n):
        pi = i - 1
        while pi >= 0 and t[i] < t[pi]:
            pi -= 1
        k = t[i]
        Décaler(t, pi + 1, i - 1)
        t[pi + 1] = k 


def Décaler(t, deb, fin):
    for i in range(fin, deb - 1, -1):
        t[i + 1] = t[i]


n = 20
t = [randint(0, 999) for _ in range(n)]
print(t)
t1 = t.copy()
t1.sort()
TriInsertion(n, t)
print(t)
print(t == t1)

