# Genera coordenadas 3D (bloque MOL) de moléculas clave del ingreso, para el
# visor 3D (3Dmol.js). Salida: src/content/molecules/molecules.json
#
# Uso: python scripts/import/gen_molecules.py

import json, os
from rdkit import Chem
from rdkit.Chem import AllChem, rdMolDescriptors

ROOT = "D:/PROGRAMAS/aulirex"
OUT = ROOT + "/src/content/molecules"
os.makedirs(OUT, exist_ok=True)

# (id, nombre, SMILES, categoría, nota didáctica)
MOLS = [
    ("agua", "Agua", "O", "inorganica", "Molécula polar, angular (~104,5°)."),
    ("co2", "Dióxido de carbono", "O=C=O", "inorganica", "Lineal, apolar; carbono sp."),
    ("amoniaco", "Amoníaco", "N", "inorganica", "Piramidal; el N tiene un par libre."),
    ("oxigeno", "Oxígeno", "O=O", "inorganica", "Diatómico, doble enlace."),
    ("metano", "Metano", "C", "hidrocarburo", "Tetraédrico; carbono sp³ (109,5°)."),
    ("etano", "Etano", "CC", "hidrocarburo", "Enlace simple C–C; ambos C sp³."),
    ("eteno", "Eteno (etileno)", "C=C", "hidrocarburo", "Doble enlace; carbonos sp² (120°)."),
    ("etino", "Etino (acetileno)", "C#C", "hidrocarburo", "Triple enlace; carbonos sp (lineal)."),
    ("propano", "Propano", "CCC", "hidrocarburo", "Cadena de 3 carbonos."),
    ("benceno", "Benceno", "c1ccccc1", "hidrocarburo", "Anillo aromático; resonancia."),
    ("etanol", "Etanol", "CCO", "grupo_funcional", "Alcohol: grupo −OH."),
    ("acido_acetico", "Ácido acético", "CC(=O)O", "grupo_funcional", "Ácido carboxílico: −COOH."),
    ("acetona", "Acetona", "CC(=O)C", "grupo_funcional", "Cetona: C=O interno."),
    ("acetaldehido", "Acetaldehído", "CC=O", "grupo_funcional", "Aldehído: −CHO terminal."),
    ("metilamina", "Metilamina", "CN", "grupo_funcional", "Amina: grupo −NH₂."),
    ("glucosa", "Glucosa", "OC[C@H]1OC(O)[C@H](O)[C@@H](O)[C@@H]1O", "biologica", "Monosacárido (hexosa)."),
]

out = []
for mid, name, smiles, cat, note in MOLS:
    mol = Chem.MolFromSmiles(smiles)
    if mol is None:
        print("!! no parsea:", name)
        continue
    mol = Chem.AddHs(mol)
    if AllChem.EmbedMolecule(mol, randomSeed=42) != 0:
        AllChem.EmbedMolecule(mol, useRandomCoords=True, randomSeed=42)
    try:
        AllChem.MMFFOptimizeMolecule(mol)
    except Exception:
        pass
    out.append({
        "id": mid,
        "name": name,
        "formula": rdMolDescriptors.CalcMolFormula(Chem.RemoveHs(mol)),
        "category": cat,
        "note": note,
        "mol": Chem.MolToMolBlock(mol),
    })

json.dump(out, open(f"{OUT}/molecules.json", "w", encoding="utf-8"), ensure_ascii=False)
print("moléculas:", len(out), "->", f"{OUT}/molecules.json")
