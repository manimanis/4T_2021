def fact(n):
    f = 1
    for i in range(2, n + 1):
        f *= i
    return f

def somme_fact(n):
    s = 0
    while n != 0:
        r = n % 10
        n = n // 10
        s += fact(r)
    return s

def fort(n):
    return n == somme_fact(n)

for i in range(1000000, 1100000):
    if fort(i):
        print(i)