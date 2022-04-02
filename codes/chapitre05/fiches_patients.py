from numpy import array


def remplir():
    np = 0
    while not 3 <= np <= 100:
        np = int(input("Entrer le nombre de patients [3, 100] ? "))

    noms = array([str]*np)
    for i in range(np):
        noms[i] = input(f"Nom patient {i+1} ? ")
        while recherche(noms, i-1, noms[i]) != -1:
            print(f"{noms[i]} existe déjà!")
            noms[i] = input(f"Nom patient {i+1} ? ")
    return np, noms


def recherche(noms, np, nom):
    i = 0
    p = -1
    nom = nom.upper()
    while i < np and p == -1:
        noms_m = noms[i].upper()
        if noms_m == nom:
            p = i
        else:
            i = i + 1
    return p


# PP
np, noms = remplir()
nom_patient = ""
while nom_patient.upper() != "FIN":
    nom_patient = input("Patient à rechercher ? ")
    nf = recherche(noms, np, nom_patient)
    if nf == -1:
        print(f"Le patient est introuvable!")
    else:
        print(f"Fiche n°{nf+1}")
