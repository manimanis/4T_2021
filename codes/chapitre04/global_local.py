def existe_v1(v):
    global t, n
    i = 0
    trouve = False
    while i < n and not trouve:
        trouve = t[i] == v
        i += 1
    return trouve

def existe_v2(v, t, n):
    i = 0
    trouve = False
    while i < n and not trouve:
        trouve = t[i] == v
        i += 1
    return trouve

## PP
n = 8
t = [64, 47, 12, 73, 39, 59, 10, 35]
print(existe_v1(12))
print(existe_v1(49))
print(existe_v2(12, t, n))
print(existe_v1(49, t, n))