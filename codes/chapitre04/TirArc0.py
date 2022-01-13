import numpy as np

def alpha(ch):
    pass

def score(a, n):
    pass

## PP
n = 0
while not (2 <= n <= 20):
    n = int(input("Donner le nombre de joueurs : "))
a = np.array([str]*n, dtype="U30")
for i in range(n):
    a[i] = ""
    while not alpha(a[i]):
        a[i] = input("Donner le nom du joueur n°" + str(i) + " : ")
score(a, n)