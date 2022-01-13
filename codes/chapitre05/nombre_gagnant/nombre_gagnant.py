from PyQt5 import uic
from PyQt5.QtWidgets import QApplication

def premier(n):
    if n <= 1:
        return False
    if n <= 3:
        return True
    if n % 2 == 0 or n % 3 == 0:
        return False
    i = 5
    mx = int(n ** 0.5 + 1)
    premier = True
    while premier and i <= mx:
        premier = n % i != 0
        i += 2
    return premier


def chance(ch):
    if not (ch.isdigit() and len(ch) == 8 and ch[0] in ["2", "4", "5", "9"]):
        msg = "Vérifier le numéro de téléphone"
    else:
        msg = "Désolé, vous n'avez pas gagné."
        s = 0
        for i in range(len(ch)):
            s += int(ch[i]) * i
        if premier(s):
            msg = "Félicitations, vous avez gagné."
    return msg

def jouer():
    win.lbl_msg.setText(chance(win.txt_tel.text()))

app = QApplication([])
win = uic.loadUi("nombre_gagnant.ui")

win.btn_jouer.clicked.connect(jouer)

win.show()
app.exec()