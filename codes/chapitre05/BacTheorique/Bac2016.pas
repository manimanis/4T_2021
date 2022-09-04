program Bac2016;

type tab_r = array [1..50] of real;

procedure SaisieCoord(var Xd, Yd: real);
begin
  Write('x ? '); Readln(Xd);
  Write('y ? '); Readln(Yd);
end;

function Recherche(v: real; t: tab_r; n: integer):integer;
var
  p, i: integer;
begin
  i := 1;
  p := 0;
  while (i <= n) and (p = 0) do
  begin
    if t[i] = v then
       p := i
    else
       i := i + 1;
  end;
  Recherche := p;
end;

procedure Remplir(var Tx, Ty: tab_r; var n: integer; Xd, Yd: real);
var
  i: integer;
begin
  Repeat
    Write('Nombre de bateaux voisins ? '); Readln(n);
  Until (n in [1..50]);

  for i:=1 to n do begin
    Repeat
      Writeln('Coodonnées du bateau n°', i);
      SaisieCoord(Tx[i], Ty[i]);
      {not(Tx[i]=Xd and Tx[i]=Yd)}
      {
      Tx[i] et Ty[i] introuvables
      Tx[i] introuvable, Ty[i] existe
      Tx[i] existe, Ty[i] introuvable
      }
    Until ((Tx[i] <> Xd) or (Ty[i] <> Yd)) and
     ((Recherche(Tx[i], Tx, i-1) = 0) or (Recherche(Ty[i], Ty, i-1) = 0));
  end;
end;

procedure CalcDist(var Td: tab_r; Tx, Ty: tab_r; n: integer; Xd, Yd: real);
var
  i: integer;
begin
  for i:=1 to n do
    Td[i] := sqrt(sqr(Tx[i]-Xd)+sqr(Ty[i]-Yd));
end;

procedure TriSelonDist(var Td, Tx, Ty: tab_r; n: integer);
var
  i, j: integer;
  aux: real;
begin
  for i:=1 to n-1 do
    for j:=1 to n-1 do
      if Td[j+1] < Td[j] then
      begin
        aux := Td[j]; Td[j] := Td[j+1]; Td[j+1] := aux;
        aux := Tx[j]; Tx[j] := Tx[j+1]; Tx[j+1] := aux;
        aux := Ty[j]; Ty[j] := Ty[j+1]; Ty[j+1] := aux;
      end;
end;

procedure Afficher(Tx, Ty: tab_r; n: integer);
var
  i: integer;
begin
  for i:=1 to n do
  begin
    write('(', Tx[i]:0:2, ', ', Ty[i]:0:2, ')');
    if i <> n then write('-');
  end;
  Writeln;
end;

var
  Xd, Yd: real;
  Tx, Ty, Td: tab_r;
  n: integer;
begin
  SaisieCoord(Xd, Yd);
  Remplir(Tx, Ty, n, Xd, Yd);
  CalcDist(Td, Tx, Ty, n, Xd, Yd);
  TriSelonDist(Td, Tx, Ty, n);
  Afficher(Tx, Ty, n);
  Readln;
end.

