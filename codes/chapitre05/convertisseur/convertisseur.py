from PyQt5 import uic
from PyQt5.QtWidgets import QApplication

def cours_euro():
    return float(win.txt_prix_euro.text())

def conversion_tnd():
    euro = float(win.txt_euro.text())
    tnd = euro * cours_euro()
    win.txt_tnd.setText("{:0.3f}".format(tnd))

def conversion_euro():
    tnd = float(win.txt_tnd.text())
    euro = tnd / cours_euro()
    win.txt_euro.setText("{:0.2f}".format(euro))

app = QApplication([])
win = uic.loadUi("convertisseur.ui")

win.btn_tnd.clicked.connect(conversion_tnd)
win.btn_euro.clicked.connect(conversion_euro)

win.show()
app.exec()