program fiches_patients;
type
  tab = array [1..100] of string;

Function Recherche(t:tab;n:integer;v:string):integer;
Var
  i, p: integer;
Begin
  p := 0; i := 1;
  While (i <= n) and (p = 0) Do
  Begin
    if t[i] = v then p := i else i := i + 1;
  End;
  Recherche := p;
End;

Procedure Remplir(var t:tab; var n:integer);
Var
  i: integer;
Begin
  Repeat
    Write('Donner le Nbre de Patients ? ');
    Readln(n);
  until (3 <= n) and (n <= 100);
  for i := 1 to n do
    Repeat
      Write('Patient n°', i, ' ? ');
      Readln(t[i]);
    Until Recherche(t, i-1, t[i]) = 0;
End;

var
  noms: tab;
  nom_patient: string;
  np, nf: integer;
begin
  Remplir(noms, np);
  Repeat
    Write('Patient à rechercher ? ');
    Readln(nom_patient);
    nf := Recherche(noms, np, nom_patient);
    if nf = 0 Then
      Writeln('Le patient est introuvable')
    else
      Wrireln('Fiche n°', nf);
  Until Upcase(nom_patient) = 'FIN';
  Readln;
end.

