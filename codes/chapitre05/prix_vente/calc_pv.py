from PyQt5 import uic
from PyQt5.QtWidgets import QApplication

def calc_prix():
    pa = float(win.txt_pa.text())
    profit = float(win.txt_profit.text())
    tva = float(win.txt_tva.text())
    pv = pa * (1 + profit / 100) * (1 + tva / 100)
    win.txt_pv.setText("{:0.3f}".format(pv))

app = QApplication([])
win = uic.loadUi("calc_pv.ui")

win.btn_calc.clicked.connect(calc_prix)

win.show()
app.exec()