def saisie_nb_patients():
    np = 0
    while not 3 <= np <= 100:
        np = int(input("Entrer le nombre de patients [3, 100] ? "))
    return np


def saisie_nom_patient(msg):
    nom = ""
    while len(nom) == 0:
        nom = input(msg)
    return nom


def saisie_noms_patients(np):
    noms = [""]*np
    for i in range(np):
        noms[i] = saisie_nom_patient(f"Nom patient {i+1} ? ")
        while rech_patient(noms[i], i, noms) != -1:
            print(f"{noms[i]} existe déjà!")
            noms[i] = saisie_nom_patient(f"Nom patient {i+1} ? ")
    return noms


def rech_patient(nom, np, noms):
    i = 0
    nom = nom.lower()
    while i < np:
        noms_m = noms[i].lower()
        if noms_m == nom:
            return i
        i = i + 1
    return -1


# PP
np = saisie_nb_patients()
noms = saisie_noms_patients(np)
nom = ""
while nom.lower() != "fin":
    nom = saisie_nom_patient("Nom patient à rechercher ? ")
    nfiche = ""
    nfiche = rech_patient(nom, np, noms)
    if nfiche == -1:
        print(f"'{nom}' n'est pas notre patient!")
    else:
        print(f"'{nom}' possède la fiche n°{nfiche+1}")
